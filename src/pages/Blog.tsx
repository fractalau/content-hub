import { Link } from "react-router-dom";
import SiteNav from "@/components/SiteNav";
import { getAllPosts } from "@/lib/cms";

const Blog = () => {
  const posts = getAllPosts();

  return (
    <>
      <SiteNav />
      <main className="container mx-auto max-w-3xl px-4 py-12">
        <header className="mb-10">
          <h1 className="text-4xl font-bold tracking-tight">Blog</h1>
          <p className="mt-2 text-muted-foreground">
            Latest posts from the content hub.
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="text-muted-foreground">No posts yet.</p>
        ) : (
          <ul className="divide-y">
            {posts.map((post) => (
              <li key={post.slug} className="py-5">
                <Link to={`/blog/${post.slug}`} className="group block">
                  <h2 className="text-xl font-semibold group-hover:underline">
                    {post.data.title}
                  </h2>
                  {post.data.date && (
                    <time
                      className="mt-1 block text-sm text-muted-foreground"
                      dateTime={post.data.date}
                    >
                      {new Date(post.data.date).toLocaleDateString(undefined, {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
};

export default Blog;
