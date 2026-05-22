// api/advice.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  try {
    const API_KEY = process.env.GEMINI_API_KEY;
    if (!API_KEY) return res.status(500).json({ error: 'API Key not configured' });

    const GOOGLE_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    const body = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    const response = await fetch(GOOGLE_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });

    const data = await response.json();
    if (!response.ok) return res.status(500).json({ error: 'Gemini API error', details: data });

    return res.status(200).json(data);
  } catch (err) {
    return res.status(500).json({ error: 'Server error', details: err.message });
  }
}
