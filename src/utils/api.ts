// When the site is built for GitHub Pages, there is no same-origin Express
// server to call, so API requests must go to the separately-hosted backend
// (e.g. Render). Set VITE_API_BASE_URL at build time to point at it; leave it
// unset for local dev / same-origin deployments to keep using relative paths.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, "") || "";

export function apiUrl(path: string): string {
  return `${API_BASE_URL}${path}`;
}
