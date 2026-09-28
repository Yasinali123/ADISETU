import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Sprout, Mic, ShieldCheck, UserCheck, Menu, X, Globe, Sparkles } from 'lucide-react';

export const Header = ({ activeTab, setActiveTab, isAdminMode, setIsAdminMode }) => {
  const { lang, setLang, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: t('navHome') },
    { id: 'scan', label: t('navScan') },
    { id: 'recommend', label: t('navRecommend') },
    { id: 'weather', label: t('navWeather') },
    { id: 'soil', label: t('navSoil') },
    { id: 'knowledge', label: t('navKnowledge') },
    { id: 'map', label: t('navMap') },
    { id: 'history', label: t('navHistory') },
  ];

  return (
    <header className="sticky top-0 z-50 bg-paper/95 backdrop-blur-md border-b border-paper-dark/60 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo & Tagline */}
          <div 
            onClick={() => {
              setActiveTab('home');
              setIsAdminMode(false);
            }}
            className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl bg-forest flex items-center justify-center text-harvest-amber shadow-soft-natural group-hover:scale-105 transition-all">
              <Sprout className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            
            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base sm:text-xl lg:text-2xl text-forest tracking-tight leading-none">
                  {t('brandName')}
                </span>
                <span className="hidden sm:inline-flex bg-harvest-pale text-harvest text-[10px] uppercase font-black px-2 py-0.5 rounded-full border border-harvest/30">
                  Jharkhand
                </span>
              </div>
              <p className="text-[11px] text-charcoal-muted hidden md:block font-medium mt-0.5 tracking-normal">
                {t('brandTagline')}
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-paper-muted/80 p-1.5 rounded-2xl border border-paper-dark/50 shadow-inner">
            {navItems.map((item) => {
              const isActive = activeTab === item.id && !isAdminMode;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsAdminMode(false);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isActive
                      ? 'bg-paper-card text-forest shadow-soft-natural'
                      : 'text-charcoal-muted hover:text-forest hover:bg-paper-card/50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls: Language Toggle + Mic CTA + Mode Switcher */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            
            {/* Language Toggle Pills */}
            <div className="flex items-center bg-paper-card p-1 rounded-xl sm:rounded-2xl border border-paper-dark shadow-xs">
              <button
                onClick={() => setLang('en')}
                className={`px-2 sm:px-2.5 py-1 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black transition-all ${
                  lang === 'en'
                    ? 'bg-forest text-paper shadow-xs'
                    : 'text-charcoal-muted hover:text-forest'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-2 sm:px-2.5 py-1 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black transition-all ${
                  lang === 'hi'
                    ? 'bg-forest text-paper shadow-xs'
                    : 'text-charcoal-muted hover:text-forest'
                }`}
              >
                हिन्दी
              </button>
              <button
                onClick={() => setLang('sat')}
                className={`px-2 sm:px-2.5 py-1 rounded-lg sm:rounded-xl text-[10px] sm:text-xs font-black transition-all ${
                  lang === 'sat'
                    ? 'bg-harvest text-forest-dark font-black shadow-xs'
                    : 'text-charcoal-muted hover:text-forest'
                }`}
              >
                ᱥᱟᱱᱛᱟᱲᱤ
              </button>
            </div>

            {/* Quick Mic Trigger (Desktop/Tablet) */}
            <button
              onClick={() => {
                setActiveTab('voice');
                setIsAdminMode(false);
              }}
              className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-xl sm:rounded-2xl bg-forest hover:bg-forest-light text-paper text-xs font-bold shadow-soft-natural transition-all hover:scale-105 active:scale-95"
            >
              <Mic className="w-3.5 h-3.5 text-harvest-amber animate-pulse" />
              <span>{t('btnSpeak')}</span>
            </button>

            {/* Farmer / Expert Admin View Toggle */}
            <button
              onClick={() => {
                setIsAdminMode(!isAdminMode);
                if (!isAdminMode) setActiveTab('admin');
                else setActiveTab('home');
              }}
              title="Toggle Expert Admin Panel"
              className={`p-2 sm:px-3 sm:py-2 rounded-xl sm:rounded-2xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                isAdminMode
                  ? 'bg-harvest-pale border-harvest text-forest shadow-glow-harvest font-black'
                  : 'bg-paper-card border-paper-dark text-charcoal-muted hover:border-forest hover:text-forest'
              }`}
            >
              {isAdminMode ? (
                <>
                  <ShieldCheck className="w-4 h-4 text-harvest" />
                  <span className="hidden md:inline">Expert Mode</span>
                </>
              ) : (
                <>
                  <UserCheck className="w-4 h-4 text-leaf" />
                  <span className="hidden md:inline">Farmer View</span>
                </>
              )}
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
              className="lg:hidden p-2 rounded-xl sm:rounded-2xl bg-paper-card border border-paper-dark text-forest hover:bg-paper-muted transition-colors"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Animated Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-paper-card border-b border-paper-dark px-4 py-4 space-y-3 shadow-elevated-farm animate-fadeIn">
          
          {/* Mobile Drawer Language Selector */}
          <div className="flex items-center justify-between p-3 rounded-2xl bg-paper border border-paper-dark">
            <span className="text-xs font-extrabold text-forest flex items-center gap-1.5">
              <Globe className="w-4 h-4 text-harvest" />
              Select Language:
            </span>
            <div className="flex bg-paper-card p-1 rounded-xl border border-paper-dark">
              <button
                onClick={() => setLang('en')}
                className={`px-2.5 py-1 rounded-lg text-xs font-black ${lang === 'en' ? 'bg-forest text-paper' : 'text-charcoal-muted'}`}
              >
                EN
              </button>
              <button
                onClick={() => setLang('hi')}
                className={`px-2.5 py-1 rounded-lg text-xs font-black ${lang === 'hi' ? 'bg-forest text-paper' : 'text-charcoal-muted'}`}
              >
                हिन्दी
              </button>
              <button
                onClick={() => setLang('sat')}
                className={`px-2.5 py-1 rounded-lg text-xs font-black ${lang === 'sat' ? 'bg-harvest text-forest-dark' : 'text-charcoal-muted'}`}
              >
                ᱥᱟᱱᱛᱟᱲᱤ
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setIsAdminMode(false);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 rounded-xl font-bold text-xs transition-all ${
                  activeTab === item.id && !isAdminMode
                    ? 'bg-forest text-paper shadow-xs'
                    : 'text-charcoal bg-paper hover:bg-paper-muted border border-paper-dark'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Expert Mode Switcher in Drawer */}
          <button
            onClick={() => {
              setIsAdminMode(!isAdminMode);
              setActiveTab(isAdminMode ? 'home' : 'admin');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-4 py-3 rounded-2xl font-black text-xs bg-harvest-pale text-forest border border-harvest/40 flex items-center justify-between shadow-xs"
          >
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-harvest" />
              {isAdminMode ? 'Switch to Farmer Experience' : 'Switch to KVK Expert Dashboard'}
            </span>
            <span className="text-[10px] uppercase font-bold text-harvest bg-paper px-2 py-0.5 rounded-full">
              {isAdminMode ? 'Farmer Mode' : 'Admin Mode'}
            </span>
          </button>

        </div>
      )}
    </header>
  );
};
