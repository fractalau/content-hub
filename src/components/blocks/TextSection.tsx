import ReactMarkdown from "react-markdown";

interface TextSectionProps {
  content: string;
}

const TextSection = ({ content }: TextSectionProps) => {
  return (
    <section className="prose prose-neutral max-w-none dark:prose-invert">
      <ReactMarkdown>{content}</ReactMarkdown>
    </section>
  );
};

export default TextSection;
