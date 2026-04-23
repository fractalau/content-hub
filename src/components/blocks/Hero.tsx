import { useRef } from "react";
import ReactMarkdown from "react-markdown";
import { motion, useScroll, useTransform } from "framer-motion";

interface HeroProps {
  text: string;
  bgImage?: string;
  bgColor?: string;
  textColor?: string;
}

const Hero = ({ text, bgImage, bgColor = "#ffffff", textColor }: HeroProps) => {
  const resolvedTextColor = textColor ?? (bgImage ? "#ffffff" : undefined);
  const sectionRef = useRef<HTMLElement>(null);

  // Track scroll progress relative to the section entering/leaving the viewport.
  const { scrollY } = useScroll();
  // For every 100px scrolled, move the bg image down 30px (parallax).
  const bgY = useTransform(scrollY, (value) => {
    const top = sectionRef.current?.offsetTop ?? 0;
    return (value - top) * 0.5;
  });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        backgroundColor: bgColor,
      }}
    >
      {bgImage && (
        <motion.div
          aria-hidden
          className="absolute inset-0 -top-[30%] -bottom-[30%] will-change-transform"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            y: bgY,
          }}
        />
      )}

      {bgImage && (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ backgroundColor: bgColor, opacity: 0.55 }}
        />
      )}

      <div className="relative z-10 container mx-auto py-12">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full">
            <div className="prose max-w-none text" style={{ color: resolvedTextColor, fontSize: "2em" }}>
              <ReactMarkdown>{text}</ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
