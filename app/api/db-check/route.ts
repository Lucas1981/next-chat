import { db } from "@/lib/db";

export async function GET() {
  const rows = await db.$queryRaw`SELECT 'ok' as ok`;
  return Response.json(rows);
}
