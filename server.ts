import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import { rateLimit } from "express-rate-limit";
import { handleChatRequest, type ChatTurn } from "./src/server/chat";
import { handleTrackLeadRequest, type LeadPayload } from "./src/server/trackLead";

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

app.post("/api/chat", chatRateLimit, async (req, res) => {
  const body = req.body as { message?: string; history?: ChatTurn[] };
  const result = await handleChatRequest(body, process.env.OPENROUTER_API_KEY);
  res.status(result.status).json(result.body);
});

app.post("/api/track-lead", leadRateLimit, async (req, res) => {
  const body = req.body as LeadPayload;
  const result = await handleTrackLeadRequest(body, process.env.NOTION_API_KEY, process.env.NOTION_DATABASE_ID);
  res.status(result.status).json(result.body);
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
