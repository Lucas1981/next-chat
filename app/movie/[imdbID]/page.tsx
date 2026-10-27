import { MovieDetails } from "@/components/movie-details";
import styles from "./chat.module.scss";

type PageProps = {
  params: Promise<{ imdbID: string }>;
};

export default async function MoviePage({ params }: PageProps) {
  const { imdbID } = await params;
  return (
    <main>
      <h1>Movie details</h1>
      <MovieDetails imdbID={imdbID} />
    </main>
  );
}
