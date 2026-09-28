/**
 * Sarvam AI REST API Client Engine for ADISETU
 * 
 * Provides:
 * 1. Sarvam Translation (mayura:v1 model) across Indian languages
 * 2. Sarvam Text-to-Speech (bulbul:v3 model) with authentic Indian accents
 */

export const DEFAULT_SARVAM_KEY = import.meta.env.VITE_SARVAM_API_KEY || '';


// Curated list of Indian Accent Voices supported by Sarvam bulbul:v3
export const INDIAN_VOICES = [
  { id: 'simran', name: 'Simran (Female - Indian Accent)', lang: 'en-IN/hi-IN', gender: 'Female' },
  { id: 'ritu', name: 'Ritu (Female - Hindi/Indian Accent)', lang: 'hi-IN/en-IN', gender: 'Female' },
  { id: 'shubh', name: 'Shubh (Male - Indian Accent)', lang: 'en-IN/hi-IN', gender: 'Male' },
  { id: 'ratan', name: 'Ratan (Male - Deep Indian Voice)', lang: 'hi-IN/en-IN', gender: 'Male' },
  { id: 'aditya', name: 'Aditya (Male - Clear Accent)', lang: 'hi-IN/en-IN', gender: 'Male' },
  { id: 'roopa', name: 'Roopa (Female - Gentle Accent)', lang: 'hi-IN', gender: 'Female' },
  { id: 'kavya', name: 'Kavya (Female - Expressive)', lang: 'en-IN/hi-IN', gender: 'Female' },
  { id: 'dev', name: 'Dev (Male - Warm Accent)', lang: 'en-IN', gender: 'Male' }
];

export const LANGUAGE_CODES = {
  hi: 'hi-IN',
  en: 'en-IN',
  bn: 'bn-IN',
  ta: 'ta-IN',
  te: 'te-IN',
  kn: 'kn-IN',
  ml: 'ml-IN',
  mr: 'mr-IN',
  gu: 'gu-IN',
  pa: 'pa-IN',
  od: 'od-IN',
  sat: 'hi-IN' // Fallback mapping for Santali regional target
};

/**
 * Translate text using Sarvam AI Mayura model
 */
export const sarvamTranslate = async ({ input, sourceLang = 'auto', targetLang = 'hi', customKey = '' }) => {
  if (!input || !input.trim()) return '';

  const apiKey = customKey || localStorage.getItem('sarvam_api_key') || DEFAULT_SARVAM_KEY;
  const targetCode = LANGUAGE_CODES[targetLang] || targetLang || 'hi-IN';
  const sourceCode = sourceLang === 'auto' ? 'en-IN' : (LANGUAGE_CODES[sourceLang] || sourceLang || 'en-IN');

  // Try backend proxy first
  try {
    const res = await fetch('/api/sarvam-translate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input,
        sourceLanguageCode: sourceCode,
        targetLanguageCode: targetCode,
        apiKey
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.translatedText) {
        return data.translatedText;
      }
    }
  } catch (err) {
    console.warn('[Sarvam API] Proxy translate failed, trying direct API call:', err);
  }

  // Direct Fallback to Sarvam API
  try {
    const directRes = await fetch('https://api.sarvam.ai/translate', {
      method: 'POST',
      headers: {
        'api-subscription-key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input,
        source_language_code: sourceCode,
        target_language_code: targetCode,
        speaker_gender: 'Female',
        mode: 'formal',
        model: 'mayura:v1'
      })
    });

    if (directRes.ok) {
      const data = await directRes.json();
      return data.translated_text || input;
    }
  } catch (directErr) {
    console.error('[Sarvam API] Direct translate failed:', directErr);
  }

  return input;
};

/**
 * Synthesize Indian accent audio using Sarvam AI Bulbul model
 */
export const sarvamTextToSpeech = async ({ input, targetLang = 'hi', speaker = '', customKey = '', pace = 1.0 }) => {
  if (!input || !input.trim()) throw new Error('No input text provided for Sarvam TTS');

  const apiKey = customKey || localStorage.getItem('sarvam_api_key') || DEFAULT_SARVAM_KEY;
  const targetCode = LANGUAGE_CODES[targetLang] || targetLang || 'hi-IN';

  // Selected default speaker
  let chosenSpeaker = speaker;
  if (!chosenSpeaker) {
    chosenSpeaker = targetCode === 'hi-IN' ? 'ritu' : 'simran';
  }

  // Try backend proxy first
  try {
    const res = await fetch('/api/sarvam-tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input,
        targetLanguageCode: targetCode,
        speaker: chosenSpeaker,
        pace,
        apiKey
      })
    });

    if (res.ok) {
      const data = await res.json();
      if (data.audioBase64) {
        return `data:audio/wav;base64,${data.audioBase64}`;
      }
    }
  } catch (err) {
    console.warn('[Sarvam API] Proxy TTS failed, trying direct API call:', err);
  }

  // Direct Fallback to Sarvam API
  try {
    const directRes = await fetch('https://api.sarvam.ai/text-to-speech', {
      method: 'POST',
      headers: {
        'api-subscription-key': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: [input.trim().slice(0, 500)],
        target_language_code: targetCode,
        speaker: chosenSpeaker,
        pitch: 0,
        pace: pace,
        loudness: 1.5,
        speech_sample_rate: 16000,
        enable_preprocessing: true,
        model: 'bulbul:v3'
      })
    });

    if (directRes.ok) {
      const data = await directRes.json();
      if (data.audios && data.audios[0]) {
        return `data:audio/wav;base64,${data.audios[0]}`;
      }
    }
  } catch (directErr) {
    console.error('[Sarvam API] Direct TTS failed:', directErr);
  }

  throw new Error('Failed to generate Sarvam AI audio');
};

/**
 * Play Sarvam AI Indian Accent Audio with HTML Audio player
 */
let currentSarvamAudio = null;

export const playSarvamAudio = async (text, lang = 'hi', speaker = '', onStart = null, onEnd = null, onError = null, customKey = '') => {
  stopSarvamAudio();

  try {
    const audioDataUrl = await sarvamTextToSpeech({ input: text, targetLang: lang, speaker, customKey });
    
    currentSarvamAudio = new Audio(audioDataUrl);
    
    if (onStart) onStart();

    currentSarvamAudio.onended = () => {
      currentSarvamAudio = null;
      if (onEnd) onEnd();
    };

    currentSarvamAudio.onerror = (e) => {
      console.error('[Sarvam Audio Playback Error]:', e);
      currentSarvamAudio = null;
      if (onError) onError(e);
    };

    await currentSarvamAudio.play();
    return currentSarvamAudio;
  } catch (err) {
    console.error('[Sarvam Play Error]:', err);
    if (onError) onError(err);
    throw err;
  }
};

export const stopSarvamAudio = () => {
  if (currentSarvamAudio) {
    currentSarvamAudio.pause();
    currentSarvamAudio.currentTime = 0;
    currentSarvamAudio = null;
  }
};
