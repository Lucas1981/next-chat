import type OpenAI from "openai";
import { getPlotByTitle } from "@/lib/omdb";

export const tools: OpenAI.Chat.Completions.ChatCompletionTool[] = [
  {
    type: "function",
    function: {
      name: "get_movie_plot",
      description:
        "Look up a short plot for a movie by title. Use this when the user asks what a movie is about or for its plot.",
      parameters: {
        type: "object",
        properties: {
          movieTitle: {
            type: "string",
            description:
              'The movie title to look up, for example "The Matrix."',
          },
        },
        required: ["movieTitle"],
        additionalProperties: false,
      },
    },
  },
];

export const runTool = async (
  name: string,
  rawArguments: string,
): Promise<string> => {
  if (name !== "get_movie_plot") {
    return `Unknown tool: ${name}`;
  }

  let movieTitle = "";

  try {
    const parsed = JSON.parse(rawArguments) as { movieTitle?: unknown };
    if (typeof parsed.movieTitle === "string") {
      movieTitle = parsed.movieTitle;
    }
  } catch {
    return "The tool arguments were not valid JSON.";
  }

  const plot = await getPlotByTitle(movieTitle);
  return plot || `No plot was found for "${movieTitle}"`;
};
