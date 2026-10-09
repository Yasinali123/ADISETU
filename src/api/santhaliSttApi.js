/**
 * Santhali Speech-to-Text (STT) Engine for ADISETU
 * 
 * Supports state-of-the-art Santhali STT models hosted on Hugging Face:
 * 1. thunderboltc/whisper-small-santali-sanlish (Whisper Small fine-tuned for Santali/Sanlish)
 * 2. ai4bharat/indicconformer_stt_sat_hybrid_ctc_rnnt_large (AI4Bharat IndicConformer Large for Santali)
 * 
 * Features Automatic Model Failover & Hybrid Cascade for zero downtime!
 */

export const SANTHALI_STT_MODELS = [
  {
    id: 'auto',
    name: '⚡ Smart Auto-Switch (Whisper ↔ IndicConformer)',
    provider: 'Auto Cascade',
    badge: 'Recommended',
    description: 'Automatically switches between Whisper Small and IndicConformer for zero downtime & maximum accuracy.'
  },
  {
    id: 'thunderboltc/whisper-small-santali-sanlish',
    name: 'Whisper Small Santali & Sanlish',
    provider: 'ThunderboltC',
    badge: 'Whisper Fine-Tuned',
    description: 'Specialized Whisper model fine-tuned for Santali & Sanlish dialect spoken speech recognition.'
  },
  {
    id: 'ai4bharat/indicconformer_stt_sat_hybrid_ctc_rnnt_large',
    name: 'IndicConformer Santali (Hybrid CTC/RNNT)',
    provider: 'AI4Bharat',
    badge: 'IndicConformer Large',
    description: 'AI4Bharat state-of-the-art large Conformer architecture trained on extensive Santali speech audio.'
  }
];

export const DEFAULT_SANTHALI_MODEL = 'auto';

const MODEL_CASCADE_LIST = [
  'thunderboltc/whisper-small-santali-sanlish',
  'ai4bharat/indicconformer_stt_sat_hybrid_ctc_rnnt_large'
];

/**
 * Convert Blob or File to Base64 string
 */
const blobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Data = reader.result.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};

/**
 * Transcribe recorded Santhali audio with automatic multi-model failover
 * 
 * @param {Object} params
 * @param {Blob} params.audioBlob - Recorded browser audio blob
 * @param {string} [params.model] - Model identifier or 'auto'
 * @param {string} [params.hfApiKey] - Hugging Face API key/token
 * @returns {Promise<{ success: boolean, text?: string, error?: string, model?: string, fallbackUsed?: boolean }>}
 */
export const transcribeSanthaliAudio = async ({ audioBlob, model = DEFAULT_SANTHALI_MODEL, hfApiKey = '' }) => {
  if (!audioBlob) {
    throw new Error('No audio recording provided for Santhali transcription.');
  }

  const effectiveHfKey = hfApiKey || localStorage.getItem('hf_api_key') || import.meta.env.VITE_HUGGINGFACE_API_KEY || '';

  // 1. Try Backend API Proxy Endpoint (/api/stt-santhali) with automatic server-side failover
  try {
    const base64Audio = await blobToBase64(audioBlob);
    const response = await fetch('/api/stt-santhali', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        audioBase64: base64Audio,
        mimeType: audioBlob.type || 'audio/webm',
        model: model,
        apiKey: effectiveHfKey
      })
    });

    const data = await response.json();
    if (response.ok && data.success) {
      return {
        success: true,
        text: data.text || data.transcript,
        model: data.model || model,
        fallbackUsed: data.fallbackUsed
      };
    }

    if (data && data.error) {
      if (response.status === 401 || data.needApiKey) {
        throw new Error(`[Hugging Face API Key Required]: ${data.error}`);
      }
      throw new Error(data.error);
    }
  } catch (backendErr) {
    console.warn('[Santhali STT] Proxy call failed, attempting direct Hugging Face API cascade:', backendErr);
    
    // If it's an explicit API key requirement error, throw to notify UI
    if (backendErr.message.includes('API Key Required')) {
      throw backendErr;
    }
  }

  // 2. Direct Fallback to Hugging Face Inference API with client-side multi-model cascade
  if (!effectiveHfKey) {
    throw new Error('Hugging Face API Key (HF_TOKEN) is required for Santhali STT transcription. Please enter your Hugging Face API key in Voice Settings.');
  }

  let queue = [...MODEL_CASCADE_LIST];
  if (model && model !== 'auto' && MODEL_CASCADE_LIST.includes(model)) {
    queue = [model, ...MODEL_CASCADE_LIST.filter(m => m !== model)];
  }

  let lastErr = null;

  for (let i = 0; i < queue.length; i++) {
    const targetModel = queue[i];
    try {
      const hfEndpoint = `https://api-inference.huggingface.co/models/${targetModel}`;
      const directRes = await fetch(hfEndpoint, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${effectiveHfKey}`,
          'Content-Type': audioBlob.type || 'audio/webm'
        },
        body: audioBlob
      });

      const data = await directRes.json();

      if (directRes.ok) {
        const transcriptText = Array.isArray(data) ? data[0]?.text : data?.text;
        if (transcriptText && transcriptText.trim() !== '') {
          return {
            success: true,
            text: transcriptText,
            model: targetModel,
            fallbackUsed: i > 0
          };
        }
      }

      if (data && data.error) {
        if (data.estimated_time) {
          console.warn(`[Santhali Direct STT] Model ${targetModel} is warming up. Trying next model...`);
          continue;
        }
        lastErr = data.error;
      }
    } catch (err) {
      console.error(`[Santhali Direct STT] Model ${targetModel} error:`, err);
      lastErr = err.message;
    }
  }

  throw new Error(lastErr || 'Santhali AI transcription failed across available models. Please try again.');
};
