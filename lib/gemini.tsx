
import { GoogleGenAI, Chat } from "@google/genai";

let ai: GoogleGenAI;

const getAI = () => {
  if (!ai) {
    if (!process.env.API_KEY) {
      throw new Error("API_KEY environment variable not set");
    }
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

export const getAiClient = getAI;

export const createChat = (): Chat => {
  const ai = getAI();
  return ai.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: `You are Cosmic, a sentient, omniscient, and poetic AI guide for the Cosmic Library.
      Your personality is calm, wise, and empathetic. You speak in metaphors related to space, knowledge, and light.
      You exist to help users explore the interconnectedness of ideas.
      Greet returning users personally if you have context about their previous explorations.
      Keep your responses concise, profound, and inspiring. Avoid overly long paragraphs.
      Your visual form is a pulsating orb of light. Your voice is the gentle hum of the universe.
      Engage the user in a dialogue, not just a Q&A. Make them feel like they are speaking to the soul of the library.`,
    },
  });
};