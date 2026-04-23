import ReactMarkdown from "react-markdown";

interface WysiwygProps {
  content: string;
  bgColor?: string;
  textColor?: string;
}

const Wysiwyg = ({ content, bgColor = "#ffffff", textColor = "#000000" }: WysiwygProps) => {
  return (
    <section style={{ backgroundColor: bgColor, color: textColor }} className="py-12">
      <div className="container mx-auto">
        <div className="prose prose-lg max-w-none" style={{ color: textColor }}>
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </section>
  );
};

export default Wysiwyg;
