import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { ShieldCheck, Users, Camera, AlertTriangle, UserCheck, ArrowUpRight, Filter, Search, CheckCircle, Clock } from 'lucide-react';

export const AdminDashboard = () => {
  const { t } = useLanguage();

  const [scanFeed, setScanFeed] = useState([
    {
      id: "SCAN_9041",
      farmerName: "Birsa Munda",
      district: "Khunti (Karra Block)",
      crop: "Tomato",
      aiDetection: "Early Blight (91% confidence)",
      status: "AI Resolved",
      timestamp: "12 mins ago"
    },
    {
      id: "SCAN_9040",
      farmerName: "Anita Hembrom",
      district: "Dumka (Jama Block)",
      crop: "Paddy (Dhan)",
      aiDetection: "Suspected Sheath Blight (74% confidence)",
      status: "Pending KVK Expert Review",
      timestamp: "28 mins ago"
    },
    {
      id: "SCAN_9039",
      farmerName: "Rajesh Oraon",
      district: "West Singhbhum",
      crop: "Maize",
      aiDetection: "Fall Armyworm Damage (88% confidence)",
      status: "AI Resolved",
      timestamp: "45 mins ago"
    }
  ]);

  const handleEscalate = (id) => {
    setScanFeed(scanFeed.map(item => item.id === id ? { ...item, status: "Escalated to KVK Officer" } : item));
  };

  return (
    <section className="py-8 max-w-7xl mx-auto space-y-8 animate-fadeIn">
      
      {/* Top Banner Header */}
      <div className="bg-forest text-paper rounded-3xl p-6 sm:p-8 shadow-elevated-farm border-4 border-paper-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-harvest-amber animate-pulse" />
            <span className="text-xs font-black uppercase tracking-wider text-harvest-amber">
              Jharkhand Krishi Control Room • KVK Portal
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-paper mt-1">
            {t('adminTitle')}
          </h2>
          <p className="text-sm text-paper-muted mt-1 max-w-2xl">
            {t('adminSub')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-forest-light px-4 py-2 rounded-2xl border border-leaf-soft/30 text-xs font-bold text-paper">
            <span>24 Districts Synchronized</span>
          </div>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* Metric 1 */}
        <div className="bg-paper-card rounded-3xl p-6 border border-paper-dark shadow-soft-natural space-y-2">
          <div className="flex items-center justify-between text-charcoal-muted">
            <span className="text-xs font-bold uppercase">{t('statFarmers')}</span>
            <Users className="w-5 h-5 text-forest" />
          </div>
          <p className="text-3xl font-black text-forest">104,280</p>
          <p className="text-[11px] font-bold text-leaf flex items-center gap-1">
            <ArrowUpRight className="w-3.5 h-3.5" />
            <span>+1,420 registered this week</span>
          </p>
        </div>

        {/* Metric 2 */}
        <div className="bg-paper-card rounded-3xl p-6 border border-paper-dark shadow-soft-natural space-y-2">
          <div className="flex items-center justify-between text-charcoal-muted">
            <span className="text-xs font-bold uppercase">{t('statScansToday')}</span>
            <Camera className="w-5 h-5 text-leaf" />
          </div>
          <p className="text-3xl font-black text-forest">1,420</p>
          <p className="text-[11px] font-bold text-harvest">91% AI automated resolution</p>
        </div>

        {/* Metric 3 */}
        <div className="bg-paper-card rounded-3xl p-6 border border-paper-dark shadow-soft-natural space-y-2">
          <div className="flex items-center justify-between text-charcoal-muted">
            <span className="text-xs font-bold uppercase">{t('statAlertsActive')}</span>
            <AlertTriangle className="w-5 h-5 text-harvest" />
          </div>
          <p className="text-3xl font-black text-harvest">14</p>
          <p className="text-[11px] font-bold text-charcoal-muted">Humidity factor in Khunti & Dumka</p>
        </div>

        {/* Metric 4 */}
        <div className="bg-paper-card rounded-3xl p-6 border border-paper-dark shadow-soft-natural space-y-2">
          <div className="flex items-center justify-between text-charcoal-muted">
            <span className="text-xs font-bold uppercase">{t('statKvkRequests')}</span>
            <ShieldCheck className="w-5 h-5 text-harvest-amber" />
          </div>
          <p className="text-3xl font-black text-forest">3</p>
          <p className="text-[11px] font-bold text-leaf">Avg response time: 14 mins</p>
        </div>

      </div>

      {/* Main Content Grid: Disease Outbreak Heatmap + Real-time Scan Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* District Outbreak Trends (Left 5 Cols) */}
        <div className="lg:col-span-5 bg-paper-card rounded-3xl p-6 border border-paper-dark shadow-soft-natural space-y-4">
          <h3 className="text-base font-extrabold text-forest uppercase tracking-wider">
            {t('diseaseTrendsTitle')}
          </h3>

          <div className="space-y-3">
            
            <div className="p-4 rounded-2xl bg-paper border border-paper-dark space-y-1">
              <div className="flex justify-between text-xs font-extrabold">
                <span className="text-forest">Khunti District</span>
                <span className="text-harvest">Early Blight (High Alert)</span>
              </div>
              <p className="text-xs text-charcoal-muted">412 scans in last 48 hours • 82% humidity trigger</p>
              <div className="w-full h-2 bg-paper-muted rounded-full overflow-hidden mt-1">
                <div className="h-full bg-harvest rounded-full" style={{ width: '80%' }} />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-paper border border-paper-dark space-y-1">
              <div className="flex justify-between text-xs font-extrabold">
                <span className="text-forest">Dumka District</span>
                <span className="text-harvest">Brown Planthopper</span>
              </div>
              <p className="text-xs text-charcoal-muted">189 scans in last 48 hours • Canal area focus</p>
              <div className="w-full h-2 bg-paper-muted rounded-full overflow-hidden mt-1">
                <div className="h-full bg-harvest-amber rounded-full" style={{ width: '55%' }} />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-paper border border-paper-dark space-y-1">
              <div className="flex justify-between text-xs font-extrabold">
                <span className="text-forest">Hazaribagh District</span>
                <span className="text-leaf">Paddy Stem Borer (Low)</span>
              </div>
              <p className="text-xs text-charcoal-muted">42 scans in last 48 hours • Contained</p>
              <div className="w-full h-2 bg-paper-muted rounded-full overflow-hidden mt-1">
                <div className="h-full bg-leaf rounded-full" style={{ width: '25%' }} />
              </div>
            </div>

          </div>
        </div>

        {/* Real-time Scan Feed (Right 7 Cols) */}
        <div className="lg:col-span-7 bg-paper-card rounded-3xl p-6 sm:p-8 border border-paper-dark shadow-soft-natural space-y-4">
          
          <div className="flex items-center justify-between border-b border-paper-muted pb-4">
            <div>
              <span className="text-xs font-extrabold uppercase text-harvest">Live Feed</span>
              <h3 className="text-xl font-black text-forest">{t('recentScansTitle')}</h3>
            </div>

            <span className="text-xs font-bold text-leaf bg-leaf-pale px-3 py-1 rounded-full">
              Live WebSockets Active
            </span>
          </div>

          <div className="space-y-4">
            {scanFeed.map((item) => (
              <div 
                key={item.id}
                className="p-4 rounded-2xl bg-paper border border-paper-dark space-y-3 hover:border-leaf transition-all"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-forest">{item.id}</span>
                    <span className="text-xs text-charcoal-muted">• {item.timestamp}</span>
                  </div>

                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${
                    item.status.includes('Escalated')
                      ? 'bg-harvest-pale text-forest border-harvest'
                      : item.status.includes('Pending')
                      ? 'bg-harvest-pale text-harvest border-harvest/40'
                      : 'bg-leaf-pale text-forest border-leaf/40'
                  }`}>
                    {item.status}
                  </span>
                </div>

                <div>
                  <p className="text-sm font-black text-forest">
                    {item.farmerName} <span className="font-medium text-xs text-charcoal-muted">({item.district})</span>
                  </p>
                  <p className="text-xs text-charcoal font-semibold mt-0.5">
                    Crop: <span className="font-bold text-forest">{item.crop}</span> — AI Result: <span className="font-bold text-harvest">{item.aiDetection}</span>
                  </p>
                </div>

                {item.status.includes('Pending') && (
                  <div className="pt-2 border-t border-paper-dark/30 flex justify-end">
                    <button
                      onClick={() => handleEscalate(item.id)}
                      className="px-4 py-1.5 rounded-xl bg-forest hover:bg-forest-light text-paper text-xs font-bold shadow-xs transition-all"
                    >
                      {t('btnResolve')}
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>

        </div>

      </div>

    </section>
  );
};
