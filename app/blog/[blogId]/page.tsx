import { Suspense } from "react";
import { BlogPostScreen } from "@/components/blog-post-screen";

type PageProps = {
  params: Promise<{ blogId: string }>;
};

export default function BlogPage({ params }: PageProps) {
  return (
    <main>
      <Suspense fallback={<p>Load blog...</p>}>
        <BlogPostScreen params={params} />
      </Suspense>
    </main>
  );
}
