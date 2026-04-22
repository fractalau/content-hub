// ContentService: load markdown files authored via Decap CMS using Vite's import.meta.glob.
// Markdown files are expected to use YAML frontmatter (format: frontmatter in config.yml).

export interface PageFrontmatter {
  title: string;
}

export interface PostFrontmatter {
  title: string;
  date: string;
  image?: string;
}

export interface ContentItem<T> {
  slug: string;
  path: string;
  data: T;
  body: string;
  raw: string;
}

// Eagerly import raw markdown contents at build time.
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

/**
 * Minimal YAML frontmatter parser — handles the simple `key: value` pairs
 * that Decap CMS produces (strings, dates, quoted strings). For complex YAML,
 * swap in `gray-matter` or `js-yaml`.
 */
function parseFrontmatter<T extends Record<string, unknown>>(
  raw: string,
): { data: T; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/.exec(raw);
  if (!match) return { data: {} as T, body: raw };

  const [, yaml, body] = match;
  const data: Record<string, unknown> = {};

  for (const line of yaml.split(/\r?\n/)) {
    const m = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line);
    if (!m) continue;
    let value: string = m[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    data[m[1]] = value;
  }

  return { data: data as T, body: body ?? "" };
}

function slugFromPath(path: string): string {
  return path.split("/").pop()!.replace(/\.md$/, "");
}

function buildCollection<T>(
  files: Record<string, string>,
): ContentItem<T>[] {
  return Object.entries(files).map(([path, raw]) => {
    const { data, body } = parseFrontmatter<Record<string, unknown>>(raw);
    return { slug: slugFromPath(path), path, data: data as T, body, raw };
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
