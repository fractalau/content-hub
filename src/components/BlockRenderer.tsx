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

interface FallbackProps {
  title: string;
  message: string;
  block?: unknown;
}

const BlockFallback = ({ title, message, block }: FallbackProps) => (
  <div
    role="alert"
    className="my-4 rounded-md border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive"
  >
    <p className="font-semibold">{title}</p>
    <p className="mt-1 text-destructive/80">{message}</p>
    {block !== undefined && (
      <pre className="mt-2 overflow-auto rounded bg-background/60 p-2 text-xs text-foreground/70">
        {JSON.stringify(block, null, 2)}
      </pre>
    )}
  </div>
);

// Required props per block type. Used for runtime validation.
const REQUIRED_FIELDS: Record<string, string[]> = {
  hero: ["text"],
  wysiwyg: ["content"],
  textsection: ["content"],
  imagegallery: ["images"],
  calltoaction: ["text", "buttonText", "url"],
};

const isMissing = (value: unknown) =>
  value === undefined ||
  value === null ||
  (typeof value === "string" && value.trim() === "") ||
  (Array.isArray(value) && value.length === 0);

const validateBlock = (block: Block): string[] => {
  const required = REQUIRED_FIELDS[block.type?.toLowerCase?.()] ?? [];
  return required.filter((field) => isMissing(block[field]));
};

const BlockRenderer = ({ blocks }: BlockRendererProps) => {
  if (!blocks || blocks.length === 0) return null;

  return (
    <div className="main-content">
      {blocks.map((block, index) => {
        // Validate block shape before attempting to render.
        if (!block || typeof block !== "object") {
          console.error("[BlockRenderer] Invalid block at index", index, block);
          return (
            <BlockFallback
              key={`invalid-${index}`}
              title="Invalid block"
              message={`Block at position ${index} is not a valid object.`}
              block={block}
            />
          );
        }

        if (!block.type || typeof block.type !== "string") {
          console.error("[BlockRenderer] Block is missing required `type` field at index", index, block);
          return (
            <BlockFallback
              key={`no-type-${index}`}
              title="Missing block type"
              message={`Block at position ${index} has no \`type\` field. Check your CMS content.`}
              block={block}
            />
          );
        }

        const missingFields = validateBlock(block);
        if (missingFields.length > 0) {
          console.error(
            `[BlockRenderer] Block "${block.type}" is missing required field(s):`,
            missingFields,
            block,
          );
          return (
            <BlockFallback
              key={`missing-${block.type}-${index}`}
              title={`"${block.type}" block is misconfigured`}
              message={`Missing required field(s): ${missingFields.join(", ")}.`}
              block={block}
            />
          );
        }

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
                textColor={block.textColor as string | undefined}
              />
            );
          case "wysiwyg":
          case "Wysiwyg":
            return (
              <Wysiwyg
                key={key}
                content={(block.content as string) ?? ""}
                bgColor={block.bgColor as string | undefined}
                textColor={block.textColor as string | undefined}
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
            return (
              <BlockFallback
                key={key}
                title="Unknown block type"
                message={`No renderer is registered for block type "${block.type}".`}
                block={block}
              />
            );
        }
      })}
    </div>
  );
};

export default BlockRenderer;
