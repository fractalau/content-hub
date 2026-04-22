import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ContentItem, PostFrontmatter } from "@/lib/cms";

interface PostCardProps {
  post: ContentItem<PostFrontmatter>;
}

const PostCard = ({ post }: PostCardProps) => {
  const { slug, data, content } = post;
  const excerpt = content.trim().slice(0, 160);

  return (
    <Link to={`/posts/${slug}`} className="block group">
      <Card className="overflow-hidden transition-shadow hover:shadow-md">
        {data.image && (
          <img
            src={data.image}
            alt={data.title}
            className="h-48 w-full object-cover"
            loading="lazy"
          />
        )}
        <CardHeader>
          <CardTitle className="group-hover:underline">{data.title}</CardTitle>
          {data.date && (
            <time className="text-sm text-muted-foreground" dateTime={data.date}>
              {new Date(data.date).toLocaleDateString()}
            </time>
          )}
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground line-clamp-3">{excerpt}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default PostCard;
