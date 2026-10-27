import { Suspense } from "react";
import { MovieDetails } from "@/components/movie-details";

type PageProps = {
  params: Promise<{ imdbID: string }>;
};

export default function MoviePage({ params }: PageProps) {
  return (
    <main>
      <h1>Movie details</h1>
      <Suspense fallback={<p>Load movie...</p>}>
        <MovieDetails params={params} />
      </Suspense>
    </main>
  );
}
