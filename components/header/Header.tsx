import type { Props as SearchbarProps } from "$store/components/search/Searchbar.tsx";
import Drawers from "$store/islands/Header/Drawers.tsx";
import { usePlatform } from "$store/sdk/usePlatform.tsx";
import type { ImageWidget } from "apps/admin/widgets.ts";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
import Alert from "$store/components/header/Alert.tsx";
import Navbar from "$store/components/header/Navbar.tsx";
import type { Props as ICard } from "$store/components/ui/Card.tsx";
import { headerHeight } from "./constants.ts";
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
  bold?: true | false;
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
  alerts?: {
    alert: string;
    /** @format color */
    background?: string;
  }[];
  interval?: number;
  /** @title Search Bar */
  searchbar?: Omit<SearchbarProps, "platform">;

  /**
   * @title Navigation items
   * @description Navigation items used both on mobile and desktop menus
   */
  navItems?: INavItem[] | null;

  /** @title Logo Preto */
  logoPreto: { src: ImageWidget; alt: string };
}

function Header({ alerts, interval, searchbar, navItems, logoPreto }: Props) {
  const platform = usePlatform();
  const items = navItems ?? [];

  return (
    <header style={{ height: headerHeight }}>
      <Drawers menu={{ items }} searchbar={searchbar} platform={platform}>
        <div className="fixed w-full z-50">
          <Alert alerts={alerts} interval={interval} />
          <Navbar
            items={items}
            searchbar={searchbar && { ...searchbar, platform }}
            platform={platform}
            logoPreto={logoPreto}
          />
        </div>
      </Drawers>
    </header>
  );
}

export default Header;
