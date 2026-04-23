import ReactMarkdown from "react-markdown";

interface HeroProps {
  text: string;
  bgImage?: string;
  bgColor?: string;
}

const Hero = ({ text, bgImage, bgColor = "#ffffff" }: HeroProps) => {
  return (
    <section
      className="relative overflow-hidden rounded-2xl"
      style={{
        backgroundColor: bgColor,
        backgroundImage: bgImage ? `url(${bgImage})` : undefined,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {bgImage && (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ backgroundColor: bgColor, opacity: 0.55 }}
        />
      )}

      <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center px-6 py-24 text-center sm:py-32 md:py-40">
        <div
          className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:underline"
          style={{ color: bgImage ? "#ffffff" : undefined }}
        >
          <ReactMarkdown>{text}</ReactMarkdown>
        </div>
      </div>
    </section>
  );
};

export default Hero;
