import Header from "$store/components/ui/SectionHeader.tsx";
import Slider from "$store/components/ui/Slider.tsx";
import SliderJS from "$store/islands/SliderJS.tsx";
import { useId } from "$store/sdk/useId.ts";
import Image from "apps/website/components/Image.tsx";
import type { HTMLWidget, ImageWidget } from "apps/admin/widgets.ts";
import Icon from "$store/components/ui/Icon.tsx";

export interface Category {
  label: string;
  href?: string;
  imageDesktop?: ImageWidget;
  imageMobile?: ImageWidget;
  buttonText?: string;
}

export interface Props {
  /**
   * @format color
   */
  backgroundColor?: string;
  header?: {
    /**
     * @format html
     */
    title?: HTMLWidget;
    description?: string;
  };
  list?: Category[];
  layout?: {
    headerAlignment?: "center" | "left";
    categoryCard?: {
      textPosition?: "top" | "bottom";
      textAlignment?: "center" | "left";
    };
  };
}

function CardText({
  tag,
  label,
  description,
  alignment,
  textColor,
}: {
  tag?: string;
  label?: string;
  description?: string;
  alignment?: "center" | "left";
  textColor?: string;
}) {
  return (
    <div
      class={`flex flex-col ${
        alignment === "center" ? "text-center" : "text-left"
      }`}
    >
      {tag && <div class="text-sm text-primary">{tag}</div>}
      {label && (
        <h3
          class="text-[20px] md:text-[28px] text-base-content font-fraunces"
          style={{ color: textColor }}
        >
          {label}
        </h3>
      )}
      {description && <div class="text-sm text-neutral">{description}</div>}
    </div>
  );
}

function CategoryList(props: Props) {
  const id = useId();
  const {
    header = {
      title: "",
      description: "",
    },
    list = [
      {
        label: "Feminino",
        href: "/feminino",
        buttonText: "Conheça",
      },
    ],
    layout = {
      headerAlignment: "center",
      categoryCard: {
        textPosition: "top",
        textAlignment: "center",
      },
    },
  } = props;

  return (
    <div
      id={id}
      class="py-8 flex items-center flex-col gap-5 lg:gap-7 text-base-content"
      style={{
        "background-color": props.backgroundColor,
      }}
    >
      <div class="px-[24px]">
        <Header
          title={header.title}
          description={header.description || ""}
          alignment={layout.headerAlignment || "center"}
        />
      </div>

      <div class="flex flex-row gap-4 px-[0] pl-[24px] lg:pl-0 overflow-x-scroll w-full lg:justify-center lg:overflow-hidden">
        {list.map(
          ({ label, href, imageDesktop, imageMobile, buttonText }, index) => (
            <div
              class="m-[8px] lg:my-2 flex flex-col gap-4 relative group rounded-[20px] lg:m-0 shadow-md lg:hover:scale-[1.022] transition-all duration-300"
            >
              <a
                href={href}
                class="flex flex-col gap-4 w-[296px] lg:w-[145px] xl:w-[186px] 2xl:w-[236px] lg:h-auto"
              >
                {imageDesktop && imageMobile && (
                  <figure>
                    <Image
                      class="card w-full h-full block"
                      src={imageMobile}
                      alt={label || ""}
                      width={210}
                      height={270}
                      loading="lazy"
                    />
                  </figure>
                )}
              </a>

              <div class="absolute top-[80%] lg:group-hover:top-[33%] w-full h-fit lg:h-full flex flex-col items-center gap-[32px] transition-all duration-300 z-[2]">
                {label && (
                  <p class="text-[24px] xl:text-[32px] tracking-[1.6px] text-white text-center uppercase font-bold">
                    {label}
                  </p>
                )}
                {buttonText && (
                  <a
                    href={href}
                    class="hidden lg:block w-fit bg-white rounded-full border-none text-[#000] text-sm xl:px-7 xl:py-3 2xl:px-10 2xl:py-3.5 xl:text-base uppercase px-4 py-2.5 font-bold tracking-[1px] hover:bg-primary hover:text-white hover:border-none transition-all duration-300"
                  >
                    {buttonText}
                  </a>
                )}
              </div>

              <div class="hidden lg:block absolute w-full h-full transition-all duration-300 rounded-[20px] lg:group-hover:bg-[#00000050] z-[1]" />
            </div>
          ),
        )}
      </div>
    </div>
  );
}

export default CategoryList;
