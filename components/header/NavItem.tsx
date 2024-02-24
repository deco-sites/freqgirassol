import type { Props as ICard } from "$store/components/ui/Card.tsx";
import Card from "$store/components/ui/Card.tsx";

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

function NavItem({ item, index }: { item: INavItem; index: number }) {
  const { href, label, children, firstCard, secondCard, destaque, bold } = item;
  return (
    <li
      class={`group flex items-center NavItemFather${index} p-4 z-30`}
    >
      <style
        dangerouslySetInnerHTML={{
          __html: `
          .NavItemFather${index}:hover .NavItemChildren {
            opacity: ${item.opacityMenu}
          }
        `,
        }}
      />
      <a
        href={href}
        class="border-b-2 border-b-transparent transition-all duration-300 ease-linear group-hover:border-b-primary"
        aria-label={label}
      >
        <span
          class={`text-base tracking-widest leading-none ${
            destaque ? "text-primary-content" : "text-[#636366]"
          } ${bold ? "font-bold" : ""}`}
        >
          {label}
        </span>
      </a>

      {children && children.length > 0 &&
        (
          <div
            class={`NavItemChildren border-t border-[#00000017] shadow-md fixed opacity-0 group-hover:pointer-events-auto min-h-[366px] transition-all duration-300 ease-linear pointer-events-none py-8.5 bg-white z-50 w-screen`}
            style={{ top: "0px", left: "0px", marginTop: "88px" }}
          >
            <div class="container flex justify-evenly items-start mx-auto py-8">
              <ul class="flex gap-12 flex-row items-start justify-center">
                {children.map((node) => (
                  <li class="flex flex-col">
                    {node.label &&
                      (
                        <a
                          class={`text-xl text-black pb-2  ${
                            node.destaque ? "text-primary-content" : ""
                          } ${node.fontBold ? "font-bold" : ""}`}
                          href={node.href}
                          aria-label={node.label}
                        >
                          {node.label}
                        </a>
                      )}
                    {node.children && node.children?.length > 0 &&
                      (
                        <>
                          {node.children.map((item) => {
                            return (
                              <a
                                class={`text-base text-black py-1 ${
                                  item.destaque ? "text-primary" : ""
                                }`}
                                href={item.href}
                                aria-label={item.label}
                              >
                                {item.label}
                              </a>
                            );
                          })}
                        </>
                      )}
                  </li>
                ))}
              </ul>
              <div class="flex gap-5 max-w-[850px]">
                {firstCard && (
                  <div class="max-w-[320px] 2xl:max-w-md">
                    <Card {...firstCard} />
                  </div>
                )}
                {secondCard && (
                  <div class="hidden xl:flex max-w-[320px] 2xl:max-w-md">
                    <Card {...secondCard} />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
    </li>
  );
}

export default NavItem;
