import axios from "axios";

export const getPlot = async (movieTitle: string): Promise<string | null> => {
  const trimmed = movieTitle?.trim();

  if (trimmed === "") {
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
        t: trimmed,
        plot: "short",
      },
    });

    if (data.Response !== "True" || typeof data.Plot !== "string") {
      return null;
    }

    return data.Plot;
  } catch (e) {
    console.log("Error retrieving plot from movie");
    console.log(e);
  }

  return null;
};
