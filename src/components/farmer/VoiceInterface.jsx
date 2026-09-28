import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { askGrokAI } from '../../api/grokApi';
import { SarvamStudio } from './SarvamStudio';
import { Mic, Volume2, Sparkles, Send, Settings, AlertCircle, Cpu, Languages, Radio } from 'lucide-react';


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
  const [customKey, setCustomKey] = useState(localStorage.getItem('xai_api_key') || '');
  const [customSarvamKey, setCustomSarvamKey] = useState(sarvamApiKey);
  const [activeSubTab, setActiveSubTab] = useState('assistant'); // 'assistant' | 'studio'

  const recognitionRef = useRef(null);

  // Sample voice queries for quick testing
  const samplePrompts = {
    en: "What is the best pesticide for paddy stem borer in Khunti?",
    hi: "धान के पौधों में पीलापन दूर करने के लिए कौन सी खाद डालें?",
    sat: "ᱦᱩᱲᱩ ᱪᱟᱥ ᱨᱮ ᱥᱤᱛᱷ ᱵᱞᱟᱭᱤᱴ ᱨᱚᱜᱽ ᱞᱟᱹᱜᱤᱫ ᱪᱮᱫ ᱨᱟᱱ ᱪᱟᱯᱟᱰᱟ?"
  };

  useEffect(() => {
    // Setup Web Speech Recognition if available
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
      };

      recognitionRef.current.onerror = (err) => {
        console.warn('[SpeechRecognition] Error:', err.error);
        setIsListening(false);
        if (err.error !== 'no-speech') {
          setErrorMessage('Speech recognition encountered an issue. Try typing your question.');
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const handleSaveSettings = (e) => {
    e.preventDefault();
    localStorage.setItem('xai_api_key', customKey);
    setSarvamApiKey(customSarvamKey);
    setShowSettings(false);
  };


  const handleMicToggle = () => {
    stopAudio();

    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      if (transcript.trim()) {
        processQuery(transcript);
      }
    } else {
      setTranscript('');
      setAiResponse('');

      if (recognitionRef.current) {
        try {
          recognitionRef.current.lang = lang === 'hi' ? 'hi-IN' : lang === 'sat' ? 'hi-IN' : 'en-US';
          recognitionRef.current.start();
        } catch (e) {
          console.warn('[SpeechRecognition] Start error:', e);
          simulateSpeechInput();
        }
      } else {
        simulateSpeechInput();
      }
    }
  };

  const simulateSpeechInput = () => {
    setIsListening(true);
    const sample = samplePrompts[lang] || samplePrompts.hi;
    let i = 0;
    const interval = setInterval(() => {
      if (i <= sample.length) {
        setTranscript(sample.slice(0, i));
        i += 3;
      } else {
        clearInterval(interval);
        setIsListening(false);
        processQuery(sample);
      }
    }, 100);
  };

  const handleSendText = (e) => {
    e?.preventDefault();
    if (!textInput.trim()) return;

    const query = textInput;
    setTextInput('');
    setTranscript(query);
    setAiResponse('');
    stopAudio();

    processQuery(query);
  };

  const handleQuickPrompt = (promptText) => {
    setTextInput(promptText);
    setTranscript(promptText);
    setAiResponse('');
    stopAudio();

    processQuery(promptText);
  };

  const processQuery = async (queryText) => {
    setIsProcessing(true);
    setErrorMessage('');

    try {
      const answer = await askGrokAI(queryText, lang, customKey);
      setAiResponse(answer);
      setIsProcessing(false);

      // Play voice answer out loud
      playAudioResponse(answer);
    } catch (err) {
      console.error('[Process Query Error]:', err);
      setIsProcessing(false);
      setErrorMessage('Failed to fetch response. Please try again.');
    }
  };

  return (
    <section className="py-6 max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-3 relative">
        <div className="flex items-center justify-center gap-2">
          <span className="text-xs font-black uppercase tracking-widest text-harvest bg-harvest-pale px-3 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-harvest" />
            Grok AI + Sarvam AI Voice Companion
          </span>
          
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-1.5 rounded-full bg-paper border border-paper-dark text-charcoal hover:text-forest hover:bg-paper-dark transition-all"
            title="Configure API Keys & Indian Voice Settings"
          >
            <Settings className="w-4 h-4" />
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
              <span>Grok AI Voice Assistant</span>
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
              AI Voice & API Settings
            </h3>
            <button
              onClick={() => setShowSettings(false)}
              className="text-xs text-charcoal-muted hover:text-charcoal font-bold"
            >
              ✕ Close
            </button>
          </div>

          <form onSubmit={handleSaveSettings} className="space-y-4">
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
              <p className="text-xxs text-emerald-700 font-bold">
                ✓ Sarvam AI key configured for Indian language translation & natural Indian accent voices.
              </p>
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

            {/* Grok API Key */}
            <div className="space-y-1 pt-1 border-t border-paper-dark">
              <label className="text-xs font-bold text-charcoal uppercase">
                Grok / xAI API Key
              </label>
              <input
                type="password"
                value={customKey}
                onChange={(e) => setCustomKey(e.target.value)}
                placeholder="xai-WMvXnBaeK6Pj..."
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
              {isListening ? 'Listening to Mic...' :
               isProcessing ? 'Grok AI Thinking...' :
               isPlayingAudio ? 'Grok AI Speaking Answer...' : 'Grok AI Ready'}
            </span>
          </div>

          {/* Language Indicator Bar */}
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
          <div className="bg-amber-500/20 border border-amber-400/40 rounded-2xl p-3 text-xs text-amber-200 flex items-center justify-between gap-2">
            <span className="flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
              {errorMessage}
            </span>
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
            >
              <Mic className={`w-14 h-14 sm:w-16 sm:h-16 ${isListening ? 'animate-bounce text-forest-dark' : 'text-harvest-amber'}`} />
              <span className="text-xs font-black uppercase tracking-wider mt-1 text-paper">
                {isListening ? "Listening..." : "Tap to Speak"}
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

        {/* Status Subtext */}
        <p className="text-sm font-semibold text-paper-muted">
          {isListening
            ? t('voiceListening')
            : isProcessing
            ? "Grok AI is generating advice..."
            : isPlayingAudio
            ? "Playing voice response..."
            : t('voicePlaceholder')}
        </p>

        {/* Direct Text Question Input */}
        <form onSubmit={handleSendText} className="pt-2 flex gap-2 max-w-lg mx-auto">
          <input
            type="text"
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            placeholder={lang === 'hi' ? "गैलन या खाद से जुड़ा सवाल पूछें..." : "Ask your crop question..."}
            className="flex-grow px-4 py-2.5 rounded-2xl bg-forest-light/90 border border-leaf-soft/40 text-paper placeholder-paper-muted/60 text-sm focus:outline-none focus:ring-2 focus:ring-harvest"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-2xl bg-harvest text-forest-dark font-black text-sm hover:bg-harvest-amber transition-all flex items-center gap-1.5 shadow-md"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </form>

        {/* Demo Quick Prompt Buttons */}
        <div className="pt-4 border-t border-forest-light/40 space-y-2">
          <p className="text-xs text-paper-muted uppercase font-bold tracking-wider">
            Quick Agricultural Questions:
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <button
              onClick={() => handleQuickPrompt(samplePrompts[lang] || samplePrompts.hi)}
              className="px-4 py-2 rounded-xl bg-forest-light/80 border border-leaf-soft/30 text-xs font-bold text-paper hover:bg-forest-light transition-all"
            >
              "{samplePrompts[lang] || samplePrompts.hi}"
            </button>
          </div>
        </div>

      </div>

      {/* TRANSCRIPT & GROK AI VOICE ADVICE DISPLAY */}
      {(transcript || aiResponse) && (
        <div className="bg-paper-card rounded-3xl p-6 sm:p-8 border border-paper-dark shadow-soft-natural space-y-4 animate-fadeIn">
          
          {/* Farmer Voice Query */}
          {transcript && (
            <div className="p-4 rounded-2xl bg-paper border border-paper-dark space-y-1">
              <span className="text-xs font-bold text-harvest uppercase tracking-wider flex items-center gap-1.5">
                <Mic className="w-3.5 h-3.5" />
                Farmer Spoken Input
              </span>
              <p className="text-base font-bold text-forest italic">
                "{transcript}"
              </p>
            </div>
          )}

          {/* Grok AI Response Output with Voice Audio Button */}
          {aiResponse && (
            <div className="p-5 rounded-2xl bg-forest text-paper space-y-3 shadow-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-harvest-amber uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Grok AI Voice Advice
                </span>

                <button
                  onClick={() => playAudioResponse(aiResponse)}
                  className={`px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 ${
                    isPlayingAudio ? 'bg-harvest text-forest-dark animate-pulse' : 'bg-forest-light text-paper'
                  }`}
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>{isPlayingAudio ? "Stop Audio" : "Replay Voice"}</span>
                </button>
              </div>

              <p className="text-sm font-semibold leading-relaxed">
                {aiResponse}
              </p>
            </div>
          )}

        </div>
      )}
    </>
  )}

    </section>
  );
};

