import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Sort from "$store/components/search/Sort.tsx";
import Drawer from "$store/components/ui/Drawer.tsx";
import Breadcrumb from "$store/components/ui/Breadcrumb.tsx";
import { useSignal } from "@preact/signals";
import type { ProductListingPage } from "apps/commerce/types.ts";

export type Props =
  & Pick<ProductListingPage, "filters" | "breadcrumb" | "sortOptions">
  & {
    displayFilter?: boolean;
  };

function SearchControls(
  { filters, breadcrumb, displayFilter, sortOptions }: Props,
) {
  const open = useSignal(false);

  return (
    <Drawer
      loading="lazy"
      open={open.value}
      onClose={() => open.value = false}
      aside={
        <>
          <div class="bg-base-100 w-4/5 flex flex-col h-full divide-y overflow-y-hidden">
            <div class="flex justify-between items-center">
              <h3 class="px-4 py-3">
                <span class="font-bold text-base-content text-base">
                  Filtros
                </span>
              </h3>
              <Button class="btn btn-ghost" onClick={() => open.value = false}>
                <Icon id="XMark" size={15} strokeWidth={2} />
              </Button>
            </div>
            <div class="flex-grow overflow-auto">
              <Filters filters={filters} />
            </div>
          </div>
        </>
      }
    >
      <div class="flex flex-col justify-between mb-4 sm:mb-0 sm:p-0 sm:gap-4 sm:flex-row sm:h-[53px]">
        <div class="flex flex-row items-center sm:p-0 mb-2">
          <Breadcrumb itemListElement={breadcrumb?.itemListElement} />
        </div>

        <div class="flex flex-row items-center justify-between border-b border-base-200 sm:border-none">
          <Button
            class={`w-[164px] h-9 min-h-9 leading-none text-primary-content bg-white rounded-lg border border-black border-opacity-10 text-sm flex justify-between items-center px-4 py-2.5 ${
              displayFilter ? "btn-ghost" : "btn-ghost lg:hidden"
            }`}
            onClick={() => {
              open.value = true;
            }}
          >
            Filtrar
            <Icon id="FilterList" width={16} height={16} />
          </Button>
          {sortOptions.length > 0 && <Sort sortOptions={sortOptions} />}
        </div>
      </div>
    </Drawer>
  );
}

export default SearchControls;
