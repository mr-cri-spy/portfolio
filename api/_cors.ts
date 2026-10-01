// The static frontend is deployed on a different origin (GitHub Pages) than
// these functions (Vercel), so only known origins may call them cross-site.
const ALLOWED_ORIGINS = [
  "https://mr-cri-spy.github.io",
  ...(process.env.EXTRA_ALLOWED_ORIGIN ? [process.env.EXTRA_ALLOWED_ORIGIN] : []),
];

interface MinimalRequest {
  headers: Record<string, string | string[] | undefined>;
  method?: string;
}

interface MinimalResponse {
  setHeader(name: string, value: string): void;
  status(code: number): MinimalResponse;
  end(): void;
  json(body: unknown): void;
}

/**
 * Applies CORS headers for allowed origins and handles preflight OPTIONS
 * requests. Returns true if the caller should stop processing (e.g. this was
 * a preflight request, or the origin is body-shaped but blocked).
 */
export function applyCors(req: MinimalRequest, res: MinimalResponse): boolean {
  const origin = req.headers.origin;
  const originStr = Array.isArray(origin) ? origin[0] : origin;

  if (originStr && ALLOWED_ORIGINS.includes(originStr)) {
    res.setHeader("Access-Control-Allow-Origin", originStr);
    res.setHeader("Vary", "Origin");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  }

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return true;
  }

  return false;
}
