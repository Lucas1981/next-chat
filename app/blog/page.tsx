import { Suspense } from "react";
import { BlogOverviewScreen } from "@/components/blog-overview-screen";

export default function BlogPage() {
  return (
    <main>
      <h1>Movie details</h1>
      <Suspense fallback={<p>Load blog...</p>}>
        <BlogOverviewScreen />
      </Suspense>
    </main>
  );
}
