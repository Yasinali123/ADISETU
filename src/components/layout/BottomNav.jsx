import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Home, Camera, Mic, Compass, LayoutGrid } from 'lucide-react';

export const BottomNav = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage();

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-paper-card/95 backdrop-blur-lg border-t border-paper-dark px-4 py-2 shadow-elevated-farm">
      <div className="flex items-center justify-around max-w-md mx-auto relative">
        
        {/* Home */}
        <button
          onClick={() => setActiveTab('home')}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'home' ? 'text-forest font-bold scale-105' : 'text-charcoal-muted opacity-70'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[11px] font-medium">{t('navHome')}</span>
        </button>

        {/* Scan */}
        <button
          onClick={() => setActiveTab('scan')}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'scan' ? 'text-forest font-bold scale-105' : 'text-charcoal-muted opacity-70'
          }`}
        >
          <Camera className="w-5 h-5" />
          <span className="text-[11px] font-medium">{t('navScan')}</span>
        </button>

        {/* Elevated Ask Voice Button */}
        <div className="relative -top-5">
          <button
            onClick={() => setActiveTab('voice')}
            className="w-14 h-14 rounded-full bg-forest text-harvest-amber flex items-center justify-center shadow-glow-mic border-4 border-paper active:scale-95 transition-all hover:scale-105"
          >
            <Mic className="w-7 h-7 animate-pulse" />
          </button>
        </div>

        {/* Advisor */}
        <button
          onClick={() => setActiveTab('recommend')}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'recommend' ? 'text-forest font-bold scale-105' : 'text-charcoal-muted opacity-70'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[11px] font-medium">{t('navRecommend')}</span>
        </button>

        {/* More */}
        <button
          onClick={() => setActiveTab('knowledge')}
          className={`flex flex-col items-center gap-1 transition-all ${
            activeTab === 'knowledge' ? 'text-forest font-bold scale-105' : 'text-charcoal-muted opacity-70'
          }`}
        >
          <LayoutGrid className="w-5 h-5" />
          <span className="text-[11px] font-medium">{t('navKnowledge')}</span>
        </button>

      </div>
    </div>
  );
};
