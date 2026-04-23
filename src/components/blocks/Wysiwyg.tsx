import ReactMarkdown from "react-markdown";

interface WysiwygProps {
  content: string;
  bgColor?: string;
  isFullWidth?: boolean;
}

const Wysiwyg = ({ content, bgColor = "#ffffff", isFullWidth = false }: WysiwygProps) => {
  const markdown = (
    <div className="prose prose-lg max-w-none">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );

  return (
    <section style={{ backgroundColor: bgColor }} className="py-12">
      {isFullWidth ? markdown : <div className="container mx-auto max-w-4xl px-6">{markdown}</div>}
    </section>
  );
};

export default Wysiwyg;
