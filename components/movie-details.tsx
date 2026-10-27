import { getMovieDetailsById } from "@/lib/omdb";
import { notFound } from "next/navigation";

const DEBUG = false;

type MovieDetailsProps = {
  params: Promise<{ imdbID: string }>;
};

// To try it out: http://localhost:3000/movie/tt0133093 - should show plot of the Matrix
export async function MovieDetails({ params }: MovieDetailsProps) {
  const { imdbID } = await params;
  const movie = await getMovieDetailsById(imdbID);

  // Slow down rendering process to see what's shown while we wait
  if (DEBUG) {
    await new Promise((resolve) => setTimeout(resolve, 4000));
  }

  if (!movie) notFound();

  return (
    <>
      <h2>{movie.Title}</h2>
      <p>{movie.Plot}</p>
    </>
  );
}
