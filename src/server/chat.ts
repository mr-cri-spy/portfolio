import { developerProfile, skillGroups, projectsData, experienceData, certificationsData } from "../data.js";

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
  const skillsSummary = skillGroups.map((g) => `- ${g.name}: ${g.skills.join(", ")}`).join("\n");

  const projectsSummary = projectsData.map((p) => `- ${p.title}: ${p.description}`).join("\n");

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

SKILLS:
${skillsSummary}

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

export interface ChatTurn {
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

export type ChatResult =
  | { status: 200; body: { reply: string } }
  | { status: 400; body: { error: string } }
  | { status: 502; body: { reply: string } }
  | { status: 503; body: { reply: string } }
  | { status: 500; body: { reply: string } };

export async function handleChatRequest(
  body: { message?: string; history?: ChatTurn[] },
  apiKey: string | undefined
): Promise<ChatResult> {
  const { message, history } = body;

  if (!message || typeof message !== "string" || !message.trim()) {
    return { status: 400, body: { error: "Message is required." } };
  }
  if (message.length > 2000) {
    return { status: 400, body: { error: "Message is too long." } };
  }

  if (!apiKey) {
    return {
      status: 503,
      body: {
        reply:
          "The live assistant isn't configured yet — please email Kiran directly at " + developerProfile.email + ".",
      },
    };
  }

  const safeHistory: ChatTurn[] = Array.isArray(history)
    ? history.filter((h) => h && (h.role === "user" || h.role === "model") && typeof h.text === "string").slice(-12)
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
    try {
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
        return { status: 200, body: { reply: replyText } };
      }

      console.warn(`[chat] ${model} failed (${orResponse.status}), trying next candidate...`);
      lastError = { status: orResponse.status, data };
    } catch (error) {
      console.warn(`[chat] ${model} request threw, trying next candidate...`, error);
    }
  }

  console.error("[chat] all OpenRouter candidates failed:", lastError);
  return {
    status: 502,
    body: {
      reply:
        "The live assistant is under heavy load right now — please try again shortly or email Kiran directly at " +
        developerProfile.email +
        ".",
    },
  };
}
