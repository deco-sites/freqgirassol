// import { platform } from "$store/apps/storefront.ts";
import { lazy } from "preact/compat";
import { usePlatform } from "$store/sdk/usePlatform.tsx";

const CartShopify = lazy(() => import("./shopify/Cart.tsx"));

export interface Props {
  platform: ReturnType<typeof usePlatform>;
}

function Cart({ platform }: Props) {
  if (platform === "shopify") {
    return <CartShopify />;
  }

  return null;
}

export default Cart;
