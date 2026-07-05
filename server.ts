import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import {
  developerProfile,
  skillsData,
  projectsData,
  experienceData,
  certificationsData,
} from "./src/data";

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

// The static frontend can be deployed on a different origin (e.g. GitHub
// Pages) than this API (e.g. Render), so only those known origins may call
// the API cross-site. Same-origin requests (no Origin header, like curl or
// the dev server) are always allowed.
const ALLOWED_ORIGINS = [
  "https://mr-cri-spy.github.io",
  ...(process.env.EXTRA_ALLOWED_ORIGIN ? [process.env.EXTRA_ALLOWED_ORIGIN] : []),
];

app.set("trust proxy", 1);
app.use(
  helmet({
    contentSecurityPolicy: false, // avoid breaking Vite's dev-mode inline scripts/styles
  })
);
app.use(
  cors({
    origin(origin, callback) {
      // Declining (not erroring) simply omits CORS headers, which makes the
      // browser block the response client-side — the correct CORS behavior,
      // without leaking a stack trace to the caller.
      callback(null, !origin || ALLOWED_ORIGINS.includes(origin));
    },
  })
);
app.use(express.json());

const chatRateLimit = rateLimit({
  windowMs: 60 * 1000,
  limit: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { reply: "You're sending messages a bit fast — please wait a moment and try again." },
});

const leadRateLimit = rateLimit({
  windowMs: 60 * 1000,
  limit: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: { tracked: false, error: "Too many submissions — please wait a moment and try again." },
});

// Tried in order — free OpenRouter models are shared and get rate-limited often,
// so falling through to the next candidate keeps the assistant responsive.
const OPENROUTER_MODELS = [
  "meta-llama/llama-3.3-70b-instruct:free",
  "google/gemma-4-31b-it:free",
  "qwen/qwen3-next-80b-a3b-instruct:free",
  "nvidia/nemotron-3-super-120b-a12b:free",
  "openai/gpt-oss-20b:free",
];
const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

const AVAILABILITY_NOTE =
  "Kiran is generally available for calls Monday–Friday, 10:00 AM–6:00 PM IST (Bengaluru time). " +
  "This assistant does not have live access to his calendar yet, so it cannot confirm an exact free slot — " +
  "it can only state his general working hours and pass along the visitor's preferred time so Kiran can confirm.";

function buildSystemInstruction(): string {
  const topSkills = [...skillsData]
    .sort((a, b) => b.level - a.level)
    .slice(0, 10)
    .map((s) => `${s.name} (${s.level}%)`)
    .join(", ");

  const projectsSummary = projectsData
    .map((p) => `- ${p.title}: ${p.description}`)
    .join("\n");

  const experienceSummary = experienceData
    .map((e) => `- ${e.role} at ${e.company} (${e.period}): ${e.description[0]}`)
    .join("\n");

  const certsSummary = certificationsData
    .slice(0, 6)
    .map((c) => `- ${c.title} (${c.issuer}, ${c.date})`)
    .join("\n");

  return `You are the AI assistant on ${developerProfile.name}'s personal portfolio website. You represent Kiran to visitors, recruiters, and potential clients.

ABOUT KIRAN:
${developerProfile.bio}
Location: ${developerProfile.location}
Email: ${developerProfile.email}
GitHub: ${developerProfile.github}
LinkedIn: ${developerProfile.linkedin}

TOP SKILLS:
${topSkills}

PROJECTS:
${projectsSummary}

EXPERIENCE:
${experienceSummary}

RECENT CERTIFICATIONS:
${certsSummary}

AVAILABILITY:
${AVAILABILITY_NOTE}

GUIDELINES:
- Speak in third person about Kiran (e.g. "Kiran built..." not "I built...").
- Be warm, concise, and professional. Avoid corporate fluff or overselling.
- Only state facts given above. If asked something you don't know, say so honestly and suggest emailing Kiran directly at ${developerProfile.email}.
- If someone wants to schedule a meeting or call, share the availability note above, ask for their preferred day/time and timezone, and tell them you'll pass it to Kiran — do not claim to have booked anything.
- Keep replies short (2-5 sentences) unless the visitor asks for detail.
- Never invent metrics, testimonials, employers, or credentials not listed above.`;
}

interface ChatTurn {
  role: "user" | "model";
  text: string;
}

interface OpenRouterChoice {
  message?: { content?: string };
}

interface OpenRouterResponse {
  choices?: OpenRouterChoice[];
  error?: { message?: string };
}

