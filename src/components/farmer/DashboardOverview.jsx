import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Mic, Camera, MapPin, Sprout, ArrowRight, ShieldAlert, Sparkles, CheckCircle2, CloudRain, AlertTriangle, Activity } from 'lucide-react';

export const DashboardOverview = ({ onMicClick, onScanClick, onTabChange }) => {
  const { t } = useLanguage();

  return (
    <section className="py-8 space-y-12">
      
      {/* Top Banner: Greeting, Location & Crop Context */}
      <div className="bg-paper-card rounded-3xl p-6 sm:p-8 border border-paper-dark shadow-soft-natural flex flex-col md:flex-row md:items-center justify-between gap-6">
        
        <div>
          <span className="text-xs font-bold text-harvest uppercase tracking-wider">
            {t('greeting')}
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-forest mt-0.5">
            Khunti Agriculture Hub
          </h2>
          <p className="text-sm text-charcoal-muted mt-1">
            Real-time advisory tuned to southern Jharkhand plateau red soils.
          </p>
        </div>

        {/* Location & Crop Context Pills */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-paper-muted border border-paper-dark text-sm font-bold text-forest">
            <MapPin className="w-4 h-4 text-harvest" />
            <span>{t('locationDefault')}</span>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-2xl bg-leaf-pale border border-leaf/40 text-sm font-bold text-forest">
            <Sprout className="w-4 h-4 text-leaf" />
            <span>{t('currentCrop')}</span>
          </div>
        </div>

      </div>

      {/* GIANT CENTRAL WORKSPACE: "ASK YOUR FARM" */}
      <div className="relative rounded-4xl bg-gradient-to-b from-forest to-forest-dark p-8 sm:p-12 text-paper text-center shadow-elevated-farm border-4 border-paper-card overflow-hidden">
        
        {/* Ambient Wave Background Effect */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(245,158,11,0.15)_0,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
          
          <div className="space-y-2">
            <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full bg-harvest/20 border border-harvest/40 text-harvest-amber text-xs font-extrabold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" />
              Voice-First Farm Intelligence
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-paper">
              {t('askFarmHeading')}
            </h2>
            <p className="text-base sm:text-lg text-paper-muted font-medium">
              {t('askFarmSubtext')}
            </p>
          </div>

          {/* GIANT MIC FOCAL BUTTON */}
          <div className="py-4 flex justify-center">
            <div className="relative group cursor-pointer" onClick={onMicClick}>
              
              {/* Pulsing Outer Rings */}
              <div className="absolute -inset-4 rounded-full bg-harvest/20 animate-ping pointer-events-none" />
              <div className="absolute -inset-8 rounded-full bg-leaf/20 animate-pulse pointer-events-none" />

              <button
                className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-harvest hover:bg-harvest-amber text-forest-dark flex flex-col items-center justify-center shadow-glow-harvest border-4 border-paper transition-all transform group-hover:scale-105 active:scale-95"
              >
                <Mic className="w-12 h-12 sm:w-14 sm:h-14 animate-pulse mb-1 text-forest-dark" />
                <span className="text-xs font-black uppercase tracking-wider text-forest-dark">
                  {t('btnSpeak')}
                </span>
              </button>

            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={onMicClick}
              className="px-6 py-3.5 rounded-2xl bg-paper text-forest font-extrabold text-sm shadow-md flex items-center gap-2 hover:bg-paper-card transition-all"
            >
              <Mic className="w-4 h-4 text-harvest" />
              <span>{t('btnSpeak')}</span>
            </button>

            <button
              onClick={onScanClick}
              className="px-6 py-3.5 rounded-2xl bg-leaf-soft/30 text-paper border border-leaf-soft/50 font-extrabold text-sm shadow-md flex items-center gap-2 hover:bg-leaf-soft/40 transition-all"
            >
              <Camera className="w-4 h-4 text-harvest-amber" />
              <span>{t('btnScanCrop')}</span>
            </button>
          </div>

          {/* Quick Question Chips */}
          <div className="pt-4 space-y-2">
            <p className="text-xs font-bold text-paper-muted uppercase tracking-wider">
              Popular Jharkhand Farmer Questions
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {t('quickQuestions').map((q, idx) => (
                <button
                  key={idx}
                  onClick={onMicClick}
                  className="px-3.5 py-1.5 rounded-xl bg-forest-light/60 border border-paper-dark/20 text-xs font-semibold text-paper-muted hover:text-paper hover:bg-forest-light transition-all text-left"
                >
                  "{q}"
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* HORIZONTAL FARM HEALTH TIMELINE STRIP */}
      <div className="space-y-4">
        
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-extrabold text-forest flex items-center gap-2">
            <Activity className="w-5 h-5 text-harvest" />
            <span>{t('farmHealthTitle')}</span>
          </h3>
          <span className="text-xs font-bold text-charcoal-muted">
            Live Streamed • Updated 10m ago
          </span>
        </div>

        {/* Horizontal Timeline Strip Card */}
        <div className="bg-paper-card rounded-3xl p-6 border border-paper-dark shadow-soft-natural overflow-x-auto">
          
          <div className="min-w-[650px] grid grid-cols-5 gap-4 relative">
            
            {/* Connecting Horizontal Pipeline Line */}
            <div className="absolute top-1/2 left-8 right-8 h-1 bg-paper-muted -translate-y-1/2 -z-0" />

            {/* 1. Soil */}
            <div 
              onClick={() => onTabChange('soil')}
              className="relative z-10 bg-paper p-4 rounded-2xl border border-paper-dark hover:border-leaf cursor-pointer transition-all hover:scale-105 group"
            >
              <div className="w-9 h-9 rounded-xl bg-leaf-pale text-leaf flex items-center justify-center mb-3 group-hover:bg-leaf group-hover:text-paper transition-colors">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-charcoal-muted uppercase">{t('healthSoil')}</p>
              <p className="text-sm font-black text-forest mt-0.5">{t('healthSoilVal')}</p>
            </div>

            {/* 2. Crop */}
            <div 
              onClick={() => onTabChange('scan')}
              className="relative z-10 bg-paper p-4 rounded-2xl border border-harvest/40 hover:border-harvest cursor-pointer transition-all hover:scale-105 group"
            >
              <div className="w-9 h-9 rounded-xl bg-harvest-pale text-harvest flex items-center justify-center mb-3 group-hover:bg-harvest group-hover:text-forest-dark transition-colors">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-charcoal-muted uppercase">{t('healthCrop')}</p>
              <p className="text-sm font-black text-harvest mt-0.5">{t('healthCropVal')}</p>
            </div>

            {/* 3. Weather */}
            <div 
              onClick={() => onTabChange('weather')}
              className="relative z-10 bg-paper p-4 rounded-2xl border border-paper-dark hover:border-forest cursor-pointer transition-all hover:scale-105 group"
            >
              <div className="w-9 h-9 rounded-xl bg-paper-muted text-forest flex items-center justify-center mb-3 group-hover:bg-forest group-hover:text-paper transition-colors">
                <CloudRain className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-charcoal-muted uppercase">{t('healthWeather')}</p>
              <p className="text-sm font-black text-forest mt-0.5">{t('healthWeatherVal')}</p>
            </div>

            {/* 4. Risk */}
            <div 
              onClick={() => onTabChange('scan')}
              className="relative z-10 bg-paper p-4 rounded-2xl border border-paper-dark hover:border-harvest cursor-pointer transition-all hover:scale-105 group"
            >
              <div className="w-9 h-9 rounded-xl bg-harvest-pale text-harvest flex items-center justify-center mb-3">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-charcoal-muted uppercase">{t('healthRisk')}</p>
              <p className="text-sm font-black text-forest mt-0.5">{t('healthRiskVal')}</p>
            </div>

            {/* 5. Action */}
            <div 
              onClick={() => onTabChange('scan')}
              className="relative z-10 bg-forest text-paper p-4 rounded-2xl border border-forest-light cursor-pointer transition-all hover:scale-105 group shadow-md"
            >
              <div className="w-9 h-9 rounded-xl bg-harvest text-forest-dark flex items-center justify-center mb-3">
                <ArrowRight className="w-5 h-5" />
              </div>
              <p className="text-xs font-bold text-harvest-amber uppercase">{t('healthAction')}</p>
              <p className="text-xs font-extrabold text-paper mt-0.5 leading-snug">{t('healthActionVal')}</p>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
