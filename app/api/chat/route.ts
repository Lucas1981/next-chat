import OpenAI from "openai";

const openai = new OpenAI();

const allowedRoles = ["user", "assistant"];

const SYSTEM_PROMPT =
  "You are a helpful assistant. Your answers are short, simple and concise. If you don't know something, say so.";

export async function POST(request: Request) {
  const { sentMessages } = await request.json();

  const filteredMessages = sentMessages.filter(({ role }: { role: string }) =>
    allowedRoles.includes(role),
  );

  const messages = [
    { role: "system", content: SYSTEM_PROMPT },
    ...filteredMessages,
  ];

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages,
  });

  return Response.json({ response: response.choices[0].message.content });
}
