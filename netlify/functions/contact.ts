import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { insertMessageSchema } from "../../shared/schema";

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

  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return {
      statusCode: 500,
      headers: HEADERS,
      body: JSON.stringify({ message: "Supabase not configured. Set SUPABASE_URL and SUPABASE_ANON_KEY in Netlify environment variables." }),
    };
  }

  try {
    const body = JSON.parse(event.body || "{}");
    const parsed = insertMessageSchema.parse(body);

    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from("messages")
      .insert({
        name: parsed.name,
        email: parsed.email,
        message: parsed.message,
      })
      .select()
      .single();

    if (error) throw new Error(error.message);

    return {
      statusCode: 201,
      headers: HEADERS,
      body: JSON.stringify(data),
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
      body: JSON.stringify({ message: (err as Error).message || "Internal server error." }),
    };
  }
};
