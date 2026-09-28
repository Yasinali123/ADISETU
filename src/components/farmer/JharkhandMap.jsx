import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { MapPin, Sprout, AlertTriangle, CloudRain, ShieldCheck, Activity, Search, Layers, Compass } from 'lucide-react';

export const JharkhandMap = () => {
  const { t } = useLanguage();

  const [selectedDivision, setSelectedDivision] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Complete Agricultural Database for ALL 24 Districts of Jharkhand
  const allDistricts = [
    // South Chotanagpur
    {
      id: "khunti",
      name: "Khunti",
      division: "South Chotanagpur",
      paddyArea: "48,500 Ha",
      primaryCrop: "Paddy (Swarna), Lac & Vegetables",
      soilType: "Red Clay (Tanr)",
      riskStatus: "Moderate Early Blight Risk (Humidity 82%)",
      pestReports: "12 active alerts in Karra & Torpa",
      irrigationCover: "34% (Dobha & Rainfed)",
      color: "#4A7C59"
    },
    {
      id: "ranchi",
      name: "Ranchi",
      division: "South Chotanagpur",
      paddyArea: "112,000 Ha",
      primaryCrop: "Paddy, Maize & Commercial Vegetables",
      soilType: "Red Loamy Soil",
      riskStatus: "Low Pest Risk • Good Soil Moisture",
      pestReports: "4 minor whitefly cases in Kanke",
      irrigationCover: "45% (Borewell & Dam canal)",
      color: "#162E22"
    },
    {
      id: "gumla",
      name: "Gumla",
      division: "South Chotanagpur",
      paddyArea: "94,200 Ha",
      primaryCrop: "Paddy, Niger seeds & Pulses",
      soilType: "Red Gravelly Soil",
      riskStatus: "Optimal Soil Moisture",
      pestReports: "2 aphid cases in Raidih",
      irrigationCover: "38% (Stream & Rainfed)",
      color: "#4A7C59"
    },
    {
      id: "simdega",
      name: "Simdega",
      division: "South Chotanagpur",
      paddyArea: "78,400 Ha",
      primaryCrop: "Paddy, Groundnut & Millets",
      soilType: "Sandy Red Loam",
      riskStatus: "Heavy Rain Expected in Southern Blocks",
      pestReports: "No major outbreak reported",
      irrigationCover: "29% Rainfed",
      color: "#254B38"
    },
    {
      id: "lohardaga",
      name: "Lohardaga",
      division: "South Chotanagpur",
      paddyArea: "36,800 Ha",
      primaryCrop: "Potato, Paddy & Mustard",
      soilType: "Red & Laterite Soil",
      riskStatus: "Late Blight Warning in Potato Beds",
      pestReports: "6 cases in Kisko block",
      irrigationCover: "42% Lift Irrigation",
      color: "#D97706"
    },

    // North Chotanagpur
    {
      id: "hazaribagh",
      name: "Hazaribagh",
      division: "North Chotanagpur",
      paddyArea: "84,000 Ha",
      primaryCrop: "Paddy, Arhar Pulses & Oilseeds",
      soilType: "Gravelly Red Earth",
      riskStatus: "Early Drought Alert in Northern Uplands",
      pestReports: "8 stem borer cases recorded",
      irrigationCover: "28% Rainfed",
      color: "#D97706"
    },
    {
      id: "giridih",
      name: "Giridih",
      division: "North Chotanagpur",
      paddyArea: "105,000 Ha",
      primaryCrop: "Paddy, Maize & Maize-Pulse Intercrop",
      soilType: "Micaceous Red Soil",
      riskStatus: "Moderate Armyworm Warning in Maize",
      pestReports: "14 cases in Bagodar & Dumri",
      irrigationCover: "31% Pond & Canal",
      color: "#88AB8E"
    },
    {
      id: "dhanbad",
      name: "Dhanbad",
      division: "North Chotanagpur",
      paddyArea: "42,000 Ha",
      primaryCrop: "Paddy & Peri-Urban Vegetables",
      soilType: "Sandy Clay Loam",
      riskStatus: "Industrial Effluent Runoff Precaution",
      pestReports: "3 minor pest alerts",
      irrigationCover: "48% Dam & Reservoirs",
      color: "#162E22"
    },
    {
      id: "bokaro",
      name: "Bokaro",
      division: "North Chotanagpur",
      paddyArea: "56,000 Ha",
      primaryCrop: "Paddy, Mustard & Sugarcane",
      soilType: "Alluvial & Red Soil Mix",
      riskStatus: "Optimal Conditions for Rabi Prep",
      pestReports: "5 stem borer cases in Bermo",
      irrigationCover: "51% Tenughat Canal",
      color: "#4A7C59"
    },
    {
      id: "ramgarh",
      name: "Ramgarh",
      division: "North Chotanagpur",
      paddyArea: "32,500 Ha",
      primaryCrop: "Tomatoes, Cauliflower & Paddy",
      soilType: "Rich Red Clay",
      riskStatus: "High Fungal Spot Alert in Tomatoes",
      pestReports: "9 cases in Mandu & Patratu",
      irrigationCover: "60% Dam & River Lift",
      color: "#D97706"
    },
    {
      id: "chatra",
      name: "Chatra",
      division: "North Chotanagpur",
      paddyArea: "68,000 Ha",
      primaryCrop: "Paddy, Wheat & Oilseeds",
      soilType: "Forest Soil & Red Earth",
      riskStatus: "Moisture Deficit Warning in Slopes",
      pestReports: "4 aphid alerts",
      irrigationCover: "24% Rainfed",
      color: "#D97706"
    },
    {
      id: "koderma",
      name: "Koderma",
      division: "North Chotanagpur",
      paddyArea: "29,000 Ha",
      primaryCrop: "Paddy, Pulses & Coarse Grains",
      soilType: "Mica Rich Red Earth",
      riskStatus: "Dry Weather Advisory",
      pestReports: "1 case reported",
      irrigationCover: "33% Tilaiya Reservoir",
      color: "#4A7C59"
    },

    // Santhal Pargana
    {
      id: "dumka",
      name: "Dumka",
      division: "Santhal Pargana",
      paddyArea: "96,000 Ha",
      primaryCrop: "Paddy, Maize & Mustard",
      soilType: "Black Alluvial & Red Soil Mix",
      riskStatus: "Moderate Brown Planthopper Alert",
      pestReports: "18 cases in Jama & Raneshwar",
      irrigationCover: "40% Canada Dam Canal",
      color: "#88AB8E"
    },
    {
      id: "deoghar",
      name: "Deoghar",
      division: "Santhal Pargana",
      paddyArea: "61,000 Ha",
      primaryCrop: "Paddy, Vegetables & Flowers",
      soilType: "Red & Alluvial Loam",
      riskStatus: "Good Crop Growth Recorded",
      pestReports: "3 minor leaf folder cases",
      irrigationCover: "36% Pond Irrigation",
      color: "#162E22"
    },
    {
      id: "godda",
      name: "Godda",
      division: "Santhal Pargana",
      paddyArea: "88,000 Ha",
      primaryCrop: "Paddy, Wheat, Pulses & Mango",
      soilType: "Deep Gangetic Alluvial",
      riskStatus: "High Moisture • Fungal Sheath Risk",
      pestReports: "11 cases in Mahagama",
      irrigationCover: "54% Canal & Tube Wells",
      color: "#4A7C59"
    },
    {
      id: "sahibganj",
      name: "Sahibganj",
      division: "Santhal Pargana",
      paddyArea: "72,000 Ha",
      primaryCrop: "Diara Crops, Paddy & Jute",
      soilType: "Gangetic Alluvial & Diara Land",
      riskStatus: "Flood Water Receding in Lowlands",
      pestReports: "7 cases in Rajmahal",
      irrigationCover: "65% River Ganges Lift",
      color: "#D97706"
    },
    {
      id: "pakur",
      name: "Pakur",
      division: "Santhal Pargana",
      paddyArea: "51,000 Ha",
      primaryCrop: "Paddy, Mustard & Pulses",
      soilType: "Alluvial Clay",
      riskStatus: "Normal Crop Status",
      pestReports: "2 cases in Littipara",
      irrigationCover: "42% Stream & Pond",
      color: "#4A7C59"
    },
    {
      id: "jamtara",
      name: "Jamtara",
      division: "Santhal Pargana",
      paddyArea: "44,000 Ha",
      primaryCrop: "Paddy, Cashew & Pulses",
      soilType: "Laterite Red Soil",
      riskStatus: "Moderate Drought Risk in Uplands",
      pestReports: "5 cases reported",
      irrigationCover: "30% Rainfed & Dobha",
      color: "#D97706"
    },

    // Palamu Division
    {
      id: "palamu",
      name: "Palamu",
      division: "Palamu Division",
      paddyArea: "62,000 Ha",
      primaryCrop: "Gram, Maize, Arhar & Pulses",
      soilType: "Sandy Loam / Drought Prone",
      riskStatus: "Dry Weather Alert • Conserve Soil Moisture",
      pestReports: "2 aphid cases in Daltonganj",
      irrigationCover: "22% North Koel Canal",
      color: "#D97706"
    },
    {
      id: "garhwa",
      name: "Garhwa",
      division: "Palamu Division",
      paddyArea: "58,000 Ha",
      primaryCrop: "Maize, Paddy & Sesame (Til)",
      soilType: "Sandy Red & Gravelly Soil",
      riskStatus: "Drought Prone Zone • Drip Encouraged",
      pestReports: "4 stem borer cases",
      irrigationCover: "19% Rainfed",
      color: "#D97706"
    },
    {
      id: "latehar",
      name: "Latehar",
      division: "Palamu Division",
      paddyArea: "49,000 Ha",
      primaryCrop: "Paddy, Minor Forest Produce & Pulses",
      soilType: "Forest Red Earth",
      riskStatus: "Rain Expected in Forest Blocks",
      pestReports: "No major pest outbreak",
      irrigationCover: "25% Stream Lift",
      color: "#4A7C59"
    },

    // Kolhan Division
    {
      id: "w_singhbhum",
      name: "West Singhbhum (Chaibasa)",
      division: "Kolhan Division",
      paddyArea: "135,000 Ha",
      primaryCrop: "Paddy (Swarna), Lac & Forest Crops",
      soilType: "Deep Red Clay (Don Soil)",
      riskStatus: "Heavy Rain Expected (35mm)",
      pestReports: "No major outbreak reported",
      irrigationCover: "52% Roro River Lift",
      color: "#254B38"
    },
    {
      id: "e_singhbhum",
      name: "East Singhbhum (Jamshedpur)",
      division: "Kolhan Division",
      paddyArea: "82,000 Ha",
      primaryCrop: "Paddy, Vegetables & Floriculture",
      soilType: "Red Gravelly & Loamy Soil",
      riskStatus: "Optimal Growth Conditions",
      pestReports: "3 minor leaf spot reports in Ghatshila",
      irrigationCover: "44% Subarnarekha Canal",
      color: "#162E22"
    },
    {
      id: "seraikela",
      name: "Seraikela Kharsawan",
      division: "Kolhan Division",
      paddyArea: "64,000 Ha",
      primaryCrop: "Paddy, Pulses & Oilseeds",
      soilType: "Red Clay & Loam",
      riskStatus: "Good Water Reservoir Levels",
      pestReports: "2 minor pest reports",
      irrigationCover: "39% Canal",
      color: "#4A7C59"
    }
  ];

  const [selectedDistrict, setSelectedDistrict] = useState(allDistricts[0]);

  // Filtering by Division & Search
  const filteredDistricts = allDistricts.filter((d) => {
    const matchesDiv = selectedDivision === 'All' || d.division === selectedDivision;
    const matchesSearch = d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          d.primaryCrop.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDiv && matchesSearch;
  });

  return (
    <section className="py-8 max-w-6xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-black uppercase tracking-widest text-harvest bg-harvest-pale px-3 py-1 rounded-full">
          All 24 Districts Covered
        </span>
        <h2 className="text-3xl sm:text-4xl font-black text-forest">
          {t('mapTitle')}
        </h2>
        <p className="text-sm sm:text-base text-charcoal-muted max-w-2xl mx-auto">
          Complete agricultural GIS intelligence across all 24 districts of Jharkhand — covering crop distribution, drought risk, and active pest outbreaks.
        </p>
      </div>

      {/* Division Tabs + Search Box */}
      <div className="bg-paper-card rounded-3xl p-4 border border-paper-dark shadow-soft-natural flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Division Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full no-scrollbar">
          {["All", "South Chotanagpur", "North Chotanagpur", "Santhal Pargana", "Palamu Division", "Kolhan Division"].map((div) => (
            <button
              key={div}
              onClick={() => setSelectedDivision(div)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap shrink-0 ${
                selectedDivision === div
                  ? 'bg-forest text-paper shadow-xs font-black'
                  : 'bg-paper-muted text-charcoal-muted hover:text-forest hover:bg-paper-dark/40'
              }`}
            >
              {div}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-charcoal-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search district or crop..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-paper border border-paper-dark text-xs font-semibold focus:outline-none focus:border-harvest"
          />
        </div>

      </div>

      {/* Main Grid: Interactive Map + 24 District Quick Grid (Left) and Selected Profile (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: 24 District Interactive Grid & SVG Canvas */}
        <div className="lg:col-span-7 bg-paper-card rounded-3xl p-6 border border-paper-dark shadow-soft-natural space-y-4">
          
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-forest uppercase tracking-wider flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-harvest" />
              <span>Jharkhand 24-District Interactive Selector</span>
            </h3>
            <span className="text-[11px] font-bold text-harvest bg-harvest-pale px-2.5 py-0.5 rounded-full">
              Showing {filteredDistricts.length} / 24
            </span>
          </div>

          {/* District Grid Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 max-h-[420px] overflow-y-auto pr-1">
            {filteredDistricts.map((d) => {
              const isSelected = selectedDistrict.name === d.name;
              return (
                <button
                  key={d.id}
                  onClick={() => setSelectedDistrict(d)}
                  className={`p-3 rounded-2xl border text-left transition-all ${
                    isSelected
                      ? 'bg-forest text-paper border-forest shadow-md scale-[1.02]'
                      : 'bg-paper border-paper-dark text-forest hover:border-leaf hover:bg-paper-muted'
                  }`}
                >
                  <p className="text-xs font-black truncate">{d.name}</p>
                  <p className={`text-[10px] truncate ${isSelected ? 'text-harvest-amber font-bold' : 'text-charcoal-muted font-medium'}`}>
                    {d.division}
                  </p>
                  <span className={`inline-block mt-1 text-[9px] font-black px-1.5 py-0.5 rounded ${
                    isSelected ? 'bg-harvest text-forest-dark' : 'bg-leaf-pale text-forest'
                  }`}>
                    {d.paddyArea}
                  </span>
                </button>
              );
            })}
          </div>

        </div>

        {/* Right Side: Selected District Complete Profile Card */}
        <div className="lg:col-span-5 bg-paper-card rounded-3xl p-6 sm:p-8 border border-paper-dark shadow-soft-natural space-y-6">
          
          <div className="flex items-center justify-between border-b border-paper-muted pb-4">
            <div>
              <span className="text-xs font-extrabold uppercase text-harvest">{selectedDistrict.division}</span>
              <h3 className="text-2xl font-black text-forest">{selectedDistrict.name}</h3>
            </div>
            <div className="bg-forest text-harvest-amber font-black px-3 py-1 rounded-full text-xs shadow-xs">
              📍 District Profile
            </div>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-paper border border-paper-dark space-y-0.5">
              <span className="text-[10px] font-bold text-charcoal-muted uppercase">{t('districtPaddyArea')}</span>
              <p className="text-sm font-black text-forest">{selectedDistrict.paddyArea}</p>
            </div>

            <div className="p-3.5 rounded-2xl bg-paper border border-paper-dark space-y-0.5">
              <span className="text-[10px] font-bold text-charcoal-muted uppercase">{t('districtSoilType')}</span>
              <p className="text-sm font-black text-forest">{selectedDistrict.soilType}</p>
            </div>
          </div>

          {/* Primary Crops */}
          <div className="p-4 rounded-2xl bg-leaf-pale/60 border border-leaf/30 space-y-1">
            <span className="text-xs font-extrabold text-forest uppercase flex items-center gap-1.5">
              <Sprout className="w-4 h-4 text-leaf" />
              Primary Agriculture Crops
            </span>
            <p className="text-sm font-black text-forest">{selectedDistrict.primaryCrop}</p>
          </div>

          {/* Active Risk Alert */}
          <div className="p-4 rounded-2xl bg-harvest-pale border border-harvest/40 space-y-1">
            <span className="text-xs font-extrabold text-forest uppercase flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-harvest" />
              {t('districtPrimaryRisk')}
            </span>
            <p className="text-xs font-black text-forest">{selectedDistrict.riskStatus}</p>
            <p className="text-[11px] text-charcoal-muted font-bold mt-1">
              Field Feed: {selectedDistrict.pestReports}
            </p>
          </div>

          {/* Irrigation Infrastructure */}
          <div className="p-3.5 rounded-2xl bg-paper border border-paper-dark flex items-center justify-between text-xs font-bold text-charcoal">
            <span>Irrigation Cover:</span>
            <span className="text-forest font-black">{selectedDistrict.irrigationCover}</span>
          </div>

          {/* KVK Support Footer */}
          <div className="pt-2 text-center">
            <p className="text-[11px] text-charcoal-muted font-bold">
              Integrated with Krishi Vigyan Kendra ({selectedDistrict.name} Unit)
            </p>
          </div>

        </div>

      </div>

    </section>
  );
};
