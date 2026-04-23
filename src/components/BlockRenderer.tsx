import Hero from "@/components/blocks/Hero";
import TextSection from "@/components/blocks/TextSection";
import ImageGallery from "@/components/blocks/ImageGallery";
import CallToAction from "@/components/blocks/CallToAction";
import Wysiwyg from "@/components/blocks/Wysiwyg";

// Decap CMS variable-type list items include a `type` field matching the
// `name` of the block in config.yml.
export interface Block {
  type: string;
  [key: string]: unknown;
}

interface BlockRendererProps {
  blocks?: Block[];
}

const BlockRenderer = ({ blocks }: BlockRendererProps) => {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="main-content">
      {blocks.map((block, index) => {
        const key = `${block.type}-${index}`;
        switch (block.type) {
          case "hero":
          case "Hero":
            return (
              <Hero
                key={key}
                text={(block.text as string) ?? ""}
                bgImage={block.bgImage as string | undefined}
                bgColor={block.bgColor as string | undefined}
              />
            );
          case "wysiwyg":
          case "Wysiwyg":
            return (
              <Wysiwyg
                key={key}
                content={(block.content as string) ?? ""}
                bgColor={block.bgColor as string | undefined}
                isFullWidth={block.isFullWidth as boolean | undefined}
              />
            );
          case "textSection":
          case "TextSection":
            return <TextSection key={key} content={(block.content as string) ?? ""} />;
          case "imageGallery":
          case "ImageGallery":
            return <ImageGallery key={key} images={block.images as Array<string | { image: string }>} />;
          case "callToAction":
          case "CallToAction":
            return (
              <CallToAction
                key={key}
                text={block.text as string}
                buttonText={block.buttonText as string}
                url={block.url as string}
              />
            );
          default:
            console.warn("[BlockRenderer] Unknown block type:", block.type, block);
            return null;
        }
      })}
    </div>
  );
};

export default BlockRenderer;
