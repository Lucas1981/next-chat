"use client";

import { useEffect, useRef } from "react";
import { useChat } from "@/hooks/use-chat-input";
import styles from "./chat.module.scss";
import { Button } from "@/components/ui/button";
// import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

const getClassName = (role: "user" | "assistant") =>
  role === "user" ? styles.user : styles.assistant;

export default function ChatScreen() {
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { message, setMessage, messages, isDisabled, handleSend } = useChat();

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

  return (
    <div>
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
  );
}
