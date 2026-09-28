import React, { useState } from 'react';
import { LanguageProvider } from './i18n/LanguageContext';
import { Header } from './components/layout/Header';
import { BottomNav } from './components/layout/BottomNav';
import { Footer } from './components/layout/Footer';
import { VoiceAgentWidget } from './components/layout/VoiceAgentWidget';

// Farmer Views
import { HeroSection } from './components/farmer/HeroSection';
import { DashboardOverview } from './components/farmer/DashboardOverview';
import { CropScanner } from './components/farmer/CropScanner';
import { CropRecommendation } from './components/farmer/CropRecommendation';
import { WeatherIntelligence } from './components/farmer/WeatherIntelligence';
import { SoilAdvisory } from './components/farmer/SoilAdvisory';
import { VoiceInterface } from './components/farmer/VoiceInterface';
import { LocalKnowledge } from './components/farmer/LocalKnowledge';
import { JharkhandMap } from './components/farmer/JharkhandMap';
import { FarmHistory } from './components/farmer/FarmHistory';

// Admin View
import { AdminDashboard } from './components/admin/AdminDashboard';

function MainContent() {
  const [activeTab, setActiveTab] = useState('home');
  const [isAdminMode, setIsAdminMode] = useState(false);

  const handleStartFarm = () => {
    setActiveTab('voice');
  };

  const handleScanClick = () => {
    setActiveTab('scan');
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper text-charcoal font-sans selection:bg-harvest-amber selection:text-forest-dark">
      
      {/* Header Bar */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isAdminMode={isAdminMode} 
        setIsAdminMode={setIsAdminMode} 
      />

      {/* Main Content Body */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-20 lg:pb-12">
        
        {/* EXPERT ADMIN MODE OVERRIDE */}
        {isAdminMode ? (
          <AdminDashboard />
        ) : (
          <>
            {/* HOME TAB: Full Editorial Showcase */}
            {activeTab === 'home' && (
              <div className="space-y-16">
                <HeroSection onStartFarm={handleStartFarm} onScanClick={handleScanClick} />
                <DashboardOverview 
                  onMicClick={() => setActiveTab('voice')} 
                  onScanClick={handleScanClick} 
                  onTabChange={setActiveTab} 
                />
                <CropScanner onVoiceClick={() => setActiveTab('voice')} />
                <CropRecommendation />
                <WeatherIntelligence />
                <SoilAdvisory />
                <JharkhandMap />
                <LocalKnowledge />
                <FarmHistory />
              </div>
            )}

            {/* DEDICATED INDIVIDUAL FEATURE SCREENS */}
            {activeTab === 'scan' && <CropScanner onVoiceClick={() => setActiveTab('voice')} />}
            {activeTab === 'recommend' && <CropRecommendation />}
            {activeTab === 'weather' && <WeatherIntelligence />}
            {activeTab === 'soil' && <SoilAdvisory />}
            {activeTab === 'voice' && <VoiceInterface />}
            {activeTab === 'knowledge' && <LocalKnowledge />}
            {activeTab === 'map' && <JharkhandMap />}
            {activeTab === 'history' && <FarmHistory />}
            {activeTab === 'admin' && <AdminDashboard />}
          </>
        )}

      </main>

      {/* Mobile Bottom Navigation */}
      <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Global xAI Voice Agent Floating Widget */}
      <VoiceAgentWidget onOpenVoiceTab={() => setActiveTab('voice')} />

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}
