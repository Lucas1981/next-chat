import axios from "axios";
import { logInfo, logError } from "@/lib/logger";
import { cacheLife } from "next/cache";

export type OMDBResponse = {
  imdbID: string;
  Title: string;
  Plot: string;
};

export const getMovieDetailsById = async (
  imdbID: string,
  plotType = "full",
): Promise<OMDBResponse | null> => {
  "use cache";
  cacheLife("hours");

  await new Promise((resolve) => setTimeout(resolve, 2000));

  if (!imdbID) {
    return null;
  }

  const apikey = process.env["OMDB_API_KEY"];

  if (!apikey) {
    return null;
  }

  try {
    const { data } = await axios.get("http://www.omdbapi.com/", {
      params: {
        apikey,
        i: imdbID,
        plot: plotType,
      },
    });

    if (data.Response !== "True" || typeof data.Plot !== "string") {
      return null;
    }

    // console.log(
    //   `Full data retrieved for movie ${data?.Title}: ${JSON.stringify(data)}`,
    // );

    return data;
  } catch (e) {
    console.log("Error retrieving plot from movie");
    console.log(e);
  }

  return null;
};

export const getPlotByTitle = async (
  movieTitle: string,
  plotType = "short",
): Promise<string | null> => {
  const trimmed = movieTitle?.trim();

  if (trimmed === "") {
    return null;
  }

  const apikey = process.env["OMDB_API_KEY"];

  if (!apikey) {
    return null;
  }

  const started = Date.now();
  const requestId = crypto.randomUUID();
  try {
    const { data } = await axios.get("http://www.omdbapi.com/", {
      params: {
        apikey,
        t: trimmed,
        plot: plotType,
      },
    });

    if (data.Response !== "True" || typeof data.Plot !== "string") {
      return null;
    }

    logInfo("omdb.response", {
      requestId,
      title: trimmed,
      found: data.Response === "True",
      ms: Date.now() - started,
    });

    return data.Plot;
  } catch (e) {
    console.log("Error retrieving plot from movie");
    console.log(e);

    logError("omdb.error", {
      requestId,
      title: trimmed,
      ms: Date.now() - started,
      message: e instanceof Error ? e.message : "unknown error",
    });
  }

  return null;
};
