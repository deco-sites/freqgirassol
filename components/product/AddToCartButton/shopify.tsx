import { useCart } from "apps/shopify/hooks/useCart.ts";
import Button, { Props as BtnProps } from "./common.tsx";

export type Props = Omit<BtnProps, "onAddItem"> & {
  productID: string;
  className?: string;
};

function AddToCartButton({ productID, eventParams, className }: Props) {
  const { addItems } = useCart();
  const onAddItem = () =>
    addItems({
      lines: {
        merchandiseId: productID,
      },
    });

  return (
    <Button
      onAddItem={onAddItem}
      eventParams={eventParams}
      className={className}
    />
  );
}

export default AddToCartButton;
