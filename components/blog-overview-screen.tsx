import { notFound } from "next/navigation";
import { getPosts } from "@/lib/posts";

type BlogPostType = {
  id: string;
  title: string;
};

export async function BlogOverviewScreen() {
  const blogPosts: BlogPostType[] =
    (await getPosts()) as unknown as BlogPostType[];

  if (!blogPosts) notFound();

  return (
    <ul>
      {blogPosts.map((blogPost: BlogPostType) => (
        <li key={blogPost.id}>
          <a href={`/blog/${blogPost.id}`}>{blogPost.title}</a>
        </li>
      ))}
    </ul>
  );
}
