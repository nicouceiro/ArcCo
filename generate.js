// Vercel Serverless Function. Holds ONLY the OpenAI key; does ONLY the OpenAI call.
// Receives { imageUrl, prompt }, fetches the room photo, sends it to gpt-image-2
// edit endpoint, returns the result as base64. The browser saves it to Storage.

// ── CONFIG ── change these two lines to control cost/quality ──
const MODEL = "gpt-image-1-mini";   // dev setting (~$0.005/img). Switch to "gpt-image-2" for the demo.
const QUALITY = "low";              // "low" | "medium" | "high"
const SIZE = "1024x1024";
// ─────────────────────────────────────────────────────────────

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST only" });

  const { imageUrl, prompt } = req.body || {};
  if (!imageUrl || !prompt) return res.status(400).json({ error: "Missing imageUrl or prompt" });

  const key = process.env.OPENAI_API_KEY;
  if (!key) return res.status(500).json({ error: "OPENAI_API_KEY not set in Vercel" });

  try {
    // 1. Pull the original room photo (public Supabase URL) into memory
    const imgResp = await fetch(imageUrl);
    if (!imgResp.ok) return res.status(400).json({ error: "Could not fetch source image" });
    const imgBuf = Buffer.from(await imgResp.arrayBuffer());

    // 2. Build multipart form for the OpenAI edits endpoint
    const form = new FormData();
    form.append("model", MODEL);
    form.append("prompt", prompt);
    form.append("quality", QUALITY);
    form.append("size", SIZE);
    form.append("image", new Blob([imgBuf], { type: "image/png" }), "room.png");

    // 3. Call OpenAI
    const aiResp = await fetch("https://api.openai.com/v1/images/edits", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}` },
      body: form
    });
    const data = await aiResp.json();
    if (!aiResp.ok) {
      return res.status(aiResp.status).json({ error: data.error?.message || "OpenAI error" });
    }

    // 4. Return the generated image as base64
    return res.status(200).json({ b64: data.data[0].b64_json });
  } catch (e) {
    return res.status(500).json({ error: e.message });
  }
}
