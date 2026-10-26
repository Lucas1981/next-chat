import { useEffect, useRef, useState, useCallback } from "react";
import { api } from "@/lib/api";

type ChatTurn = {
  role: "user" | "assistant";
  content: string;
};

export function useChat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatTurn[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  const handleSend = useCallback(
    async (e: React.SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      const trimmed = message.trim();

      if (isDisabled || trimmed === "") {
        return;
      }

      setIsDisabled(true);
      const newMessages: ChatTurn[] = [
        ...messages,
        {
          role: "user",
          content: trimmed,
        },
      ];

      setMessage("");
      setMessages(newMessages);

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const { data } = await api.post<{ response: string | null }>(
          "/api/chat",
          { sentMessages: newMessages },
          { signal: controller.signal },
        );

        if (controller.signal.aborted) {
          return;
        }

        if (data.response === null) {
          throw new Error("Illegal return value");
        }

        setMessages((current) => [
          ...current,
          {
            role: "assistant",
            content: data.response as unknown as string,
          },
        ]);
      } catch {
        if (controller.signal.aborted) {
          return;
        }

        console.log("Something went wrong");
      }

      if (controller.signal.aborted) {
        return;
      }

      setIsDisabled(false);
    },
    [message, messages, setMessages, setIsDisabled],
  );

  return {
    message,
    setMessage,
    messages,
    isDisabled,
    handleSend,
  };
}
