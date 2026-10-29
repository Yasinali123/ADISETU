import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { askGrokAI } from '../../api/grokApi';
import { SarvamStudio } from './SarvamStudio';
import { 
  SANTHALI_STT_MODELS, 
  DEFAULT_SANTHALI_MODEL, 
  transcribeSanthaliAudio 
} from '../../api/santhaliSttApi';
import { 
  Mic, 
  Volume2, 
  Sparkles, 
  Send, 
  Settings, 
  AlertCircle, 
  Cpu, 
  Languages, 
  Radio, 
  Key, 
  Disc, 
  ArrowRight,
  Trash2,
  User,
  MessageSquare
} from 'lucide-react';

export const VoiceInterface = () => {
  const { 
    lang, 
    setLang, 
    t, 
    playAudioResponse, 
    stopAudio, 
    isPlayingAudio,
    isSarvamVoiceActive,
    setIsSarvamVoiceActive,
    selectedVoice,
    setSelectedVoice,
    indianVoices,
    sarvamApiKey,
    setSarvamApiKey
  } = useLanguage();

  // State Management
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [textInput, setTextInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  
  // API Keys & Model States
  const [customKey, setCustomKey] = useState(localStorage.getItem('groq_api_key') || localStorage.getItem('xai_api_key') || '');
  const [customSarvamKey, setCustomSarvamKey] = useState(sarvamApiKey);
  const [hfApiKey, setHfApiKey] = useState(localStorage.getItem('hf_api_key') || '');
  const [santhaliModel, setSanthaliModel] = useState(
    localStorage.getItem('santhali_stt_model') || DEFAULT_SANTHALI_MODEL
  );
  
  const [activeSubTab, setActiveSubTab] = useState('assistant'); // 'assistant' | 'studio'
  const [chatHistory, setChatHistory] = useState([]);

  // Speech Recognition & Recording Refs
  const recognitionRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const latestTranscriptRef = useRef('');
  const queryProcessedRef = useRef(false);
  const textInputRef = useRef(null);

  // Diverse quick agricultural questions for testing and quick access
  const quickQuestionsByLang = {
    hi: [
      { id: 'q1', label: 'धान में पीलापन', text: 'धान के पौधों में पीलापन दूर करने के लिए कौन सी खाद या स्प्रे डालें?' },
      { id: 'q2', label: 'टमाटर झुलसा रोग', text: 'टमाटर के पत्तों पर काले धब्बे और झुलसा रोग का क्या उपचार है?' },
      { id: 'q3', label: 'तना छेदक कीट', text: 'धान में तना छेदक (stem borer) कीट से बचाव का जैविक उपाय क्या है?' },
      { id: 'q4', label: 'मक्का बुवाई', text: 'झारखंड की लाल मिट्टी में मक्के की अच्छी पैदावार के लिए क्या सलाह है?' },
      { id: 'q5', label: 'यूरिया और डीएपी', text: 'गेहूं और सब्जियों में यूरिया और डीएपी का सही अनुपात कितना होना चाहिए?' }
    ],
    en: [
      { id: 'q1', label: 'Paddy Yellowing', text: 'What is the best fertilizer or treatment for yellowing leaves in paddy?' },
      { id: 'q2', label: 'Tomato Blight', text: 'How do I identify and treat early blight on tomato crop leaves?' },
      { id: 'q3', label: 'Stem Borer Control', text: 'What is the most effective organic control for paddy stem borer in Khunti?' },
      { id: 'q4', label: 'Red Soil Maize', text: 'Which maize practices and varieties work best in Jharkhand red soils?' },
      { id: 'q5', label: 'Fertilizer Ratio', text: 'What is the recommended ratio of urea and DAP for vegetable farming?' }
    ],
    sat: [
      { id: 'q1', label: 'ᱦᱩᱲᱩ ᱥᱤᱛᱷ ᱵᱞᱟᱭᱤᱴ', text: 'ᱦᱩᱲᱩ ᱪᱟᱥ ᱨᱮ ᱥᱤᱛᱷ ᱵᱞᱟᱭᱤᱴ ᱨᱚᱜᱽ ᱞᱟᱹᱜᱤᱫ ᱪᱮᱫ ᱨᱟᱱ ᱪᱟᱯᱟᱰᱟ?' },
      { id: 'q2', label: 'ᱴᱚᱢᱟᱴᱚ ᱨᱚᱜᱽ', text: 'ᱴᱚᱢᱟᱴᱚ ᱪᱟᱥ ᱨᱮ ᱮᱨᱞᱤ ᱵᱞᱟᱭᱤᱴ ᱨᱚᱜᱽ ᱠᱷᱚᱱ ᱪᱮᱫ ᱞᱮᱠᱟ ᱵᱟᱧᱪᱟᱣ ᱦᱩᱭᱩᱜ-ᱟ?' },
      { id: 'q3', label: 'ᱡᱚᱱᱰᱨᱟ ᱪᱟᱥ', text: 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱱᱟᱜ ᱟᱨᱟᱜ ᱦᱟᱥᱟ ᱨᱮ ᱡᱚᱱᱰᱨᱟ ᱪᱟᱥ ᱞᱟᱹᱜᱤᱫ ᱪᱮᱫ ᱥᱚᱞᱦᱮ ᱢᱮᱱᱟᱜ-ᱟ?' }
    ]
  };

  const samplePrompts = quickQuestionsByLang[lang] || quickQuestionsByLang.hi;

  useEffect(() => {
    // Setup Web Speech Recognition for standard languages (hi / en)
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setErrorMessage('');
      };

      recognitionRef.current.onresult = (event) => {
        const currentTranscript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setTranscript(currentTranscript);
        latestTranscriptRef.current = currentTranscript;
      };

      recognitionRef.current.onerror = (err) => {
        console.warn('[SpeechRecognition] Error:', err.error);
        setIsListening(false);
        if (err.error === 'not-allowed' || err.error === 'service-not-allowed') {
          setErrorMessage('Microphone access was denied. Please allow microphone permission in browser settings or type your question below.');
        } else if (err.error === 'no-speech') {
          setErrorMessage('No speech detected. Please tap the mic and speak clearly, or type your question below.');
        } else if (err.error !== 'aborted' && lang !== 'sat') {
          setErrorMessage('Speech recognition encountered an issue. Try typing your question or using Santhali AI recording.');
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
        // Automatically submit voice query when user finishes speaking!
        const finalQuery = latestTranscriptRef.current?.trim();
        if (finalQuery && !queryProcessedRef.current) {
          queryProcessedRef.current = true;
          latestTranscriptRef.current = '';
          processQuery(finalQuery);
        }
      };
    }

    return () => {
      if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
      }
      if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
        try { mediaRecorderRef.current.stop(); } catch (e) {}
      }
    };
  }, [lang]);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    localStorage.setItem('groq_api_key', customKey);
    localStorage.setItem('hf_api_key', hfApiKey);
    localStorage.setItem('santhali_stt_model', santhaliModel);
    setSarvamApiKey(customSarvamKey);
    setShowSettings(false);
  };

  // Dedicated Santhali Mic Audio Recorder using Hugging Face STT Models
  const startSanthaliMicRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        // Stop audio tracks
        stream.getTracks().forEach(track => track.stop());

        setIsProcessing(true);
        setErrorMessage('');
        setTranscript('Transcribing Santhali voice with AI model...');

        try {
          const result = await transcribeSanthaliAudio({
            audioBlob,
            model: santhaliModel,
            hfApiKey: hfApiKey
          });

          if (result.success && result.text) {
            setTranscript(result.text);
            processQuery(result.text);
          } else {
            setErrorMessage('Could not transcribe Santhali speech. Please try speaking clearly or enter your query.');
            setIsProcessing(false);
          }
        } catch (err) {
          console.error('[Santhali STT Error]:', err);
          setIsProcessing(false);
          if (err.message && err.message.includes('Hugging Face API Key')) {
            setErrorMessage('Hugging Face API Key required for Santhali STT. Please open Settings (⚙) and add your HF_TOKEN.');
            setShowSettings(true);
          } else {
            setErrorMessage(err.message || 'Santhali AI Transcription failed.');
          }
        }
      };

      mediaRecorderRef.current.start();
      setIsListening(true);
      setErrorMessage('');
    } catch (err) {
      console.warn('[Microphone Error]:', err);
      setErrorMessage('Microphone access denied or unavailable. Please type your query below.');
      textInputRef.current?.focus();
    }
  };

  const stopSanthaliMicRecording = () => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
      setIsListening(false);
    }
  };

  const handleMicToggle = () => {
    stopAudio();

    if (isListening) {
      if (lang === 'sat' && mediaRecorderRef.current) {
        stopSanthaliMicRecording();
      } else if (recognitionRef.current) {
        try { recognitionRef.current.stop(); } catch (e) {}
        setIsListening(false);
        const queryToProcess = latestTranscriptRef.current?.trim() || transcript.trim();
        if (queryToProcess && !queryProcessedRef.current) {
          queryProcessedRef.current = true;
          latestTranscriptRef.current = '';
          processQuery(queryToProcess);
        }
      }
    } else {
      setTranscript('');
      setAiResponse('');
      latestTranscriptRef.current = '';
      queryProcessedRef.current = false;
      setErrorMessage('');

      if (lang === 'sat') {
        startSanthaliMicRecording();
      } else if (recognitionRef.current) {
        try {
          recognitionRef.current.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
          recognitionRef.current.start();
        } catch (e) {
          console.warn('[SpeechRecognition] Start error:', e);
          setErrorMessage('Could not activate microphone. Please type your question below.');
          textInputRef.current?.focus();
        }
      } else {
        setErrorMessage('Speech recognition is not supported in this browser. Please type your question below.');
        textInputRef.current?.focus();
      }
    }
  };

  const handleSendText = (e) => {
    e?.preventDefault();
    if (!textInput.trim()) return;

    const query = textInput.trim();
    setTextInput('');
    stopAudio();
    processQuery(query);
  };

  const handleQuickPrompt = (promptText) => {
    setTextInput('');
    stopAudio();
    processQuery(promptText);
  };

  const handleClearHistory = () => {
    stopAudio();
    setChatHistory([]);
    setTranscript('');
    setAiResponse('');
    setErrorMessage('');
  };

  const processQuery = async (queryText) => {
    if (!queryText || !queryText.trim()) return;
    const cleanQuery = queryText.trim();

    // Add user question to multi-turn conversation history
    const userMsg = {
      id: 'usr_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
      role: 'user',
      content: cleanQuery,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatHistory(prev => [...prev, userMsg]);
    setTranscript(cleanQuery);
    setAiResponse('');
    setIsProcessing(true);
    setErrorMessage('');

    try {
      console.log('[ADISETU Voice] Submitting question to AI:', cleanQuery);
      // Pass full conversation history so Groq AI knows previous questions & provides fresh, tailored answers
      const answer = await askGrokAI(cleanQuery, lang, customKey, chatHistory);
      console.log('[ADISETU Voice] Received AI Answer:', answer);

      const assistantMsg = {
        id: 'ai_' + Date.now() + '_' + Math.random().toString(36).substr(2, 4),
        role: 'assistant',
        content: answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatHistory(prev => [...prev, assistantMsg]);
      setAiResponse(answer);
      setIsProcessing(false);

      // Play voice answer out loud
      if (answer && !answer.startsWith('[AI Notice]') && !answer.startsWith('[AI Error]')) {
        playAudioResponse(answer);
      } else if (answer.startsWith('[AI Notice]') || answer.startsWith('[AI Error]')) {
        setErrorMessage(answer);
      }
    } catch (err) {
      console.error('[Process Query Error]:', err);
      setIsProcessing(false);
      setErrorMessage('Failed to fetch response. Please check your internet connection and try again.');
    }
  };

  return (
    <section className="py-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-3 relative">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs font-black uppercase tracking-widest text-harvest bg-harvest-pale px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-harvest" />
            ADISETU Multilingual AI Voice Companion
          </span>
          
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-1.5 rounded-full bg-paper border border-paper-dark text-charcoal hover:text-forest hover:bg-paper-dark transition-all flex items-center gap-1 px-2.5"
            title="Configure API Keys & Santhali / Indian Voice Models"
          >
            <Settings className="w-4 h-4 text-forest" />
            <span className="text-xxs font-bold uppercase hidden sm:inline">Settings</span>
          </button>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-forest">
          {t('voiceTitle')}
        </h2>
        <p className="text-sm sm:text-base text-charcoal-muted max-w-md mx-auto">
          {t('voiceSub')}
        </p>

        {/* Sub-Tab Switcher */}
        <div className="flex justify-center pt-2">
          <div className="bg-paper-card border border-paper-dark p-1 rounded-2xl flex flex-col sm:flex-row gap-1 shadow-inner w-full sm:w-auto">
            <button
              onClick={() => setActiveSubTab('assistant')}
              className={`px-4 py-2.5 sm:py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                activeSubTab === 'assistant' 
                  ? 'bg-forest text-paper shadow-md' 
                  : 'text-charcoal-muted hover:text-forest'
              }`}
            >
              <Mic className="w-3.5 h-3.5 text-harvest" />
              <span>AI Farm Advisor</span>
            </button>
            
            <button
              onClick={() => setActiveSubTab('studio')}
              className={`px-4 py-2.5 sm:py-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                activeSubTab === 'studio' 
                  ? 'bg-forest text-paper shadow-md' 
                  : 'text-charcoal-muted hover:text-forest'
              }`}
            >
              <Languages className="w-3.5 h-3.5 text-harvest" />
              <span>Sarvam AI Accent & Translate Studio</span>
            </button>
          </div>
        </div>
      </div>

      {/* Settings Modal Drawer */}
      {showSettings && (
        <div className="bg-paper-card border-2 border-forest-light rounded-3xl p-6 shadow-xl animate-fadeIn space-y-4">
          <div className="flex items-center justify-between border-b border-paper-dark pb-3">
            <h3 className="text-lg font-bold text-forest flex items-center gap-2">
              <Cpu className="w-5 h-5 text-harvest" />
              AI Voice, API & Santhali STT Settings
            </h3>
            <button
              onClick={() => setShowSettings(false)}
              className="text-xs text-charcoal-muted hover:text-charcoal font-bold"
            >
              ✕ Close
            </button>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4">
            {/* Santhali Hugging Face API Key */}
            <div className="space-y-1 bg-amber-500/10 p-3.5 rounded-2xl border border-amber-500/30">
              <label className="text-xs font-bold text-forest uppercase flex items-center gap-1.5">
                <Key className="w-3.5 h-3.5 text-harvest" />
                Hugging Face Token (HF_TOKEN) for Santhali Speech-to-Text
              </label>
              <input
                type="password"
                value={hfApiKey}
                onChange={(e) => setHfApiKey(e.target.value)}
                placeholder="hf_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                className="w-full px-4 py-2 rounded-xl border border-paper-dark bg-paper text-sm text-forest font-mono focus:ring-2 focus:ring-forest outline-none"
              />
              <p className="text-xxs text-amber-800 font-semibold">
                Required for direct Santhali Ol Chiki speech transcription via Whisper / IndicConformer AI models.
              </p>
            </div>

            {/* Santhali Model Picker */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-forest uppercase flex items-center gap-1.5">
                <Disc className="w-3.5 h-3.5 text-harvest" />
                Santhali STT AI Model Architecture
              </label>
              <select
                value={santhaliModel}
                onChange={(e) => setSanthaliModel(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-paper-dark bg-paper text-xs text-forest font-bold focus:ring-2 focus:ring-forest outline-none"
              >
                {SANTHALI_STT_MODELS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.provider})
                  </option>
                ))}
              </select>
            </div>

            {/* Sarvam AI API Key */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-forest uppercase flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-harvest" />
                Sarvam AI API Key (Translation & Indian Accent TTS)
              </label>
              <input
                type="password"
                value={customSarvamKey}
                onChange={(e) => setCustomSarvamKey(e.target.value)}
                placeholder="sk_q7qre2sd_skbmTZP7ExF7j4YxeumJT0KT"
                className="w-full px-4 py-2.5 rounded-xl border border-paper-dark bg-paper text-sm text-forest font-mono focus:ring-2 focus:ring-forest outline-none"
              />
            </div>

            {/* Indian Speaker Voice Selection */}
            <div className="space-y-1 pt-1">
              <label className="text-xs font-bold text-forest uppercase">
                Default Indian Accent Voice (Bulbul:v3 Model)
              </label>
              <select
                value={selectedVoice}
                onChange={(e) => setSelectedVoice(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-paper-dark bg-paper text-sm text-forest font-bold focus:ring-2 focus:ring-forest outline-none"
              >
                {indianVoices.map((v) => (
                  <option key={v.id} value={v.id}>
                    {v.name} ({v.gender})
                  </option>
                ))}
              </select>
            </div>

            {/* Groq API Key */}
            <div className="space-y-1 pt-1 border-t border-paper-dark">
              <label className="text-xs font-bold text-charcoal uppercase">
                Groq AI API Key (Qwen 3.8-27b Live Reasoning)
              </label>
              <input
                type="password"
                value={customKey}
                onChange={(e) => setCustomKey(e.target.value)}
                placeholder="gsk_7MNLaJ4WwA600fpx..."
                className="w-full px-4 py-2.5 rounded-xl border border-paper-dark bg-paper text-sm text-forest font-mono focus:ring-2 focus:ring-forest outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-forest text-xs font-bold text-paper hover:bg-forest-dark transition-all"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      )}

      {/* RENDER ACTIVE SUB TAB */}
      {activeSubTab === 'studio' ? (
        <SarvamStudio />
      ) : (
        <>
          {/* Main Ambient Voice Focal Card */}
          <div className="bg-gradient-to-b from-forest to-forest-dark rounded-4xl p-6 sm:p-10 text-paper text-center shadow-elevated-farm border-4 border-paper-card space-y-6 relative overflow-hidden">
            
            {/* Status Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-forest-light/30 pb-4">
              
              {/* Status Badge */}
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${
                  isListening ? 'bg-emerald-400 animate-ping' :
                  isProcessing ? 'bg-amber-400 animate-spin' :
                  isPlayingAudio ? 'bg-harvest animate-pulse' :
                  'bg-emerald-400'
                }`} />
                <span className="text-xs font-bold uppercase tracking-wider text-paper-muted">
                  {isListening ? (lang === 'sat' ? 'Recording Santhali voice...' : 'Listening to your voice...') :
                   isProcessing ? 'AI Generating Advice...' :
                   isPlayingAudio ? 'Speaking Voice Answer...' : 'AI Ready to Help'}
                </span>
              </div>

              {/* Language Switcher Bar */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-paper-muted font-bold hidden sm:inline">{t('voiceLanguagesSupported')}</span>
                <div className="flex bg-forest-light p-1 rounded-xl border border-leaf-soft/30">
                  <button
                    onClick={() => setLang('en')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${lang === 'en' ? 'bg-harvest text-forest-dark font-black' : 'text-paper-muted'}`}
                  >
                    EN
                  </button>
                  <button
                    onClick={() => setLang('hi')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${lang === 'hi' ? 'bg-harvest text-forest-dark font-black' : 'text-paper-muted'}`}
                  >
                    हिन्दी
                  </button>
                  <button
                    onClick={() => setLang('sat')}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${lang === 'sat' ? 'bg-harvest text-forest-dark font-black' : 'text-paper-muted'}`}
                  >
                    ᱥᱟᱱᱛᱟᱲᱤ
                  </button>
                </div>
              </div>

            </div>

            {/* Error Alert Display */}
            {errorMessage && (
              <div className="bg-amber-500/20 border border-amber-400/40 rounded-2xl p-3 text-xs text-amber-200 flex items-center justify-between gap-2 text-left">
                <span className="flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  {errorMessage}
                </span>
                <button 
                  onClick={() => setErrorMessage('')}
                  className="text-amber-300 hover:text-white text-xs font-bold px-2 py-0.5 rounded"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Giant Mic Centerpiece */}
            <div className="py-4 flex justify-center">
              <div className="relative cursor-pointer" onClick={handleMicToggle}>
                
                {/* Wave Ripple Effects */}
                {isListening && (
                  <>
                    <div className="absolute -inset-6 rounded-full bg-harvest/30 animate-ping pointer-events-none" />
                    <div className="absolute -inset-12 rounded-full bg-leaf-highlight/20 animate-pulse pointer-events-none" />
                  </>
                )}

                <button
                  className={`w-32 h-32 sm:w-40 sm:h-40 rounded-full flex flex-col items-center justify-center border-4 border-paper shadow-glow-mic transition-all transform hover:scale-105 active:scale-95 ${
                    isListening
                      ? 'bg-harvest text-forest-dark scale-110 shadow-glow-harvest'
                      : isPlayingAudio
                      ? 'bg-emerald-500 text-paper scale-105 animate-pulse'
                      : 'bg-forest-light text-harvest-amber hover:bg-forest-subtle'
                  }`}
                  title={isListening ? "Tap to finish speaking" : "Tap to speak your question"}
                >
                  <Mic className={`w-14 h-14 sm:w-16 sm:h-16 ${isListening ? 'animate-bounce text-forest-dark' : 'text-harvest-amber'}`} />
                  <span className="text-xs font-black uppercase tracking-wider mt-1 text-paper">
                    {isListening ? (lang === 'sat' ? 'Recording... Tap to Send' : 'Listening... (Tap to Send)') : 'Tap to Speak'}
                  </span>
                </button>

              </div>
            </div>

            {/* Dynamic Waveform Visualizer */}
            {(isListening || isPlayingAudio || isProcessing) && (
              <div className="flex items-center justify-center gap-1.5 h-8">
                <span className="w-1.5 bg-harvest animate-wave-1 rounded-full h-8" />
                <span className="w-1.5 bg-harvest animate-wave-2 rounded-full h-8" />
                <span className="w-1.5 bg-harvest animate-wave-3 rounded-full h-8" />
                <span className="w-1.5 bg-harvest animate-wave-4 rounded-full h-8" />
                <span className="w-1.5 bg-harvest animate-wave-5 rounded-full h-8" />
              </div>
            )}

            {/* Live Speaking Indicator */}
            {isListening && transcript && (
              <div className="bg-forest-light/60 px-4 py-2.5 rounded-2xl border border-harvest/40 max-w-md mx-auto animate-fadeIn">
                <p className="text-xs text-harvest uppercase font-bold tracking-wider">Hearing you say:</p>
                <p className="text-sm font-semibold italic text-paper">"{transcript}"</p>
              </div>
            )}

            {/* Status Subtext */}
            <p className="text-sm font-semibold text-paper-muted">
              {isListening
                ? (lang === 'sat' ? 'Recording Santhali audio... tap to finish' : t('voiceListening'))
                : isProcessing
                ? "ADISETU AI is analyzing your specific agricultural question..."
                : isPlayingAudio
                ? "Speaking advisory answer aloud..."
                : t('voicePlaceholder')}
            </p>

            {/* Direct Text Question Input */}
            <form onSubmit={handleSendText} className="pt-2 flex gap-2 max-w-lg mx-auto">
              <input
                ref={textInputRef}
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder={
                  lang === 'hi' 
                    ? "फसल, खाद या कीट से जुड़ा कोई भी सवाल टाइप करें..." 
                    : lang === 'sat'
                    ? "ᱪᱟᱥ ᱟᱨ ᱨᱟᱱ ᱵᱟᱵᱚᱛ ᱠᱩᱠᱞᱤ ᱚᱞ ᱢᱮ..."
                    : "Type any farming question here..."
                }
                className="flex-grow px-4 py-2.5 rounded-2xl bg-forest-light/90 border border-leaf-soft/40 text-paper placeholder-paper-muted/60 text-sm focus:outline-none focus:ring-2 focus:ring-harvest"
              />
              <button
                type="submit"
                disabled={isProcessing || !textInput.trim()}
                className="px-5 py-2.5 rounded-2xl bg-harvest text-forest-dark font-black text-sm hover:bg-harvest-amber transition-all flex items-center gap-1.5 shadow-md disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>Ask</span>
              </button>
            </form>

            {/* Diverse Agricultural Quick Questions Chips */}
            <div className="pt-4 border-t border-forest-light/40 space-y-2.5">
              <p className="text-xs text-paper-muted uppercase font-bold tracking-wider">
                Ask a Specific Question (Click to test):
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2">
                {samplePrompts.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleQuickPrompt(item.text)}
                    disabled={isProcessing}
                    className="px-3 py-1.5 rounded-xl bg-forest-light/80 border border-leaf-soft/40 text-xs font-bold text-paper hover:bg-forest-light hover:border-harvest transition-all flex items-center gap-1.5 shadow-xs"
                    title={item.text}
                  >
                    <span className="text-harvest font-black">•</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>

          </div>

          {/* MULTI-TURN CONVERSATION THREAD */}
          {chatHistory.length > 0 && (
            <div className="bg-paper-card rounded-3xl p-6 sm:p-8 border border-paper-dark shadow-soft-natural space-y-5 animate-fadeIn">
              
              {/* Thread Header */}
              <div className="flex items-center justify-between border-b border-paper-dark pb-3">
                <div className="flex items-center gap-2 text-forest font-black text-sm uppercase tracking-wider">
                  <MessageSquare className="w-4 h-4 text-harvest" />
                  <span>Farm Consultation Thread ({chatHistory.filter(m => m.role === 'user').length} questions)</span>
                </div>
                
                <button
                  onClick={handleClearHistory}
                  className="px-3 py-1 rounded-xl bg-paper border border-paper-dark text-xs font-bold text-charcoal-muted hover:text-red-600 flex items-center gap-1.5 transition-all"
                  title="Clear conversation history and start fresh"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear Conversation</span>
                </button>
              </div>

              {/* Chat Messages Feed */}
              <div className="space-y-4">
                {chatHistory.map((msg) => (
                  <div 
                    key={msg.id}
                    className={`p-4 sm:p-5 rounded-2xl transition-all ${
                      msg.role === 'user' 
                        ? 'bg-paper border border-paper-dark text-forest ml-4 sm:ml-12 space-y-1' 
                        : 'bg-forest text-paper mr-4 sm:mr-12 space-y-2 shadow-md'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs font-bold">
                      <span className={`flex items-center gap-1.5 uppercase tracking-wider ${
                        msg.role === 'user' ? 'text-harvest' : 'text-harvest-amber'
                      }`}>
                        {msg.role === 'user' ? (
                          <>
                            <User className="w-3.5 h-3.5" />
                            <span>Farmer Question</span>
                          </>
                        ) : (
                          <>
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>ADISETU AI Advisory</span>
                          </>
                        )}
                      </span>

                      <div className="flex items-center gap-3">
                        <span className="text-xxs opacity-70">{msg.timestamp}</span>
                        {msg.role === 'assistant' && (
                          <button
                            onClick={() => playAudioResponse(msg.content)}
                            className="px-2.5 py-0.5 rounded-lg bg-forest-light text-paper text-xxs font-bold hover:bg-forest-light/80 flex items-center gap-1 transition-all"
                            title="Play this response out loud"
                          >
                            <Volume2 className="w-3 h-3 text-harvest" />
                            <span>Replay Voice</span>
                          </button>
                        )}
                      </div>
                    </div>

                    <p className={`text-sm leading-relaxed ${msg.role === 'user' ? 'font-bold italic' : 'font-medium'}`}>
                      {msg.content}
                    </p>
                  </div>
                ))}

                {/* Processing Bubble */}
                {isProcessing && (
                  <div className="p-4 rounded-2xl bg-forest/80 text-paper mr-8 space-y-2 animate-pulse">
                    <span className="text-xs font-bold text-harvest-amber flex items-center gap-1.5 uppercase">
                      <Sparkles className="w-3.5 h-3.5 animate-spin" />
                      Analyzing your question with live agricultural intelligence...
                    </span>
                    <div className="flex gap-1.5 py-1">
                      <span className="w-2 h-2 rounded-full bg-harvest animate-bounce" />
                      <span className="w-2 h-2 rounded-full bg-harvest animate-bounce [animation-delay:0.2s]" />
                      <span className="w-2 h-2 rounded-full bg-harvest animate-bounce [animation-delay:0.4s]" />
                    </div>
                  </div>
                )}
              </div>

            </div>
          )}
        </>
      )}

    </section>
  );
};
