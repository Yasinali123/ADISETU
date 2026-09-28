import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Sprout, PhoneCall, ShieldCheck, Heart } from 'lucide-react';

export const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-forest text-paper pt-16 pb-24 lg:pb-12 border-t border-forest-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Col 1: Brand */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-harvest flex items-center justify-center text-forest-dark font-black">
                <Sprout className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-paper tracking-tight">
                {t('brandName')}
              </span>
            </div>
            
            <p className="text-sm text-paper-muted max-w-sm leading-relaxed font-normal">
              {t('brandTagline')} Dedicated agricultural AI assistant built for Jharkhand's 24 districts, combining computer vision, weather, soil data, and indigenous traditional knowledge.
            </p>

            <div className="p-4 rounded-2xl bg-forest-light border border-leaf-soft/30 inline-flex items-center gap-3">
              <PhoneCall className="w-5 h-5 text-harvest-amber animate-pulse" />
              <div>
                <p className="text-[11px] font-bold text-harvest-amber uppercase">KVK Helpline Jharkhand</p>
                <p className="text-sm font-extrabold text-paper">Toll Free: 1800-180-1551</p>
              </div>
            </div>
          </div>

          {/* Col 2: Jharkhand Agricultural Institutes */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase text-harvest-amber tracking-wider">
              Validated Partners
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-paper-muted">
              <li>Birsa Agricultural University (BAU), Ranchi</li>
              <li>Krishi Vigyan Kendra (KVK) Khunti</li>
              <li>Jharkhand State Dept of Agriculture</li>
              <li>ICAR Research Complex for Eastern Region</li>
            </ul>
          </div>

          {/* Col 3: Accessibility & Language */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase text-harvest-amber tracking-wider">
              Accessible Dialects
            </h4>
            <ul className="space-y-2 text-xs font-semibold text-paper-muted">
              <li>English (Climate Tech)</li>
              <li>हिन्दी (Hindi Farmer Interface)</li>
              <li>ᱥᱟᱱᱛᱟᱲᱤ (Santhali Ol Chiki Support)</li>
              <li>Voice-First No-Typing Required</li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 border-t border-forest-light/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-paper-muted font-medium">
          <p>© 2026 ADISETU (Jharkhand). All rights reserved.</p>
          <div className="flex items-center gap-2 text-harvest-amber font-bold">
            <ShieldCheck className="w-4 h-4 text-harvest" />
            <span>Certified Safety & Verification Standards</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
