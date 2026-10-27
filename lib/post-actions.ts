"use server";
import { db } from "./db";

export async function createPost(formData: FormData) {
  const title = String(formData.get("title") || "");
  const content = String(formData.get("content") || "");
  await db.post.create({ data: { title, content } });
}
