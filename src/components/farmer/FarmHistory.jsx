import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { Calendar, PlusCircle, Sprout, Droplets, Camera, AlertTriangle, CloudSun, CheckCircle } from 'lucide-react';

export const FarmHistory = () => {
  const { t } = useLanguage();

  const [timeline, setTimeline] = useState([
    {
      id: 1,
      month: "August 16",
      tag: "Weather Alert",
      title: "🌦️ Rain Forecast Received",
      desc: "Received AI weather advisory warning of 18mm rainfall in Khunti. Delayed pesticide spraying.",
      icon: CloudSun,
      color: "bg-harvest-pale border-harvest text-harvest"
    },
    {
      id: 2,
      month: "August 10",
      tag: "Disease Diagnostic",
      title: "📷 Tomato Leaf Scanned (Early Blight)",
      desc: "AI detected 91% Early Blight. Applied Neem oil 5ml/L spray solution. Symptoms controlled.",
      icon: Camera,
      color: "bg-leaf-pale border-leaf text-forest"
    },
    {
      id: 3,
      month: "July 28",
      tag: "Field Action",
      title: "💧 Dobha Irrigation Recorded",
      desc: "Pumped 2 hours water from farm pond during 4-day monsoon dry spell.",
      icon: Droplets,
      color: "bg-paper-muted border-paper-dark text-forest"
    },
    {
      id: 4,
      month: "June 15",
      tag: "Soil Testing",
      title: "🪵 Soil Sample Tested at KVK Khunti",
      desc: "pH 6.2 registered. Organic Carbon 0.75%. Added vermicompost before sowing.",
      icon: Sprout,
      color: "bg-paper-muted border-paper-dark text-forest"
    },
    {
      id: 5,
      month: "May 22",
      tag: "Sowing",
      title: "🌱 Swarna Paddy Seeds Sown",
      desc: "Planted 2.5 acres Kharif Paddy using Birsa Ag Univ recommended spacing.",
      icon: Sprout,
      color: "bg-leaf-pale border-leaf text-forest"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [entryTitle, setEntryTitle] = useState('');
  const [entryDesc, setEntryDesc] = useState('');

  const handleAddEntry = (e) => {
    e.preventDefault();
    if (!entryTitle) return;

    const newEntry = {
      id: Date.now(),
      month: "Today",
      tag: "Farmer Journal",
      title: `📝 ${entryTitle}`,
      desc: entryDesc || "Logged directly into farm timeline.",
      icon: CheckCircle,
      color: "bg-harvest-pale border-harvest text-forest"
    };

    setTimeline([newEntry, ...timeline]);
    setEntryTitle('');
    setEntryDesc('');
    setShowForm(false);
  };

  return (
    <section className="py-8 max-w-4xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-paper-dark pb-6">
        <div>
          <span className="text-xs font-black uppercase tracking-widest text-harvest bg-harvest-pale px-3 py-1 rounded-full">
            Personal Farm Journal
          </span>
          <h2 className="text-3xl font-black text-forest mt-1">
            {t('historyTitle')}
          </h2>
          <p className="text-sm text-charcoal-muted mt-1">
            {t('historySub')}
          </p>
        </div>

        <button
          onClick={() => setShowForm(true)}
          className="px-5 py-3 rounded-2xl bg-forest hover:bg-forest-light text-paper font-bold text-sm shadow-md flex items-center gap-2 transition-all hover:scale-105"
        >
          <PlusCircle className="w-4 h-4 text-harvest-amber" />
          <span>{t('addTimelineBtn')}</span>
        </button>
      </div>

      {/* Vertical Farm Journal Timeline */}
      <div className="relative pl-6 sm:pl-8 border-l-4 border-leaf/40 space-y-8">
        
        {timeline.map((item) => {
          const IconComp = item.icon;
          return (
            <div key={item.id} className="relative group">
              
              {/* Timeline Node Icon */}
              <div className="absolute -left-[35px] sm:-left-[43px] top-1 w-9 h-9 rounded-full bg-forest text-harvest-amber flex items-center justify-center border-4 border-paper shadow-md">
                <IconComp className="w-4 h-4" />
              </div>

              {/* Card Content */}
              <div className="bg-paper-card rounded-3xl p-6 border border-paper-dark shadow-soft-natural space-y-2 hover:border-leaf transition-all">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-harvest">{item.month}</span>
                  <span className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border ${item.color}`}>
                    {item.tag}
                  </span>
                </div>

                <h3 className="text-lg font-black text-forest">{item.title}</h3>
                <p className="text-sm text-charcoal leading-relaxed font-medium">{item.desc}</p>
              </div>

            </div>
          );
        })}

      </div>

      {/* Add Log Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-forest-dark/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-paper-card rounded-3xl p-6 sm:p-8 max-w-md w-full border border-paper-dark shadow-elevated-farm space-y-4">
            <h3 className="text-xl font-black text-forest">Log Farm Activity</h3>
            
            <form onSubmit={handleAddEntry} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-forest uppercase block mb-1">Activity Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sown Rabi Mustard seeds"
                  value={entryTitle}
                  onChange={(e) => setEntryTitle(e.target.value)}
                  className="w-full p-3 rounded-xl bg-paper border border-paper-dark text-sm font-semibold focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-forest uppercase block mb-1">Details / Notes</label>
                <textarea
                  rows={3}
                  placeholder="Notes on fertilizer used, weather conditions, etc..."
                  value={entryDesc}
                  onChange={(e) => setEntryDesc(e.target.value)}
                  className="w-full p-3 rounded-xl bg-paper border border-paper-dark text-sm font-semibold focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-xl bg-paper border border-paper-dark text-xs font-bold text-charcoal"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-forest text-paper text-xs font-bold shadow-md hover:bg-forest-light"
                >
                  Save Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};
