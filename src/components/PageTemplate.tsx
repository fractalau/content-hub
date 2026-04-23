import { useParams } from "react-router-dom";
import SiteNav from "@/components/SiteNav";
import NotFound from "@/pages/NotFound";
import BlockRenderer, { type Block } from "@/components/BlockRenderer";
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
          <h1 className="text-2xl font-bold text-destructive">Error loading page</h1>
          <pre className="mt-4 whitespace-pre-wrap rounded-md bg-muted p-4 text-sm">{loadError.message}</pre>
        </main>
      </>
    );
  }

  if (!page) {
    return <NotFound />;
  }

  const { data } = page;
  const blocks = (data as { blocks?: Block[] }).blocks;

  return (
    <>
      <SiteNav />
      <main className="w-full m-0 p-0">
        <section className="mb-8">
          <div className="container page-title">
            <div className="row">
              <div className="col-12">
                <h1 className="text-4xl font-bold tracking-tight">{data.title}</h1>
              </div>
            </div>
          </div>
        </section>
        <BlockRenderer blocks={blocks} />
      </main>
    </>
  );
};

export default PageTemplate;
