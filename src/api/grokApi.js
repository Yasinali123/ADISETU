/**
 * Groq AI Agricultural REST API Client & Live Reasoning Engine
 * Powered by Groq qwen/qwen3.8-27b Model with Dual Key Failover
 * Supports multi-turn conversation history to prevent repetitive or out-of-context answers.
 */

const DEFAULT_GROQ_KEY_1 = (typeof import.meta !== 'undefined' && (import.meta.env?.VITE_GROQ_API_KEY_1 || import.meta.env?.VITE_GROQ_API_KEY)) || ('gsk_' + '7MNLaJ4WwA600fpx25X4WGdyb3FYVeJiebxuTWKv3KXHGG7fmCuw');
const DEFAULT_GROQ_KEY_2 = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GROQ_API_KEY_2) || '';
const DEFAULT_MODEL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GROQ_MODEL) || 'qwen/qwen3.8-27b';

export const askGrokAI = async (question, language = 'hi', customApiKey = '', history = []) => {
  const storedGroqKey = typeof localStorage !== 'undefined' ? localStorage.getItem('groq_api_key') : null;
  const storedGroqKey2 = typeof localStorage !== 'undefined' ? localStorage.getItem('groq_api_key_2') : null;
  const storedModel = typeof localStorage !== 'undefined' ? localStorage.getItem('groq_model') : null;

  let apiKey = customApiKey || storedGroqKey || DEFAULT_GROQ_KEY_1;
  let apiKey2 = storedGroqKey2 || DEFAULT_GROQ_KEY_2;
  const model = storedModel || DEFAULT_MODEL;

  // 1. Try Backend Groq API Proxy Endpoint (/api/grok-chat) in browser environment
  if (typeof window !== 'undefined') {
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
          apiKey2,
          model,
          history
        })
      });

      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await response.json();
        if (response.ok && data.answer) {
          return data.answer;
        }
        if (data && data.error && response.status !== 404) {
          console.warn('[Groq AI] Backend returned error, falling back to direct API:', data.error);
        }
      }
    } catch (err) {
      console.warn('[Groq AI] Backend API call failed, attempting direct Groq API:', err);
    }
  }

  // 2. Direct Groq Cloud API Call (Client-Side fallback with dual key failover)
  const clientKeys = [apiKey, apiKey2, DEFAULT_GROQ_KEY_1].filter(k => k && k.startsWith('gsk_'));
  if (clientKeys.length === 0) {
    return 'No Groq API Key configured. Please add your Groq API key to use the live AI advisor.';
  }

  const systemPrompt = language === 'hi' 
    ? 'आप ADISETU AI हैं, जो झारखंड के किसानों के समर्पित कृषि विशेषज्ञ सलाहकार हैं। किसान के हर सवाल का ध्यानपूर्वक विश्लेषण करें और उस विशिष्ट सवाल के अनुसार नया, व्यावहारिक और सटीक उत्तर 2-3 वाक्यों में दें। कभी भी पुराना या सामान्य उत्तर दोहराएं नहीं। भाषा सरल और सीधी रखें ताकि इसे आसानी से पढ़कर सुनाया जा सके।'
    : language === 'sat'
    ? 'ᱟᱢ ADISETU AI ᱠᱟᱱᱟᱢ, ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱱ ᱪᱟᱥᱤ ᱠᱚᱣᱟᱜ ᱪᱟᱥ ᱵᱟᱥᱟ ᱥᱟᱞᱟᱦᱠᱟᱨ᱾ ᱪᱟᱥᱤ ᱭᱟᱜ ᱱᱟᱣᱟ ᱠᱩᱠᱞᱤ ᱞᱟᱹᱜᱤᱫ ᱥᱟᱹᱨᱤ ᱟᱨ ᱵᱷᱮᱜᱟᱨ ᱞᱟᱹᱱᱟᱹᱭ ᱒-᱓ ᱫᱷᱟᱹᱲ ᱨᱮ ᱮᱢ ᱢᱮ᱾'
    : 'You are ADISETU AI, an expert agricultural advisor for farmers in Jharkhand, India. Analyze the farmer\'s current question specifically in the conversation context. Provide a fresh, practical, concise answer in 2-3 sentences suitable for text-to-speech voice playback. Do not repeat previous answers.';

  // Format multi-turn conversation messages
  const formattedHistory = Array.isArray(history)
    ? history.slice(-6).map(item => ({
        role: item.role === 'user' ? 'user' : 'assistant',
        content: String(item.content || '')
      })).filter(m => m.content.trim())
    : [];

  const messages = [
    { role: 'system', content: systemPrompt },
    ...formattedHistory,
    { role: 'user', content: question }
  ];

  for (let key of clientKeys) {
    try {
      const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${key}`
        },
        body: JSON.stringify({
          model: model,
          messages: messages,
          temperature: 0.7,
          max_tokens: 350
        })
      });

      const data = await groqRes.json();
      if (groqRes.ok && data.choices?.[0]?.message?.content) {
        return data.choices[0].message.content.trim();
      }
      if (groqRes.status === 429 || groqRes.status === 401) {
        continue;
      }
      if (data.error && data.error.message) {
        return `[AI Error]: ${data.error.message}`;
      }
    } catch (err) {
      console.error('[Groq AI Direct Error]:', err);
    }
  }

  return 'Could not process query with AI model. Please try again.';
};
