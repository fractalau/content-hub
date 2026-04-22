import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import SiteNav from "@/components/SiteNav";
import NotFound from "@/pages/NotFound";
import { getPage } from "@/lib/cms";

// Raw glob list for debugging — confirms which page files Vite actually sees.
const pageFilePaths = Object.keys(
  import.meta.glob("/src/content/pages/*.md", {
    query: "?raw",
    import: "default",
    eager: true,
  }),
);

const PageTemplate = () => {
  const { slug } = useParams<{ slug: string }>();

  const expectedPath = `/src/content/pages/${slug}.md`;
  const fileExists = pageFilePaths.includes(expectedPath);

  console.log("[PageTemplate] slug:", slug);
  console.log("[PageTemplate] available page files:", pageFilePaths);
  console.log("[PageTemplate] expected path:", expectedPath, "exists:", fileExists);

  let page: ReturnType<typeof getPage>;
  let loadError: Error | null = null;
  try {
    page = slug ? getPage(slug) : undefined;
    console.log("[PageTemplate] getPage result:", page);
  } catch (err) {
    loadError = err instanceof Error ? err : new Error(String(err));
    console.error("[PageTemplate] getPage threw:", loadError);
  }

  if (loadError) {
    return (
      <>
        <SiteNav />
        <main className="container mx-auto max-w-3xl px-4 py-12">
          <h1 className="text-2xl font-bold text-destructive">
            Error loading page
          </h1>
          <pre className="mt-4 whitespace-pre-wrap rounded-md bg-muted p-4 text-sm">
            {loadError.message}
          </pre>
        </main>
      </>
    );
  }

  if (!page) {
    return <NotFound />;
  }

  const { data, content } = page;

  let rendered: JSX.Element;
  try {
    rendered = <ReactMarkdown>{content}</ReactMarkdown>;
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error("[PageTemplate] Markdown render error:", err);
    rendered = (
      <div className="rounded-md bg-muted p-4 text-sm text-destructive">
        Error rendering content: {message}
      </div>
    );
  }

  return (
    <>
      <SiteNav />
      <main className="container mx-auto max-w-3xl px-4 py-12">
        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight">{data.title}</h1>
        </header>
        <div className="prose prose-neutral max-w-none dark:prose-invert">
          {rendered}
        </div>
      </main>
    </>
  );
};

export default PageTemplate;
