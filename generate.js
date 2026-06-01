// Vercel Serverless Function — runs on the server, NOT in the browser.
// Secret keys live here via environment variables (set in Vercel dashboard).
// This is a STUB: it echoes back. Wire a real image API in step 2.

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  const { prompt } = req.body || {};
  if (!prompt) return res.status(400).json({ error: "Missing prompt" });

  // const OPENAI_API_KEY = process.env.OPENAI_API_KEY;  // secret, server-only
  // ... call image API here in step 2, return the image URL/base64 ...

  return res.status(200).json({
    ok: true,
    note: "Stub. Image API not wired yet.",
    received: prompt
  });
}
