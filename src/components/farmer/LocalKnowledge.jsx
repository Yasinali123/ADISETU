import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { BookOpen, UserCheck, ShieldCheck, Sparkles, PlusCircle, Heart, Share2 } from 'lucide-react';

export const LocalKnowledge = () => {
  const { t } = useLanguage();

  const [wisdomList, setWisdomList] = useState([
    {
      id: 1,
      title: "Neem-Astra & Cow Urine Organic Insect Repellent",
      contributor: "Elder Farmer Mangra Munda",
      location: "Khunti, Jharkhand",
      practice: "Boil crushed Neem leaves, Datura, and green chili in cow urine for 2 hours. Ferment for 48 hours and spray 50ml per 15L tank.",
      scientificNote: "Verified by Birsa Agricultural University: Azadirachtin compound acts as a natural antifeedant against leaf folder larvae.",
      likes: 142,
      category: "Indigenous Pest Control",
      badges: ["Community Wisdom", "Scientifically Verified", "AI Cross-Referenced"]
    },
    {
      id: 2,
      title: "Dobha Rainwater Micro-Harvesting for Drought Dry Spells",
      contributor: "Soma Oraon",
      location: "Ranchi Plateau",
      practice: "Construct 30ft x 30ft x 10ft unlined farm ponds at the lowest corner of paddy fields to catch surface runoff during heavy July monsoon rains.",
      scientificNote: "Provides critical supplementary irrigation during September 10-15 dry spells, boosting yield by 28%.",
      likes: 218,
      category: "Water Harvesting",
      badges: ["Community Wisdom", "Scientifically Verified"]
    },
    {
      id: 3,
      title: "Intercropping Birsa Maize with Pigeon Pea (Arhar)",
      contributor: "Guruva Hembrom",
      location: "West Singhbhum",
      practice: "Sow 2 rows of Maize followed by 1 row of Arhar in June. Maize provides shade while Arhar root nodules enrich soil nitrogen.",
      scientificNote: "Fixes up to 40kg atmospheric Nitrogen per hectare, reducing chemical fertilizer dependence.",
      likes: 189,
      category: "Soil Enrichment",
      badges: ["Community Wisdom", "AI Cross-Referenced"]
    }
  ]);

  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPractice, setNewPractice] = useState('');

  const handleAddWisdom = (e) => {
    e.preventDefault();
    if (!newTitle || !newPractice) return;

    const newItem = {
      id: Date.now(),
      title: newTitle,
      contributor: "Local Farmer Contributor",
      location: "Jharkhand",
      practice: newPractice,
      scientificNote: "Submitted for Krishi Vigyan Kendra (KVK) expert verification.",
      likes: 1,
      category: "Community Contribution",
      badges: ["Community Wisdom"]
    };

    setWisdomList([newItem, ...wisdomList]);
    setNewTitle('');
    setNewPractice('');
    setShowModal(false);
  };

  return (
    <section className="py-8 max-w-5xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-paper-dark pb-6">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-harvest bg-harvest-pale px-3 py-1 rounded-full">
            Indigenous Agricultural Intelligence
          </span>
          <h2 className="text-3xl font-black text-forest mt-1">
            {t('knowledgeTitle')}
          </h2>
          <p className="text-sm text-charcoal-muted mt-1">
            {t('knowledgeSub')}
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-5 py-3 rounded-2xl bg-forest hover:bg-forest-light text-paper font-bold text-sm shadow-md flex items-center gap-2 transition-all hover:scale-105"
        >
          <PlusCircle className="w-4 h-4 text-harvest-amber" />
          <span>{t('contributeBtn')}</span>
        </button>
      </div>

      {/* Storytelling Cards Layout */}
      <div className="space-y-6">
        {wisdomList.map((item) => (
          <div 
            key={item.id}
            className="bg-paper-card rounded-3xl p-6 sm:p-8 border border-paper-dark shadow-soft-natural space-y-4 hover:border-leaf transition-all"
          >
            
            {/* Top Bar: Title & Category */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <span className="text-xs font-extrabold uppercase text-harvest tracking-wider">
                {item.category} • Contributed by {item.contributor} ({item.location})
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {item.badges.map((b, i) => (
                  <span 
                    key={i} 
                    className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                      b.includes('Scientific')
                        ? 'bg-leaf-pale text-forest border-leaf/40'
                        : b.includes('AI')
                        ? 'bg-harvest-pale text-forest border-harvest/40'
                        : 'bg-paper-muted text-charcoal border-paper-dark'
                    }`}
                  >
                    {b}
                  </span>
                ))}
              </div>
            </div>

            <h3 className="text-xl font-black text-forest">{item.title}</h3>

            {/* Practice Description */}
            <p className="text-sm text-charcoal leading-relaxed font-medium bg-paper p-4 rounded-2xl border border-paper-dark">
              "{item.practice}"
            </p>

            {/* Scientific Verification Box */}
            <div className="p-4 rounded-2xl bg-leaf-pale/50 border border-leaf/30 text-forest text-xs font-semibold flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-leaf shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold block text-sm">Scientific Assessment:</span>
                <p className="mt-0.5">{item.scientificNote}</p>
              </div>
            </div>

            {/* Footer Interaction */}
            <div className="flex items-center justify-between pt-2 text-xs text-charcoal-muted font-bold">
              <button 
                onClick={() => {
                  setWisdomList(wisdomList.map(w => w.id === item.id ? { ...w, likes: w.likes + 1 } : w));
                }}
                className="flex items-center gap-1.5 hover:text-harvest transition-colors"
              >
                <Heart className="w-4 h-4 text-harvest fill-harvest" />
                <span>{item.likes} Farmers Found Helpful</span>
              </button>

              <button className="flex items-center gap-1 hover:text-forest transition-colors">
                <Share2 className="w-4 h-4" />
                <span>Share Practice</span>
              </button>
            </div>

          </div>
        ))}
      </div>

      {/* Modal to Share Knowledge */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-forest-dark/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-paper-card rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-paper-dark shadow-elevated-farm space-y-6">
            <h3 className="text-2xl font-black text-forest">Share Traditional Farming Wisdom</h3>
            
            <form onSubmit={handleAddWisdom} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-forest uppercase block mb-1">Title of Practice</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sohrai Soil Ferment Method"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full p-3 rounded-xl bg-paper border border-paper-dark text-sm font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-forest uppercase block mb-1">Detailed Practice Description</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe materials, preparation steps, and seasonal timing..."
                  value={newPractice}
                  onChange={(e) => setNewPractice(e.target.value)}
                  className="w-full p-3 rounded-xl bg-paper border border-paper-dark text-sm font-semibold focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl bg-paper border border-paper-dark text-xs font-bold text-charcoal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-forest text-paper text-xs font-bold shadow-md hover:bg-forest-light"
                >
                  Submit for KVK Verification
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
