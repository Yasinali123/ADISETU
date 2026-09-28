/**
 * AI Computer Vision & Crop Health Intelligence Engine
 * ADISETU Agricultural Diagnostic Engine powered by Groq Vision (llama-3.2-11b-vision-preview)
 */

export const CROP_DISEASES = {
  tomato_early_blight: {
    diseaseId: "tomato_early_blight",
    name: "Early Blight (Alternaria solani)",
    crop: "Tomato",
    localNames: {
      hi: "टमाटर का अगेती झुलसा (Early Blight)",
      sat: "ᱴᱚᱢᱟᱴᱚ ᱮᱨᱞᱤ ᱵᱞᱟᱭᱤᱴ (Early Blight)",
      en: "Tomato Early Blight"
    },
    confidence: 94,
    severity: "Moderate Risk",
    severityLevel: 2,
    symptoms: {
      en: "Concentric dark brown circular spots with yellow halos appearing on lower mature leaves. Common in warm, humid weather after rainfall.",
      hi: "पौधे के निचले पुराने पत्तों पर गोल भूरे-काले धब्बे और पीला घेरा। बारिश के बाद उमस भरे मौसम में यह तेजी से फैलता है।",
      sat: "ᱞᱟᱛᱟᱨ ᱨᱮᱱᱟᱜ ᱢᱟᱨᱮ ᱥᱟᱠᱟᱢ ᱨᱮ ᱜᱚᱞ ᱦᱮᱸᱫᱮ-ᱵᱩᱨᱩ ᱫᱟᱜ ᱟᱨ ᱥᱟᱥᱟᱝ ᱜᱷᱮᱨᱟ ᱧᱮᱞᱚᱜ-ᱟ᱾"
    },
    actions: {
      en: [
        "Prune and destroy infected lower leaves immediately away from the field.",
        "Spray Neem oil solution (5ml/liter of water) or Copper Oxychloride 3g/L.",
        "Avoid flood/overhead irrigation; keep crop foliage dry."
      ],
      hi: [
        "प्रभावित निचली पत्तियों को तुरंत तोड़कर खेत से दूर गड्ढे में दबा दें।",
        "जैविक सुरक्षा: नीम तेल (5 मि.ली. प्रति लीटर पानी) या कॉपर ऑक्सीक्लोराइड 3 ग्राम/लीटर का छिड़काव करें।",
        "पत्तियों पर सीधा पानी छिड़कने से बचें ताकि नमी न ठहरे।"
      ],
      sat: [
        "ᱵᱟᱹᱲᱤᱡ ᱟᱠᱟᱱ ᱥᱟᱠᱟᱢ ᱠᱚ ᱞᱚᱜᱚᱱ ᱜᱮᱫ ᱠᱟᱛᱮ ᱵᱟᱹᱦᱩᱲ ᱨᱮ ᱛᱚᱯᱟᱭ ᱢᱮ᱾",
        "ᱱᱤᱢ ᱥᱩᱱᱩᱢ (5ml/L) ᱟᱨᱵᱟᱝ ᱠᱚᱯᱚᱨ ᱚᱠᱥᱤᱠᱞᱚᱨᱟᱭᱤᱰ (3g/L) ᱪᱟᱯᱟᱰ ᱢᱮ᱾",
        "ᱥᱟᱠᱟᱢ ᱨᱮ ᱫᱟᱜ ᱟᱞᱚᱢ ᱫᱩᱞᱟ᱾"
      ]
    },
    weatherAlert: {
      en: "High atmospheric humidity (82%) in Khunti/Ranchi district increases spore germination risk over next 48 hours.",
      hi: "खूंटी/रांची जिले में 82% हवा की नमी से अगले 48 घंटे फफूंद बीजाणु फैलने का खतरा अधिक है।",
      sat: "ᱦᱚᱭ ᱨᱮ ᱫᱟᱜ ᱟᱸᱥ ᱘᱒% ᱢᱮᱱᱟᱜ ᱛᱮ ᱔᱘ ᱜᱷᱚᱱᱴᱟ ᱨᱮ ᱯᱷᱩᱯᱷᱩᱱᱫᱤ ᱯᱟᱥᱱᱟᱣ ᱨᱮᱱᱟᱜ ᱵᱚᱛᱚᱨ ᱢᱮᱱᱟᱜ-ᱟ᱾"
    }
  },

  paddy_sheath_blight: {
    diseaseId: "paddy_sheath_blight",
    name: "Sheath Blight (Rhizoctonia solani)",
    crop: "Paddy / Rice",
    localNames: {
      hi: "धान का शीथ ब्लाइट (Sheath Blight)",
      sat: "ᱦᱩᱲᱩ ᱥᱤᱛᱷ ᱵᱞᱟᱭᱤᱴ (Sheath Blight)",
      en: "Paddy Sheath Blight"
    },
    confidence: 92,
    severity: "High Risk",
    severityLevel: 3,
    symptoms: {
      en: "Oval or irregular greenish-gray spots with reddish-brown borders on leaf sheaths near water line. Spread rapidly in dense tillering.",
      hi: "पानी के स्तर के पास धान के तने पर हरे-ग्रे रंग के धब्बे और लाल-भूरे किनारे। घने धान के पौधों में तेजी से फैलता है।",
      sat: "ᱫᱟᱜ ᱞᱟᱛᱟᱨ ᱨᱮ ᱦᱩᱲᱩ ᱰᱟᱸᱴᱟ ᱨᱮ ᱦᱟᱹᱨᱤᱭᱟᱹᱲ-ᱜᱽᱨᱮ ᱫᱟᱜ ᱧᱮᱞᱚᱜ-ᱟ᱾"
    },
    actions: {
      en: [
        "Drain excess standing water from paddy fields for 2-3 days to reduce humidity.",
        "Apply Hexaconazole 5% EC @ 2 ml/liter of water or Validamycin 3% L.",
        "Avoid excessive nitrogen fertilizer top dressing during late tillering."
      ],
      hi: [
        "खेत में रुके हुए ज्यादा पानी को 2-3 दिनों के लिए बाहर निकालें।",
        "हेक्साकोनाज़ोल 5% EC (2 मि.ली. प्रति लीटर) या वैलिडामायसिन का शाम को छिड़काव करें।",
        "यूरिया (नाइट्रोजन) की अधिक मात्रा डालने से बचें।"
      ],
      sat: [
        "ᱵᱟᱹᱦᱩᱲ ᱠᱷᱚᱱ ᱒-᱓ ᱫᱤᱱ ᱵᱟᱹᱲᱛᱤ ᱫᱟᱜ ᱚᱰᱚᱠ ᱯᱟᱨᱚᱢ ᱢᱮ᱾",
        "ᱦᱮᱠᱥᱟᱠᱚᱱᱟᱡᱚᱞ (2ml/L) ᱟᱹᱭᱩᱵ ᱵᱮᱲᱟ ᱪᱟᱯᱟᱰ ᱢᱮ᱾"
      ]
    },
    weatherAlert: {
      en: "Overcast skies & stagnant standing water increase fungal sheath infection in paddy blocks.",
      hi: "बादल छाए रहने और रुके हुए पानी से धान के खेतों में फफूंद संक्रमण का खतरा अधिक है।",
      sat: "ᱨᱤᱢᱤᱞ ᱟᱨ ᱛᱤᱸᱜᱩ ᱫᱟᱜ ᱠᱷᱟᱹᱛᱤᱨ ᱦᱩᱲᱩ ᱨᱮ ᱯᱷᱩᱯᱷᱩᱱᱫᱤ ᱨᱚᱜᱽ ᱵᱟᱹᱲᱛᱤᱜ-ᱟ᱾"
    }
  },

  maize_armyworm: {
    diseaseId: "maize_armyworm",
    name: "Fall Armyworm (Spodoptera frugiperda)",
    crop: "Maize / Corn",
    localNames: {
      hi: "मक्के का फॉल आर्मीवर्म (Armyworm)",
      sat: " Fall Armyworm ( ᱢ ᱟ absolute ᱠ precisely ᱟ absolute)",
      en: "Maize Fall Armyworm"
    },
    confidence: 90,
    severity: "High Risk",
    severityLevel: 3,
    symptoms: {
      en: "Torn leaves with window-pane feeding holes and sawdust-like frass inside the central leaf whorl.",
      hi: "मक्के की पत्तियों में छिद्र और केंद्रीय पोंगे में भूसे जैसा कीड़े का मल।",
      sat: "ᱢᱟᱠᱟᱭ ᱥᱟᱠᱟᱢ ᱨᱮ ᱜᱮᱫ ᱫᱟᱜ ᱧᱮᱞᱚᱜ-ᱟ᱾"
    },
    actions: {
      en: [
        "Apply 5% Neem seed kernel extract (NSKE) inside the leaf whorl.",
        "Spray Emamectin Benzoate 5% SG @ 0.4 g/liter of water during evening.",
        "Set up pheromone traps @ 4 traps/acre for adult moth monitoring."
      ],
      hi: [
        "मक्के के पोंगे में नीम तेल या नीम की खली का पाउडर डालें।",
        "इमामेक्टिन बेंजोएट 5% SG (0.4 ग्राम प्रति लीटर) का शाम को छिड़काव करें।",
        "खेत में फेरोमोन ट्रैप लगाएं।"
      ],
      sat: [
        "ᱱᱤᱢ ᱥᱩᱱᱩᱢ 5ml/L Emamectin Benzoate 0.4g/L ᱪᱟᱯᱟᱰ ᱢᱮ᱾"
      ]
    },
    weatherAlert: {
      en: "Warm temperatures increase armyworm moth egg hatching speed.",
      hi: "बढ़ते तापमान से आर्मीवर्म कीट के अंडे तेजी से फूट रहे हैं।",
      sat: "ᱥᱤᱛᱩᱝ ᱠᱷᱟᱹᱛᱤᱨ ᱛᱤᱡᱩ ᱞᱚᱜᱚᱱ ᱠᱚ ᱡᱟᱱᱟᱢᱚᱜ ᱠᱟᱱᱟ᱾"
    }
  }
};

