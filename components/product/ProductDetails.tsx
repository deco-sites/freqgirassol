import { SendEventOnView } from "$store/components/Analytics.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import AddToCartButtonShopify from "$store/islands/AddToCartButton/shopify.tsx";
import OutOfStock from "$store/islands/OutOfStock.tsx";
import { formatPrice } from "$store/sdk/format.ts";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import { ProductDetailsPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductSelector from "./ProductVariantSelector.tsx";
import { AppContext } from "$store/apps/site.ts";
import type { SectionProps } from "deco/types.ts";
import GallerySlider from "$store/islands/ProductImageSlider.tsx";
import ProductName from "$store/islands/ProductName.tsx";
import { Section } from "deco/blocks/section.ts";
import ProductTags from "$store/components/product/ProductTags.tsx";
import ProductDescription from "$store/components/product/ProductDescription.tsx";
import type { Tag } from "$store/components/product/ProductTags.tsx";

interface Props {
  page: ProductDetailsPage | null;
  section?: Section;
  tags?: Tag[];
}

function ProductInfo(
  { page, device, section, tags }: SectionProps<typeof loader>,
) {
  const platform = usePlatform();
  const id = useId();

  if (page === null) {
    throw new Error("Missing Product Details Page Info");
  }

  const { product, breadcrumbList } = page;
  const {
    productID,
    offers,
    name = "",
    gtin,
    isVariantOf,
    additionalProperty = [],
  } = product;
  const description = product.description || isVariantOf?.description;
  const {
    image: images = [],
  } = isVariantOf ? isVariantOf : {};

  const {
    price = 0,
    listPrice = 0,
    seller = "1",
    installments,
    availability,
  } = useOffer(offers);
  const model = isVariantOf?.model || "";
  const productGroupID = isVariantOf?.productGroupID ?? "";
  const breadcrumb = {
    ...breadcrumbList,
    itemListElement: breadcrumbList?.itemListElement.slice(0, -1),
    numberOfItems: breadcrumbList.numberOfItems - 1,
  };
  console.log(page);
  const tagValues: string[] = [];

  isVariantOf?.additionalProperty.forEach((item) => {
    // Verificar se o item tem name igual a "TAG"
    if (item.name === "TAG") {
      // Se sim, adicionar o valor ao array tagValues
      tagValues.push(item.value || "");
    }
  });
  const eventItem = mapProductToAnalyticsItem({
    product,
    price,
    listPrice,
  });

  return (
    <div class={`flex flex-col gap-4 mt-12`}>
      {device == "mobile" &&
        (
          <>
            <Breadcrumb
              itemListElement={breadcrumb.itemListElement}
              _class={`w-11/12 mx-auto max-w-[1300px]`}
            />
            <ProductName
              name={isVariantOf?.name || ""}
              device={device}
              model={model}
            />
          </>
        )}
      <div
        class={`flex flex-col gap-3 mb-10 lg:mb-0 lg:flex-row lg:justify-between lg:w-11/12 lg:mx-auto lg:max-w-[1300px] lg:gap-10`}
      >
        <div class={`flex flex-col gap-3 relative`}>
          {device == "desktop" &&
            (
              <>
                <Breadcrumb
                  itemListElement={breadcrumb.itemListElement}
                  _class={`mt-9 pt-0 pb-2.5 mb-2.5 border-b border-black border-opacity-15`}
                />
              </>
            )}
          <GallerySlider
            images={images}
            productID={productID}
            productGroupID={productGroupID}
          />
        </div>
        <div
          class={`flex flex-col gap-3 lg:w-[45%] lg:max-w-[530px] lg:mt-[90px]`}
        >
          {device == "desktop" &&
            (
              <>
                <ProductName
                  name={isVariantOf?.name || ""}
                  device={device}
                  model={model}
                />
                <div class="flex flex-col gap-2 border-b border-black border-opacity-15 pb-4">
                  <div class={`flex gap-2 items-end relative w-max`}>
                    {(listPrice ?? 0) > price
                      ? (
                        <>
                          <span class="line-through text-[#aeaeae] text-sm font-semibold leading-4">
                            De: {formatPrice(listPrice, offers?.priceCurrency)}
                          </span>
                          <span class="font-bold text-2xl text-primary-content leading-7">
                            Por: {formatPrice(price, offers?.priceCurrency)}
                          </span>
                          {listPrice && price && listPrice > price && (
                            <div class="absolute text-sm bg-secondary top-[5px] -right-[60px] px-2 py-[1px] rounded-full">
                              <span class="text-white font-bold">
                                {listPrice && price
                                  ? `-${
                                    Math.round(
                                      ((listPrice - price) / listPrice) * 100,
                                    )
                                  }% `
                                  : ""}
                              </span>
                            </div>
                          )}
                        </>
                      )
                      : (
                        <>
                          <span class="font-bold text-2xl text-primary leading-7">
                            {formatPrice(price, offers?.priceCurrency)}
                          </span>
                        </>
                      )}
                  </div>
                  <span class="text-sm text-primary-content font-bold leading-4">
                    {installments}
                  </span>
                </div>
              </>
            )}
          {/* Sku Selector */}
          <div class="w-11/12 mx-auto lg:w-full">
            <ProductSelector product={product} />
          </div>
          {device == "desktop" &&
            (
              <>
                {availability === "https://schema.org/InStock"
                  ? (
                    <>
                      {platform === "shopify" && (
                        <div class={`flex mt-8 w-72`}>
                          <AddToCartButtonShopify
                            eventParams={{ items: [eventItem] }}
                            productID={productID}
                            className={"w-full"}
                          />
                        </div>
                      )}
                    </>
                  )
                  : <OutOfStock productID={productID} />}
              </>
            )}
          {tagValues.length > 0 &&
            (
              <div class={`w-11/12 flex flex-col mx-auto gap-3 mt-4 lg:w-full`}>
                <h3 class={`text-base text-primary-content font-semibold`}>
                  Benefícios do produto:
                </h3>
                <ul class={`flex flex-wrap gap-3`}>
                  {tagValues?.map((tag) => {
                    return (
                      <li
                        class={`py-1 px-3 bg-primary rounded-badge text-white capitalize`}
                      >
                        {tag}
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          {device == "mobile" &&
            (
              <>
                {/* Add to Cart and Favorites button */}
                <div class="z-40 fixed bottom-0 w-full bg-white border-t border-black border-opacity-10 flex flex-col gap-4 p-4">
                  {/* Prices */}
                  <div class="flex flex-row gap-2 items-center relative">
                    {(listPrice ?? 0) > price
                      ? (
                        <>
                          <span class="line-through text-[#aeaeae] text-sm font-semibold leading-4">
                            De: {formatPrice(listPrice, offers?.priceCurrency)}
                          </span>
                          <span class="font-bold text-2xl text-primary-content leading-7">
                            Por: {formatPrice(price, offers?.priceCurrency)}
                          </span>
                          {listPrice && price && listPrice > price && (
                            <div class="text-sm bg-secondary px-2 py-[1px] rounded-full">
                              <span class="text-white font-bold">
                                {listPrice && price
                                  ? `-${
                                    Math.round(
                                      ((listPrice - price) / listPrice) * 100,
                                    )
                                  }% `
                                  : ""}
                              </span>
                            </div>
                          )}
                        </>
                      )
                      : (
                        <span class="font-bold text-2xl text-primary-content leading-7">
                          {formatPrice(price, offers?.priceCurrency)}
                        </span>
                      )}

                    <span class="border-l border-black border-opacity-15 pl-3 text-sm text-primary-content font-bold leading-4">
                      {installments}
                    </span>
                  </div>
                  {availability === "https://schema.org/InStock"
                    ? (
                      <>
                        {platform === "shopify" && (
                          <AddToCartButtonShopify
                            eventParams={{ items: [eventItem] }}
                            productID={productID}
                          />
                        )}
                      </>
                    )
                    : <OutOfStock productID={productID} />}
                </div>
              </>
            )}
          {/* Analytics Event */}
          <SendEventOnView
            id={id}
            event={{
              name: "view_item",
              params: {
                item_list_id: "product",
                item_list_name: "Product",
                items: [eventItem],
              },
            }}
          />
        </div>
      </div>
      {section &&
        <section.Component {...section.props} />}
      {/* Description card */}
      <div class="flex flex-col w-11/12 mx-auto mt-6 mb-10 p-4 gap-8 bg-white border border-black border-opacity-10 rounded-xl max-w-[850px] lg:p-8">
        <ProductTags tags={tags} />
        <span class="text-sm">
          {description && <ProductDescription description={description} />}
        </span>
      </div>
    </div>
  );
}

export const loader = (props: Props, _req: Request, ctx: AppContext) => {
  return { ...props, device: ctx.device };
};

export default ProductInfo;
