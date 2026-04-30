exports.handler = async function(event, context) {
  // 1. Get the API key securely from Netlify's hidden vault
  const API_KEY = process.env.GEMINI_API_KEY;
  const GOOGLE_API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${API_KEY}`;

  // 2. Make sure it's a POST request from your website
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    // 3. Take the data your website sent, and pass it to Google
    const websiteData = event.body;
    
    const response = await fetch(GOOGLE_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: websiteData
    });

    const googleData = await response.json();

    // 4. Send Google's response back down to your website
    return {
      statusCode: 200,
      body: JSON.stringify(googleData)
    };

  } catch (error) {
    console.error("Backend Error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to connect to AI" })
    };
  }
};
