import OpenAI from "openai";
import type { RequestType } from "./types";
import { tools, runTool } from "./tools";

const openai = new OpenAI();

const allowedRoles = ["user", "assistant"];

const GPT_MODEL = "gpt-4o-mini";
const MAX_TRIES = 5;

const SYSTEM_PROMPT =
  "You are a helpful assistant. Your answers are short, simple and concise. If you don't know something, say so.";

export const handleChatRequest = async ({ sentMessages }: RequestType) => {
  const filteredMessages = sentMessages.filter(({ role }: { role: string }) =>
    allowedRoles.includes(role),
  );

  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: "system", content: SYSTEM_PROMPT },
    ...filteredMessages,
  ];

  let tries = 0;
  let completion = await openai.chat.completions.create({
    model: GPT_MODEL,
    messages,
    tools,
  });

  // We might have to handle more than one consecutive set of tool calls
  while (completion.choices[0]?.message?.tool_calls) {
    const assistantMessage = completion.choices[0]?.message;

    if (!assistantMessage) {
      return { response: null };
    }

    const toolCalls = assistantMessage.tool_calls || [];

    if (toolCalls.length === 0) {
      return { response: assistantMessage.content };
    }

    messages.push(assistantMessage);

    // We might have several tool calls from the same response. Make sure to handle all of them.
    for (const toolCall of toolCalls) {
      const content =
        toolCall.type === "function"
          ? await runTool(toolCall.function.name, toolCall.function.arguments)
          : "Unsupported tool call";

      messages.push({
        role: "tool",
        tool_call_id: toolCall.id,
        content,
      });
    }

    tries++;
    if (tries > MAX_TRIES) {
      break;
    }

    completion = await openai.chat.completions.create({
      model: GPT_MODEL,
      messages,
      tools,
    });
  }

  return { response: completion.choices[0]?.message.content };
};
