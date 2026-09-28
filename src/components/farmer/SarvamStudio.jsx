import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Languages, Volume2, Sparkles, StopCircle, ArrowRightLeft, Copy, Check, Settings } from 'lucide-react';


export const SarvamStudio = () => {
  const { 
    lang, 
    translateWithSarvam, 
    playAudioResponse, 
    stopAudio, 
    isPlayingAudio,
    selectedVoice,
    setSelectedVoice,
    indianVoices,
    sarvamApiKey,
    setSarvamApiKey
  } = useLanguage();

  const [sourceText, setSourceText] = useState('झारखंड के किसान भाइयों, धान की फसल में यूरिया का प्रयोग बारिश रुकने के बाद शाम के समय करें।');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLang, setTargetLang] = useState('en');
  const [sourceLang, setSourceLang] = useState('hi');
  const [isTranslating, setIsTranslating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showConfig, setShowConfig] = useState(false);
  const [tempApiKey, setTempApiKey] = useState(sarvamApiKey);

  const samplePhrases = [
    { label: 'Fertilizer Advice', text: 'Apply 15kg nitrogen urea per acre after evening rain.' },
    { label: 'Weather Alert', text: 'Light to moderate rainfall expected over Jharkhand in next 48 hours.' },
    { label: 'Pest Control', text: 'Spray Neem seed extract 5ml per liter for stem borer prevention.' }
  ];

  const handleTranslate = async () => {
    if (!sourceText.trim()) return;
    setIsTranslating(true);
    try {
      const result = await translateWithSarvam(sourceText, targetLang, sourceLang);
      setTranslatedText(result);
    } catch (e) {
      console.error(e);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleSwap = () => {
    setSourceLang(targetLang);
    setTargetLang(sourceLang);
    setSourceText(translatedText || sourceText);
    setTranslatedText('');
  };

  const handleCopy = () => {
    const textToCopy = translatedText || sourceText;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveConfig = (e) => {
    e.preventDefault();
    setSarvamApiKey(tempApiKey);
    setShowConfig(false);
  };

  return (
    <div className="bg-gradient-to-br from-paper-card to-paper rounded-3xl p-6 sm:p-8 border-2 border-forest-light/40 shadow-soft-natural space-y-6">
      
      {/* Studio Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-paper-dark pb-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-harvest-pale text-forest rounded-2xl border border-harvest/30">
            <Languages className="w-6 h-6 text-harvest" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-black text-forest">Sarvam AI Indian Accent & Translation Studio</h3>
              <span className="bg-emerald-500/10 text-emerald-700 text-xxs font-black px-2.5 py-0.5 rounded-full uppercase border border-emerald-500/30">
                Bulbul:v3 & Mayura:v1
              </span>
            </div>
            <p className="text-xs text-charcoal-muted">
              Translate Indian languages & synthesize hyper-realistic Indian accent voices
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowConfig(!showConfig)}
          className="px-3.5 py-2 rounded-xl bg-paper border border-paper-dark text-xs font-bold text-charcoal hover:text-forest flex items-center gap-1.5 transition-all shadow-sm"
        >
          <Settings className="w-4 h-4" />
          <span>Sarvam API Key</span>
        </button>
      </div>

      {/* Settings Modal */}
      {showConfig && (
        <form onSubmit={handleSaveConfig} className="bg-forest-dark text-paper p-5 rounded-2xl space-y-3 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-forest-light/40 pb-2">
            <span className="text-xs font-bold text-harvest uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-harvest" /> Sarvam AI Key Configured
            </span>
            <button type="button" onClick={() => setShowConfig(false)} className="text-xs text-paper-muted hover:text-paper">✕</button>
          </div>
          <div className="space-y-1">
            <label className="text-xxs uppercase font-bold text-paper-muted">Subscription Key</label>
            <input
              type="password"
              value={tempApiKey}
              onChange={(e) => setTempApiKey(e.target.value)}
              className="w-full px-3.5 py-2 rounded-xl bg-forest-light border border-leaf-soft/40 text-paper font-mono text-xs focus:ring-1 focus:ring-harvest outline-none"
            />
          </div>
          <div className="flex justify-end pt-1">
            <button type="submit" className="px-4 py-1.5 rounded-lg bg-harvest text-forest-dark font-black text-xs hover:bg-harvest-amber transition-all">
              Save Key
            </button>
          </div>
        </form>
      )}

      {/* Voice Selection Controls */}
      <div className="bg-paper p-4 rounded-2xl border border-paper-dark space-y-3">
        <div className="flex items-center justify-between text-xs font-bold text-forest">
          <span className="flex items-center gap-1.5">
            <Volume2 className="w-4 h-4 text-harvest" />
            Select Indian Accent Speaker (Bulbul Model):
          </span>
          <span className="text-xxs text-charcoal-muted uppercase font-mono">16kHz Studio Audio</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {indianVoices.map((voice) => (
            <button
              key={voice.id}
              onClick={() => setSelectedVoice(voice.id)}
              className={`p-2.5 rounded-xl border text-left transition-all flex flex-col gap-0.5 ${
                selectedVoice === voice.id
                  ? 'bg-forest text-paper border-harvest shadow-md'
                  : 'bg-paper-card border-paper-dark text-charcoal hover:bg-paper-dark'
              }`}
            >
              <span className={`text-xs font-black ${selectedVoice === voice.id ? 'text-harvest' : 'text-forest'}`}>
                {voice.name.split(' ')[0]}
              </span>
              <span className="text-xxs opacity-80">{voice.gender} • {voice.lang}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Translation Workspace */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Input Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold text-forest uppercase tracking-wider">Source Text</label>
            <select
              value={sourceLang}
              onChange={(e) => setSourceLang(e.target.value)}
              className="text-xs bg-paper border border-paper-dark rounded-lg px-2 py-1 text-forest font-bold focus:outline-none"
            >
              <option value="hi">Hindi (हिन्दी)</option>
              <option value="en">English (Indian)</option>
              <option value="bn">Bengali (বাংলা)</option>
              <option value="mr">Marathi (मराठी)</option>
              <option value="ta">Tamil (தமிழ்)</option>
              <option value="te">Telugu (తెలుగు)</option>
            </select>
          </div>

          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            rows={4}
            placeholder="Type text in English or Hindi to translate and speak with Indian accent..."
            className="w-full p-3.5 rounded-2xl bg-paper border border-paper-dark text-sm text-forest placeholder-charcoal-muted/60 focus:ring-2 focus:ring-forest outline-none resize-none font-medium"
          />

          <div className="flex items-center justify-between">
            <button
              onClick={() => playAudioResponse(sourceText, sourceLang, selectedVoice)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
                isPlayingAudio ? 'bg-amber-500 text-paper animate-pulse' : 'bg-forest text-paper hover:bg-forest-dark'
              }`}
            >
              {isPlayingAudio ? <StopCircle className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isPlayingAudio ? 'Stop Voice' : 'Speak Indian Accent'}</span>
            </button>

            <div className="flex gap-1.5">
              {samplePhrases.map((sample, idx) => (
                <button
                  key={idx}
                  onClick={() => setSourceText(sample.text)}
                  className="text-xxs px-2 py-1 rounded-lg bg-harvest-pale text-forest font-bold hover:bg-harvest/30 transition-all"
                >
                  {sample.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Action Controls & Target Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={handleSwap}
                className="p-1 rounded-lg bg-paper border border-paper-dark text-forest hover:bg-paper-dark transition-all"
                title="Swap Languages"
              >
                <ArrowRightLeft className="w-3.5 h-3.5" />
              </button>
              <label className="text-xs font-bold text-forest uppercase tracking-wider">Sarvam Translation</label>
            </div>

            <select
              value={targetLang}
              onChange={(e) => setTargetLang(e.target.value)}
              className="text-xs bg-paper border border-paper-dark rounded-lg px-2 py-1 text-forest font-bold focus:outline-none"
            >
              <option value="en">English (Indian)</option>
              <option value="hi">Hindi (हिन्दी)</option>
              <option value="bn">Bengali (বাংলা)</option>
              <option value="mr">Marathi (मराठी)</option>
              <option value="ta">Tamil (தமிழ்)</option>
              <option value="te">Telugu (తెలుగు)</option>
            </select>
          </div>

          <div className="relative">
            <textarea
              value={translatedText}
              readOnly
              rows={4}
              placeholder="Click 'Translate with Sarvam AI' below..."
              className="w-full p-3.5 rounded-2xl bg-forest-dark text-paper border border-forest-light text-sm placeholder-paper-muted/50 resize-none font-medium"
            />
            {isTranslating && (
              <div className="absolute inset-0 bg-forest-dark/80 backdrop-blur-xs rounded-2xl flex items-center justify-center text-harvest text-xs font-bold gap-2">
                <Sparkles className="w-4 h-4 animate-spin" />
                Translating via Sarvam Mayura...
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={handleTranslate}
              disabled={isTranslating || !sourceText.trim()}
              className="px-4 py-2 rounded-xl bg-harvest text-forest-dark font-black text-xs hover:bg-harvest-amber disabled:opacity-50 transition-all flex items-center gap-1.5 shadow-md"
            >
              <Languages className="w-4 h-4" />
              <span>Translate with Sarvam AI</span>
            </button>

            {translatedText && (
              <div className="flex gap-2">
                <button
                  onClick={() => playAudioResponse(translatedText, targetLang, selectedVoice)}
                  className="px-3 py-1.5 rounded-xl bg-emerald-600 text-paper text-xs font-bold hover:bg-emerald-700 transition-all flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Speak Translation</span>
                </button>
                <button
                  onClick={handleCopy}
                  className="p-1.5 rounded-xl bg-paper border border-paper-dark text-forest hover:bg-paper-dark transition-all"
                  title="Copy Translation"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            )}
          </div>
        </div>

      </div>

    </div>
  );
};
