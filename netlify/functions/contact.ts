import { z } from "zod";
import { insertMessageSchema } from "../../shared/schema";

const HEADERS = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const CONTACT_EMAIL = "ankitkapse594@gmail.com";

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

  try {
    const body = JSON.parse(event.body || "{}");
    const parsed = insertMessageSchema.parse(body);

    // If a database is configured (e.g. production with DB), store there
    if (process.env.DATABASE_URL) {
      const { Pool } = await import("pg");
      const { drizzle } = await import("drizzle-orm/node-postgres");
      const { messages } = await import("../../shared/schema");

      const pool = new Pool({ connectionString: process.env.DATABASE_URL });
      const db = drizzle(pool);
      const [message] = await db.insert(messages).values(parsed).returning();
      await pool.end();

      return {
        statusCode: 201,
        headers: HEADERS,
        body: JSON.stringify(message),
      };
    }

    // No database — forward to FormSubmit.co which emails Ankit directly
    const emailRes = await fetch(
      `https://formsubmit.co/ajax/${CONTACT_EMAIL}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: parsed.name,
          email: parsed.email,
          message: parsed.message,
          _subject: `Portfolio Contact from ${parsed.name}`,
          _replyto: parsed.email,
          _captcha: "false",
        }),
      }
    );

    if (!emailRes.ok) {
      throw new Error(`FormSubmit error: ${emailRes.status}`);
    }

    return {
      statusCode: 201,
      headers: HEADERS,
      body: JSON.stringify({
        name: parsed.name,
        email: parsed.email,
        message: parsed.message,
      }),
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
      body: JSON.stringify({ message: "Internal server error. Please try again." }),
    };
  }
};
