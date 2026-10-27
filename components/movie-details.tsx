import { getMovieDetailsById } from "@/app/api/chat/omdb";
import { notFound } from "next/navigation";

export async function MovieDetails({ imdbID }: { imdbID: string }) {
  const movie = await getMovieDetailsById(imdbID);
  await new Promise((resolve) => setTimeout(resolve, 4000));
  if (!movie) notFound();

  return (
    <>
      <h2>{movie.Title}</h2>
      <p>{movie.Plot}</p>
    </>
  );
}
