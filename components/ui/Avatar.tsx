/**
 * This component renders the filter and selectors for skus.
 * TODO: Figure out a better name for this component.
 */

const colors: Record<string, string> = {
  "azul-clara": "bg-[#87CEFA] ring-[#87CEFA]",
  "azul-marinho": "bg-[#000080] ring-[#000080]",
  "branca": "bg-[#FFFFFF] ring-[#FFFFFF]",
  "cinza": "bg-[#808080] ring-[#808080]",
  "cinza-escura": "bg-[#A9A9A9] ring-[#A9A9A9]",
  "laranja": "bg-[#FFA500] ring-[#FFA500]",
  "marrom": "bg-[#A52A2A] ring-[#A52A2A]",
  "preta": "bg-[#161616] ring-[#161616]",
  "verde-clara": "bg-[#90EE90] ring-[#90EE90]",
  "vermelha": "bg-[#FF0000] ring-[#FF0000]",

  // Color variants - only applied when no color as content is passed
  "active": "border-primary-content",
  "disabled": "line-through text-neutral-content",
};

interface Props {
  variant?: "active" | "disabled" | "default";
  content: string;
}

const variants = {
  active: "bg-primary text-white",
  disabled: "line-through text-neutral-content",
  default: "bg-white text-primary-content border border-primary-content",
};

function Avatar({ content, variant = "default" }: Props) {
  return (
    <>
      {content != "Default Title" &&
        (
          <div class="text-sm font-light h-6">
            <div
              class={`${colors[content] ?? colors[variant]}`}
            >
              <span
                class={`${
                  variants[variant]
                } hover:bg-primary hover:text-white py-2.5 px-4 rounded-lg font-medium`}
              >
                {colors[content] ? "" : content}
              </span>
            </div>
          </div>
        )}
    </>
  );
}

export default Avatar;
