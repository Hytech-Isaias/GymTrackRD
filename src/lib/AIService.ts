import { GoogleGenAI } from "@google/genai";

/**
 * AI Service for Workout Recommendations using Google GenAI
 */

// Initialize the client
// Assumes VITE_GOOGLE_AI_KEY is set in .env
const apiKey = import.meta.env.VITE_GOOGLE_AI_KEY;
const ai = new GoogleGenAI({ apiKey });

/**
 * Sleep helper for retry logic
 */
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

/**
 * Retry function with exponential backoff for 503 errors
 */
const retryWithBackoff = async (fn: () => Promise<any>, maxRetries = 3, baseDelay = 2000) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error: any) {
      // Check if it's a 503 error (service unavailable/overloaded)
      const is503 = error?.message?.includes('503') || 
                    error?.message?.includes('overloaded') ||
                    error?.message?.includes('UNAVAILABLE');
      
      if (is503 && i < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, i); // Exponential backoff: 2s, 4s, 8s
        console.log(`AI service overloaded, retrying in ${delay/1000}s... (attempt ${i + 1}/${maxRetries})`);
        await sleep(delay);
        continue;
      }
      throw error;
    }
  }
};

export const generateWorkoutPlan = async (userGoal: string, userLevel: string, duration: string | number) => {
  if (!apiKey) {
    console.error("Missing VITE_GOOGLE_AI_KEY in .env");
    throw new Error("API Key not configured");
  }

  const prompt = `
    You are an expert fitness trainer. Create a customized workout plan based on the following:
    - Goal: ${userGoal}
    - Level: ${userLevel}
    - Duration: ${duration} minutes

    Return strictly a JSON object (no markdown, no extra text) with this schema:
    {
      "title": "Creative Workout Title",
      "description": "Brief description of the workout.",
      "stats": {
        "duration": "Duration in mins (e.g. 45 min)",
        "difficulty": "${userLevel}",
        "focus": "Main focus type (e.g. Strength, HIIT)",
        "burn": "Estimated calories (e.g. 300-400 kcal)"
      },
      "exercises": [
        { "name": "Exercise Name", "sets": "Number", "reps": "Rep range or time" }
      ],
      "tips": "One short motivational tip."
    }
  `;

  try {
    const generateContent = async () => {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash", 
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });

      const text = response.text; 
      return JSON.parse(text || '{}');
    };

    // Use retry logic with exponential backoff
    return await retryWithBackoff(generateContent, 3, 2000);

  } catch (error: any) {
    console.error("AI Generation Error:", error);
    
    // Provide user-friendly error messages
    const errorMsg = error?.message || '';
    
    if (errorMsg.includes('503') || errorMsg.includes('overloaded') || errorMsg.includes('UNAVAILABLE')) {
      throw new Error('🔄 The AI service is currently busy. Please try again in a moment.');
    } else if (errorMsg.includes('429') || errorMsg.includes('quota')) {
      throw new Error('⏰ Too many requests. Please wait a moment and try again.');
    } else if (errorMsg.includes('401') || errorMsg.includes('API key')) {
      throw new Error('🔑 API key issue. Please check your configuration.');
    }
    
    throw new Error('❌ Failed to generate workout. Please try again.');
  }
};
