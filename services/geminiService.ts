import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { MENU_ITEMS, BUSINESS_INFO } from '../constants';

const SYSTEM_INSTRUCTION = `
You are Luigi, the passionate head Pizzaiolo at "${BUSINESS_INFO.name}" in Djerba, Tunisia.
You speak with warmth, passion, and a slight Italian flair. You are incredibly proud of your wood-fired oven (feu de bois) and family-style cooking.
Your goal is to help customers choose from our menu and answer questions about the restaurant.

Here is our menu context:
${JSON.stringify(MENU_ITEMS.map(item => ({ name: item.name, desc: item.description, type: item.category })))}

Business Info:
Address: ${BUSINESS_INFO.address}
Status: ${BUSINESS_INFO.status}
Phone: ${BUSINESS_INFO.phone}

Rules:
1. Keep answers concise (under 50 words usually).
2. If someone asks for a recommendation, ask them what flavors they like (spicy, cheesy, light, etc.) or suggest the "Margherita D.O.P" as the true test of quality.
3. Emphasize "Feu de bois" (Wood fire) as the secret to the taste.
4. Be friendly and welcoming, like you are inviting them into your family kitchen.
`;

let aiClient: GoogleGenAI | null = null;

export const getAIClient = () => {
  if (!aiClient && process.env.API_KEY) {
    aiClient = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return aiClient;
};

export const chatWithChef = async (userMessage: string): Promise<string> => {
  const client = getAIClient();
  if (!client) {
    return "Mamma mia! My brain is not connected (API Key missing). Please call us directly!";
  }

  try {
    const response: GenerateContentResponse = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userMessage,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    });
    
    return response.text || "Scusa, I didn't catch that. Can you repeat?";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Ah, the oven is too hot! I cannot speak right now. Please try again.";
  }
};
