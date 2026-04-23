interface ImageGalleryProps {
  images?: Array<string | { image: string }>;
}

const ImageGallery = ({ images = [] }: ImageGalleryProps) => {
  const srcs = images
    .map((item) => (typeof item === "string" ? item : item?.image))
    .filter(Boolean) as string[];

  if (srcs.length === 0) return null;

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
      {srcs.map((src, idx) => (
        <img
          key={`${src}-${idx}`}
          src={src}
          alt=""
          className="h-64 w-full rounded-md object-cover"
          loading="lazy"
        />
      ))}
    </section>
  );
};

export default ImageGallery;
