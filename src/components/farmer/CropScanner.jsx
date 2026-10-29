import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { analyzeCropImage } from '../../api/cropApi';
import { 
  Camera, 
  Upload, 
  Mic, 
  RefreshCw, 
  Volume2, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  CloudRain, 
  Sparkles, 
  Settings, 
  Key, 
  Cpu,
  FileText,
  Copy,
  Check,
  Scan
} from 'lucide-react';

export const CropScanner = ({ onVoiceClick }) => {
  const { lang, t, playAudioResponse, isPlayingAudio, stopAudio } = useLanguage();
  
  // Working agricultural sample photos (Leaves, crops, and packaging with OCR labels)
  const sampleLeaves = [
    {
      id: 1,
      label: "Tomato Early Blight",
      category: "crop_disease",
      url: "https://images.unsplash.com/photo-1599423300746-b62533397364?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      label: "Paddy Sheath Blight",
      category: "crop_disease",
      url: "https://images.unsplash.com/photo-1530507629858-e4977d30e9e0?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      label: "Healthy Crop Leaf",
      category: "healthy_crop",
      url: "https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 4,
      label: "Fertilizer / Label (OCR)",
      category: "fertilizer_ocr",
      url: "https://images.unsplash.com/photo-1628352081506-83c43123ed6d?auto=format&fit=crop&w=800&q=80"
    }
  ];

  const [selectedImage, setSelectedImage] = useState(sampleLeaves[0].url);
  const [isScanning, setIsScanning] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [geminiApiKey, setGeminiApiKey] = useState(localStorage.getItem('gemini_api_key') || '');
  const [tempApiKey, setTempApiKey] = useState(geminiApiKey);
  const [scanError, setScanError] = useState(null);
  const [copiedText, setCopiedText] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Url = event.target.result;
        setSelectedImage(base64Url);
        runAnalysis(base64Url);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    setGeminiApiKey(tempApiKey);
    if (tempApiKey) {
      localStorage.setItem('gemini_api_key', tempApiKey);
    } else {
      localStorage.removeItem('gemini_api_key');
    }
    setShowSettings(false);
    if (selectedImage) runAnalysis(selectedImage);
  };

  const runAnalysis = async (imgUrl) => {
    setIsScanning(true);
    setAnalysisResult(null);
    setScanError(null);
    stopAudio();

    try {
      const result = await analyzeCropImage(imgUrl, geminiApiKey);
      setAnalysisResult(result);
    } catch (err) {
      console.error(err);
      setScanError(err.message || 'Vision AI & OCR analysis failed. Please try a clearer photo.');
    } finally {
      setIsScanning(false);
    }
  };

  const handleCopyOcrText = () => {
    if (analysisResult?.detectedText) {
      navigator.clipboard.writeText(analysisResult.detectedText);
      setCopiedText(true);
      setTimeout(() => setCopiedText(false), 2000);
    }
  };

  const handleAudioPlayback = (audioLang) => {
    if (!analysisResult) return;
    const title = analysisResult.localNames?.[audioLang] || analysisResult.name;
    const actions = (analysisResult.actions?.[audioLang] || analysisResult.actions?.en || []).join(". ");
    const textToSpeak = `${title}. ${actions}`;

    playAudioResponse(textToSpeak);
  };

  return (
    <section className="py-8 max-w-5xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2 relative">
        <div className="flex items-center justify-center gap-2">
          <span className="text-xs font-black uppercase tracking-widest text-harvest bg-harvest-pale px-3.5 py-1 rounded-full flex items-center gap-1.5 shadow-sm">
            <Scan className="w-3.5 h-3.5 text-harvest" />
            AI Computer Vision & Agricultural OCR Engine
          </span>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-1.5 rounded-full bg-paper border border-paper-dark text-charcoal hover:text-forest transition-all"
            title="Configure Gemini Vision & OCR API Key"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        <h2 className="text-3xl sm:text-4xl font-black text-forest">
          {t('scannerTitle')}
        </h2>
        <p className="text-sm sm:text-base text-charcoal-muted max-w-2xl mx-auto">
          Scan crop leaves for diseases and pests, or photograph fertilizer bags and pesticide labels for instant OCR text recognition and dosage instructions.
        </p>
      </div>

      {/* Vision & OCR API Key Settings */}
      {showSettings && (
        <form onSubmit={handleSaveSettings} className="bg-paper-card border-2 border-forest-light rounded-3xl p-6 shadow-xl space-y-4 animate-fadeIn">
          <div className="flex items-center justify-between border-b border-paper-dark pb-3">
            <h3 className="text-base font-bold text-forest flex items-center gap-2">
              <Cpu className="w-5 h-5 text-harvest" />
              Gemini Vision & OCR Engine Settings
            </h3>
            <button type="button" onClick={() => setShowSettings(false)} className="text-xs font-bold text-charcoal-muted hover:text-forest">
              ✕ Close
            </button>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-forest uppercase flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-harvest" />
              Google Gemini Vision API Key (Gemini 3.5 Flash / 3.1 Flash Lite)
            </label>
            <input
              type="password"
              value={tempApiKey}
              onChange={(e) => setTempApiKey(e.target.value)}
              placeholder="AQ.Ab8RN6Jo-6IQoTe3GFi6o1_..."
              className="w-full px-4 py-2.5 rounded-xl border border-paper-dark bg-paper text-sm font-mono text-forest focus:ring-2 focus:ring-forest outline-none"
            />
            <p className="text-xxs text-emerald-700 font-bold">
              ✓ Pre-configured with system Gemini Vision engine. Leave blank to use system key.
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-1">
            <button type="submit" className="px-5 py-2 rounded-xl bg-forest text-paper font-bold text-xs hover:bg-forest-dark transition-all">
              Save Vision Settings
            </button>
          </div>
        </form>
      )}

      {/* Main Upload / Camera & Analysis Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Photo Capture & Scanning Reticle */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="relative rounded-3xl overflow-hidden bg-forest-dark border-4 border-paper-card shadow-elevated-farm group">
            <img 
              src={selectedImage} 
              alt="Agricultural Target"
              className="w-full h-80 sm:h-96 object-cover"
            />

            {/* Scanning Laser Beam Effect when analyzing */}
            {isScanning && (
              <div className="absolute inset-0 bg-forest/50 backdrop-blur-xs flex flex-col items-center justify-center space-y-4">
                <div className="absolute top-0 left-0 right-0 h-1.5 scanner-line animate-scan-line" />
                <RefreshCw className="w-10 h-10 text-harvest-amber animate-spin" />
                <p className="text-xs font-bold text-paper px-6 text-center">
                  Analyzing leaf pathology & reading packaging OCR text...
                </p>
              </div>
            )}

            {/* Scanning Target Reticle Overlay */}
            {!isScanning && (
              <div className="absolute inset-6 border-2 border-dashed border-harvest/60 rounded-2xl pointer-events-none flex items-center justify-center">
                <span className="text-[11px] font-black uppercase tracking-wider text-harvest bg-forest-dark/80 px-2.5 py-1 rounded-lg">
                  AI Target Area
                </span>
              </div>
            )}
          </div>

          {/* Trigger Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <label className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-forest hover:bg-forest-light text-paper font-bold text-xs cursor-pointer shadow-md transition-all active:scale-95">
              <Camera className="w-4 h-4 text-harvest-amber" />
              <span>{t('btnTakePhoto')}</span>
              <input type="file" accept="image/*" capture="environment" className="hidden" onChange={handleFileUpload} />
            </label>

            <label className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl bg-paper-card border border-paper-dark hover:border-forest text-forest font-bold text-xs cursor-pointer shadow-md transition-all active:scale-95">
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
              Or Select Demo Agricultural Photo:
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
              {sampleLeaves.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setSelectedImage(item.url);
                    runAnalysis(item.url);
                  }}
                  className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                    selectedImage === item.url
                      ? 'border-harvest bg-harvest-pale text-forest shadow-xs'
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
          
          {/* Error Card */}
          {scanError && !isScanning && (
            <div className="bg-rose-50 border-2 border-rose-300 rounded-3xl p-6 text-center space-y-3 shadow-soft-natural animate-fadeIn">
              <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <h3 className="text-base font-bold text-rose-900">Analysis Error</h3>
              <p className="text-xs text-rose-700 font-medium max-w-md mx-auto">
                {scanError}
              </p>
              <button
                onClick={() => runAnalysis(selectedImage)}
                className="px-5 py-2 rounded-xl bg-rose-600 text-white font-bold text-xs hover:bg-rose-700 transition-all shadow-sm"
              >
                Retry Analysis
              </button>
            </div>
          )}

          {/* Empty State Card */}
          {!analysisResult && !isScanning && !scanError && (
            <div className="bg-paper-card rounded-3xl p-8 border border-paper-dark text-center space-y-4 shadow-soft-natural">
              <div className="w-16 h-16 rounded-2xl bg-harvest-pale text-harvest flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-forest">Ready for Visual & OCR Analysis</h3>
              <p className="text-sm text-charcoal-muted max-w-md mx-auto">
                Take a photo or upload an image of a crop leaf, pest insect, or fertilizer/pesticide bag to get instant diagnostic reports and OCR text extraction.
              </p>
              <button
                onClick={() => runAnalysis(selectedImage)}
                className="px-6 py-3 rounded-2xl bg-forest text-paper font-bold text-sm shadow-md hover:bg-forest-light transition-all"
              >
                Run AI Diagnosis Now
              </button>
            </div>
          )}

          {/* AI DIAGNOSIS & OCR RESULT CARD */}
          {analysisResult && (
            <div className="bg-paper-card rounded-3xl p-6 sm:p-8 border border-paper-dark shadow-soft-natural space-y-6 animate-fadeIn">
              
              {/* Header: Issue Name + Confidence + Severity */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-paper-muted">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-extrabold uppercase tracking-wider text-harvest">
                      {t('detectedIssueTitle')}
                    </span>
                    {analysisResult.category && (
                      <span className="text-xxs font-black px-2 py-0.5 rounded-full bg-forest text-harvest uppercase">
                        {analysisResult.category.replace('_', ' ')}
                      </span>
                    )}
                  </div>
                  <h3 className="text-2xl font-black text-forest mt-0.5">
                    {analysisResult.localNames?.[lang] || analysisResult.name}
                  </h3>
                  {analysisResult.crop && (
                    <p className="text-xs font-bold text-charcoal-muted">
                      Crop / Category: <span className="text-forest">{analysisResult.crop}</span>
                    </p>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  {/* Confidence Badge */}
                  <div className="bg-leaf-pale px-3.5 py-1.5 rounded-2xl border border-leaf/30 text-center">
                    <p className="text-xs text-charcoal-muted font-bold">{t('confidenceLabel')}</p>
                    <p className="text-lg font-black text-forest">
                      {Math.round(analysisResult.confidence > 1 ? analysisResult.confidence : analysisResult.confidence * 100)}%
                    </p>
                  </div>

                  {/* Severity Badge */}
                  <div className="bg-harvest-pale px-3.5 py-1.5 rounded-2xl border border-harvest/30 text-center">
                    <p className="text-xs text-charcoal-muted font-bold">{t('severityLabel')}</p>
                    <p className="text-sm font-black text-harvest">
                      {analysisResult.severity || t('severityVal')}
                    </p>
                  </div>
                </div>
              </div>

              {/* OCR Extracted Label Text Box (Displayed when text is detected on labels/bags) */}
              {analysisResult.detectedText && (
                <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-400/40 text-charcoal space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-amber-700" />
                      OCR Extracted Packaging & Label Text
                    </span>
                    <button
                      onClick={handleCopyOcrText}
                      className="px-2 py-1 rounded-lg bg-paper border border-paper-dark text-xxs font-bold text-charcoal hover:text-forest flex items-center gap-1"
                    >
                      {copiedText ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-amber-700" />}
                      <span>{copiedText ? "Copied" : "Copy Text"}</span>
                    </button>
                  </div>
                  <p className="text-xs font-mono bg-paper p-3 rounded-xl border border-paper-dark whitespace-pre-wrap leading-relaxed select-all text-forest-dark font-medium">
                    {analysisResult.detectedText}
                  </p>
                </div>
              )}

              {/* Symptoms / Diagnosis */}
              <div className="space-y-2">
                <h4 className="text-sm font-extrabold text-forest uppercase tracking-wider flex items-center gap-2">
                  <Info className="w-4 h-4 text-leaf" />
                  <span>{t('symptomsHeading')}</span>
                </h4>
                <p className="text-sm text-charcoal leading-relaxed bg-paper p-4 rounded-2xl border border-paper-dark">
                  {analysisResult.symptoms?.[lang] || analysisResult.symptoms?.en || analysisResult.symptoms}
                </p>
              </div>

              {/* Action Steps */}
              <div className="space-y-3">
                <h4 className="text-sm font-extrabold text-forest uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-harvest" />
                  <span>{t('actionHeading')}</span>
                </h4>

                <div className="space-y-2">
                  {(analysisResult.actions?.[lang] || analysisResult.actions?.en || []).map((step, idx) => (
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
              {analysisResult.weatherAlert && (
                <div className="p-4 rounded-2xl bg-harvest-pale/60 border border-harvest/40 text-forest text-xs font-semibold flex items-start gap-3">
                  <CloudRain className="w-5 h-5 text-harvest shrink-0 mt-0.5" />
                  <p>
                    {analysisResult.weatherAlert?.[lang] || analysisResult.weatherAlert?.en || analysisResult.weatherAlert}
                  </p>
                </div>
              )}

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
