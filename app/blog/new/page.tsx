import { createPost } from "@/lib/post-actions";

export default function BlogPage() {
  return (
    <main>
      <h1>New blogpost</h1>
      <form action={createPost}>
        <input name="title" />
        <textarea name="content" />
        <button type="submit">Publish</button>
      </form>
    </main>
  );
}
