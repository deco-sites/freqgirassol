interface Props {
  description?: string;
}

export default function ProductDescription({ description }: Props) {
  return (
    <>
      <div class={`flex flex-col gap-4 text-primary-content`}>
        <div class="collapse collapse-arrow border border-black border-opacity-15 rounded-xl">
          <input type="checkbox" checked />
          <div class="collapse-title text-base text-primary-content font-medium">
            Descrição do produto
          </div>
          <div
            class="collapse-content text-base-content"
            dangerouslySetInnerHTML={{ __html: description || "" }}
          />
        </div>
      </div>
    </>
  );
}
