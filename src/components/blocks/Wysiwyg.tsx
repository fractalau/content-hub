import ReactMarkdown from "react-markdown";

interface WysiwygProps {
  content: string;
  bgColor?: string;
  textColor?: string;
}

const Wysiwyg = ({ content, bgColor = "#ffffff", textColor = "#000000" }: WysiwygProps) => {
  return (
    <section style={{ backgroundColor: bgColor, color: textColor }} className="py-12">
      <div className="container mx-auto py-12">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full">
            <div className="text prose max-w-none" style={{ color: textColor }}>
              <ReactMarkdown>{content}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Wysiwyg;
