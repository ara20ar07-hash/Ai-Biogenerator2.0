export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const API_KEY = process.env.GEMINI_API_KEY;
    
    if (!API_KEY) {
      console.error("Missing API Key!");
      return res.status(500).json({ error: "API Key not found in Vercel vault" });
    }

    const GOOGLE_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

    const bodyString = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);

    const response = await fetch(GOOGLE_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: bodyString
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Google API Error:", data);
      return res.status(500).json({ error: "Google API rejected the request", details: data });
    }

    return res.status(200).json(data);
    
  } catch (error) {
    console.error("Vercel Backend Error:", error);
    return res.status(500).json({ error: "Failed to connect to API", details: error.message });
  }
}
