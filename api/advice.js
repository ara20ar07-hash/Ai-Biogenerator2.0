// api/advice.js (or whatever your serverless filename is)

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  // 1. Get the prompt/context details passed from your advice.js frontend
  const { prompt, userPersonaContext } = req.body; 

  try {
    // 2. Call the Groq API endpoint
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        // llama3-70b is highly advanced and handles hard/complex requests flawlessly
        model: "llama3-70b-8192", 
        messages: [
          {
            role: "system",
            content: `You are an expert social media strategist and AI creator coach. Core user profile context: ${userPersonaContext || 'None provided'}. Always output highly accurate, formatted, and impactful advice.`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7
      })
    });

    // 3. Catch structural or service issues before they break the app
    if (!response.ok) {
      const errorData = await response.json();
      console.error("Groq Error Log:", errorData);
      return res.status(response.status).json({ error: "AI Engine is busy. Try again!" });
    }

    const data = await response.json();
    
    // 4. Extract the generated text message safely
    const aiTextOutput = data.choices[0].message.content;

    // 5. Return the clean text back to your frontend
    return res.status(200).json({ text: aiTextOutput });

  } catch (error) {
    console.error("Serverless Crash:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
