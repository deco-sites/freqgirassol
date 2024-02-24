import Button from "$store/components/ui/Button.tsx";
import Icon from "$store/components/ui/Icon.tsx";
import { useUI } from "$store/sdk/useUI.ts";

export default function MenuButton() {
  const { displayMenu, displayTop } = useUI();

  let colorIcon;

  if (displayTop.value) {
    colorIcon = "text-white-lily";
  } else {
    colorIcon = "text-deep-beauty";
  }

  return (
    <Button
      class="btn btn-circle btn-sm btn-ghost w-[68px] justify-start"
      aria-label="open menu"
      title="Menu"
      onClick={() => {
        displayMenu.value = true;
      }}
    >
      <Icon id="Bars3" size={24} strokeWidth={0.01} class={colorIcon} />
    </Button>
  );
}
