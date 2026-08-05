import { z } from "zod";
import { createClient } from "@supabase/supabase-js";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  email: z.string().email("Invalid email address").max(200),
  message: z.string().min(10, "Message must be at least 10 characters").max(5000),
});

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
    const parsed = contactSchema.parse(body);

    // Save to Supabase
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;
    if (supabaseUrl && supabaseKey) {
      try {
        const supabase = createClient(supabaseUrl, supabaseKey);
        const { error } = await supabase.from("contact_messages").insert({
          name: parsed.name,
          email: parsed.email,
          message: parsed.message,
        });
        if (error) console.error("Supabase insert error:", error.message);
      } catch (dbErr) {
        console.error("Supabase error (non-fatal):", dbErr);
      }
    }

    // Forward via FormSubmit
    try {
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
      const result = await emailRes.json().catch(() => ({}));
      console.log("FormSubmit response:", emailRes.status, result);
    } catch (emailErr) {
      console.error("FormSubmit error (non-fatal):", emailErr);
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
      body: JSON.stringify({ message: "Something went wrong. Please email me directly at ankitkapse594@gmail.com" }),
    };
  }
};
