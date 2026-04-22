import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import SiteNav from "@/components/SiteNav";
import NotFound from "@/pages/NotFound";
import { getPage } from "@/lib/cms";

const PageTemplate = () => {
  const { slug } = useParams<{ slug: string }>();
  const page = slug ? getPage(slug) : undefined;

  if (!page) {
    return <NotFound />;
  }

  const { data, content } = page;

  return (
    <>
      <SiteNav />
      <main className="container mx-auto max-w-3xl px-4 py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">{data.title}</h1>
        </header>
        <div className="prose prose-neutral max-w-none dark:prose-invert">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </main>
    </>
  );
};

export default PageTemplate;
