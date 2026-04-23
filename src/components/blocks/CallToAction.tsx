import { Button } from "@/components/ui/button";

interface CallToActionProps {
  text: string;
  buttonText: string;
  url: string;
}

const CallToAction = ({ text, buttonText, url }: CallToActionProps) => {
  const isExternal = /^https?:\/\//.test(url);

  return (
    <section className="flex flex-col items-center gap-4 rounded-lg bg-accent px-6 py-12 text-center">
      <p className="text-xl font-medium text-accent-foreground">{text}</p>
      <Button asChild size="lg">
        <a
          href={url}
          {...(isExternal
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
        >
          {buttonText}
        </a>
      </Button>
    </section>
  );
};

export default CallToAction;
