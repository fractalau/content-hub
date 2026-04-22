// CMS loader: parses Decap CMS markdown from src/content using gray-matter.
import matter from "gray-matter";

export interface PageFrontmatter {
  title: string;
  [key: string]: unknown;
}

export interface PostFrontmatter {
  title: string;
  date: string;
  image?: string;
  [key: string]: unknown;
}

export interface ContentItem<T> {
  slug: string;
  path: string;
  data: T;
  content: string;
}

const pageFiles = import.meta.glob("/src/content/pages/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

const postFiles = import.meta.glob("/src/content/posts/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
}) as Record<string, string>;

function slugFromPath(path: string): string {
  return path.split("/").pop()!.replace(/\.md$/, "");
}

function buildCollection<T>(files: Record<string, string>): ContentItem<T>[] {
  return Object.entries(files).map(([path, raw]) => {
    const { data, content } = matter(raw);
    return {
      slug: slugFromPath(path),
      path,
      data: data as T,
      content,
    };
  });
}

export function getAllPages(): ContentItem<PageFrontmatter>[] {
  return buildCollection<PageFrontmatter>(pageFiles);
}

export function getPage(slug: string): ContentItem<PageFrontmatter> | undefined {
  return getAllPages().find((p) => p.slug === slug);
}

export function getAllPosts(): ContentItem<PostFrontmatter>[] {
  return buildCollection<PostFrontmatter>(postFiles).sort((a, b) => {
    const da = new Date(a.data.date ?? 0).getTime();
    const db = new Date(b.data.date ?? 0).getTime();
    return db - da;
  });
}

export function getPost(slug: string): ContentItem<PostFrontmatter> | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}
