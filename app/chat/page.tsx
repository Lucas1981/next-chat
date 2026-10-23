"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import styles from "./chat.module.scss";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

type ChatTurn = {
  role: "user" | "assistant";
  content: string;
};

const getClassName = (role: "user" | "assistant") =>
  role === "user" ? styles.user : styles.assistant;

export default function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatTurn[]>([]);
  const [isDisabled, setIsDisabled] = useState(false);
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    return () => abortRef.current?.abort();
  }, []);

  useEffect(() => {
    const box = chatBoxRef.current;
    if (!box) {
      return;
    }

    box.scrollTo({ top: box.scrollHeight, behavior: "smooth" });
  }, [messages.length]);

  useEffect(() => {
    if (!isDisabled) {
      inputRef.current?.focus();
    }
  }, [isDisabled]);

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

  return (
    <main className={styles.wrapperOuter}>
      <div className={styles.wrapperInner}>
        <h1>Chat</h1>
        <div className={styles.chatBox} ref={chatBoxRef}>
          {messages.map((message, idx) => (
            <div
              key={idx}
              className={`${styles.chatBoxRow} ${getClassName(message.role)}`}
            >
              <div className={styles.message}>{message.content}</div>
            </div>
          ))}
        </div>
        <div className={styles.inputs}>
          <form onSubmit={(e) => handleSend(e)}>
            <Input
              autoFocus
              className="mt-2"
              name="message"
              id="message"
              placeholder=""
              value={message}
              ref={inputRef}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button className="mt-2" type="submit" disabled={isDisabled}>
              Send
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
}