/**
 * Intelligent Image & Computer Vision Classifier via Groq Vision (llama-3.2-11b-vision-preview)
 * STRICT LIVE ONLY - No default fallback answers.
 */
export const analyzeCropImage = async (imageSrc, customApiKey = '') => {
  const apiKey = customApiKey || localStorage.getItem('groq_api_key') || localStorage.getItem('xai_api_key') || '';

  // 1. Try server Vision endpoint
  try {
    const res = await fetch('/api/crop-analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageSrc, apiKey, model: 'llama-3.2-11b-vision-preview' })
    });
    const contentType = res.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const data = await res.json();
      if (res.ok && data.success && data.analysis) {
        return data.analysis;
      }
      if (data && data.error && res.status !== 404) {
        console.warn('[Crop Vision API] Server returned error:', data.error);
      }
    }
  } catch (err) {
    console.warn('[Crop Vision API] Server endpoint fetch error:', err);
  }

  // 2. Direct Groq Vision API Call (llama-3.2-11b-vision-preview)
  const effectiveKey = apiKey || import.meta.env.VITE_GROQ_API_KEY || localStorage.getItem('vision_api_key') || '';
  if (!effectiveKey) {
    throw new Error('No Groq Vision API Key configured. Please tap the Settings ⚙️ icon above to enter your Groq API Key.');
  }

  try {
    const visionRes = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${effectiveKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.2-11b-vision-preview',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: 'You are an expert agricultural plant pathologist and entomologist. Analyze this crop photo for pests, insects, caterpillars, borers, aphids, whiteflies, or leaf diseases. Respond ONLY in valid JSON with keys: diseaseId (string), name (string), crop (string), localNames (object with hi, sat, en strings), confidence (number 0-100), severity (string), severityLevel (number 1-3), symptoms (object with hi, sat, en strings), actions (object with hi, sat, en arrays of 3 action step strings), weatherAlert (object with hi, sat, en strings).'
              },
              {
                type: 'image_url',
                image_url: { url: imageSrc }
              }
            ]
          }
        ],
        temperature: 0.1,
        max_tokens: 600
      })
    });

    const data = await visionRes.json();
    if (visionRes.ok) {
      const content = data.choices?.[0]?.message?.content || '';
      const cleaned = content.replace(/```json/g, '').replace(/```/g, '').trim();
      const parsed = JSON.parse(cleaned);
      if (parsed && parsed.name) {
        return parsed;
      }
    }
    
    if (data.error && data.error.message) {
      throw new Error(`Groq Vision Error: ${data.error.message}`);
    }
  } catch (err) {
    throw err;
  }

  throw new Error('Unable to parse crop image analysis. Please try uploading a clearer crop photo.');
};

export const getCropRecommendations = async (params) => {
  const { district = 'Khunti' } = params || {};

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
    ph: 6.2,
    phStatus: "Slightly Acidic (Optimal for Paddy)",
    nitrogen: 195,
    phosphorus: 18.5,
    potassium: 240,
    organicCarbon: 0.75,
    moisture: "68%",
    advisory: "Soil is rich in potassium and organic matter. Nitrogen is slightly low. Recommended: Apply 25kg Urea + 10kg Bio-fertilizer (Azotobacter) per acre before sowing."
  };
};
