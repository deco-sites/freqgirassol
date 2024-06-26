import { SendEventOnView } from "$store/components/Analytics.tsx";
import ProductCard, {
  Layout as cardLayout,
} from "$store/components/product/ProductCard.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { Product } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import { clx } from "$store/sdk/clx.ts";

export interface Props {
  products: Product[] | null;
  title?: string;
  markupTitle?: boolean;
  description?: string;
  bgGray?: boolean;
  layout?: {
    numberOfSliders?: {
      mobile?: 1 | 2 | 3 | 4 | 5;
      desktop?: 1 | 2 | 3 | 4 | 5;
    };
    headerAlignment?: "center" | "left";
    headerfontSize?: "Normal" | "Large" | "Small";
    showArrows?: boolean;
  };
  cardLayout?: cardLayout;
}

function ProductShelf({
  products,
  title,
  markupTitle,
  description,
  bgGray,
  layout,
  cardLayout,
}: Props) {
  const id = useId();
  const platform = usePlatform();

  if (!products || products.length === 0) {
    return null;
  }
  const slideDesktop = {
    1: "md:w-full",
    2: "md:w-1/2",
    3: "md:w-1/3",
    4: "lg:min-w-[17.5%] 2xl:min-w-[22.5%]",
    5: "md:w-1/5",
  };

  const slideMobile = {
    1: "min-w-[55%] md:min-w-[40%]",
    2: "min-w-[50%] md:min-w-[32.8%]",
    3: "w-1/3",
    4: "w-1/4",
    5: "w-1/5",
  };
  return (
    <div
      class={`w-full pt-8 pb-20 lg:py-10 ${
        bgGray ? "bg-base-300" : "bg-white"
      }`}
    >
      <div class="w-full pl-4 lg:pl-0 lg:w-11/12 mx-auto max-w-[1300px] flex flex-col gap-6">
        <Header
          title={title || ""}
          description={description || ""}
          markupTitle={markupTitle}
          fontSize={layout?.headerfontSize || "Large"}
          alignment={layout?.headerAlignment || "center"}
        />

        <div
          id={id}
          class={`flex flex-col relative items-center w-full`}
        >
          <Slider class="carousel carousel-center sm:carousel-end py-3 w-full">
            {products?.map((product, index) => (
              <Slider.Item
                index={index}
                class={`mx-2 lg:mx-3 xl:mx-4 rounded-2xl ${
                  slideMobile[layout?.numberOfSliders?.mobile ?? 1]
                } ${slideDesktop[layout?.numberOfSliders?.desktop ?? 3]}`}
              >
                <ProductCard
                  product={product}
                  itemListName={title}
                  layout={cardLayout}
                  platform={platform}
                  index={index}
                />
              </Slider.Item>
            ))}
          </Slider>
          {layout?.showArrows && (
            <>
              <Slider.PrevButton class="hidden lg:flex absolute -left-8 2xl:-left-12 top-[45%] bg-primary w-12 h-12 justify-center items-center border border-black border-opacity-10 rounded-[500px]">
                <Icon
                  size={24}
                  id="ChevronLeft"
                  strokeWidth={3}
                  class="w-5 text-white"
                />
              </Slider.PrevButton>
            </>
          )}
          <ul class="bg-white bg-opacity-60 border border-white rounded-[500px] bottom-5 right-4 lg:right-16 carousel justify-center col-span-full gap-2 z-10 p-2.5 row-start-4">
            {products?.map((_, index) => (
              <li class="carousel-item">
                <Slider.Dot index={index} _class={`disabled:bg-primary`}>
                  <div class="">
                    <div class="w-2.5 h-2.5 rounded-full bg-primary bg-opacity-30" />
                  </div>
                </Slider.Dot>
              </li>
            ))}
          </ul>
          {layout?.showArrows && (
            <>
              <Slider.NextButton class="absolute -right-8 2xl:-right-12 top-[45%] bg-primary w-12 h-12 hidden lg:flex justify-center items-center border border-black border-opacity-10 rounded-[500px]">
                <Icon
                  size={24}
                  id="ChevronRight"
                  strokeWidth={3}
                  class="w-5 text-white"
                />
              </Slider.NextButton>
            </>
          )}
          <SliderJS rootId={id} />
          <SendEventOnView
            id={id}
            event={{
              name: "view_item_list",
              params: {
                item_list_name: title,
                items: products.map((product, index) =>
                  mapProductToAnalyticsItem({
                    index,
                    product,
                    ...(useOffer(product.offers)),
                  })
                ),
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductShelf;
