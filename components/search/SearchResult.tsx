import { SendEventOnView } from "$store/components/Analytics.tsx";
import { Layout as CardLayout } from "$store/components/product/ProductCard.tsx";
import Filters from "$store/components/search/Filters.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import SearchControls from "$store/islands/SearchControls.tsx";
import { useId } from "$store/sdk/useId.ts";
import { useOffer } from "$store/sdk/useOffer.ts";
import type { ProductListingPage } from "apps/commerce/types.ts";
import { mapProductToAnalyticsItem } from "apps/commerce/utils/productToAnalyticsItem.ts";
import ProductGallery, { Columns } from "../product/ProductGallery.tsx";
import { Section } from "deco/blocks/section.ts";

export interface Layout {
  /**
   * @description Use drawer for mobile like behavior on desktop. Aside for rendering the filters alongside the products
   */
  variant?: "aside" | "drawer";
  /**
   * @description Number of products per line on grid
   */
  columns?: Columns;
  itemsPerPage?: number;
}

export interface Props {
  /** @title Integration */
  page?: ProductListingPage | null;
  layout?: Layout;
  cardLayout?: CardLayout;
  notFoundPage?: Section;
  /** @description 0 for ?page=0 as your first page */
  startingPage?: 0 | 1;
}

function NotFound({ notFoundPage }: Props) {
  return (
    <div class="w-full flex justify-center items-center py-10">
      {notFoundPage &&
        <notFoundPage.Component {...notFoundPage.props} />}
    </div>
  );
}

function Result({
  page,
  layout,
  cardLayout,
  startingPage = 1,
}: Omit<Props, "page"> & { page: ProductListingPage }) {
  const { products, filters, breadcrumb, pageInfo, sortOptions } = page;
  const perPage = pageInfo.recordPerPage || products.length;
  const id = useId();

  let totalQuantity = 0;

  // Iterar sobre o array filters
  filters.forEach((filter) => {
    // Verificar se o filtro é do tipo FilterToggle
    if (filter["@type"] === "FilterToggle") {
      // Iterar sobre os valores dentro do array values
      filter.values.forEach((value) => {
        if (
          filter.label == "Availability" || filter.label == "Fora de estoque"
        ) {
          // Adicionar o valor de quantity ao totalQuantity
          totalQuantity += value.quantity;
        }
      });
    }
  });

  const value = Math.ceil(totalQuantity / (layout?.itemsPerPage || 4));

  const zeroIndexedOffsetPage = pageInfo.currentPage - startingPage;
  const offset = zeroIndexedOffsetPage * perPage;

  return (
    <>
      <div class="w-11/12 mx-auto sm:py-10 lg:max-w-[1300px] lg:px-0">
        <SearchControls
          sortOptions={sortOptions}
          filters={filters}
          breadcrumb={breadcrumb}
          displayFilter={layout?.variant === "drawer"}
        />

        <div class="flex flex-row gap-8">
          {layout?.variant === "aside" && filters.length > 0 && (
            <aside class="hidden lg:block w-min min-w-[304px]">
              <Filters filters={filters} />
            </aside>
          )}
          <div class="flex-grow" id={id}>
            <ProductGallery
              products={products}
              offset={offset}
              layout={{ card: cardLayout, columns: layout?.columns }}
            />
          </div>
        </div>

        <div class="flex justify-center py-10 mx-auto w-11/12 items-center">
          <div class="flex gap-5 items-center justify-center">
            <a
              aria-label="previous page link"
              rel="prev"
              href={pageInfo.previousPage ?? "#"}
              class="flex items-center justify-center p-3.5 rounded-full bg-white border border-black border-opacity-10"
            >
              <Icon
                id="ChevronLeft"
                size={20}
                strokeWidth={1}
                class="text-primary-content opacity-60"
              />
            </a>
            <span class="flex items-center text-primary-content justify-center px-4 gap-2">
              Página{" "}
              <strong class="text-primary">{pageInfo.currentPage + 1}</strong>
              {" "}
              de <strong class="text-primary">{value}</strong>
            </span>
            <a
              aria-label="next page link"
              rel="next"
              href={pageInfo.nextPage ?? "#"}
              class="flex items-center justify-center p-3.5 rounded-full bg-white border border-black border-opacity-10"
            >
              <Icon
                id="ChevronRight"
                size={20}
                strokeWidth={2}
                class="text-primary-content opacity-60"
              />
            </a>
          </div>
        </div>
      </div>
      <SendEventOnView
        id={id}
        event={{
          name: "view_item_list",
          params: {
            // TODO: get category name from search or cms setting
            item_list_name: breadcrumb.itemListElement?.at(-1)?.name,
            item_list_id: breadcrumb.itemListElement?.at(-1)?.item,
            items: page.products?.map((product, index) =>
              mapProductToAnalyticsItem({
                ...(useOffer(product.offers)),
                index: offset + index,
                product,
                breadcrumbList: page.breadcrumb,
              })
            ),
          },
        }}
      />
    </>
  );
}

function SearchResult({ page, notFoundPage, ...props }: Props) {
  if (!page || page.products.length == 0) {
    return <NotFound notFoundPage={notFoundPage} />;
  }

  return <Result {...props} page={page} />;
}

export default SearchResult;
