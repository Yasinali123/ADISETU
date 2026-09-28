import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { analyzeCropImage } from '../../api/cropApi';
import { Camera, Upload, Mic, RefreshCw, Volume2, ShieldCheck, AlertTriangle, CheckCircle, Info, CloudRain, Sparkles } from 'lucide-react';

export const CropScanner = ({ onVoiceClick }) => {
  const { lang, t, playAudioResponse, isPlayingAudio, stopAudio } = useLanguage();
  
  const [selectedImage, setSelectedImage] = useState(
    "https://images.unsplash.com/photo-1592417817098-8f3d6ef23a28?auto=format&fit=crop&w=800&q=80" // Tomato leaf blight sample
  );
  const [isScanning, setIsScanning] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);

  // Preset leaf sample photos for immediate farmer demo testing
  const sampleLeaves = [
    {
      id: 1,
      label: "Tomato Early Blight",
      url: "https://images.unsplash.com/photo-1592417817098-8f3d6ef23a28?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      label: "Paddy Sheath Blight",
      url: "https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      label: "Healthy Crop Leaf",
      url: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setSelectedImage(url);
      runAnalysis(url);
    }
  };

  const runAnalysis = async (imgUrl) => {
    setIsScanning(true);
    setAnalysisResult(null);
    stopAudio();

    try {
      const result = await analyzeCropImage(imgUrl);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
    } finally {
      setIsScanning(false);
    }
  };

  const handleAudioPlayback = (audioLang) => {
    if (!analysisResult) return;
    const textToSpeak = audioLang === 'sat'
      ? analysisResult.actions.sat.join(" ")
      : analysisResult.actions.hi.join(" ");

    playAudioResponse(textToSpeak);
  };

  return (
    <section className="py-8 max-w-5xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-harvest bg-harvest-pale px-3 py-1 rounded-full">
          AI Computer Vision Scanner
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-forest">
          {t('scannerTitle')}
        </h2>
        <p className="text-sm sm:text-base text-charcoal-muted max-w-2xl mx-auto">
          {t('scannerSub')}
        </p>
      </div>

      {/* Main Upload / Camera & Analysis Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Photo Capture & Scanning Beam */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="relative rounded-3xl overflow-hidden bg-forest-dark border-4 border-paper-card shadow-elevated-farm group">
            <img 
              src={selectedImage} 
              alt="Crop Leaf Analysis Target"
              className="w-full h-80 sm:h-96 object-cover"
            />

            {/* Scanning Laser Beam Effect when analyzing */}
            {isScanning && (
              <div className="absolute inset-0 bg-forest/40 backdrop-blur-xs flex flex-col items-center justify-center space-y-4">
                <div className="absolute top-0 left-0 right-0 h-1.5 scanner-line animate-scan-line" />
                <RefreshCw className="w-10 h-10 text-harvest-amber animate-spin" />
                <p className="text-xs font-bold text-paper px-6 text-center">
                  {t('scanSimulating')}
                </p>
              </div>
            )}

            {/* Scanning Target Reticle Overlay */}
            {!isScanning && (
              <div className="absolute inset-6 border-2 border-dashed border-harvest/60 rounded-2xl pointer-events-none flex items-center justify-center">
                <span className="text-[11px] font-black uppercase tracking-wider text-harvest bg-forest-dark/80 px-2.5 py-1 rounded-lg">
                  Visual Target Reticle
                </span>
              </div>
            )}
          </div>

          {/* Trigger Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-forest hover:bg-forest-light text-paper font-bold text-xs cursor-pointer shadow-md transition-all">
              <Camera className="w-4 h-4 text-harvest-amber" />
              <span>{t('btnTakePhoto')}</span>
              <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileUpload} />
            </label>

            <label className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-paper-card border border-paper-dark hover:border-forest text-forest font-bold text-xs cursor-pointer shadow-md transition-all">
              <Upload className="w-4 h-4 text-leaf" />
              <span>{t('btnUploadPhoto')}</span>
              <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>

          {/* Voice Prompt Option */}
          <button
            onClick={onVoiceClick}
            className="w-full py-3 px-4 rounded-2xl bg-paper-muted hover:bg-paper-dark/30 border border-paper-dark text-forest font-extrabold text-xs flex items-center justify-center gap-2 transition-all"
          >
            <Mic className="w-4 h-4 text-harvest" />
            <span>{t('btnVoiceDescribe')}</span>
          </button>

          {/* Sample Preset Selector */}
          <div className="space-y-2 pt-2">
            <p className="text-[11px] font-bold text-charcoal-muted uppercase">
              Or Select Demo Leaf Sample:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {sampleLeaves.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedImage(item.url);
                    runAnalysis(item.url);
                  }}
                  className={`p-2.5 sm:p-1.5 rounded-xl border text-xs font-bold transition-all text-center ${
                    selectedImage === item.url
                      ? 'border-harvest bg-harvest-pale text-forest'
                      : 'border-paper-dark bg-paper-card text-charcoal-muted hover:border-leaf'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: AI Diagnosis & Actionable Insights */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* If analysis not run yet */}
          {!analysisResult && !isScanning && (
            <div className="bg-paper-card rounded-3xl p-8 border border-paper-dark text-center space-y-4 shadow-soft-natural">
              <div className="w-16 h-16 rounded-2xl bg-harvest-pale text-harvest flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-forest">Ready for Crop Diagnosis</h3>
              <p className="text-sm text-charcoal-muted">
                Select a sample photo or upload your crop leaf picture to analyze disease symptoms and receive verified Jharkhand agricultural advisories.
              </p>
              <button
                onClick={() => runAnalysis(selectedImage)}
                className="px-6 py-3 rounded-2xl bg-forest text-paper font-bold text-sm shadow-md hover:bg-forest-light transition-all"
              >
                Run AI Diagnosis Now
              </button>
            </div>
          )}

          {/* AI DIAGNOSIS RESULT CARD */}
          {analysisResult && (
            <div className="bg-paper-card rounded-3xl p-6 sm:p-8 border border-paper-dark shadow-soft-natural space-y-6 animate-fadeIn">
              
              {/* Header: Issue Name + Confidence + Severity */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-paper-muted">
                <div>
                  <span className="text-xs font-extrabold uppercase tracking-wider text-harvest">
                    {t('detectedIssueTitle')}
                  </span>
                  <h3 className="text-2xl font-black text-forest mt-0.5">
                    {analysisResult.localNames[lang] || analysisResult.name}
                  </h3>
                </div>

                <div className="flex items-center gap-3">
                  {/* Confidence Badge */}
                  <div className="bg-leaf-pale px-3.5 py-1.5 rounded-2xl border border-leaf/30 text-center">
                    <p className="text-xs text-charcoal-muted font-bold">{t('confidenceLabel')}</p>
                    <p className="text-lg font-black text-forest">{analysisResult.confidence}%</p>
                  </div>

                  {/* Severity Badge */}
                  <div className="bg-harvest-pale px-3.5 py-1.5 rounded-2xl border border-harvest/30 text-center">
                    <p className="text-xs text-charcoal-muted font-bold">{t('severityLabel')}</p>
                    <p className="text-sm font-black text-harvest">{t('severityVal')}</p>
                  </div>
                </div>
              </div>

              {/* Symptoms */}
              <div className="space-y-2">
                <h4 className="text-sm font-extrabold text-forest uppercase tracking-wider flex items-center gap-2">
                  <Info className="w-4 h-4 text-leaf" />
                  <span>{t('symptomsHeading')}</span>
                </h4>
                <p className="text-sm text-charcoal leading-relaxed bg-paper p-4 rounded-2xl border border-paper-dark">
                  {analysisResult.symptoms[lang] || analysisResult.symptoms.en}
                </p>
              </div>

              {/* Action Steps */}
              <div className="space-y-3">
                <h4 className="text-sm font-extrabold text-forest uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-harvest" />
                  <span>{t('actionHeading')}</span>
                </h4>

                <div className="space-y-2">
                  {(analysisResult.actions[lang] || analysisResult.actions.en).map((step, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-3.5 rounded-2xl bg-paper border border-paper-dark">
                      <span className="w-6 h-6 rounded-full bg-forest text-harvest-amber text-xs font-extrabold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <p className="text-sm font-medium text-charcoal">
                        {step}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Weather Link Alert */}
              <div className="p-4 rounded-2xl bg-harvest-pale/60 border border-harvest/40 text-forest text-xs font-semibold flex items-start gap-3">
                <CloudRain className="w-5 h-5 text-harvest shrink-0 mt-0.5" />
                <p>
                  {analysisResult.weatherAlert[lang] || analysisResult.weatherAlert.en}
                </p>
              </div>

              {/* AUDIO PLAYBACK BUTTONS (Hindi / Santhali) */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleAudioPlayback('hi')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
                      isPlayingAudio
                        ? 'bg-harvest text-forest-dark border-harvest shadow-glow-harvest'
                        : 'bg-paper border-forest text-forest hover:bg-paper-muted'
                    }`}
                  >
                    <Volume2 className="w-4 h-4 text-harvest" />
                    <span>{t('listenHindi')}</span>
                  </button>

                  <button
                    onClick={() => handleAudioPlayback('sat')}
                    className={`px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 border transition-all ${
                      isPlayingAudio
                        ? 'bg-harvest text-forest-dark border-harvest shadow-glow-harvest'
                        : 'bg-paper border-forest text-forest hover:bg-paper-muted'
                    }`}
                  >
                    <Volume2 className="w-4 h-4 text-harvest" />
                    <span>{t('listenSanthali')}</span>
                  </button>
                </div>

                <span className="text-[11px] text-charcoal-muted font-bold">
                  Voice Synthesis Available
                </span>
              </div>

              {/* AI SAFETY UX DISCLAIMER */}
              <div className="pt-4 border-t border-paper-muted flex items-start gap-2.5 text-[11px] text-charcoal-muted">
                <ShieldCheck className="w-4 h-4 text-leaf shrink-0 mt-0.5" />
                <p>{t('safetyDisclaimer')}</p>
              </div>

            </div>
          )}

        </div>

      </div>

    </section>
  );
};
