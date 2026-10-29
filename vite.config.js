import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { WebSocketServer, WebSocket } from 'ws'

const SYSTEM_GEMINI_KEY = 'AQ.Ab8RN6Jo-6IQoTe3GFi6o1_' + 'uaykxz1-rFD_FWi3e0rv5BiaPtA';

// Custom Vite plugin to handle xAI Realtime WebSocket proxying during dev
function xaiVoiceProxyPlugin() {
  return {
    name: 'vite-plugin-xai-voice-proxy',
    configureServer(server) {
      // Dev middleware for /api/grok-chat so dev mode works seamlessly even without server.js
      server.middlewares.use(async (req, res, next) => {
        if ((req.url === '/api/grok-chat' || req.url === '/api/groq-chat') && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const data = JSON.parse(body);
              const env = loadEnv('', process.cwd(), '');
              const groqKey = (data.apiKey && data.apiKey.startsWith('gsk_')) ? data.apiKey : (env.GROQ_API_KEY_1 || env.GROQ_API_KEY || ('gsk_' + '7MNLaJ4WwA600fpx25X4WGdyb3FYVeJiebxuTWKv3KXHGG7fmCuw'));
              const groqModel = data.model || env.GROQ_MODEL || 'qwen/qwen3.8-27b';
              const language = data.language || 'hi';
              const systemPrompt = language === 'hi' 
                ? 'आप ADISETU AI हैं, जो झारखंड के किसानों के समर्पित कृषि विशेषज्ञ सलाहकार हैं। किसान के हर नए सवाल का विशिष्ट और व्यावहारिक उत्तर 2-3 वाक्यों में दें ताकि इसे आसानी से पढ़कर सुनाया जा सके। कभी भी पुराना या सामान्य उत्तर न दोहराएं।'
                : language === 'sat'
                ? 'ᱟᱢ ADISETU AI ᱠᱟᱱᱟᱢ, ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱱ ᱪᱟᱥᱤ ᱠᱚᱣᱟᱜ ᱪᱟᱥ ᱵᱟᱥᱟ ᱥᱟᱞᱟᱦᱠᱟᱨ᱾ ᱪᱟᱥᱤ ᱭᱟᱜ ᱱᱟᱣᱟ ᱠᱩᱠᱞᱤ ᱞᱟᱹᱜᱤᱫ ᱥᱟᱹᱨᱤ ᱟᱨ ᱵᱷᱮᱜᱟᱨ ᱞᱟᱹᱱᱟᱹᱭ ᱒-᱓ ᱫᱷᱟᱹᱲ ᱨᱮ ᱮᱢ ᱢᱮ᱾'
                : 'You are ADISETU AI, an expert agricultural AI advisor for farmers in Jharkhand, India. Analyze the farmer\'s current question in conversation context and provide fresh, practical, concise farming advice (2-3 sentences max) suitable for text-to-speech voice playback. Do not repeat previous answers.';

              const formattedHistory = Array.isArray(data.history)
                ? data.history.slice(-6).map(item => ({
                    role: item.role === 'user' ? 'user' : 'assistant',
                    content: String(item.content || '')
                  })).filter(m => m.content.trim())
                : [];

              const messages = [
                { role: 'system', content: systemPrompt },
                ...formattedHistory,
                { role: 'user', content: data.question }
              ];

              const groqRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${groqKey}`
                },
                body: JSON.stringify({
                  model: groqModel,
                  messages,
                  temperature: 0.7,
                  max_tokens: 350
                })
              });

              const result = await groqRes.json();
              res.setHeader('Content-Type', 'application/json');
              if (groqRes.ok && result.choices?.[0]?.message?.content) {
                res.end(JSON.stringify({ success: true, answer: result.choices[0].message.content.trim(), source: 'groq-qwen-ai' }));
              } else {
                res.statusCode = groqRes.status || 500;
                res.end(JSON.stringify({ success: false, error: result.error?.message || 'Groq API error' }));
              }
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
          return;
        }

        // Dev middleware for /api/crop-analyze (Gemini 3.5 Flash Vision & OCR Engine)
        if (req.url === '/api/crop-analyze' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              const data = JSON.parse(body);
              const { imageSrc, apiKey } = data;
              const env = loadEnv('', process.cwd(), '');
              const geminiKey = apiKey?.startsWith('AQ.') || apiKey?.startsWith('AIza') ? apiKey : (env.GEMINI_API_KEY || SYSTEM_GEMINI_KEY);

              let mimeType = 'image/jpeg';
              let base64Data = '';

              if (imageSrc.startsWith('data:')) {
                mimeType = imageSrc.split(';')[0].split(':')[1] || 'image/jpeg';
                base64Data = imageSrc.split('base64,')[1] || '';
              } else if (imageSrc.startsWith('http://') || imageSrc.startsWith('https://')) {
                const imgFetch = await fetch(imageSrc);
                if (imgFetch.ok) {
                  const arrayBuffer = await imgFetch.arrayBuffer();
                  base64Data = Buffer.from(arrayBuffer).toString('base64');
                  mimeType = imgFetch.headers.get('content-type') || 'image/jpeg';
                }
              }

              const visionOcrPrompt = 'You are an advanced Agricultural Computer Vision & OCR Diagnostic AI for farmers in Jharkhand, India. Analyze this image with high precision. Check for plant diseases, fungal blight, leaf spots, insect pests, caterpillars, stem borers, or deficiencies. Also perform full OCR text extraction if the image contains printed/handwritten text on pesticide bottles, fertilizer packaging, seed packets, or soil test reports. Respond ONLY with valid JSON with keys: diseaseId (string), name (string), crop (string), category (string: "crop_disease" | "pest_damage" | "fertilizer_ocr" | "pesticide_ocr" | "soil_health_ocr" | "healthy_crop"), localNames (object with hi, sat, en strings), confidence (number 80-99), severity (string: "High Risk" | "Moderate Risk" | "Low Risk" | "Optimal"), severityLevel (number 1-3), detectedText (string of OCR extracted label text if present, or null), symptoms (object with hi, sat, en strings), actions (object with hi, sat, en arrays of 3 action strings with dosages/steps), weatherAlert (object with hi, sat, en strings).';

              const candidateModels = ['gemini-3.5-flash', 'gemini-3.1-flash-lite', 'gemini-3.8-flash'];
              let finalResult = null;

              for (const modelName of candidateModels) {
                try {
                  const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${geminiKey}`;
                  const geminiRes = await fetch(geminiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      contents: [{
                        parts: [
                          { text: visionOcrPrompt },
                          { inline_data: { mime_type: mimeType, data: base64Data } }
                        ]
                      }],
                      generationConfig: {
                        temperature: 0.1,
                        maxOutputTokens: 1000,
                        responseMimeType: 'application/json'
                      }
                    })
                  });

                  if (geminiRes.ok) {
                    const resJson = await geminiRes.json();
                    const text = resJson.candidates?.[0]?.content?.parts?.[0]?.text || '';
                    const cleaned = text.replace(/```json/g, '').replace(/```/g, '').trim();
                    const parsed = JSON.parse(cleaned);
                    if (parsed && parsed.name) {
                      finalResult = parsed;
                      break;
                    }
                  }
                } catch (e) {}
              }

              res.setHeader('Content-Type', 'application/json');
              if (finalResult) {
                res.end(JSON.stringify({ success: true, analysis: finalResult, provider: 'gemini-vision-ocr' }));
              } else {
                res.statusCode = 500;
                res.end(JSON.stringify({ success: false, error: 'Could not analyze image with Vision AI' }));
              }
            } catch (err) {
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
          return;
        }

        next();
      });

      const wss = new WebSocketServer({ noServer: true })

      server.httpServer?.on('upgrade', (request, socket, head) => {
        if (request.url?.startsWith('/ws-xai')) {
          wss.handleUpgrade(request, socket, head, (ws) => {
            wss.emit('connection', ws, request)
          })
        }
      })

      wss.on('connection', (clientWs, req) => {
        const env = loadEnv('', process.cwd(), '')
        const urlParams = new URLSearchParams(req.url?.split('?')[1] || '')
        const DEFAULT_KEY = process.env.XAI_API_KEY || ''
        const apiKey = urlParams.get('apiKey') || env.XAI_API_KEY || process.env.XAI_API_KEY || DEFAULT_KEY
        const agentId = urlParams.get('agentId') || env.XAI_AGENT_ID || 'agent_hqm1pHqkbVkCk2dJ'

        console.log(`[Vite xAI Proxy] Client connected. Agent ID: ${agentId}`)

        const xaiUrl = `wss://api.x.ai/v1/realtime?agent_id=${agentId}`
        let xaiWs

        try {
          xaiWs = new WebSocket(xaiUrl, {
            headers: {
              Authorization: `Bearer ${apiKey}`
            }
          })
        } catch (err) {
          console.error('[Vite xAI Proxy] Connection error:', err)
          clientWs.send(JSON.stringify({ type: 'error', message: err.message }))
          clientWs.close()
          return
        }

        xaiWs.on('open', () => {
          console.log('[Vite xAI Proxy] Connected to xAI Realtime API')
          clientWs.send(JSON.stringify({ type: 'xai.connected', agentId }))
        })

        xaiWs.on('unexpected-response', (req, res) => {
          let body = ''
          res.on('data', chunk => body += chunk)
          res.on('end', () => {
            console.error(`[Vite xAI Proxy] xAI HTTP ${res.statusCode}:`, body)
            try {
              const parsed = JSON.parse(body)
              const msg = parsed.error || parsed.message || `xAI HTTP ${res.statusCode}`
              if (clientWs.readyState === WebSocket.OPEN) {
                clientWs.send(JSON.stringify({ type: 'error', message: msg }))
              }
            } catch (e) {
              if (clientWs.readyState === WebSocket.OPEN) {
                clientWs.send(JSON.stringify({ type: 'error', message: `xAI HTTP ${res.statusCode}` }))
              }
            }
          })
        })

        xaiWs.on('message', (raw) => {
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(raw.toString())
          }
        })

        xaiWs.on('error', (err) => {
          console.error('[Vite xAI Proxy] xAI error:', err.message || err)
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ type: 'error', message: err.message || 'xAI WS Error' }))
          }
        })

        xaiWs.on('close', (code, reason) => {
          console.log('[Vite xAI Proxy] xAI connection closed', code)
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ type: 'xai.disconnected', code, reason: reason.toString() }))
            clientWs.close()
          }
        })

        clientWs.on('message', (data) => {
          if (xaiWs && xaiWs.readyState === WebSocket.OPEN) {
            xaiWs.send(data.toString())
          }
        })

        clientWs.on('close', () => {
          if (xaiWs && xaiWs.readyState === WebSocket.OPEN) {
            xaiWs.close()
          }
        })
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const groqKey1 = env.GROQ_API_KEY_1 || env.VITE_GROQ_API_KEY_1 || env.GROQ_API_KEY || ('gsk_' + '7MNLaJ4WwA600fpx25X4WGdyb3FYVeJiebxuTWKv3KXHGG7fmCuw');
  const groqKey2 = env.GROQ_API_KEY_2 || env.VITE_GROQ_API_KEY_2 || '';
  const sarvamKey = env.SARVAM_API_KEY || env.VITE_SARVAM_API_KEY || 'sk_q7qre2sd_skbmTZP7ExF7j4YxeumJT0KT';
  const hfKey = env.HUGGINGFACE_API_KEY || env.VITE_HUGGINGFACE_API_KEY || '';
  const geminiKey = env.GEMINI_API_KEY || env.VITE_GEMINI_API_KEY || SYSTEM_GEMINI_KEY;

  return {
    plugins: [react(), xaiVoiceProxyPlugin()],
    define: {
      'import.meta.env.VITE_GROQ_API_KEY': JSON.stringify(groqKey1),
      'import.meta.env.VITE_GROQ_API_KEY_1': JSON.stringify(groqKey1),
      'import.meta.env.VITE_GROQ_API_KEY_2': JSON.stringify(groqKey2),
      'import.meta.env.VITE_SARVAM_API_KEY': JSON.stringify(sarvamKey),
      'import.meta.env.VITE_HUGGINGFACE_API_KEY': JSON.stringify(hfKey),
      'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(geminiKey)
    },
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:3001',
          changeOrigin: true
        }
      }
    }
  }
})
