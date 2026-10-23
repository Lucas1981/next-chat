import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Awesome Chat App",
};

export default function ChatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
