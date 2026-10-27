import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Awesome Blog App",
};

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
