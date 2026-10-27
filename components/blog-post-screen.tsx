import { notFound } from "next/navigation";
import { getPostById } from "@/lib/posts";

type BlogPostScreenProps = {
  params: Promise<{ blogId: string }>;
};

type BlogPostType = {
  title: string;
  content: string;
};

// To try it out: http://localhost:3000/movie/tt0133093 - should show plot of the Matrix
export async function BlogPostScreen({ params }: BlogPostScreenProps) {
  const { blogId } = await params;

  console.log("blogId", blogId);
  const blogPost = await getPostById(blogId);

  if (!blogPost) notFound();

  return (
    <>
      <h1>{blogPost.title}</h1>
      <p>{blogPost.content}</p>
    </>
  );
}
