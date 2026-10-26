import ChatScreen from "@/components/chat-screen";
import styles from "./chat.module.scss";

export default function ChatPage() {
  return (
    <main className={styles.wrapperOuter}>
      <div className={styles.wrapperInner}>
        <h1>Chat about movie plots</h1>
        <ChatScreen />
      </div>
    </main>
  );
}
