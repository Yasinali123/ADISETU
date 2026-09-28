/**
 * xAI Realtime Voice Agent Client Engine
 * 
 * Handles WebSockets, Web Audio API PCM streaming, microphone input encoding,
 * live audio buffer playback, and streaming text transcript deltas.
 */

class XAiVoiceClient {
  constructor() {
    this.ws = null;
    this.audioContext = null;
    this.nextStartTime = 0;
    this.isConnected = false;
    this.isListening = false;
    this.isPlaying = false;
    this.mediaStream = null;
    this.scriptProcessor = null;
    this.audioInputSource = null;
    
    // Callbacks
    this.onStateChange = null;       // (state: 'connecting'|'connected'|'listening'|'speaking'|'idle'|'disconnected'|'error') => void
    this.onTranscriptDelta = null;   // (delta: string, fullTranscript: string) => void
    this.onVolumeChange = null;      // (volume: number 0..1) => void
    this.onError = null;             // (errorMsg: string) => void

    this.fullTranscript = '';
    this.sampleRate = 24000; // xAI default audio sample rate (24kHz PCM)
  }

  /**
   * Initialize Web Audio Context if not already active
   */
  initAudioContext() {
    if (!this.audioContext) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioCtx({ sampleRate: this.sampleRate });
    }
    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
  }

  /**
   * Connect to local WebSocket proxy (or direct backend server)
   * @param {Object} options { apiKey, agentId, serverUrl }
   */
  connect(options = {}) {
    const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
    const hostname = window.location.hostname || 'localhost';
    const primaryUrl = `${protocol}//${window.location.host}/ws-xai`;
    const fallbackUrl = `${protocol}//${hostname}:3001/ws-xai`;

    const targetUrl = options.serverUrl || (this._attemptedFallback ? fallbackUrl : primaryUrl);

    const queryParams = new URLSearchParams();
    if (options.apiKey) queryParams.set('apiKey', options.apiKey);
    if (options.agentId) queryParams.set('agentId', options.agentId);

    const fullWsUrl = `${targetUrl}${queryParams.toString() ? '?' + queryParams.toString() : ''}`;

    this._notifyState('connecting');

    try {
      this.ws = new WebSocket(fullWsUrl);

      this.ws.onopen = () => {
        console.log('[XAiVoiceClient] Connected to proxy endpoint:', fullWsUrl);
        this._attemptedFallback = false;
      };

      this.ws.onmessage = (event) => {
        this._handleMessage(event.data);
      };

      this.ws.onerror = (err) => {
        console.error('[XAiVoiceClient] WebSocket error on', fullWsUrl, err);
        if (!this._attemptedFallback && targetUrl === primaryUrl) {
          console.log('[XAiVoiceClient] Retrying connection on port 3001 server fallback...');
          this._attemptedFallback = true;
          setTimeout(() => this.connect(options), 500);
          return;
        }
        this._notifyState('error');
        if (this.onError) this.onError('WebSocket connection failed. Ensure xAI API proxy server is running.');
      };

      this.ws.onclose = (e) => {
        console.log('[XAiVoiceClient] WebSocket closed:', e.code, e.reason);
        this.isConnected = false;
        if (!this._attemptedFallback) {
          this._notifyState('disconnected');
        }
      };
    } catch (e) {
      console.error('[XAiVoiceClient] Connection initialization error:', e);
      this._notifyState('error');
      if (this.onError) this.onError(e.message);
    }
  }

  /**
   * Process incoming WebSocket messages from xAI Realtime API
   */
  _handleMessage(rawData) {
    try {
      const event = JSON.parse(rawData);
      
      // Proxy status message
      if (event.type === 'xai.connected') {
        this.isConnected = true;
        this._notifyState('connected');
        console.log('[XAiVoiceClient] xAI Realtime Agent Session Active:', event.agentId);
        return;
      }

      if (event.type === 'error') {
        console.error('[XAiVoiceClient] Agent error event:', event.message);
        if (this.onError) this.onError(event.message || 'xAI Agent returned an error');
        return;
      }

      // 1. Text transcript delta (streaming text output)
      if (event.type === 'response.output_audio_transcript.delta' || event.type === 'response.audio_transcript.delta') {
        const delta = event.delta || '';
        this.fullTranscript += delta;
        if (this.onTranscriptDelta) {
          this.onTranscriptDelta(delta, this.fullTranscript);
        }
      }

      // 2. Audio PCM output delta (streaming raw audio PCM chunks)
      if (event.type === 'response.output_audio.delta' || event.type === 'response.audio.delta') {
        if (event.delta) {
          this._playPcmAudioDelta(event.delta);
        }
      }

      // 3. Response state lifecycle events
      if (event.type === 'response.created') {
        this.fullTranscript = '';
        this._notifyState('speaking');
      }

      if (event.type === 'response.done' || event.type === 'response.completed') {
        console.log('[XAiVoiceClient] Response turn completed');
        setTimeout(() => {
          if (this.isConnected && !this.isListening) {
            this._notifyState('idle');
          }
        }, 500);
      }

    } catch (e) {
      console.warn('[XAiVoiceClient] Failed to parse message JSON:', rawData, e);
    }
  }

  /**
   * Decode base64 16-bit PCM audio and schedule for smooth gapless Web Audio playback
   */
  _playPcmAudioDelta(base64Pcm) {
    this.initAudioContext();

    try {
      const binaryString = atob(base64Pcm);
      const len = binaryString.length;
      const bytes = new Uint8Array(len);
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      // Convert 16-bit PCM byte array to Float32 sample array (-1.0 to 1.0)
      const int16Array = new Int16Array(bytes.buffer);
      const float32Array = new Float32Array(int16Array.length);
      let sumSq = 0;

      for (let i = 0; i < int16Array.length; i++) {
        const norm = int16Array[i] / 32768.0;
        float32Array[i] = norm;
        sumSq += norm * norm;
      }

      // Calculate audio amplitude for UI wave visualizer
      const rms = Math.sqrt(sumSq / (int16Array.length || 1));
      const volume = Math.min(1.0, rms * 4.0); // Boost amplitude scaling for smooth visuals
      if (this.onVolumeChange) {
        this.onVolumeChange(volume);
      }

      if (float32Array.length === 0) return;

      // Create AudioBuffer
      const audioBuffer = this.audioContext.createBuffer(1, float32Array.length, this.sampleRate);
      audioBuffer.getChannelData(0).set(float32Array);

      const source = this.audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(this.audioContext.destination);

      // Schedule seamless gapless audio playback
      const currentTime = this.audioContext.currentTime;
      if (this.nextStartTime < currentTime) {
        this.nextStartTime = currentTime + 0.02; // Small 20ms safety margin
      }

      source.start(this.nextStartTime);
      this.nextStartTime += audioBuffer.duration;
      this.isPlaying = true;
      this._notifyState('speaking');

      source.onended = () => {
        if (this.audioContext.currentTime >= this.nextStartTime - 0.05) {
          this.isPlaying = false;
          if (this.onVolumeChange) this.onVolumeChange(0);
          if (!this.isListening) {
            this._notifyState('idle');
          }
        }
      };
    } catch (err) {
      console.error('[XAiVoiceClient] Error playing PCM delta:', err);
    }
  }

  /**
   * Send text user input to xAI agent (matching user prompt snippet structure)
   * @param {string} text 
   * @param {string} systemContext Optional language/domain prompt context
   */
  sendTextMessage(text, systemContext = '') {
    if (!this.ws || this.ws.readyState !== WebSocket.OPEN) {
      if (this.onError) this.onError('WebSocket is not connected');
      return;
    }

    this.initAudioContext();
    this.fullTranscript = '';

    const messagePayload = systemContext 
      ? `${systemContext}\nUser question: ${text}`
      : text;

    // Send item creation event
    this.ws.send(JSON.stringify({
      type: 'conversation.item.create',
      item: {
        type: 'message',
        role: 'user',
        content: [{ type: 'input_text', text: messagePayload }]
      }
    }));

    // Send response generation request
    this.ws.send(JSON.stringify({ type: 'response.create' }));
    this._notifyState('speaking');
  }

  /**
   * Start live microphone streaming to xAI agent
   */
  async startMicrophone() {
    this.initAudioContext();

    try {
      this.mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          channelCount: 1,
          sampleRate: this.sampleRate,
          echoCancellation: true,
          noiseSuppression: true
        }
      });

      this.audioInputSource = this.audioContext.createMediaStreamSource(this.mediaStream);
      // Create ScriptProcessor for PCM extraction
      this.scriptProcessor = this.audioContext.createScriptProcessor(4096, 1, 1);

      this.scriptProcessor.onaudioprocess = (e) => {
        if (!this.isListening || !this.ws || this.ws.readyState !== WebSocket.OPEN) return;

        const inputBuffer = e.inputBuffer.getChannelData(0);
        
        // Convert Float32Array to 16-bit PCM
        const pcm16 = new Int16Array(inputBuffer.length);
        let sumSq = 0;
        for (let i = 0; i < inputBuffer.length; i++) {
          const s = Math.max(-1, Math.min(1, inputBuffer[i]));
          pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
          sumSq += s * s;
        }

        // Calculate input volume for visualizer
        const rms = Math.sqrt(sumSq / inputBuffer.length);
        if (this.onVolumeChange) {
          this.onVolumeChange(Math.min(1.0, rms * 5.0));
        }

        // Convert PCM Int16Array to Base64
        const bytes = new Uint8Array(pcm16.buffer);
        let binary = '';
        for (let i = 0; i < bytes.byteLength; i++) {
          binary += String.fromCharCode(bytes[i]);
        }
        const base64Audio = btoa(binary);

        // Stream audio chunk to xAI
        this.ws.send(JSON.stringify({
          type: 'input_audio_buffer.append',
          audio: base64Audio
        }));
      };

      this.audioInputSource.connect(this.scriptProcessor);
      this.scriptProcessor.connect(this.audioContext.destination);

      this.isListening = true;
      this._notifyState('listening');
      console.log('[XAiVoiceClient] Microphone stream started');

    } catch (err) {
      console.error('[XAiVoiceClient] Microphone access error:', err);
      if (this.onError) this.onError('Microphone permission denied or unavailable: ' + err.message);
      this._notifyState('error');
    }
  }

  /**
   * Stop microphone recording and request xAI response
   */
  stopMicrophone() {
    this.isListening = false;

    if (this.scriptProcessor) {
      this.scriptProcessor.disconnect();
      this.scriptProcessor = null;
    }

    if (this.audioInputSource) {
      this.audioInputSource.disconnect();
      this.audioInputSource = null;
    }

    if (this.mediaStream) {
      this.mediaStream.getTracks().forEach(track => track.stop());
      this.mediaStream = null;
    }

    if (this.onVolumeChange) this.onVolumeChange(0);

    // Send response create event to tell xAI to answer
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({ type: 'response.create' }));
    }

    this._notifyState('speaking');
    console.log('[XAiVoiceClient] Microphone stream stopped, response requested');
  }

  /**
   * Helper state change dispatcher
   */
  _notifyState(state) {
    if (this.onStateChange) {
      this.onStateChange(state);
    }
  }

  /**
   * Disconnect client session
   */
  disconnect() {
    this.stopMicrophone();
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
    this.isConnected = false;
    this.isListening = false;
    this.isPlaying = false;
    this._notifyState('disconnected');
  }
}

export const xaiVoiceClient = new XAiVoiceClient();
