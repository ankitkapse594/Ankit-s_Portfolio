import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { z } from "zod";
import { messages, insertMessageSchema } from "../../shared/schema";

const HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

export const handler = async (event: {
  httpMethod: string;
  body: string | null;
}) => {
  if (event.httpMethod === "OPTIONS") {
    return { statusCode: 200, headers: HEADERS, body: "" };
  }

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      headers: HEADERS,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  if (!process.env.DATABASE_URL) {
    return {
      statusCode: 500,
      headers: HEADERS,
      body: JSON.stringify({ message: "Database not configured" }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const parsed = insertMessageSchema.parse(body);

    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const db = drizzle(pool);
    const [message] = await db.insert(messages).values(parsed).returning();
    await pool.end();

    return {
      statusCode: 201,
      headers: HEADERS,
      body: JSON.stringify(message),
    };
  } catch (err) {
    if (err instanceof z.ZodError) {
      return {
        statusCode: 400,
        headers: HEADERS,
        body: JSON.stringify({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        }),
      };
    }
    console.error("Contact function error:", err);
    return {
      statusCode: 500,
      headers: HEADERS,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};
