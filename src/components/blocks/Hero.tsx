interface HeroProps {
  title: string;
  subtitle?: string;
  image?: string;
}

const Hero = ({ title, subtitle, image }: HeroProps) => {
  return (
    <section className="relative overflow-hidden rounded-lg bg-muted py-16 px-6 text-center">
      {image && (
        <img
          src={image}
          alt={title}
          className="absolute inset-0 h-full w-full object-cover opacity-30"
        />
      )}
      <div className="relative z-10">
        <h2 className="text-4xl font-bold tracking-tight">{title}</h2>
        {subtitle && (
          <p className="mt-4 text-lg text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </section>
  );
};

export default Hero;
