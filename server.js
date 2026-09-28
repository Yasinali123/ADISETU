import express from 'express';
import { createServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());


const server = createServer(app);
const wss = new WebSocketServer({ server, path: '/ws-xai' });

const DEFAULT_AGENT_ID = process.env.XAI_AGENT_ID || 'agent_hqm1pHqkbVkCk2dJ';

app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    agentId: DEFAULT_AGENT_ID,
    hasApiKey: Boolean(process.env.XAI_API_KEY)
  });
});

app.post('/api/grok-chat', async (req, res) => {
  const { question, language, apiKey } = req.body;
  const key = apiKey || process.env.XAI_API_KEY || '';


  const systemPrompt = language === 'hi' 
    ? 'आप ADISETU Grok AI हैं, जो झारखंड के किसानों के कृषि सलाहकार हैं। सरल, व्यावहारिक और सटीक कृषि सलाह 2-3 वाक्यों में दें ताकि इसे आसानी से पढ़कर सुनाया जा सके।'
    : 'You are ADISETU Grok AI, an expert agricultural AI advisor for farmers in Jharkhand, India. Provide clear, practical, concise farming advice (2-3 sentences max) suitable for text-to-speech voice playback.';

  try {
    const xaiRes = await fetch('https://api.x.ai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      body: JSON.stringify({
        model: 'grok-2-latest',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: question }
        ],
        temperature: 0.6,
        max_tokens: 300
      })
    });

    if (xaiRes.ok) {
      const data = await xaiRes.json();
      const answer = data.choices?.[0]?.message?.content;
      if (answer) {
        return res.json({ success: true, answer, source: 'grok-ai' });
      }
    }

    const errData = await xaiRes.json().catch(() => ({}));
    return res.status(xaiRes.status).json({ success: false, error: errData.error || 'Grok API Error' });

  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Sarvam AI Translate Proxy Endpoint