app.post("/api/chat", chatRateLimit, async (req, res) => {
  try {
    const { message, history } = req.body as { message?: string; history?: ChatTurn[] };

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message is required." });
    }
    if (message.length > 2000) {
      return res.status(400).json({ error: "Message is too long." });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      return res.status(503).json({
        reply:
          "The live assistant isn't configured yet — please email Kiran directly at " +
          developerProfile.email +
          ".",
      });
    }

    const safeHistory: ChatTurn[] = Array.isArray(history)
      ? history
          .filter((h) => h && (h.role === "user" || h.role === "model") && typeof h.text === "string")
          .slice(-12)
      : [];

    const messages = [
      { role: "system", content: buildSystemInstruction() },
      ...safeHistory.map((h) => ({
        role: h.role === "model" ? "assistant" : "user",
        content: h.text,
      })),
      { role: "user", content: message },
    ];

    let lastError: { status: number; data: OpenRouterResponse } | null = null;

    for (const model of OPENROUTER_MODELS) {
      const orResponse = await fetch(OPENROUTER_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages,
          temperature: 0.6,
          max_tokens: 400,
        }),
      });

      const data = (await orResponse.json()) as OpenRouterResponse;

      if (orResponse.ok) {
        const replyText =
          data.choices?.[0]?.message?.content?.trim() ||
          "Sorry, I couldn't put together a reply just now — please try again or email Kiran directly.";
        return res.json({ reply: replyText });
      }

      console.warn(`[/api/chat] ${model} failed (${orResponse.status}), trying next candidate...`);
      lastError = { status: orResponse.status, data };
    }

    console.error("[/api/chat] all OpenRouter candidates failed:", lastError);
    return res.status(502).json({
      reply:
        "The live assistant is under heavy load right now — please try again shortly or email Kiran directly at " +
        developerProfile.email +
        ".",
    });
  } catch (error) {
    console.error("[/api/chat] error:", error);
    return res.status(500).json({
      reply:
        "Something went wrong on my end. Please try again in a moment, or email Kiran directly at " +
        developerProfile.email +
        ".",
    });
  }
});

const NOTION_API_URL = "https://api.notion.com/v1/pages";
const NOTION_VERSION = "2022-06-28";
const VALID_LEAD_SOURCES = ["Certificate Access", "Code Access", "Testimonial", "Contact Form"] as const;
type LeadSource = (typeof VALID_LEAD_SOURCES)[number];

interface LeadPayload {
  name?: string;
  email?: string;
  phone?: string;
  source?: LeadSource;
  certificateRequested?: string;
  message?: string;
}

app.post("/api/track-lead", leadRateLimit, async (req, res) => {
  try {
    const { name, email, phone, source, certificateRequested, message } = req.body as LeadPayload;

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ error: "Name is required." });
    }
    if (!source || !VALID_LEAD_SOURCES.includes(source)) {
      return res.status(400).json({ error: "A valid source is required." });
    }

    const apiKey = process.env.NOTION_API_KEY;
    const databaseId = process.env.NOTION_DATABASE_ID;
    if (!apiKey || !databaseId) {
      // Tracking is a nice-to-have; don't block the visitor's flow if it's not configured.
      console.warn("[/api/track-lead] Notion not configured — skipping.");
      return res.json({ tracked: false });
    }

    const properties: Record<string, unknown> = {
      Name: { title: [{ text: { content: name.trim().slice(0, 200) } }] },
      Source: { select: { name: source } },
      "Submitted At": { date: { start: new Date().toISOString() } },
    };

    if (email && typeof email === "string") {
      properties.Email = { email: email.trim().slice(0, 200) };
    }
    if (phone && typeof phone === "string") {
      properties.Phone = { phone_number: phone.trim().slice(0, 50) };
    }
    if (certificateRequested && typeof certificateRequested === "string") {
      properties["Certificate Requested"] = { rich_text: [{ text: { content: certificateRequested.slice(0, 500) } }] };
    }
    if (message && typeof message === "string") {
      properties.Message = { rich_text: [{ text: { content: message.slice(0, 1900) } }] };
    }

    const notionRes = await fetch(NOTION_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Notion-Version": NOTION_VERSION,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        parent: { database_id: databaseId },
        properties,
      }),
    });

    if (!notionRes.ok) {
      const errBody = await notionRes.text();
      console.error("[/api/track-lead] Notion error:", notionRes.status, errBody);
      return res.status(502).json({ tracked: false });
    }

    return res.json({ tracked: true });
  } catch (error) {
    console.error("[/api/track-lead] error:", error);
    return res.status(500).json({ tracked: false });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Portfolio running on http://localhost:${PORT} (${process.env.NODE_ENV || "development"} mode)`);
    if (!process.env.OPENROUTER_API_KEY) {
      console.warn("[Server] OPENROUTER_API_KEY not set — /api/chat will return a fallback message.");
    }
    if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
      console.warn("[Server] NOTION_API_KEY / NOTION_DATABASE_ID not set — /api/track-lead will skip tracking.");
    }
  });
}

startServer();
