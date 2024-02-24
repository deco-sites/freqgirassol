import { Picture, Source } from "apps/website/components/Picture.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";

export interface Props {
  /**
   * @format html
   */
  title?: string;
  description?: string;
  link?: {
    text: string;
    href: string;
  };
  /**
   * @format color
   */
  color: string;
  layoutCenter?: boolean;
  image: {
    /** @description Image for big screens */
    desktop: ImageWidget;
    /** @description Image for small screens */
    mobile: ImageWidget;
    /** @description image alt text */
    alt?: string;
  };
}

function PluralBanner({
  title,
  description,
  link,
  color,
  image,
  layoutCenter,
}: Props) {
  return title && description ? (
    <div class="relative flex">
      <div
        class={`${
          layoutCenter ? "lg:justify-center" : "lg:justify-start"
        } container w-full flex justify-center items-center  z-[1] pt-[63px] pb-[240px] lg:py-[70px]`}
      >
        <div
          class={`${
            layoutCenter ? "lg:max-w-[600px]" : "lg:max-w-[380px]" 
          } w-full px-[24px] text-end lg:text-center flex flex-col items-end lg:items-center`}
        >
          {title && (
            <div
              class="card-title text-[32px] lg:text-[40px] font-semibold leading-[130%] textWithStrong "
              style={{ color: color ? color : "#FFF" }}
              dangerouslySetInnerHTML={{ __html: title }}
            />
          )}

          {description && (
            <p
              style={{ color: color ? color : "#FFF" }}
              class="text-[24px] leading-[130%] mt-[24px] lg:mt-[38px] mb-[32px] lg:mb-[60px]"
            >
              {description}
            </p>
          )}

          <div class="card-actions justify-center lg:justify-start">
            {link && (
              <a
                class="px-[40px] lg:px-[60px] py-[16px] lg:py-[18px] rounded-lg border-none text-[#000000] text-[16px] lg:text-[20px] font-bold uppercase tracking-[1px] bg-white hover:bg-primary hover:text-[#FFF] hover:border-none transition-all duration-300 "
                href={link?.href}
              >
                {link?.text}
              </a>
            )}
          </div>
        </div>
      </div>
      <Picture preload class="absolute w-full h-full right-0 top-0">
        <Source
          src={image.mobile}
          width={360}
          height={461}
          media="(max-width: 767px)"
        />
        <Source
          src={image.desktop}
          width={1440}
          height={382}
          media="(min-width: 767px)"
        />
        <img
          class="w-full h-full object-cover"
          src={image.desktop}
          alt={image?.alt}
        />
      </Picture>
    </div>
  ) : (
    <div class="relative flex w-full h-screen max-h-[380px] lg:max-h-[450px]">
      <a href={link?.href}>
        <Picture preload class="absolute w-full h-full right-0 top-0">
          <Source
            src={image.mobile}
            width={360}
            height={461}
            media="(max-width: 767px)"
          />
          <Source
            src={image.desktop}
            width={1440}
            height={382}
            media="(min-width: 767px)"
          />
          <img
            class="w-full h-full object-cover"
            src={image.desktop}
            alt={image?.alt}
          />
        </Picture>
      </a>
    </div>
  );
}

export default PluralBanner;
