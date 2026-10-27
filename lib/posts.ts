import { db } from "./db";

export function getPosts() {
  return db.post.findMany({
    select: { id: true, title: true },
    orderBy: { id: "asc" },
  });
}

export function getPostById(blogId: string) {
  const id = Number(blogId);
  if (!Number.isInteger(id)) return null;

  return db.post.findUnique({
    where: { id },
    select: { title: true, content: true },
  });
}
