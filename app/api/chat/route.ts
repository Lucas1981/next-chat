import { handleChatRequest } from "./open-ai";

export async function POST(request: Request) {
  const requestJson = await request.json();
  const response = await handleChatRequest(requestJson);
  return Response.json(response);
}
