import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Awesome Movie App",
};

export default function MovieLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
