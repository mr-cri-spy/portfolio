// Google Analytics 4 integration. A GA4 Measurement ID is public by design
// (it ships in the client bundle either way), so the site's own ID is the
// committed default. Override it for a fork/clone via VITE_GA_MEASUREMENT_ID
// at build time. Analytics only loads in the production build (see initAnalytics).
const DEFAULT_GA_ID = "G-JZYFCHQP0Z";
const GA_ID = (import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined) || DEFAULT_GA_ID;

// Only track in the production build — keeps local `npm run dev` testing out of
// the real analytics data.
const ANALYTICS_ENABLED = import.meta.env.PROD && !!GA_ID;

type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: GtagFn;
  }
}

let initialized = false;

/** Injects the GA4 script and configures the tracker. Safe to call once on app mount. */
export function initAnalytics(): void {
  if (initialized || !ANALYTICS_ENABLED || typeof window === "undefined") return;
  initialized = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  const gtag: GtagFn = (...args) => {
    window.dataLayer!.push(args);
  };
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", GA_ID, { anonymize_ip: true });
}

/** Records that a visitor scrolled a named section into view. */
export function trackSection(section: string): void {
  if (!ANALYTICS_ENABLED || typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", "section_view", { section });
}

/** Records a custom event (e.g. chatbot opened, CTA clicked). */
export function trackEvent(name: string, params?: Record<string, unknown>): void {
  if (!ANALYTICS_ENABLED || typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", name, params);
}