app.post('/api/sarvam-translate', async (req, res) => {
  const { input, sourceLanguageCode, targetLanguageCode, speakerGender, mode, apiKey } = req.body;
  const key = apiKey || process.env.SARVAM_API_KEY || '';

  if (!input || !input.trim()) {
    return res.status(400).json({ success: false, error: 'Input text is required' });
  }

  try {
    const sarvamRes = await fetch('https://api.sarvam.ai/translate', {
      method: 'POST',
      headers: {
        'api-subscription-key': key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        input: input.trim(),
        source_language_code: sourceLanguageCode || 'en-IN',
        target_language_code: targetLanguageCode || 'hi-IN',
        speaker_gender: speakerGender || 'Female',
        mode: mode || 'formal',
        model: 'mayura:v1'
      })
    });

    const data = await sarvamRes.json();
    if (sarvamRes.ok && data.translated_text) {
      return res.json({
        success: true,
        translatedText: data.translated_text,
        sourceLanguageCode: data.source_language_code,
        targetLanguageCode: targetLanguageCode || 'hi-IN'
      });
    }

    return res.status(sarvamRes.status).json({
      success: false,
      error: data.error?.message || data.message || 'Sarvam Translation API error'
    });
  } catch (err) {
    console.error('[Sarvam Proxy] Translation Error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});

// Sarvam AI Text-to-Speech (Indian Accent Voice) Proxy Endpoint
app.post('/api/sarvam-tts', async (req, res) => {
  const { input, targetLanguageCode, speaker, pace, loudness, pitch, apiKey } = req.body;
  const key = apiKey || process.env.SARVAM_API_KEY || '';

  if (!input || !input.trim()) {
    return res.status(400).json({ success: false, error: 'Input text is required for TTS' });
  }

  const langCode = targetLanguageCode || 'hi-IN';
  
  // Default Indian Accent Speakers by language for bulbul:v3
  let defaultSpeaker = speaker;
  if (!defaultSpeaker) {
    if (langCode === 'hi-IN') defaultSpeaker = 'ritu';
    else if (langCode === 'en-IN') defaultSpeaker = 'simran';
    else if (langCode.startsWith('bn')) defaultSpeaker = 'roopa_bn_conversational';
    else if (langCode.startsWith('mr')) defaultSpeaker = 'rupali';
    else if (langCode.startsWith('ta')) defaultSpeaker = 'vijay';
    else if (langCode.startsWith('te')) defaultSpeaker = 'kavitha';
    else defaultSpeaker = 'simran';
  }

  try {
    const sarvamRes = await fetch('https://api.sarvam.ai/text-to-speech', {
      method: 'POST',
      headers: {
        'api-subscription-key': key,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        inputs: [input.trim().slice(0, 500)], // Limit single turn chunk length
        target_language_code: langCode,
        speaker: defaultSpeaker,
        pitch: pitch !== undefined ? pitch : 0,
        pace: pace !== undefined ? pace : 1.0,
        loudness: loudness !== undefined ? loudness : 1.5,
        speech_sample_rate: 16000,
        enable_preprocessing: true,
        model: 'bulbul:v3'
      })
    });

    const data = await sarvamRes.json();
    if (sarvamRes.ok && data.audios && data.audios[0]) {
      return res.json({
        success: true,
        audioBase64: data.audios[0],
        mimeType: 'audio/wav',
        speaker: defaultSpeaker,
        language: langCode
      });
    }

    return res.status(sarvamRes.status).json({
      success: false,
      error: data.error?.message || data.message || 'Sarvam TTS API error'
    });
  } catch (err) {
    console.error('[Sarvam Proxy] TTS Error:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
});


wss.on('connection', (clientWs, req) => {
  console.log('[xAI Voice Proxy] Client connected via WebSocket');

  // Extract query parameters if client passes explicit key or agent_id override
  const DEFAULT_KEY = process.env.XAI_API_KEY || '';
  const apiKey = urlParams.get('apiKey') || DEFAULT_KEY;
  const agentId = urlParams.get('agentId') || DEFAULT_AGENT_ID;

  if (!apiKey) {
    console.warn('[xAI Voice Proxy] Warning: No XAI_API_KEY configured');
    clientWs.send(JSON.stringify({
      type: 'error',
      message: 'XAI_API_KEY is not set in environment or client settings.'
    }));
  }

  const xaiUrl = `wss://api.x.ai/v1/realtime?agent_id=${agentId}`;
  console.log(`[xAI Voice Proxy] Connecting to xAI Realtime endpoint: ${xaiUrl}`);

  let xaiWs;
  try {
    xaiWs = new WebSocket(xaiUrl, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    });
  } catch (err) {
    console.error('[xAI Voice Proxy] Error instantiating WebSocket connection to xAI:', err);
    clientWs.send(JSON.stringify({ type: 'error', message: err.message }));
    clientWs.close();
    return;
  }

  xaiWs.on('open', () => {
    console.log('[xAI Voice Proxy] Connected to xAI Realtime API');
    clientWs.send(JSON.stringify({ type: 'xai.connected', agentId }));
  });

  xaiWs.on('unexpected-response', (req, res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => {
      console.error(`[xAI Voice Proxy] xAI returned HTTP ${res.statusCode}:`, body);
      try {
        const parsed = JSON.parse(body);
        const msg = parsed.error || parsed.message || `xAI HTTP ${res.statusCode}: ${res.statusMessage}`;
        if (clientWs.readyState === WebSocket.OPEN) {
          clientWs.send(JSON.stringify({ type: 'error', message: msg }));
        }
      } catch (e) {
        if (clientWs.readyState === WebSocket.OPEN) {
          clientWs.send(JSON.stringify({ type: 'error', message: `xAI HTTP ${res.statusCode}` }));
        }
      }
    });
  });

  xaiWs.on('message', (raw) => {
    try {
      const message = raw.toString();
      // Forward to browser client
      if (clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(message);
      }
    } catch (e) {
      console.error('[xAI Voice Proxy] Error forwarding xAI message:', e);
    }
  });

  xaiWs.on('error', (err) => {
    console.error('[xAI Voice Proxy] xAI WebSocket error:', err.message || err);
    if (clientWs.readyState === WebSocket.OPEN) {
      clientWs.send(JSON.stringify({ type: 'error', message: err.message || 'xAI connection error' }));
    }
  });

  xaiWs.on('close', (code, reason) => {
    console.log(`[xAI Voice Proxy] xAI connection closed: ${code} ${reason}`);
    if (clientWs.readyState === WebSocket.OPEN) {
      clientWs.send(JSON.stringify({ type: 'xai.disconnected', code, reason: reason.toString() }));
      clientWs.close();
    }
  });

  // Relay client messages to xAI
  clientWs.on('message', (data) => {
    try {
      if (xaiWs && xaiWs.readyState === WebSocket.OPEN) {
        xaiWs.send(data.toString());
      } else {
        console.warn('[xAI Voice Proxy] Cannot relay message; xAI socket is not OPEN.');
      }
    } catch (err) {
      console.error('[xAI Voice Proxy] Error forwarding client message:', err);
    }
  });

  clientWs.on('close', () => {
    console.log('[xAI Voice Proxy] Client disconnected');
    if (xaiWs && xaiWs.readyState === WebSocket.OPEN) {
      xaiWs.close();
    }
  });
});

// Serve frontend build from dist folder for production deployment (Render)
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback all non-API GET requests to index.html for React SPA client routing
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api') || req.path.startsWith('/ws')) {
    return next();
  }
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`[xAI Voice Server] Listening on http://localhost:${PORT}`);
  console.log(`[xAI Voice Server] WebSocket proxy endpoint: ws://localhost:${PORT}/ws-xai`);
});
