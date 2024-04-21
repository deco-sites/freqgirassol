import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { MenuButton } from "$store/islands/Header/Buttons.tsx";
import Searchbar from "$store/islands/Header/Searchbar.tsx";
import Image from "apps/website/components/Image.tsx";
import NavItem from "./NavItem.tsx";
import { SearchButton } from "$store/islands/Header/Buttons.tsx";
import CartButton from "$store/islands/Header/Cart/shopify.tsx";
import { navbarHeight } from "./constants.ts";
import type { Props as ICard } from "$store/components/ui/Card.tsx";
interface itemsNav {
  label: string;
  href: string;
  destaque?: true | false;
}
interface itemNav {
  label: string;
  href?: string;
  destaque?: true | false;
  fontBold?: true | false;
  children?: itemsNav[];
}
export interface INavItem {
  label: string;
  href?: string;
  destaque?: true | false;
  children?: itemNav[];
  firstCard?: ICard;
  secondCard?: ICard;
  opacityMenu?:
    | "0.10"
    | "0.20"
    | "0.30"
    | "0.40"
    | "0.50"
    | "0.60"
    | "0.70"
    | "0.80"
    | "0.90"
    | "1";
}

export interface Props {
  items: INavItem[];
  searchbar?: SearchbarProps;
  logoPreto: {
    src: string;
    alt: string;
    /** @format color */
  };
  // deno-lint-ignore no-explicit-any
  platform: any;
}

function Navbar({ items, searchbar, logoPreto, platform }: Props) {
  return (
    <>
      {/* Mobile Version */}
      <div
        style={{ height: navbarHeight }}
        class={`lg:hidden flex flex-row justify-between shadow-md items-center w-full px-2 gap-2 bg-white md:hover:visible md:hover:bg-white-lily py-4`}
      >
        <MenuButton />

        {logoPreto && (
          <a
            href="/"
            class="flex-grow inline-flex items-center justify-center"
            style={{ minHeight: navbarHeight }}
            aria-label="Store logo"
          >
            <Image
              class={`-ml-5`}
              src={logoPreto.src}
              alt={logoPreto.alt}
              width={160}
              height={75}
            />
          </a>
        )}

        <div class="flex gap-1">
          <SearchButton />
          {platform === "shopify" && <CartButton />}
        </div>
      </div>

      {/* Desktop Version */}
      <div
        class={`hidden shadow-md lg:flex h-[55px] bg-white py-5`}
      >
        <div class="container relative inis flex justify-center flex-row items-center w-full z-[999]">
          <div class="z-50 absolute left-0">
            {logoPreto && (
              <a
                href="/"
                aria-label="Logo Frequencia Girassol"
                class="block"
              >
                <Image
                  src={logoPreto.src}
                  alt={logoPreto.alt}
                  width={174}
                  height={82}
                />
              </a>
            )}
          </div>
          <ul class="containerNavItems hidden lg:flex justify-center z-30">
            {items.map((item, index) => <NavItem item={item} index={index} />)}
          </ul>
          <div class="flex-none absolute right-0 w-44 flex items-center justify-end gap-2">
            <SearchButton />
            <Searchbar searchbar={searchbar} />
            <a
              class="btn btn-circle btn-sm btn-ghost -mt-[5px]"
              href="/login"
              aria-label="Log in"
            >
              <Icon
                id="User"
                size={20}
                strokeWidth={1}
                class={`group-hover/hover:text-[#101820]`}
              />
            </a>
            {platform === "shopify" && <CartButton />}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
