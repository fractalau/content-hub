import { useParams, Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import SiteNav from "@/components/SiteNav";
import { getPost } from "@/lib/cms";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPost(slug) : undefined;

  if (!post) {
    return (
      <>
        <SiteNav />
        <main className="container mx-auto max-w-3xl px-4 py-16">
          <h1 className="text-3xl font-bold">Post not found</h1>
          <Link to="/blog" className="mt-4 inline-block text-primary underline">
            Back to blog
          </Link>
        </main>
      </>
    );
  }

  const { data, content } = post;

  return (
    <>
      <SiteNav />
      <main className="container mx-auto max-w-3xl px-4 py-12">
        <Link to="/blog" className="text-sm text-muted-foreground hover:underline">
          ← Back to blog
        </Link>
        <article className="mt-6">
          <header className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight">{data.title}</h1>
            {data.date && (
              <time
                className="mt-2 block text-sm text-muted-foreground"
                dateTime={data.date}
              >
                {new Date(data.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            )}
          </header>
          {data.image && (
            <img
              src={data.image}
              alt={data.title}
              className="mb-8 w-full rounded-lg object-cover"
            />
          )}
          <div className="prose prose-neutral max-w-none dark:prose-invert">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        </article>
      </main>
    </>
  );
};

export default BlogPost;
