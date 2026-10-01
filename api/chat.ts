import { applyCors } from "./_cors.js";
import { handleChatRequest, type ChatTurn } from "../src/server/chat.js";

interface VercelRequest {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body: unknown;
}

interface VercelResponse {
  setHeader(name: string, value: string): void;
  status(code: number): VercelResponse;
  end(): void;
  json(body: unknown): void;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (applyCors(req, res)) return;

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  const body = (typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body || {}) as {
    message?: string;
    history?: ChatTurn[];
  };

  const result = await handleChatRequest(body, process.env.OPENROUTER_API_KEY);
  res.status(result.status).json(result.body);
}
