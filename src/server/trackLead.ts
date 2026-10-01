const NOTION_API_URL = "https://api.notion.com/v1/pages";
const NOTION_VERSION = "2022-06-28";
const VALID_LEAD_SOURCES = ["Certificate Access", "Code Access", "Testimonial", "Contact Form"] as const;
type LeadSource = (typeof VALID_LEAD_SOURCES)[number];

export interface LeadPayload {
  name?: string;
  email?: string;
  phone?: string;
  source?: LeadSource;
  certificateRequested?: string;
  message?: string;
}

export type TrackLeadResult =
  | { status: 200; body: { tracked: boolean } }
  | { status: 400; body: { error: string } }
  | { status: 502; body: { tracked: false } }
  | { status: 500; body: { tracked: false } };

export async function handleTrackLeadRequest(
  body: LeadPayload,
  apiKey: string | undefined,
  databaseId: string | undefined
): Promise<TrackLeadResult> {
  const { name, email, phone, source, certificateRequested, message } = body;

  if (!name || typeof name !== "string" || !name.trim()) {
    return { status: 400, body: { error: "Name is required." } };
  }
  if (!source || !VALID_LEAD_SOURCES.includes(source)) {
    return { status: 400, body: { error: "A valid source is required." } };
  }

  if (!apiKey || !databaseId) {
    // Tracking is a nice-to-have; don't block the visitor's flow if it's not configured.
    console.warn("[track-lead] Notion not configured — skipping.");
    return { status: 200, body: { tracked: false } };
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

  try {
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
      console.error("[track-lead] Notion error:", notionRes.status, errBody);
      return { status: 502, body: { tracked: false } };
    }

    return { status: 200, body: { tracked: true } };
  } catch (error) {
    console.error("[track-lead] error:", error);
    return { status: 500, body: { tracked: false } };
  }
}
