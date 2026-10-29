import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { askGrokAI } from '../../api/grokApi';
import { Mic, Volume2, Sparkles, X, Send, Trash2, User, AlertCircle } from 'lucide-react';

export const VoiceAgentWidget = ({ onOpenVoiceTab }) => {
  const { lang, playAudioResponse, isPlayingAudio, stopAudio } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [textInput, setTextInput] = useState('');
  const [widgetError, setWidgetError] = useState('');
  const [chatList, setChatList] = useState([]);

  const recognitionRef = useRef(null);
  const latestSpeechRef = useRef('');
  const querySentRef = useRef(false);
  const inputRef = useRef(null);

  // Quick prompt suggestions inside widget
  const widgetTopics = {
    hi: [
      { id: 't1', label: 'धान पीलापन', q: 'धान के पौधों में पीलापन दूर करने के लिए कौन सी खाद डालें?' },
      { id: 't2', label: 'टमाटर रोग', q: 'टमाटर के पत्तों पर काले धब्बे और झुलसा रोग का क्या इलाज है?' },
      { id: 't3', label: 'कीट नियंत्रण', q: 'धान में तना छेदक कीट से बचाव का जैविक उपाय क्या है?' },
      { id: 't4', label: 'खाद मात्रा', q: 'फसल में यूरिया और डीएपी का सही अनुपात कितना होना चाहिए?' }
    ],
    en: [
      { id: 't1', label: 'Paddy Yellowing', q: 'What is the best treatment for yellowing leaves in paddy?' },
      { id: 't2', label: 'Tomato Blight', q: 'How do I manage early blight in tomato crops?' },
      { id: 't3', label: 'Stem Borer', q: 'What organic pesticide controls paddy stem borer?' },
      { id: 't4', label: 'Fertilizer Ratio', q: 'What is the correct dosage of urea and DAP?' }
    ],
    sat: [
      { id: 't1', label: 'ᱦᱩᱲᱩ ᱥᱤᱛᱷ ᱵᱞᱟᱭᱤᱴ', q: 'ᱦᱩᱲᱩ ᱪᱟᱥ ᱨᱮ ᱥᱤᱛᱷ ᱵᱞᱟᱭᱤᱴ ᱨᱚᱜᱽ ᱞᱟᱹᱜᱤᱫ ᱪᱮᱫ ᱨᱟᱱ ᱪᱟᱯᱟᱰᱟ?' },
      { id: 't2', label: 'ᱴᱚᱢᱟᱴᱚ ᱨᱚᱜᱽ', q: 'ᱴᱚᱢᱟᱴᱚ ᱨᱮ ᱮᱨᱞᱤ ᱵᱞᱟᱭᱤᱴ ᱨᱚᱜᱽ ᱠᱷᱚᱱ ᱪᱮᱫ ᱞᱮᱠᱟ ᱵᱟᱧᱪᱟᱣ ᱦᱩᱭᱩᱜ-ᱟ?' },
      { id: 't3', label: 'ᱡᱚᱱᱰᱨᱟ ᱪᱟᱥ', q: 'ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱱᱟᱜ ᱟᱨᱟᱜ ᱦᱟᱥᱟ ᱨᱮ ᱡᱚᱱᱰᱨᱟ ᱪᱟᱥ ᱞᱟᱹᱜᱤᱫ ᱥᱚᱞᱦᱮ ᱪᱮᱫ?' }
    ]
  };

  const topics = widgetTopics[lang] || widgetTopics.hi;

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch (e) {}
      }
    };
  }, []);

  const toggleWidget = () => {
    setIsOpen(!isOpen);
    stopAudio();
    setWidgetError('');
  };

  const handleMicToggle = () => {
    stopAudio();
    setWidgetError('');

    if (isListening) {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (e) {}
      }
      setIsListening(false);

      const captured = latestSpeechRef.current?.trim();
      if (captured && !querySentRef.current) {
        querySentRef.current = true;
        processWidgetQuery(captured);
      }
    } else {
      setTranscript('');
      setAiAnswer('');
      latestSpeechRef.current = '';
      querySentRef.current = false;

      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = lang === 'hi' ? 'hi-IN' : lang === 'sat' ? 'hi-IN' : 'en-US';
        recognition.continuous = false;
        recognition.interimResults = true;

        recognition.onstart = () => {
          setIsListening(true);
          setWidgetError('');
        };

        recognition.onresult = (e) => {
          let text = '';
          for (let i = 0; i < e.results.length; i++) {
            text += e.results[i][0].transcript;
          }
          latestSpeechRef.current = text;
          setTranscript(text);
        };

        recognition.onerror = (err) => {
          console.warn('[Widget Voice Recognition Error]:', err.error);
          setIsListening(false);
          if (err.error === 'not-allowed') {
            setWidgetError('Microphone permission denied. Please allow microphone in browser or type below.');
          } else if (err.error === 'no-speech') {
            setWidgetError('No speech detected. Please speak clearly, or type your question.');
          } else if (err.error !== 'aborted') {
            setWidgetError('Voice recognition issue. Please type your question below.');
          }
        };

        recognition.onend = () => {
          setIsListening(false);
          const captured = latestSpeechRef.current?.trim();
          if (captured && !querySentRef.current) {
            querySentRef.current = true;
            processWidgetQuery(captured);
          }
        };

        recognitionRef.current = recognition;

        try {
          recognition.start();
        } catch (err) {
          console.warn('[Widget Mic Start Exception]:', err);
          setWidgetError('Could not start microphone. Please type your question below.');
          inputRef.current?.focus();
        }
      } else {
        setWidgetError('Voice recognition is not supported in this browser. Please type below or tap a suggested topic.');
        inputRef.current?.focus();
      }
    }
  };

  const handleSend = (e) => {
    e?.preventDefault();
    if (!textInput.trim()) return;

    const query = textInput.trim();
    setTextInput('');
    stopAudio();
    processWidgetQuery(query);
  };

  const handleQuickTopic = (questionText) => {
    setTextInput('');
    stopAudio();
    processWidgetQuery(questionText);
  };

  const handleClearChat = () => {
    stopAudio();
    setChatList([]);
    setTranscript('');
    setAiAnswer('');
    setWidgetError('');
  };

  const processWidgetQuery = async (queryText) => {
    if (!queryText || !queryText.trim()) return;
    const cleanQuery = queryText.trim();

    const userMsg = {
      id: 'w_u_' + Date.now(),
      role: 'user',
      content: cleanQuery
    };

    setChatList(prev => [...prev, userMsg]);
    setTranscript(cleanQuery);
    setAiAnswer('');
    setIsProcessing(true);
    setWidgetError('');

    try {
      // Pass full widget conversation history for tailored context
      const answer = await askGrokAI(cleanQuery, lang, '', chatList);
      
      const aiMsg = {
        id: 'w_a_' + Date.now(),
        role: 'assistant',
        content: answer
      };

      setChatList(prev => [...prev, aiMsg]);
      setAiAnswer(answer);
      setIsProcessing(false);

      // Play voice audio response
      playAudioResponse(answer);
    } catch (e) {
      console.error('[Widget Query Error]:', e);
      setIsProcessing(false);
      setWidgetError('Unable to generate answer. Please try again.');
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-20 right-4 sm:bottom-6 sm:right-6 z-40">
        <button
          onClick={toggleWidget}
          className="group relative flex items-center gap-3 bg-gradient-to-r from-forest to-forest-dark text-paper p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-elevated-farm border-2 border-harvest hover:scale-105 active:scale-95 transition-all duration-300"
          title="AI Agricultural Voice Assistant"
        >
          {/* Animated Glow Pill */}
          <span className="absolute -inset-1 rounded-full bg-harvest/20 blur-sm group-hover:bg-harvest/40 transition-all pointer-events-none" />

          <div className="relative flex items-center justify-center">
            <Mic className={`w-6 h-6 text-harvest ${isListening ? 'animate-bounce text-emerald-400' : ''}`} />
            {isPlayingAudio && (
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-ping" />
            )}
          </div>

          <div className="hidden sm:flex flex-col text-left">
            <span className="text-xs font-black uppercase tracking-wider text-harvest">
              AI Voice Advisor
            </span>
            <span className="text-xxs text-paper-muted font-bold">
              {isListening ? 'Listening...' :
               isProcessing ? 'Generating Advice...' :
               isPlayingAudio ? 'Speaking Advice...' : 'Tap to Ask Farm AI'}
            </span>
          </div>
        </button>
      </div>

      {/* Floating Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-forest-dark/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-fadeIn">
          <div className="bg-gradient-to-b from-forest to-forest-dark text-paper w-full max-w-md rounded-3xl p-5 sm:p-6 shadow-2xl border-2 border-harvest/40 space-y-4 relative max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-forest-light/30 pb-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-harvest animate-pulse" />
                <div>
                  <h3 className="text-base font-black text-paper">ADISETU AI Companion</h3>
                  <span className="text-xxs text-harvest uppercase font-bold tracking-widest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                    Live Voice Reasoning Engine
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {chatList.length > 0 && (
                  <button
                    onClick={handleClearChat}
                    className="p-1.5 rounded-full bg-forest-light/60 text-paper-muted hover:text-red-400 transition-all"
                    title="Clear Chat"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full bg-forest-light/60 text-paper-muted hover:text-paper hover:bg-forest-light transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Mic Center */}
            <div className="flex flex-col items-center justify-center py-2 space-y-2 flex-shrink-0">
              <button
                onClick={handleMicToggle}
                className={`w-20 h-20 rounded-full flex flex-col items-center justify-center border-4 border-paper shadow-glow-mic transition-all transform hover:scale-105 active:scale-95 ${
                  isListening
                    ? 'bg-harvest text-forest-dark scale-110 shadow-glow-harvest'
                    : isPlayingAudio
                    ? 'bg-emerald-500 text-paper animate-pulse'
                    : 'bg-forest-light text-harvest-amber hover:bg-forest-subtle'
                }`}
                title={isListening ? "Tap to finish speaking" : "Tap to speak your question"}
              >
                <Mic className={`w-8 h-8 ${isListening ? 'animate-bounce text-forest-dark' : 'text-harvest-amber'}`} />
                <span className="text-xxs font-black uppercase mt-0.5">
                  {isListening ? 'Listening' : 'Speak'}
                </span>
              </button>

              {/* Status text */}
              <p className="text-xs text-paper-muted font-semibold text-center">
                {isListening ? "Listening to your voice... (tap to finish)" :
                 isProcessing ? "AI analyzing your farming question..." :
                 isPlayingAudio ? "Speaking agricultural advice..." : "Tap mic to speak, or type below"}
              </p>
            </div>

            {/* Widget Error Alert */}
            {widgetError && (
              <div className="bg-amber-500/20 border border-amber-400/40 rounded-xl p-2.5 text-xs text-amber-200 flex items-center justify-between gap-1 flex-shrink-0">
                <span className="flex items-center gap-1.5">
                  <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  {widgetError}
                </span>
                <button onClick={() => setWidgetError('')} className="text-amber-300 text-xs px-1">✕</button>
              </div>
            )}

            {/* Question & Answer History Box (Scrollable Feed) */}
            <div className="flex-grow overflow-y-auto max-h-56 space-y-2.5 pr-1 text-xs">
              {chatList.length === 0 ? (
                <div className="bg-forest-light/40 p-3 rounded-2xl border border-leaf-soft/20 text-center text-paper-muted text-xxs">
                  Ask any question about paddy, fertilizers, pests, weather, or crop diseases.
                </div>
              ) : (
                chatList.map((msg) => (
                  <div 
                    key={msg.id}
                    className={`p-3 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-forest-light/90 border border-leaf-soft/40 ml-4 text-paper'
                        : 'bg-paper text-forest mr-4 shadow-sm space-y-1'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xxs font-bold mb-1">
                      <span className={msg.role === 'user' ? 'text-harvest' : 'text-forest'}>
                        {msg.role === 'user' ? 'Farmer Question' : 'ADISETU AI Advisory'}
                      </span>
                      {msg.role === 'assistant' && (
                        <button
                          onClick={() => playAudioResponse(msg.content)}
                          className="flex items-center gap-1 text-forest hover:text-harvest font-black"
                        >
                          <Volume2 className="w-3 h-3 text-harvest" />
                          <span>{isPlayingAudio ? "Stop" : "Play"}</span>
                        </button>
                      )}
                    </div>
                    <p className={`leading-relaxed ${msg.role === 'user' ? 'italic font-bold' : 'font-medium'}`}>
                      {msg.content}
                    </p>
                  </div>
                ))
              )}

              {/* Processing loading state */}
              {isProcessing && (
                <div className="bg-forest-light/60 p-2.5 rounded-2xl text-xxs text-harvest flex items-center gap-2 animate-pulse">
                  <Sparkles className="w-3.5 h-3.5 animate-spin" />
                  <span>Generating fresh advice for your question...</span>
                </div>
              )}
            </div>

            {/* Quick Topic Buttons */}
            <div className="flex flex-wrap gap-1.5 pt-1 border-t border-forest-light/30 flex-shrink-0">
              {topics.map(t => (
                <button
                  key={t.id}
                  onClick={() => handleQuickTopic(t.q)}
                  disabled={isProcessing}
                  className="px-2.5 py-1 rounded-lg bg-forest-light/70 hover:bg-forest-light border border-leaf-soft/30 text-xxs font-bold text-paper transition-all hover:border-harvest"
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Quick Text Input */}
            <form onSubmit={handleSend} className="flex gap-2 flex-shrink-0">
              <input
                ref={inputRef}
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder={lang === 'hi' ? "सवाल टाइप करें..." : "Type your question..."}
                className="flex-grow px-3.5 py-2 rounded-xl bg-forest-light/80 border border-leaf-soft/40 text-paper text-xs placeholder-paper-muted/60 focus:outline-none focus:ring-1 focus:ring-harvest"
              />
              <button
                type="submit"
                disabled={isProcessing || !textInput.trim()}
                className="px-3 py-2 rounded-xl bg-harvest text-forest-dark font-black text-xs hover:bg-harvest-amber transition-all flex items-center gap-1 disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Full Screen Page Redirect link */}
            {onOpenVoiceTab && (
              <div className="text-center pt-0.5 flex-shrink-0">
                <button
                  onClick={() => {
                    setIsOpen(false);
                    onOpenVoiceTab();
                  }}
                  className="text-xxs text-harvest hover:underline font-bold uppercase tracking-wider"
                >
                  Open Full Voice Companion Screen →
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </>
  );
};
