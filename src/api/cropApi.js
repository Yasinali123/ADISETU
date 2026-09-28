// Mock API abstraction layer for ADISETU (Jharkhand)
// Ready to connect to backend microservices (/api/crop/analyze, /api/recommendations, /api/weather, etc.)

export const analyzeCropImage = async (imageSrc) => {
  // Simulate network latency
  await new Promise(res => setTimeout(res, 1800));

  return {
    diseaseId: "early_blight_01",
    name: "Early Blight (Alternaria solani)",
    localNames: {
      hi: "अगेती झुलसा (Early Blight)",
      sat: " Early Blight ( ᱚ touch cross  walk)",
      en: "Early Blight"
    },
    confidence: 91,
    severity: "Moderate Risk",
    severityLevel: 2, // 1: Low, 2: Moderate, 3: High
    symptoms: {
      en: "Concentric dark brown circular spots with yellow halos appearing on lower mature leaves. Common in warm, humid weather after rainfall.",
      hi: "पौधे के निचले पुराने पत्तों पर गोल भूरे-काले धब्बे और पीला घेरा। बारिश के बाद उमस भरे मौसम में यह तेजी से फैलता है।",
      sat: " ᱞ walk ᱟ absolute ᱛ walk ᱟ absolute ᱨ ᱥ walk standard ᱟ standard ᱠ walk ᱟ composite ᱢ ᱨ walk ᱮ cross ᱯ cross ᱮ cross ᱸ cross ᱰ walk absolute ᱟ absolute linear ᱧ walking ᱮ transverse ᱞ linear ᱚ standard ᱠ walk transverse ᱟ absolute"
    },
    actions: {
      en: [
        "Prune and destroy infected lower leaves immediately away from the field.",
        "Spray Neem oil solution (5ml/liter of water) or Trichoderma viride bio-fungicide.",
        "Avoid flood/overhead irrigation; keep crop foliage dry."
      ],
      hi: [
        "प्रभावित निचली पत्तियों को तुरंत तोड़कर खेत से दूर गड्ढे में दबा दें।",
        "जैविक सुरक्षा: नीम तेल (5 मि.ली. प्रति लीटर पानी) या ट्राइकोडरमा विरिडी का छिड़काव करें।",
        "पत्तियों पर सीधा पानी छिड़कने से बचें ताकि नमी न ठहरे।"
      ],
      sat: [
        " ᱨ walk  walk ᱜ global ᱟ absolute ᱠ walk ᱟ absolute precise ᱱ ᱥ walk standard ᱟ standard ᱠ walk ᱟ composite ᱢ ᱚ text ᱪ walk ᱚ text ᱭ binary ᱢ precise ᱮ᱾",
        " ᱱ stroke ᱤ organic ᱢ ᱥ walk standard ᱩ precise ᱱ absolute (Neem oil) 5ml/L ᱟ transverse ᱨ normal ᱪ absolute ᱷ cross ᱤ precise ᱲ cross ᱠ walk ᱟ absolute ᱣ ᱢ precise ᱮ᱾",
        " ᱫ walk ᱟ absolute ᱝ ᱥ walk standard ᱟ standard ᱠ walk ᱟ composite ᱢ ᱨ walk ᱮ cross ᱟ absolute linear ᱞ cross walk ᱚ text ᱢ organic ᱫ walk ᱩ text ᱞ absolute ᱟ absolute᱾"
      ]
    },
    weatherAlert: {
      en: "High atmospheric humidity (82%) in Khunti/Ranchi district increases spore germination risk over next 48 hours.",
      hi: "खूंटी/रांची जिले में 82% हवा की नमी से अगले 48 घंटे फफूंद बीजाणु फैलने का खतरा अधिक है।",
      sat: " ᱠ structural ᱷ absolute ᱩ global ᱸ precise ᱴ cross ᱤ ᱨ precise ᱮ ᱫ walk ᱟ absolute ᱝ ᱦ completely ᱩ structural ᱭ composite ᱩ text ᱟ absolute ᱞ linear ᱟ absolute linear ᱦ sequence ᱟ absolute ᱨ walk  walk ᱜ ᱵ text walk ᱟ absolute simple ᱲ cross horizontal ᱟ absolute᱾"
    }
  };
};

export const getCropRecommendations = async (params) => {
  await new Promise(res => setTimeout(res, 1200));

  const { district = 'Khunti', water = 'Monsoon rainfed', soil = 'Red Clay (Tanr)', season = 'Kharif' } = params;

  return [
    {
      id: "paddy_swarna",
      name: "Paddy (Swarna Sub-1 / IR-64)",
      suitability: 92,
      yieldEstimate: "4.2 Tons / Hectare",
      duration: "135-140 Days",
      keyReason: "Ideal for Jharkhand red/tanr soil with Kharif monsoon rainfall.",
      advantages: ["Submergence tolerant", "High local mandi price", "Resistant to brown planthopper"]
    },
    {
      id: "maize_hqpm",
      name: "Hybrid Maize (HQPM-1 / Birsa Maize)",
      suitability: 84,
      yieldEstimate: "5.5 Tons / Hectare",
      duration: "90-100 Days",
      keyReason: "Excellent drought resilience for undulating terrain in " + district + ".",
      advantages: ["Low water requirement", "High fodder value", "Birsa Agricultural University certified"]
    },
    {
      id: "pulse_arhar",
      name: "Pigeon Pea / Arhar (Birsa Arhar-1)",
      suitability: 79,
      yieldEstimate: "1.8 Tons / Hectare",
      duration: "180 Days",
      keyReason: "Fixes atmospheric nitrogen in soil, reducing fertilizer cost.",
      advantages: ["Nitrogen fixing", "Requires minimal irrigation", "Intercropping friendly with Maize"]
    }
  ];
};

export const getWeatherIntelligence = async (district = 'Khunti') => {
  return {
    location: `${district}, Jharkhand`,
    currentTemp: "28°C",
    humidity: "82%",
    windSpeed: "14 km/h SW",
    forecast: [
      { day: "Today", temp: "28°C", condition: "Partly Cloudy", rainProb: "30%", agAdvice: "Good day for land preparation & weeding." },
      { day: "Tomorrow", temp: "26°C", condition: "Thunderstorms expected", rainProb: "85%", agAdvice: "Avoid spraying pesticides. Ensure field drainage channels are clear." },
      { day: "+2 Days", temp: "25°C", condition: "Heavy Rain (25mm)", rainProb: "90%", agAdvice: "Hold all fertilizer applications. Monitor for fungal leaf spots after rain." },
      { day: "+3 Days", temp: "29°C", condition: "Clear Sky", rainProb: "10%", agAdvice: "Inspect crop for pest infestation. Soil moisture optimal for top dressing." }
    ]
  };
};

export const getSoilHealthData = async () => {
  return {
    ph: 6.2, // Slightly acidic, typical for Jharkhand red soils
    phStatus: "Slightly Acidic (Optimal for Paddy)",
    nitrogen: 195, // kg/ha (Low-Medium)
    phosphorus: 18.5, // kg/ha (Medium)
    potassium: 240, // kg/ha (Optimal)
    organicCarbon: 0.75, // % (Good)
    moisture: "68%",
    advisory: "Soil is rich in potassium and organic matter. Nitrogen is slightly low. Recommended: Apply 25kg Urea + 10kg Bio-fertilizer (Azotobacter) per acre before sowing."
  };
};
