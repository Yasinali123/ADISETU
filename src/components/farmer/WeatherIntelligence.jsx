import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { CloudRain, Sun, CloudLightning, ShieldAlert, AlertTriangle, ArrowRight, CheckCircle2 } from 'lucide-react';

export const WeatherIntelligence = () => {
  const { t } = useLanguage();

  const days = [
    { day: t('dayToday'), temp: "28°C", icon: Sun, condition: "Partly Cloudy • Humidity 82%", rain: "10%", action: "Optimal day for land preparation & manual weeding." },
    { day: t('dayTomorrow'), temp: "26°C", icon: CloudRain, condition: "Rain Expected in 36h", rain: "85%", action: "AVOID spraying chemical fertilizers/pesticides today. Rainfall will wash treatments away." },
    { day: t('dayDay3'), temp: "25°C", icon: CloudLightning, condition: "Heavy Rain (25mm)", rain: "90%", action: "Clear field drainage channels to prevent waterlogging in Paddy/Vegetable beds." },
    { day: t('dayDay4'), temp: "29°C", icon: Sun, condition: "Clear Sky", rain: "15%", action: "Inspect leaves for fungal spots post-rain. Apply top dressing if soil surface is dry." },
  ];

  return (
    <section className="py-8 max-w-5xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-harvest bg-harvest-pale px-3 py-1 rounded-full">
          Agro-Meteorological Intelligence
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-forest">
          {t('weatherTitle')}
        </h2>
        <p className="text-sm sm:text-base text-charcoal-muted max-w-xl mx-auto">
          {t('weatherSub')}
        </p>
      </div>

      {/* Main Agriculture Weather Card */}
      <div className="bg-paper-card rounded-3xl p-6 sm:p-8 border border-paper-dark shadow-soft-natural space-y-6">
        
        {/* Current Weather Banner */}
        <div className="bg-forest text-paper rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-md">
          <div className="space-y-1">
            <span className="text-xs font-bold text-harvest-amber uppercase tracking-wider">
              Khunti District Station • Live Readout
            </span>
            <div className="flex items-center gap-4">
              <span className="text-4xl sm:text-5xl font-black text-paper">{t('currentTemp')}</span>
              <div>
                <p className="text-sm font-bold text-paper-muted">{t('currentCondition')}</p>
                <p className="text-xs text-harvest-amber font-extrabold flex items-center gap-1 mt-0.5">
                  <CloudRain className="w-4 h-4" />
                  <span>{t('rainExpected')}</span>
                </p>
              </div>
            </div>
          </div>

          <div className="bg-forest-light p-4 rounded-xl border border-leaf-soft/30 max-w-xs">
            <p className="text-xs font-bold uppercase text-harvest-amber">{t('weatherActionTitle')}</p>
            <p className="text-xs font-semibold text-paper mt-1 leading-snug">
              {t('weatherActionDesc')}
            </p>
          </div>
        </div>

        {/* Risk Connection */}
        <div className="p-4 rounded-2xl bg-harvest-pale border border-harvest/40 text-forest text-xs font-semibold flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-harvest shrink-0 mt-0.5" />
          <div>
            <p className="font-extrabold text-sm">{t('weatherRiskTitle')}</p>
            <p className="mt-0.5">{t('weatherRiskDesc')}</p>
          </div>
        </div>

        {/* 4-Day Agriculture Forecast Timeline */}
        <div className="space-y-3">
          <h3 className="text-base font-extrabold text-forest uppercase tracking-wider">
            4-Day Farming Timeline & Action Guide
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {days.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={idx} 
                  className={`p-5 rounded-2xl border transition-all ${
                    idx === 1 ? 'bg-paper-muted border-harvest border-2 shadow-xs' : 'bg-paper border-paper-dark'
                  }`}
                >
                  <div className="flex items-center justify-between pb-2 border-b border-paper-dark/40">
                    <div className="flex items-center gap-2">
                      <IconComp className="w-5 h-5 text-harvest" />
                      <span className="text-sm font-black text-forest">{item.day}</span>
                    </div>
                    <span className="text-sm font-black text-forest">{item.temp}</span>
                  </div>

                  <p className="text-xs text-charcoal-muted font-bold mt-2">{item.condition}</p>
                  
                  <div className="mt-3 pt-2 border-t border-paper-dark/20 text-xs font-semibold text-charcoal">
                    <span className="text-[10px] uppercase font-extrabold text-forest block mb-0.5">Recommended Action:</span>
                    {item.action}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </section>
  );
};
