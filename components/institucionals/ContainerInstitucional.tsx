import { Section } from "deco/blocks/section.ts";
import TitleContent from "deco-sites/freqgirassol/components/institucionals/TitleContent.tsx";

export interface Props {
  title: string;
  children: Section;
}

export default function ContainerContent({ title, children }: Props) {
  return (
    <div
      class={`py-6 px-4 gap-4 mb-4 md:mb-0 md:py-8 md:px-10 rounded-2xl md:gap-8 flex flex-col border border-black border-opacity-15`}
    >
      <TitleContent title={title} />
      <children.Component {...children.props} />
    </div>
  );
}
