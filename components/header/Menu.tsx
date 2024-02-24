import Icon from "$store/components/ui/Icon.tsx";
import type { SiteNavigationElement } from "apps/commerce/types.ts";
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
  items: INavItem[];
}

function MenuItem({ item }: { item: INavItem }) {
  return (
    <>
      {item.children?.length
        ? (
          <div class="collapse collapse-plus px-4">
            <input type="checkbox" />
            <div class="collapse-title">{item.label}</div>
            <div class="collapse-content">
              <ul>
                <li>
                  <a class="underline text-sm" href={item.href}>Ver todos</a>
                </li>
                {item.children?.map((node) => (
                  <li>
                    <MenuItem item={node} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
        : (
          <>
            <div class="p-4">
              <a class="p-4 text-base" href={item.href}>{item.label}</a>
            </div>
          </>
        )}
    </>
  );
}

function Menu({ items }: Props) {
  return (
    <div class="flex flex-col h-full">
      <ul class="flex-grow flex flex-col divide-y divide-base-300">
        {items.map((item) => (
          <li>
            <MenuItem item={item} />
          </li>
        ))}
      </ul>

      <ul class="flex flex-col py-2 bg-base-200">
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="/wishlist"
          >
            <Icon id="Heart" size={24} strokeWidth={2} />
            <span class="text-sm">Lista de desejos</span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="MapPin" size={24} strokeWidth={2} />
            <span class="text-sm">Nossas lojas</span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="Phone" size={24} strokeWidth={2} />
            <span class="text-sm">Fale conosco</span>
          </a>
        </li>
        <li>
          <a
            class="flex items-center gap-4 px-4 py-2"
            href="https://www.deco.cx"
          >
            <Icon id="User" size={24} strokeWidth={2} />
            <span class="text-sm">Minha conta</span>
          </a>
        </li>
      </ul>
    </div>
  );
}

export default Menu;
