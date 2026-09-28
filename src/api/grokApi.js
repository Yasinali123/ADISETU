/**
 * Groq AI Agricultural REST API Client & Live Reasoning Engine
 * Powered by Groq qwen/qwen3.8-27b Model
 */

const DEFAULT_GROQ_KEY = import.meta.env.VITE_GROQ_API_KEY || '';
const DEFAULT_MODEL = import.meta.env.VITE_GROQ_MODEL || 'qwen/qwen3.8-27b';

export const askGrokAI = async (question, language = 'hi', customApiKey = '') => {
  const apiKey = customApiKey || localStorage.getItem('groq_api_key') || localStorage.getItem('xai_api_key') || DEFAULT_GROQ_KEY;
  const model = localStorage.getItem('groq_model') || DEFAULT_MODEL;

  // 1. Try Backend Groq API Proxy Endpoint (/api/grok-chat)
  try {
    const response = await fetch('/api/grok-chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        question,
        language,
        apiKey,
        model
      })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.answer) {
        return data.answer;
      }
    }
  } catch (err) {
    console.warn('[Groq AI] Backend API call failed, attempting direct Groq API:', err);
  }

  // 2. Direct Groq Cloud API Call (Client-Side fallback to qwen/qwen3.8-27b)
  const effectiveKey = apiKey || DEFAULT_GROQ_KEY;
  
  const systemPrompt = language === 'hi' 
    ? 'आप ADISETU AI हैं, जो झारखंड के किसानों के कृषि सलाहकार हैं। किसान के कृषि प्रश्न का गहरा विश्लेषण करें और सरल, व्यावहारिक, सटीक सलाह 2-3 वाक्यों में दें ताकि इसे आसानी से पढ़कर सुनाया जा सके।'
    : language === 'sat'
    ? 'ᱟᱢ ADISETU AI ᱠᱟᱱᱟᱢ, ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱱ ᱪᱟᱥᱤ ᱠᱚᱣᱟᱜ ᱪᱟᱥ ᱵᱟᱥᱟ ᱥᱟᱞᱟᱦᱠᱟᱨ᱾ ᱪᱟᱥᱤ ᱭᱟᱜ ᱠᱩᱠᱞᱤ ᱨᱮᱱᱟᱜ ᱥᱟᱹᱨᱤ ᱞᱟᱹᱱᱟᱹᱭ ᱟᱨ ᱥᱚᱞᱦᱮ ᱒-᱓ ᱫᱷᱟᱹᱲ ᱨᱮ ᱮᱢ Mᱮ᱾'
    : 'You are ADISETU AI, an expert agricultural AI advisor for farmers in Jharkhand, India. Deeply analyze the farmer question and provide clear, practical, concise farming advice (2-3 sentences max) suitable for text-to-speech voice playback.';

  try {
    const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${effectiveKey}`
      },
      body: JSON.stringify({
        model: model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question }
        ],
        temperature: 0.6,
        max_tokens: 350
      })
    });

    if (groqRes.ok) {
      const data = await groqRes.json();
      const answer = data.choices?.[0]?.message?.content;
      if (answer) return answer;
    }
  } catch (err) {
    console.error('[Groq AI Direct Error]:', err);
  }

  return language === 'hi'
    ? 'क्षमा करें, AI मॉडल सेवा से संपर्क नहीं हो पाया। कृपया अपना प्रश्न पुनः पूछें।'
    : 'Sorry, could not connect to the live AI engine. Please check your network connection and try again.';
};
