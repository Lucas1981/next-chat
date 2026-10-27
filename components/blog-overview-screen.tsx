import { notFound } from "next/navigation";
import { db } from "@/lib/db";

type BlogPostType = {
  id: string;
  title: string;
};

async function getBlogPosts(): Promise<BlogPostType[]> {
  const result = await db.$queryRaw`SELECT id, title FROM 'Post'`;

  if (!result) {
    return [];
  }

  return result as unknown as BlogPostType[];
}

export async function BlogOverviewScreen() {
  const blogPosts = await getBlogPosts();

  if (!blogPosts) notFound();

  return (
    <ul>
      {blogPosts.map((blogPost) => (
        <li key={blogPost.id}>
          <a href={`/blog/${blogPost.id}`}>{blogPost.title}</a>
        </li>
      ))}
    </ul>
  );
}
