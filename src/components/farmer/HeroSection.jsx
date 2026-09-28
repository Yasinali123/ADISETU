import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Mic, Camera, ArrowRight, Play, Volume2, CloudSun, MapPin, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';

export const HeroSection = ({ onStartFarm, onScanClick }) => {
  const { lang, setLang, t, playAudioResponse, isPlayingAudio } = useLanguage();
  
  // State for interactive demo inside hero
  const [demoStep, setDemoStep] = useState(0);
  const [demoRunning, setDemoRunning] = useState(false);

  const startInteractiveDemo = () => {
    setDemoRunning(true);
    setDemoStep(1);
    
    setTimeout(() => setDemoStep(2), 1500);
    setTimeout(() => setDemoStep(3), 3000);
    setTimeout(() => setDemoStep(4), 4500);
  };

  const handleAudioDemoPlay = () => {
    const textToPlay = lang === 'sat'
      ? " ᱟ double ᱢ ᱟ absolute ᱜ ᱴ transverse  walk ᱢ ᱟ composite ᱴ precise ᱨ ᱨ traditional ᱮ Early Blight ᱨ structured  walk ᱜ ᱧ walking ᱮ transverse ᱞ standard  walk cross ᱠ ᱟ absolute ᱱ ᱟ absolute᱾ ᱫ walk ᱟ absolute ᱝ ᱞ transverse ᱟ absolute ᱦ walking ᱟ Copper Oxychloride ᱮ completely ᱨ walk ᱮ ᱢ standard ᱮ᱾"
      : "आपके टमाटर के पौधे में अगेती झुलसा के लक्षण हैं। बारिश से पहले ऑर्गेनिक कॉपर ऑक्सीक्लोराइड का छिड़काव करें।";
    
    playAudioResponse(textToPlay);
  };

  return (
    <section className="relative pt-6 pb-16 lg:py-20 overflow-hidden">
      
      {/* Background Organic Ambient Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-leaf-soft/10 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-harvest-amber/10 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Split Hero Composition */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Side (Text & CTAs) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Startup Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-paper-card border border-paper-dark shadow-xs">
              <span className="w-2 h-2 rounded-full bg-leaf animate-ping" />
              <span className="text-xs font-bold text-forest tracking-wide uppercase">
                Climate-Tech AI • Built for Jharkhand Farmers
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-forest tracking-tight leading-[1.1] whitespace-pre-line">
              {t('heroHeadline')}
            </h1>

            {/* Subtext */}
            <p className="text-lg sm:text-xl text-charcoal-muted max-w-2xl font-normal leading-relaxed">
              {t('heroSubtext')}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onStartFarm}
                className="px-7 py-4 rounded-2xl bg-forest hover:bg-forest-light text-paper font-bold text-base shadow-elevated-farm flex items-center gap-3 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{t('heroPrimaryCta')}</span>
                <ArrowRight className="w-5 h-5 text-harvest-amber" />
              </button>

              <button
                onClick={() => {
                  const demoEl = document.getElementById('hero-demo-section');
                  demoEl?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-4 rounded-2xl bg-paper-card border border-paper-dark hover:border-forest text-forest font-bold text-base shadow-soft-natural flex items-center gap-2 transition-all hover:bg-paper-muted"
              >
                <Play className="w-4 h-4 fill-forest" />
                <span>{t('heroSecondaryCta')}</span>
              </button>
            </div>

            {/* Floating Voice Trigger Element */}
            <div 
              onClick={onStartFarm}
              className="inline-flex items-center gap-4 px-5 py-3 rounded-2xl bg-paper-card border border-harvest/30 shadow-soft-natural cursor-pointer hover:border-harvest transition-all group"
            >
              <div className="w-10 h-10 rounded-xl bg-forest text-harvest-amber flex items-center justify-center shadow-glow-mic group-hover:scale-110 transition-transform">
                <Mic className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-harvest">
                  Voice First Interface
                </p>
                <p className="text-sm font-extrabold text-forest flex items-center gap-2">
                  <span>🎙️ {t('heroVoiceTrigger')}</span>
                  {/* Waveform graphic */}
                  <span className="flex items-center gap-0.5 h-3 ml-2">
                    <span className="w-1 bg-harvest animate-wave-1 rounded-full" />
                    <span className="w-1 bg-harvest animate-wave-2 rounded-full" />
                    <span className="w-1 bg-harvest animate-wave-3 rounded-full" />
                    <span className="w-1 bg-harvest animate-wave-4 rounded-full" />
                  </span>
                </p>
              </div>
            </div>

          </div>

          {/* Right Side (Visual Agricultural Composition) */}
          <div className="lg:col-span-5 relative">
            
            {/* Main Visual Container */}
            <div className="relative rounded-3xl bg-forest p-3 shadow-elevated-farm border-4 border-paper-card">
              
              {/* Agricultural Banner Photo */}
              <div className="relative h-96 sm:h-[420px] rounded-2xl overflow-hidden bg-forest-dark">
                <img 
                  src="https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?auto=format&fit=crop&w=1000&q=80" 
                  alt="Jharkhand Paddy Field & Farmer"
                  className="w-full h-full object-cover opacity-85 hover:scale-105 transition-transform duration-700"
                />

                {/* Subtle AI Scan Laser Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest/90 via-transparent to-transparent" />
                <div className="absolute top-1/4 left-0 right-0 h-1 scanner-line animate-scan-line" />

                {/* Overlay Floating Tags */}
                <div className="absolute top-4 left-4 bg-paper-card/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-paper-dark text-xs font-bold text-forest flex items-center gap-1.5 shadow-sm">
                  <MapPin className="w-3.5 h-3.5 text-harvest" />
                  <span>Khunti, Jharkhand</span>
                </div>

                <div className="absolute top-4 right-4 bg-forest-dark/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-leaf/40 text-xs font-bold text-paper flex items-center gap-1.5 shadow-sm">
                  <CloudSun className="w-3.5 h-3.5 text-harvest-amber" />
                  <span>28°C • Rain in 36h</span>
                </div>

                {/* Bottom Crop Health Pill */}
                <div className="absolute bottom-4 left-4 right-4 bg-paper-card/95 backdrop-blur-md p-4 rounded-2xl border border-leaf/30 shadow-lg space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-forest uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-harvest-amber" />
                      Live AI Vision Analysis
                    </span>
                    <span className="bg-leaf-pale text-forest font-extrabold px-2.5 py-0.5 rounded-full">
                      Paddy (Dhan)
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-extrabold text-forest">Early Leaf Blight Detected</p>
                      <p className="text-xs text-charcoal-muted">Humidity factor cross-checked</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black text-harvest">91%</p>
                      <p className="text-[10px] uppercase font-bold text-charcoal-muted">Confidence</p>
                    </div>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>

        {/* INTERACTIVE HERO DEMO SECTION */}
        <div id="hero-demo-section" className="mt-16 pt-10 border-t border-paper-dark/60">
          
          <div className="bg-paper-card rounded-3xl p-6 sm:p-8 border border-paper-dark shadow-soft-natural space-y-6">
            
            {/* Header + Language Switcher for Demo */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-harvest">
                  {t('heroDemoTitle')}
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-forest mt-1">
                  Try the Voice & Scanner Workflow
                </h3>
              </div>

              {/* Language Switcher for Demo */}
              <div className="flex items-center gap-2 bg-paper-muted p-1 rounded-xl">
                <span className="text-xs font-bold text-charcoal-muted px-2">Demo Language:</span>
                <button
                  onClick={() => setLang('hi')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    lang === 'hi' ? 'bg-forest text-paper shadow-xs' : 'text-charcoal-muted'
                  }`}
                >
                  हिन्दी
                </button>
                <button
                  onClick={() => setLang('sat')}
                  className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                    lang === 'sat' ? 'bg-harvest text-forest-dark font-black shadow-xs' : 'text-charcoal-muted'
                  }`}
                >
                  ᱥᱟᱱᱛᱟᱲᱤ
                </button>
              </div>
            </div>

            {/* Interactive Demo Flow Canvas */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-2">
              
              {/* Step 1: Voice Query */}
              <div className={`p-4 rounded-2xl border transition-all ${
                demoStep >= 1 ? 'bg-paper-muted border-forest shadow-xs' : 'bg-paper/40 border-paper-muted opacity-60'
              }`}>
                <div className="flex items-center gap-2 text-xs font-bold text-forest mb-2">
                  <Mic className="w-4 h-4 text-harvest" />
                  <span>1. Farmer Voice Ask</span>
                </div>
                <p className="text-sm font-bold text-charcoal italic">
                  "{t('heroDemoFarmerAsk')}"
                </p>
              </div>

              {/* Step 2: Image Scan */}
              <div className={`p-4 rounded-2xl border transition-all ${
                demoStep >= 2 ? 'bg-paper-muted border-forest shadow-xs' : 'bg-paper/40 border-paper-muted opacity-60'
              }`}>
                <div className="flex items-center gap-2 text-xs font-bold text-forest mb-2">
                  <Camera className="w-4 h-4 text-leaf" />
                  <span>2. Leaf Vision AI</span>
                </div>
                <p className="text-xs font-bold text-forest">
                  {t('heroDemoStep2')}
                </p>
              </div>

              {/* Step 3: Weather Cross-Check */}
              <div className={`p-4 rounded-2xl border transition-all ${
                demoStep >= 3 ? 'bg-paper-muted border-forest shadow-xs' : 'bg-paper/40 border-paper-muted opacity-60'
              }`}>
                <div className="flex items-center gap-2 text-xs font-bold text-forest mb-2">
                  <CloudSun className="w-4 h-4 text-harvest-amber" />
                  <span>3. Weather Context</span>
                </div>
                <p className="text-xs font-semibold text-charcoal">
                  {t('heroDemoStep3')}
                </p>
              </div>

              {/* Step 4: Voice Response */}
              <div className={`p-4 rounded-2xl border transition-all ${
                demoStep >= 4 ? 'bg-forest text-paper shadow-md' : 'bg-paper/40 border-paper-muted opacity-60'
              }`}>
                <div className="flex items-center gap-2 text-xs font-bold text-harvest-amber mb-2">
                  <Volume2 className="w-4 h-4 animate-bounce" />
                  <span>4. Audio Response</span>
                </div>
                <p className="text-xs font-medium leading-relaxed">
                  {t('heroDemoStep4')}
                </p>
              </div>

            </div>

            {/* Interactive Control & Audio Playback */}
            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-paper-muted">
              
              <button
                onClick={startInteractiveDemo}
                disabled={demoRunning && demoStep < 4}
                className="px-5 py-2.5 rounded-xl bg-forest hover:bg-forest-light text-paper text-sm font-bold flex items-center gap-2 transition-all disabled:opacity-50"
              >
                <Play className="w-4 h-4 fill-paper" />
                <span>{demoRunning ? "Replay AI Workflow Demo" : "Run Live AI Demo"}</span>
              </button>

              {demoStep >= 4 && (
                <button
                  onClick={handleAudioDemoPlay}
                  className={`px-5 py-2.5 rounded-xl text-sm font-bold flex items-center gap-2 border transition-all ${
                    isPlayingAudio
                      ? 'bg-harvest text-forest-dark border-harvest shadow-glow-harvest'
                      : 'bg-paper-card border-forest text-forest hover:bg-paper-muted'
                  }`}
                >
                  <Volume2 className="w-4 h-4 text-harvest" />
                  <span>{isPlayingAudio ? t('audioStop') : t('heroDemoAudioBtn')}</span>
                </button>
              )}

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
