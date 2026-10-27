import { notFound } from "next/navigation";
import { db } from "@/lib/db";

type BlogPostScreenProps = {
  params: Promise<{ blogId: string }>;
};

type BlogPostType = {
  title: string;
  content: string;
};

async function getPostByBlogId(blogId: string): Promise<BlogPostType> {
  const blogPost: BlogPostType[] =
    (await db.$queryRaw`SELECT title, content FROM 'Post' WHERE id=${Number(blogId)}`) as unknown as BlogPostType[];
  return blogPost[0] ?? (null as unknown as BlogPostType);
}

// To try it out: http://localhost:3000/movie/tt0133093 - should show plot of the Matrix
export async function BlogPostScreen({ params }: BlogPostScreenProps) {
  const { blogId } = await params;

  console.log("blogId", blogId);
  const blogPost = await getPostByBlogId(blogId);

  if (!blogPost) notFound();

  return (
    <>
      <h1>{blogPost.title}</h1>
      <p>{blogPost.content}</p>
    </>
  );
}
