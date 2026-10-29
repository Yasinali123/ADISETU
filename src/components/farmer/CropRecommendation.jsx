import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { getCropRecommendations } from '../../api/cropApi';
import confetti from 'canvas-confetti';
import { Compass, CheckCircle2, ChevronRight, RefreshCw, Award, Droplets, Layers, Calendar, MapPin, Sparkles } from 'lucide-react';

export const CropRecommendation = () => {
  const { t } = useLanguage();

  const [step, setStep] = useState(1);
  const [district, setDistrict] = useState('');
  const [landSize, setLandSize] = useState('');
  const [water, setWater] = useState('');
  const [soil, setSoil] = useState('');
  const [season, setSeason] = useState('');

  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState(null);
  const [validationError, setValidationError] = useState('');

  // Check if the current step has a selection
  const isCurrentStepSelected = () => {
    switch (step) {
      case 1: return district !== '';
      case 2: return landSize !== '';
      case 3: return water !== '';
      case 4: return soil !== '';
      case 5: return season !== '';
      default: return true;
    }
  };

  const handleNextStep = () => {
    if (!isCurrentStepSelected()) {
      setValidationError('Please select an option before proceeding.');
      return;
    }
    setValidationError('');
    setStep(step + 1);
  };

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const results = await getCropRecommendations({ district, water, soil, season });
      setRecommendations(results);
      // Confetti celebration micro-interaction
      try {
        confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
      } catch (e) {}
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-8 max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-harvest bg-harvest-pale px-3 py-1 rounded-full">
          Crop Suitability Engine
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-forest">
          {t('recTitle')}
        </h2>
        <p className="text-sm sm:text-base text-charcoal-muted max-w-xl mx-auto">
          {t('recSub')}
        </p>
      </div>

      {/* Step Wizard Container */}
      {!recommendations && (
        <div className="bg-paper-card rounded-3xl p-6 sm:p-10 border border-paper-dark shadow-soft-natural space-y-8">
          
          {/* Progress Indicators */}
          <div className="flex items-center justify-between border-b border-paper-muted pb-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="flex items-center gap-2">
                <div 
                  onClick={() => {
                    // Only allow going back to already-completed steps
                    if (i < step) {
                      setValidationError('');
                      setStep(i);
                    }
                  }}
                  className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-black transition-all ${
                    step === i
                      ? 'bg-forest text-harvest-amber ring-4 ring-forest/20 shadow-md'
                      : step > i
                      ? 'bg-leaf text-paper cursor-pointer'
                      : 'bg-paper-muted text-charcoal-muted cursor-not-allowed opacity-60'
                  }`}
                >
                  {step > i ? <CheckCircle2 className="w-5 h-5" /> : i}
                </div>
                <span className="hidden sm:inline text-xs font-bold text-charcoal-muted">
                  Step {i}
                </span>
              </div>
            ))}
          </div>

          {/* STEP 1: District */}
          {step === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-harvest">Location Context</span>
                <h3 className="text-xl font-black text-forest flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-harvest" />
                  <span>{t('step1Label')}</span>
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {t('districtOptions').map((d) => (
                  <button
                    key={d}
                    onClick={() => { setDistrict(d); setValidationError(''); }}
                    className={`p-3.5 rounded-2xl border text-sm font-bold text-left transition-all ${
                      district === d
                        ? 'bg-forest text-paper border-forest shadow-md'
                        : 'bg-paper border-paper-dark text-charcoal hover:border-leaf'
                    }`}
                  >
                    📍 {d}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Land Size */}
          {step === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-harvest">Land Capacity</span>
                <h3 className="text-xl font-black text-forest">{t('step2Label')}</h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {["1 Acre", "2.5 Acres", "5 Acres", "10+ Acres"].map((sz) => (
                  <button
                    key={sz}
                    onClick={() => { setLandSize(sz); setValidationError(''); }}
                    className={`p-4 rounded-2xl border text-sm font-bold transition-all ${
                      landSize === sz
                        ? 'bg-forest text-paper border-forest shadow-md'
                        : 'bg-paper border-paper-dark text-charcoal hover:border-leaf'
                    }`}
                  >
                    🌾 {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 3: Water Availability */}
          {step === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-harvest">Irrigation Access</span>
                <h3 className="text-xl font-black text-forest flex items-center gap-2">
                  <Droplets className="w-5 h-5 text-leaf" />
                  <span>{t('step3Label')}</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {t('waterOptions').map((w) => (
                  <button
                    key={w}
                    onClick={() => { setWater(w); setValidationError(''); }}
                    className={`p-4 rounded-2xl border text-sm font-bold text-left transition-all ${
                      water === w
                        ? 'bg-forest text-paper border-forest shadow-md'
                        : 'bg-paper border-paper-dark text-charcoal hover:border-leaf'
                    }`}
                  >
                    💧 {w}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: Soil Type */}
          {step === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-harvest">Soil Texture</span>
                <h3 className="text-xl font-black text-forest flex items-center gap-2">
                  <Layers className="w-5 h-5 text-harvest" />
                  <span>{t('step4Label')}</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {t('soilOptions').map((s) => (
                  <button
                    key={s}
                    onClick={() => { setSoil(s); setValidationError(''); }}
                    className={`p-4 rounded-2xl border text-sm font-bold text-left transition-all ${
                      soil === s
                        ? 'bg-forest text-paper border-forest shadow-md'
                        : 'bg-paper border-paper-dark text-charcoal hover:border-leaf'
                    }`}
                  >
                    🪵 {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: Season */}
          {step === 5 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-harvest">Sowing Window</span>
                <h3 className="text-xl font-black text-forest flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-harvest-amber" />
                  <span>{t('step5Label')}</span>
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {t('seasonOptions').map((sn) => (
                  <button
                    key={sn}
                    onClick={() => { setSeason(sn); setValidationError(''); }}
                    className={`p-4 rounded-2xl border text-sm font-bold text-center transition-all ${
                      season === sn
                        ? 'bg-forest text-paper border-forest shadow-md'
                        : 'bg-paper border-paper-dark text-charcoal hover:border-leaf'
                    }`}
                  >
                    ☀️ {sn}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Validation Error */}
          {validationError && (
            <div className="text-red-600 bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 text-sm font-semibold text-center animate-fadeIn">
              ⚠️ {validationError}
            </div>
          )}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-6 border-t border-paper-muted">
            {step > 1 ? (
              <button
                onClick={() => { setValidationError(''); setStep(step - 1); }}
                className="px-5 py-2.5 rounded-xl bg-paper border border-paper-dark text-forest font-bold text-sm"
              >
                Back
              </button>
            ) : <div />}

            {step < 5 ? (
              <button
                onClick={handleNextStep}
                disabled={!isCurrentStepSelected()}
                className={`px-6 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-md transition-all ${
                  isCurrentStepSelected()
                    ? 'bg-forest text-paper hover:bg-forest-light'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>Next Step</span>
                <ChevronRight className="w-4 h-4 text-harvest" />
              </button>
            ) : (
              <button
                onClick={() => {
                  if (!isCurrentStepSelected()) {
                    setValidationError('Please select an option before proceeding.');
                    return;
                  }
                  handleGenerate();
                }}
                disabled={loading || !isCurrentStepSelected()}
                className="px-8 py-3.5 rounded-2xl bg-harvest hover:bg-harvest-amber text-forest-dark font-black text-sm shadow-glow-harvest flex items-center gap-2 transition-all hover:scale-105"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Calculating Suitability...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{t('btnCalculateRec')}</span>
                  </>
                )}
              </button>
            )}
          </div>

        </div>
      )}

      {/* RECOMMENDATION RESULTS DISPLAY */}
      {recommendations && (
        <div className="space-y-6 animate-fadeIn">
          
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-black uppercase text-harvest">{district} • {soil}</span>
              <h3 className="text-2xl font-black text-forest">{t('recResultTitle')}</h3>
            </div>

            <button
              onClick={() => {
                setRecommendations(null);
                setStep(1);
                setDistrict('');
                setLandSize('');
                setWater('');
                setSoil('');
                setSeason('');
                setValidationError('');
              }}
              className="px-4 py-2 rounded-xl bg-paper border border-paper-dark text-xs font-bold text-forest hover:bg-paper-muted"
            >
              Reset Inputs
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recommendations.map((rec, idx) => (
              <div 
                key={rec.id} 
                className={`bg-paper-card rounded-3xl p-6 border shadow-soft-natural space-y-4 relative overflow-hidden transition-all hover:scale-[1.02] ${
                  idx === 0 ? 'border-harvest border-2 shadow-glow-harvest' : 'border-paper-dark'
                }`}
              >
                {idx === 0 && (
                  <div className="absolute top-0 right-0 bg-harvest text-forest-dark px-3 py-1 rounded-bl-2xl text-[10px] font-black uppercase tracking-wider">
                    ⭐ Top Match
                  </div>
                )}

                {/* Animated Suitability Ring SVG */}
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black text-forest">0{idx + 1}</span>
                  
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-paper-muted"
                        strokeWidth="3.5"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-harvest"
                        strokeDasharray={`${rec.suitability}, 100`}
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <span className="absolute text-xs font-black text-forest">
                      {rec.suitability}%
                    </span>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-black text-forest">{rec.name}</h4>
                  <p className="text-xs text-charcoal-muted mt-1">{rec.duration} • Est: {rec.yieldEstimate}</p>
                </div>

                <div className="space-y-2 pt-2 border-t border-paper-muted">
                  <p className="text-xs font-bold text-forest uppercase tracking-wider">{t('recWhyHeading')}</p>
                  <p className="text-xs text-charcoal leading-relaxed bg-paper p-3 rounded-xl border border-paper-dark">
                    {rec.keyReason}
                  </p>
                </div>

                <div className="space-y-1">
                  {rec.advantages.map((adv, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-forest font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5 text-leaf" />
                      <span>{adv}</span>
                    </div>
                  ))}
                </div>

              </div>
            ))}
          </div>

        </div>
      )}

    </section>
  );
};
