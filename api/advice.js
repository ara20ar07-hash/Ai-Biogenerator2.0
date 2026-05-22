// api/advice.js

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const incomingPayload = req.body;
    
    // Extract data from your frontend payload format
    const userPromptText = incomingPayload.contents?.[0]?.parts?.[0]?.text || "Run the full growth audit.";
    const systemPromptText = incomingPayload.systemInstruction?.parts?.[0]?.text || "You are an expert strategist.";

    // Call the Groq API endpoint
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        // Updated to Groq's current supported Llama 3.3 70B model
        model: "llama-3.3-70b-versatile", 
        messages: [
          {
            role: "system",
            content: systemPromptText
          },
          {
            role: "user",
            content: userPromptText
          }
        ],
        temperature: 0.4,
        // Forces the model to output the clean JSON object your frontend needs
        response_format: { type: "json_object" } 
      })
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error("Groq Engine Error Rejection:", errorData);
      
      return res.status(response.status).json({ 
        error: errorData.error?.message || "Groq API was unable to process request." 
      });
    }

    const data = await response.json();
    const aiTextOutput = data.choices[0].message.content;

    // Send it clean back to your advice.js frontend
    return res.status(200).json({ text: aiTextOutput });

  } catch (error) {
    console.error("Serverless Function Crashed:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
