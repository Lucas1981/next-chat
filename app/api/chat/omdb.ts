import axios from "axios";
import { logInfo, logError } from "@/lib/logger";

export const getPlot = async (movieTitle: string): Promise<string | null> => {
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
        plot: "short",
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

    logInfo("omdb.error", {
      requestId,
      title: trimmed,
      ms: Date.now() - started,
      message: e instanceof Error ? e.message : "unknown error",
    });
  }

  return null;
};
