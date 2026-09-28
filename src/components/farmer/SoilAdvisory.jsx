import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Layers, Sparkles, CheckCircle2, AlertCircle, Droplets, Info } from 'lucide-react';

export const SoilAdvisory = () => {
  const { t } = useLanguage();

  return (
    <section className="py-8 max-w-5xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-harvest bg-harvest-pale px-3 py-1 rounded-full">
          Soil Fertility Intelligence
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-forest">
          {t('soilTitle')}
        </h2>
        <p className="text-sm sm:text-base text-charcoal-muted max-w-xl mx-auto">
          {t('soilSub')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Visual Soil Layer Graphic */}
        <div className="lg:col-span-5 bg-paper-card rounded-3xl p-6 border border-paper-dark shadow-soft-natural space-y-4">
          <h3 className="text-base font-extrabold text-forest uppercase tracking-wider flex items-center gap-2">
            <Layers className="w-5 h-5 text-harvest" />
            <span>Soil Cross-Section Graphic</span>
          </h3>

          {/* Soil Layer Graphic Container */}
          <div className="rounded-2xl overflow-hidden border-2 border-forest/30 shadow-md">
            
            {/* Layer 1: Topsoil Organic Layer (0-15cm) */}
            <div className="bg-[#4A3222] text-amber-100 p-4 border-b border-amber-900/40 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-harvest-amber font-black">{t('layerTopsoil')}</span>
                <span className="bg-harvest/30 text-amber-200 px-2 py-0.5 rounded text-[10px]">Rich Dark Loam</span>
              </div>
              <p className="text-[11px] text-amber-200/80">
                High organic carbon (0.75%). Root zone for Paddy, Vegetables & Maize.
              </p>
            </div>

            {/* Layer 2: Subsoil Red Earth / Tanr Layer (15-45cm) */}
            <div className="bg-[#8B3A2B] text-amber-100 p-4 border-b border-amber-900/40 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="text-amber-200 font-black">{t('layerSubsoil')}</span>
                <span className="bg-white/10 px-2 py-0.5 rounded text-[10px]">Red Clay / Iron Oxide</span>
              </div>
              <p className="text-[11px] text-amber-100/80">
                Slightly acidic red soil typical for Chota Nagpur plateau. Holds moisture well.
              </p>
            </div>

            {/* Layer 3: Weathered Bedrock Layer (45cm+) */}
            <div className="bg-[#5C4D46] text-amber-200 p-4 space-y-1">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="font-black">{t('layerBedrock')}</span>
                <span className="bg-black/20 px-2 py-0.5 rounded text-[10px]">Granite Gneiss</span>
              </div>
              <p className="text-[11px] text-amber-200/70">
                Deep mineral substrate. Provides natural drainage for plateau slopes.
              </p>
            </div>

          </div>

          <p className="text-xs text-charcoal-muted text-center font-medium">
            📍 Sample Location: Khunti Block 04 • Tested Aug 2026
          </p>
        </div>

        {/* Right Side: Nutrients Breakdown & AI Explanation */}
        <div className="lg:col-span-7 bg-paper-card rounded-3xl p-6 sm:p-8 border border-paper-dark shadow-soft-natural space-y-6">
          
          <div className="flex items-center justify-between border-b border-paper-muted pb-4">
            <div>
              <span className="text-xs font-extrabold uppercase text-harvest">{t('soilHealthText')}</span>
              <h3 className="text-xl font-black text-forest">Khunti Soil Lab Analysis</h3>
            </div>
            <div className="bg-leaf-pale text-forest font-extrabold px-3 py-1 rounded-full text-xs">
              pH 6.2 (Optimal)
            </div>
          </div>

          {/* AI Explanation Box */}
          <div className="p-4 rounded-2xl bg-paper border border-paper-dark space-y-2">
            <div className="flex items-center gap-2 text-xs font-black text-forest uppercase">
              <Sparkles className="w-4 h-4 text-harvest-amber" />
              <span>AI Soil Advisory</span>
            </div>
            <p className="text-xs sm:text-sm text-charcoal leading-relaxed font-medium">
              Your soil has strong organic carbon (0.75%), ideal for Paddy and Arhar pulses. Nitrogen is slightly deficient (195 kg/ha). Recommended: Apply 25kg Urea + 10kg Azotobacter bio-fertilizer before sowing next crop.
            </p>
          </div>

          {/* N-P-K & Carbon Nutrient Meters */}
          <div className="space-y-4">
            
            {/* Nitrogen */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-forest">{t('nitrogenLabel')}</span>
                <span className="text-harvest font-black">195 kg/ha (Slightly Low)</span>
              </div>
              <div className="w-full h-3 bg-paper-muted rounded-full overflow-hidden">
                <div className="h-full bg-harvest rounded-full" style={{ width: '45%' }} />
              </div>
            </div>

            {/* Phosphorus */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-forest">{t('phosphorusLabel')}</span>
                <span className="text-leaf font-black">18.5 kg/ha (Optimal)</span>
              </div>
              <div className="w-full h-3 bg-paper-muted rounded-full overflow-hidden">
                <div className="h-full bg-leaf rounded-full" style={{ width: '70%' }} />
              </div>
            </div>

            {/* Potassium */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-forest">{t('potassiumLabel')}</span>
                <span className="text-forest font-black">240 kg/ha (High Fertility)</span>
              </div>
              <div className="w-full h-3 bg-paper-muted rounded-full overflow-hidden">
                <div className="h-full bg-forest rounded-full" style={{ width: '85%' }} />
              </div>
            </div>

            {/* Organic Carbon */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold">
                <span className="text-forest">{t('organicCarbonLabel')}</span>
                <span className="text-leaf font-black">0.75% (Good)</span>
              </div>
              <div className="w-full h-3 bg-paper-muted rounded-full overflow-hidden">
                <div className="h-full bg-leaf-soft rounded-full" style={{ width: '75%' }} />
              </div>
            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
