import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { askGrokAI } from '../../api/grokApi';
import { Mic, Volume2, Sparkles, X, Send } from 'lucide-react';

export const VoiceAgentWidget = ({ onOpenVoiceTab }) => {
  const { lang, playAudioResponse, isPlayingAudio, stopAudio } = useLanguage();

  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [aiAnswer, setAiAnswer] = useState('');
  const [textInput, setTextInput] = useState('');

  const toggleWidget = () => {
    setIsOpen(!isOpen);
    stopAudio();
  };

  const handleMicToggle = () => {
    stopAudio();
    if (isListening) {
      setIsListening(false);
    } else {
      setIsListening(true);
      setTranscript('');
      setAiAnswer('');

      // Web Speech Recognition or mock timer
      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        recognition.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
        recognition.onresult = (e) => {
          const text = e.results[0][0].transcript;
          setTranscript(text);
          processWidgetQuery(text);
        };
        recognition.onend = () => setIsListening(false);
        recognition.start();
      } else {
        setTimeout(() => {
          setIsListening(false);
          const sample = lang === 'hi' ? "धान में यूरिया की सही मात्रा क्या है?" : "What is the urea dosage for paddy?";
          setTranscript(sample);
          processWidgetQuery(sample);
        }, 1500);
      }
    }
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!textInput.trim()) return;

    const query = textInput;
    setTextInput('');
    setTranscript(query);
    setAiAnswer('');
    stopAudio();

    processWidgetQuery(query);
  };

  const processWidgetQuery = async (queryText) => {
    setIsProcessing(true);
    try {
      const answer = await askGrokAI(queryText, lang);
      setAiAnswer(answer);
      setIsProcessing(false);

      // Play voice audio response
      playAudioResponse(answer);
    } catch (e) {
      setIsProcessing(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={toggleWidget}
          className="group relative flex items-center gap-3 bg-gradient-to-r from-forest to-forest-dark text-paper p-3.5 sm:px-5 sm:py-3.5 rounded-full shadow-elevated-farm border-2 border-harvest hover:scale-105 active:scale-95 transition-all duration-300"
          title="Grok AI Voice Assistant"
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
              Grok AI Voice
            </span>
            <span className="text-xxs text-paper-muted font-bold">
              {isListening ? 'Listening...' :
               isProcessing ? 'Grok Thinking...' :
               isPlayingAudio ? 'Speaking Voice...' : 'Tap to Ask AI'}
            </span>
          </div>
        </button>
      </div>

      {/* Floating Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-forest-dark/40 backdrop-blur-sm flex items-end sm:items-center justify-center p-4 animate-fadeIn">
          <div className="bg-gradient-to-b from-forest to-forest-dark text-paper w-full max-w-md rounded-3xl p-6 shadow-2xl border-2 border-harvest/40 space-y-5 relative">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-forest-light/30 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-harvest animate-pulse" />
                <div>
                  <h3 className="text-base font-black text-paper">ADISETU AI Voice</h3>
                  <span className="text-xxs text-harvest uppercase font-bold tracking-widest flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                    Sarvam AI Indian Accent Voice
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-full bg-forest-light/60 text-paper-muted hover:text-paper hover:bg-forest-light transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Mic Center */}
            <div className="flex flex-col items-center justify-center py-4 space-y-4">
              <button
                onClick={handleMicToggle}
                className={`w-24 h-24 rounded-full flex flex-col items-center justify-center border-4 border-paper shadow-glow-mic transition-all transform hover:scale-105 ${
                  isListening
                    ? 'bg-harvest text-forest-dark scale-110 shadow-glow-harvest'
                    : isPlayingAudio
                    ? 'bg-emerald-500 text-paper animate-pulse'
                    : 'bg-forest-light text-harvest-amber'
                }`}
              >
                <Mic className="w-10 h-10" />
                <span className="text-xxs font-black uppercase mt-1">
                  {isListening ? 'Listening' : 'Speak'}
                </span>
              </button>

              {/* Status text */}
              <p className="text-xs text-paper-muted font-semibold">
                {isListening ? "Listening to your question..." :
                 isProcessing ? "Grok AI generating voice answer..." :
                 isPlayingAudio ? "Speaking Grok AI advice..." : "Tap microphone or type below"}
              </p>
            </div>

            {/* Question & Grok Voice Answer Box */}
            {(transcript || aiAnswer) && (
              <div className="bg-forest-light/70 p-4 rounded-2xl border border-leaf-soft/30 max-h-48 overflow-y-auto space-y-2 text-xs">
                {transcript && (
                  <p className="italic text-harvest font-bold">
                    "{transcript}"
                  </p>
                )}
                {aiAnswer && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xxs text-harvest uppercase font-black">
                      <span>Grok AI Voice Advice</span>
                      <button
                        onClick={() => playAudioResponse(aiAnswer)}
                        className="flex items-center gap-1 hover:text-white"
                      >
                        <Volume2 className="w-3 h-3" />
                        {isPlayingAudio ? "Stop" : "Replay"}
                      </button>
                    </div>
                    <p className="font-semibold leading-relaxed">
                      {aiAnswer}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Quick Text Input */}
            <form onSubmit={handleSend} className="flex gap-2">
              <input
                type="text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                placeholder="Ask Grok AI a question..."
                className="flex-grow px-3.5 py-2 rounded-xl bg-forest-light/80 border border-leaf-soft/40 text-paper text-xs placeholder-paper-muted/60 focus:outline-none focus:ring-1 focus:ring-harvest"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-xl bg-harvest text-forest-dark font-black text-xs hover:bg-harvest-amber transition-all flex items-center gap-1"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

            {/* Full Screen Page Redirect link */}
            {onOpenVoiceTab && (
              <div className="text-center pt-1">
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
