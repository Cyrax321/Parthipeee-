const HF_TOKEN = "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";
const API_URL = "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill";

export async function generateAIResponse(message: string): Promise<string> {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputs: message }),
    });

    if (!response.ok) {
      throw new Error("API request failed");
    }

    const data = await response.json();
    return data[0]?.generated_text || "I apologize, but I couldn't process that request. Could you please rephrase?";
  } catch (error) {
    console.error("API Error:", error);
    return "I apologize, but I'm having trouble connecting right now. Please try again later.";
  }
}