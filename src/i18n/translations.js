// Central i18n Translation Dictionary for ADISETU (Jharkhand)
// Supported languages: 'en' (English), 'hi' (Hindi - हिन्दी), 'sat' (Santhali - ᱥᱟᱱᱛᱟᱲᱤ)

export const translations = {
  en: {
    // Brand
    brandName: "ADISETU",
    brandTagline: "Bridging Tribal Wisdom and Modern AI",
    brandSubline: "See your crop. Understand your land. Know your weather. Grow smarter.",
    locationDefault: "Khunti, Jharkhand",
    currentCrop: "Paddy (Dhan)",
    
    // Nav
    navHome: "Home",
    navScan: "Scan Crop",
    navAsk: "Ask AI",
    navFarm: "My Farm",
    navRecommend: "Crop Advisor",
    navWeather: "Weather",
    navSoil: "Soil Health",
    navKnowledge: "Local Wisdom",
    navMap: "Jharkhand Map",
    navHistory: "Farm Journal",
    navAdmin: "Expert Panel",
    switchLanguage: "Language",

    // Hero
    heroHeadline: "Your farm speaks.\nWe listen.",
    heroSubtext: "AI-powered agricultural guidance built for Jharkhand's farmers — through images, voice, weather, soil and local knowledge.",
    heroPrimaryCta: "Start with your farm",
    heroSecondaryCta: "See how it works",
    heroVoiceTrigger: "Ask ADISETU",
    
    // Interactive Hero Demo
    heroDemoTitle: "Interactive Demo: Voice & Vision AI",
    heroDemoFarmerAsk: "Is fasal mein kya problem hai?",
    heroDemoStep1: "Crop image scanned",
    heroDemoStep2: "AI Analysis: Early Blight (91% confidence)",
    heroDemoStep3: "Weather cross-referenced (High humidity in Khunti)",
    heroDemoStep4: "Recommendation generated",
    heroDemoAudioBtn: "Listen in Hindi / Santhali",
    heroDemoSpeechResponse: "Aapke tamatar ke podhe mein Early Blight ke lakshan hain. Barsat se pehle organic Copper Oxychloride ka chhidkaw karein.",
    
    // Dashboard Focal Workspace
    greeting: "Good morning, Farmer",
    askFarmHeading: "Ask your farm",
    askFarmSubtext: "Speak naturally. Ask anything about your farm.",
    btnSpeak: "Speak Now",
    btnScanCrop: "Scan Crop",
    quickQuestions: [
      "Paddy leaf yellowing treatment?",
      "Rainfall forecast in Khunti next 3 days?",
      "Best crop after Kharif season?",
      "Government fertilizer subsidy rates in Jharkhand?"
    ],

    // Farm Health Horizontal Strip
    farmHealthTitle: "Farm Health Overview",
    healthSoil: "Soil Status",
    healthSoilVal: "Healthy (pH 6.2)",
    healthCrop: "Crop Status",
    healthCropVal: "Needs attention",
    healthWeather: "Weather Alert",
    healthWeatherVal: "Rain in 36h",
    healthRisk: "Pest/Disease Risk",
    healthRiskVal: "Moderate Fungal Risk",
    healthAction: "Recommended Action",
    healthActionVal: "Monitor crop & avoid pre-rain spray",

    // AI Crop Scanner
    scannerTitle: "Show me the problem",
    scannerSub: "Upload or take a photo of your leaf/crop for instant AI diagnosis with verified agricultural guidance.",
    btnTakePhoto: "Take Photo",
    btnUploadPhoto: "Upload Image",
    btnVoiceDescribe: "Or Describe by Voice",
    scanSimulating: "Scanning crop leaf micro-patterns & matching agricultural database...",
    detectedIssueTitle: "Possible issue detected",
    issueName: "Early Blight (Alternaria solani)",
    confidenceLabel: "Confidence Level",
    severityLabel: "Severity Level",
    severityVal: "Moderate Risk",
    symptomsHeading: "What we found",
    symptomsText: "Concentric dark brown leaf spots with yellow halos appearing on lower leaves. Caused by humid weather and fungal spores in soil.",
    actionHeading: "What you can do",
    actionSteps: [
      "Prune affected lower leaves and dispose away from the field.",
      "Apply organic bio-fungicide (Trichoderma viride) or Neem oil solution (5ml/L).",
      "Avoid overhead irrigation to keep leaf surfaces dry."
    ],
    weatherLinkText: "High humidity in Khunti district over the next 48h increases spore spread risk. Take action before rainfall.",
    listenHindi: "Listen in Hindi",
    listenSanthali: "Listen in Santhali",
    safetyDisclaimer: "AI Assistant Guidance: 91% confidence based on visual patterns. For severe field outbreaks, verify with your Block Agriculture Officer (BAO) or Krishi Vigyan Kendra (KVK).",

    // Crop Recommendation Engine
    recTitle: "What should I grow next?",
    recSub: "Conversational agricultural calculator tailored to Jharkhand's micro-climates, soil conditions, and market demand.",
    step1Label: "1. Select your Jharkhand District",
    step2Label: "2. How much land do you have?",
    step3Label: "3. What is your primary water source?",
    step4Label: "4. What type of soil do you have?",
    step5Label: "5. Which season are you planning for?",
    btnCalculateRec: "Generate Crop Recommendations",
    recResultTitle: "Your Best Options",
    recWhyHeading: "Why this recommendation?",
    waterOptions: ["Monsoon rainfed", "Borewell / Lift Irrigation", "Pond / Dobha water", "Drip / Micro-irrigation"],
    soilOptions: ["Red Clay (Tanr)", "Black Loamy (Don)", "Sandy Loam", "Gravelly Hill Soil"],
    seasonOptions: ["Kharif (Monsoon)", "Rabi (Winter)", "Zaid (Summer)"],
    districtOptions: ["Ranchi", "Khunti", "Hazaribagh", "West Singhbhum", "East Singhbhum", "Dumka", "Giridih", "Dhanbad", "Deoghar", "Palamu", "Gumla", "Garhwa", "Chatra", "Koderma", "Bokaro", "Ramgarh", "Latehar", "Simdega", "Seraikela Kharsawan", "Jamtara", "Godda", "Sahibganj", "Pakur", "Lohardaga"],

    // Weather Intelligence
    weatherTitle: "Weather that speaks agriculture",
    weatherSub: "Translating weather forecasts into actionable farming decisions for Jharkhand.",
    currentTemp: "28°C",
    currentCondition: "Partly Cloudy • High Humidity (82%)",
    rainExpected: "Rain expected in 36 hours (18mm)",
    weatherActionTitle: "Agricultural Action",
    weatherActionDesc: "Do NOT spray chemical fertilizers or pesticides today. Rainfall will wash away treatments. Delay until ground dries after rain.",
    weatherRiskTitle: "Crop Risk Forecast",
    weatherRiskDesc: "High humidity + warm temperature increases risk of sheath blight in Paddy and leaf spot in vegetables.",
    dayToday: "Today",
    dayTomorrow: "Tomorrow",
    dayDay3: "+2 Days",
    dayDay4: "+3 Days",

    // Soil Health Profile
    soilTitle: "Visual Soil Profile & Nutrients",
    soilSub: "Understanding your land's fertility layer by layer.",
    soilHealthText: "What your soil is telling you",
    soilAdvisory: "Your soil has high organic carbon (0.75%), ideal for paddy & pulses. Nitrogen is slightly deficient (195 kg/ha). Apply vermicompost or Azotobacter before sowing next crop.",
    layerTopsoil: "Topsoil Organic Layer (0 - 15cm)",
    layerSubsoil: "Subsoil Clay/Red Earth (15 - 45cm)",
    layerBedrock: "Weathered Rock / Bedrock (45cm+)",
    phLabel: "pH Level",
    nitrogenLabel: "Nitrogen (N)",
    phosphorusLabel: "Phosphorus (P)",
    potassiumLabel: "Potassium (K)",
    organicCarbonLabel: "Organic Carbon",
    moistureLabel: "Soil Moisture",

    // Voice-First Experience
    voiceTitle: "Just speak.",
    voiceSub: "No typing required. Talk to ADISETU naturally in your native dialect.",
    voicePlaceholder: "Tap microphone to speak...",
    voiceListening: "Listening... speak now",
    voiceProcessing: "Analyzing speech in Jharkhand context...",
    voiceLanguagesSupported: "Supported Dialects: English, Hindi (हिन्दी), Santhali (ᱥᱟᱱᱛᱟᱲᱤ)",

    // Local Knowledge
    knowledgeTitle: "Knowledge from the land",
    knowledgeSub: "Combining centuries of indigenous Jharkhand wisdom with modern scientific validation.",
    contributeBtn: "+ Share Traditional Wisdom",
    communityLabel: "Community Wisdom",
    scientificLabel: "Scientifically Verified",
    aiVerifiedLabel: "AI Cross-Referenced",

    // Jharkhand Map
    mapTitle: "Understand Jharkhand's farms",
    mapSub: "Interactive district-level crop distribution, drought risk, and active pest reports.",
    mapDistrictSelect: "Select District to Inspect",
    districtPaddyArea: "Paddy Coverage",
    districtPrimaryRisk: "Active Risk",
    districtSoilType: "Dominant Soil",

    // Farm History Journal
    historyTitle: "Your Farm Journey",
    historySub: "Your personal timeline of crops, tests, advisories, and harvests.",
    addTimelineBtn: "+ Log Activity",

    // Admin Dashboard
    adminTitle: "Agricultural Expert Control Panel",
    adminSub: "Real-time monitoring of farmer requests, disease outbreaks, weather hazards, and field escalations across Jharkhand districts.",
    statFarmers: "Active Farmers",
    statScansToday: "Crop Scans Today",
    statAlertsActive: "Active Risk Alerts",
    statKvkRequests: "KVK Expert Queue",
    diseaseTrendsTitle: "District Disease Outbreak Trends",
    recentScansTitle: "Real-time Farmer Scan Feed",
    btnResolve: "Escalate to KVK Expert",

    // Voice / Audio labels
    audioPlaying: "Playing audio response...",
    audioStop: "Pause Audio"
  },

  hi: {
    // Brand
    brandName: "ADISETU",
    brandTagline: "Bridging Tribal Wisdom and Modern AI",
    brandSubline: "अपनी फसल देखें। अपनी जमीन समझें। मौसम जानें। बेहतर फसल उगाएं।",
    locationDefault: "खूंटी, झारखंड",
    currentCrop: "धान (Paddy)",

    // Nav
    navHome: "मुख्य पृष्ठ",
    navScan: "फसल स्कैन करें",
    navAsk: "AI से पूछें",
    navFarm: "मेरा खेत",
    navRecommend: "फसल सलाहकार",
    navWeather: "मौसम सलाह",
    navSoil: "मिट्टी स्वास्थ्य",
    navKnowledge: "स्थानीय ज्ञान",
    navMap: "झारखंड नक्शा",
    navHistory: "खेत डायरी",
    navAdmin: "विशेषज्ञ पैनल",
    switchLanguage: "भाषा बदलें",

    // Hero
    heroHeadline: "आपका खेत बोलता है।\nहम सुनते हैं।",
    heroSubtext: "झारखंड के किसानों के लिए समर्पित AI कृषि सहायक — तस्वीरों, आवाज, मौसम, मिट्टी और स्थानीय पारंपरिक ज्ञान द्वारा।",
    heroPrimaryCta: "अपने खेत की शुरुआत करें",
    heroSecondaryCta: "यह कैसे काम करता है",
    heroVoiceTrigger: "ADISETU से पूछें",

    // Interactive Hero Demo
    heroDemoTitle: "लाइव डेमो: आवाज और फोटो AI",
    heroDemoFarmerAsk: "इस फसल में क्या बीमारी है?",
    heroDemoStep1: "पत्ती की फोटो स्कैन हुई",
    heroDemoStep2: "AI जांच: अगेती झुलसा (Early Blight - 91% सटीकता)",
    heroDemoStep3: "मौसम जांच (खूंटी में अधिक नमी)",
    heroDemoStep4: "कृषि सलाह तैयार",
    heroDemoAudioBtn: "हिंदी / संथाली में सुनें",
    heroDemoSpeechResponse: "आपके टमाटर के पौधे में अगेती झुलसा (Early Blight) के लक्षण हैं। बारिश से पहले कॉपर ऑक्सीक्लोराइड का छिड़काव करें।",

    // Dashboard Focal Workspace
    greeting: "शुभ प्रभात, किसान भाई",
    askFarmHeading: "अपने खेत से पूछें",
    askFarmSubtext: "बेझिझक बोलें। अपने खेत के बारे में कुछ भी पूछें।",
    btnSpeak: "बोलकर पूछें",
    btnScanCrop: "फोटो खींचें / स्कैन",
    quickQuestions: [
      "धान के पत्ते पीले क्यों हो रहे हैं?",
      "खूंटी में अगले 3 दिन में कितनी बारिश होगी?",
      "खारीफ के बाद कौन सी फसल बोएं?",
      "झारखंड में खाद सब्सिडी की दरें क्या हैं?"
    ],

    // Farm Health Horizontal Strip
    farmHealthTitle: "खेत का स्वास्थ्य अवलोकन",
    healthSoil: "मिट्टी स्थिति",
    healthSoilVal: "उत्तम (pH 6.2)",
    healthCrop: "फसल स्थिति",
    healthCropVal: "ध्यान देने की जरूरत",
    healthWeather: "मौसम चेतावनी",
    healthWeatherVal: "36 घंटे में बारिश",
    healthRisk: "बीमारी जोखिम",
    healthRiskVal: "मध्यम फफूंद जोखिम",
    healthAction: "सलाह",
    healthActionVal: "फसल की निगरानी करें, बारिश से पहले छिड़काव न करें",

    // AI Crop Scanner
    scannerTitle: "बीमारी की फोटो दिखाएं",
    scannerSub: "फसल की पत्ती की फोटो अपलोड करें या खींचें, AI तुरंत बीमारी पहचान कर सही समाधान बताएगा।",
    btnTakePhoto: "कैमरा चलाएं",
    btnUploadPhoto: "फोटो अपलोड करें",
    btnVoiceDescribe: "या आवाज में बताएं",
    scanSimulating: "पत्ती के सूक्ष्म पैटर्न की जांच की जा रही है...",
    detectedIssueTitle: "संभावित बीमारी की पहचान",
    issueName: "अगेती झुलसा / अर्ली ब्लाइट (Early Blight)",
    confidenceLabel: "सटीकता दर (Confidence)",
    severityLabel: "गंभीरता",
    severityVal: "मध्यम जोखिम",
    symptomsHeading: "लक्षण जो पाए गए",
    symptomsText: "निचली पत्तियों पर पीले घेरे के साथ गोल भूरे धब्बे। यह मौसम में अधिक नमी और मिट्टी के कवक (फंगस) के कारण होता है।",
    actionHeading: "किसान भाई क्या करें",
    actionSteps: [
      "प्रभावित निचली पत्तियों को तोड़कर खेत से दूर नष्ट कर दें।",
      "जैविक फफूंदनाशी (ट्राइकोडरमा विरिडी) या नीम तेल (5 मि.ली./लीटर) का छिड़काव करें।",
      "पत्तियों को सूखा रखने के लिए ऊपरी सिंचाई से बचें।"
    ],
    weatherLinkText: "खूंटी जिले में अगले 48 घंटे नमी रहने से बीमारी फैलने का खतरा है। बारिश से पहले बचाव करें।",
    listenHindi: "हिंदी में सुनें 🔊",
    listenSanthali: "संथाली में सुनें 🔊",
    safetyDisclaimer: "AI सहायता चेतावनी: 91% दृश्य सटीकता। अत्यधिक प्रकोप होने पर तुरंत ब्लॉक कृषि पदाधिकारी (BAO) या कृषि विज्ञान केंद्र (KVK) से संपर्क करें।",

    // Crop Recommendation Engine
    recTitle: "अगली फसल कौन सी लगाएं?",
    recSub: "झारखंड की मिट्टी, मौसम और जल स्रोतों के आधार पर फसल चयन सलाहकार।",
    step1Label: "1. अपना झारखंड जिला चुनें",
    step2Label: "2. आपके पास कितनी जमीन है?",
    step3Label: "3. पानी की क्या व्यवस्था है?",
    step4Label: "4. खेत की मिट्टी कैसी है?",
    step5Label: "5. किस मौसम (सीजन) के लिए योजना है?",
    btnCalculateRec: "सर्वश्रेष्ठ फसल विकल्प देखें",
    recResultTitle: "आपके लिए सबसे उपयुक्त फसलें",
    recWhyHeading: "यह सुझाव क्यों दिया गया?",
    waterOptions: ["मानसून आधारित (बारिश)", "बोरवेल / लिफ्ट सिंचाई", "तालाब / डोभा पानी", "ड्रिप / बूंद-बूंद सिंचाई"],
    soilOptions: ["लाल मिट्टी (टांड़)", "काली दोमट मिट्टी (दौन)", "बलुई दोमट", "पथरीली पहाड़ी मिट्टी"],
    seasonOptions: ["खरीफ (मानसून)", "रबी (सर्दियां)", "जायद (गर्मी)"],
    districtOptions: ["रांची", "खूंटी", "हजारीबाग", "पश्चिम सिंहभूम", "पूर्वी सिंहभूम", "दुमका", "गिरिडीह", "धनबाद", "देवघर", "पलामू", "गुमला", "गढ़वा", "चतरा", "कोडरमा", "बोकारो", "रामगढ़", "लातेहार", "सिमडेगा", "सरायकेला खरसावां", "जामताड़ा", "गोड्डा", "साहिबगंज", "पाकुड़", "लोहरदगा"],

    // Weather Intelligence
    weatherTitle: "मौसम जो खेती की बात करे",
    weatherSub: "मौसम के पूर्वानुमान को किसान के काम आने वाली सलाह में बदलना।",
    currentTemp: "28°C",
    currentCondition: "आंशिक बादल • हवा में नमी (82%)",
    rainExpected: "36 घंटों में बारिश की संभावना (18mm)",
    weatherActionTitle: "कृषि कार्य सलाह",
    weatherActionDesc: "आज कीटनाशक या रासायनिक खाद का छिड़काव न करें। बारिश से दवा बह जाएगी। मिट्टी सूखने तक प्रतीक्षा करें।",
    weatherRiskTitle: "बीमारी जोखिम पूर्वानुमान",
    weatherRiskDesc: "अधिक नमी और गर्माहट के कारण धान में शीथ ब्लाइट और सब्जियों में पत्ती धब्बा रोग बढ़ सकता है।",
    dayToday: "आज",
    dayTomorrow: "कल",
    dayDay3: "+2 दिन",
    dayDay4: "+3 दिन",

    // Soil Health Profile
    soilTitle: "मिट्टी स्वास्थ्य और पोषक तत्व profile",
    soilSub: "परत-दर-परत अपनी जमीन की उर्वरता को समझें।",
    soilHealthText: "आपकी मिट्टी क्या बता रही है",
    soilAdvisory: "आपकी मिट्टी में जैविक कार्बन (0.75%) अच्छा है, जो धान और दालों के लिए उपयुक्त है। नाइट्रोजन (195 kg/ha) थोड़ा कम है। अगली बुवाई से पहले वर्मीकंपोस्ट या एजोटोबैक्टर डालें।",
    layerTopsoil: "ऊपरी जैविक मिट्टी (0 - 15 सेमी)",
    layerSubsoil: "निचली लाल/दोमट मिट्टी (15 - 45 सेमी)",
    layerBedrock: "चट्टानी परत (45 सेमी+)",
    phLabel: "pH मान (अम्लता)",
    nitrogenLabel: "नाइट्रोजन (N)",
    phosphorusLabel: "फास्फोरस (P)",
    potassiumLabel: "पोटाश (K)",
    organicCarbonLabel: "जैविक कार्बन",
    moistureLabel: "मिट्टी में नमी",

    // Voice-First Experience
    voiceTitle: "बस बोलिए।",
    voiceSub: "लिखने की कोई जरूरत नहीं। अपनी अपनी बोली में ADISETU से बात करें।",
    voicePlaceholder: "बोलने के लिए माइक बटन दबाएं...",
    voiceListening: "सुन रहे हैं... अब बोलिए",
    voiceProcessing: "आपकी बात का विश्लेषण हो रहा है...",
    voiceLanguagesSupported: "समर्थित भाषाएं: अंग्रेजी, हिंदी (हिन्दी), संथाली (ᱥᱟᱱᱛᱟᱲᱤ)",

    // Local Knowledge
    knowledgeTitle: "जमीन से जुड़ा पारंपरिक ज्ञान",
    knowledgeSub: "झारखंड के पीढ़ियों पुराने कृषि ज्ञान और आधुनिक विज्ञान का संगम।",
    contributeBtn: "+ अपना ज्ञान साझा करें",
    communityLabel: "समुदाय का ज्ञान",
    scientificLabel: "वैज्ञानिक रूप से प्रमाणित",
    aiVerifiedLabel: "AI द्वारा जांचा गया",

    // Jharkhand Map
    mapTitle: "झारखंड के खेतों को समझें",
    mapSub: "जिलावार फसल वितरण, सूखा जोखिम और बीमारी की लाइव रिपोर्ट।",
    mapDistrictSelect: "जिले की स्थिति देखने के लिए चुनें",
    districtPaddyArea: "धान का क्षेत्रफल",
    districtPrimaryRisk: "वर्तमान जोखिम",
    districtSoilType: "मुख्य मिट्टी प्रकार",

    // Farm History Journal
    historyTitle: "आपकी कृषि यात्रा",
    historySub: "फसल, जांच, मौसम सलाह और पैदावार की आपकी व्यक्तिगत डायरी।",
    addTimelineBtn: "+ नया अनुभव दर्ज करें",

    // Admin Dashboard
    adminTitle: "कृषि विशेषज्ञ नियंत्रण केंद्र",
    adminSub: "झारखंड के सभी जिलों में किसानों के प्रश्नों, बीमारी के प्रकोप और मौसम संबंधी चेतावनियों की निगरानी।",
    statFarmers: "पंजीकृत किसान",
    statScansToday: "आज के फसल स्कैन",
    statAlertsActive: "सक्रिय चेतावनियां",
    statKvkRequests: "केवीके (KVK) विशेषज्ञ कतार",
    diseaseTrendsTitle: "जिलावार बीमारी प्रकोप ट्रेंड",
    recentScansTitle: "लाइव फसल स्कैन फीड",
    btnResolve: "केवीके विशेषज्ञ को भेजें",

    // Voice / Audio labels
    audioPlaying: "आवाज में सलाह बज रही है...",
    audioStop: "आवाज रोकें"
  },

  sat: {
    // Brand (Santhali - ᱥᱟᱱᱛᱟᱲᱤ in clean Ol Chiki script)
    brandName: "ADISETU",
    brandTagline: "Bridging Tribal Wisdom and Modern AI",
    brandSubline: "ᱟᱢᱟᱜ ᱪᱟᱥ ᱧᱮᱞ ᱢᱮ, ᱦᱟᱥᱟ ᱵᱩᱡᱷᱟᱹᱣ ᱢᱮ, ᱥᱤᱛᱩᱝ-ᱫᱟ cross ᱵᱟ cross ᱟᱭ ᱢᱮ᱾",
    locationDefault: "ᱠᱷᱩᱸᱴᱤ, ᱡᱷᱟᱨᱠᱷᱚᱸᱰ (Khunti)",
    currentCrop: "ᱦᱩᱲᱩ (Paddy)",

    // Nav
    navHome: "ᱚᱲᱟᱜ (Home)",
    navScan: "ᱪᱟᱥ ᱥᱠᱮᱱ (Scan)",
    navAsk: "AI ᱠᱩᱞᱤ (Ask AI)",
    navFarm: "ᱤᱧᱟᱜ ᱪᱟᱥ (My Farm)",
    navRecommend: "ᱪᱟᱥ ᱥᱚᱞᱦᱟ (Advisor)",
    navWeather: "ᱫᱟᱜ-ᱥᱤᱛᱩᱝ (Weather)",
    navSoil: "ᱦᱟᱥᱟ (Soil)",
    navKnowledge: " traditional ᱧᱟ cross (Knowledge)",
    navMap: " map (Map)",
    navHistory: " timeline (Journal)",
    navAdmin: " ᱮᱠᱥᱯᱟᱨᱴ (Expert)",
    switchLanguage: " ᱯᱟ cross ᱨᱥᱤ",

    // Hero
    heroHeadline: "ᱟᱢᱟᱜ ᱪᱟᱥ ᱨᱚᱲᱮᱫᱟ᱾\nᱟᱞᱮ ᱞᱮ ᱟ cross ᱡᱚᱢᱮᱫᱟ᱾",
    heroSubtext: "ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱨᱮᱱ ᱪᱟ cross ᱥᱤ ᱠᱚ ᱞᱟᱹ cross ᱜᱤ cross ᱛ AI ᱪᱟᱥ ᱥᱟ cross ᱛᱷᱤ - ᱨᱚᱲ, ᱪᱤ cross ᱛᱟ cross ᱨ ᱟ cross ᱨ ᱦᱟ cross ᱥᱟ ᱵ walking-ᱟ cross ᱭ ᱛᱮ᱾",
    heroPrimaryCta: " ᱪᱟᱥ ᱮ cross ᱦᱚ cross ᱵ ᱢᱮ",
    heroSecondaryCta: " ᱪᱮ cross ᱫ ᱞᱮ cross ᱠᱟ ᱠᱟ cross ᱢᱤ cross ᱭᱮ cross ᱫᱟ",
    heroVoiceTrigger: " ᱠᱨᱤ cross ᱥᱤ ᱥᱟ cross ᱛᱷᱤ ᱠᱩ cross ᱞᱤ cross ᱭ ᱢᱮ",

    // Interactive Hero Demo
    heroDemoTitle: " ᱞᱟ cross ᱭ ᱵ ᱰᱮ cross ᱢ structure",
    heroDemoFarmerAsk: " ᱱ walk ᱟ ᱪᱟ cross ᱥ ᱨᱮ cross ᱪᱮ cross ᱫ ᱨ walk ᱜ ᱦ cross ᱭ ᱟ cross ᱠᱟ cross ᱱᱟ?",
    heroDemoStep1: " Crop image scanned",
    heroDemoStep2: " AI Diagnosis: Early Blight (91% confidence)",
    heroDemoStep3: " High humidity in Khunti",
    heroDemoStep4: " Recommendation generated",
    heroDemoAudioBtn: " ᱥᱟᱱᱛᱟᱲᱤ / ᱦᱤᱱᱫᱤ ᱛᱮ ᱟᱸᱡᱚᱢ ᱢᱮ",
    heroDemoSpeechResponse: " ᱟᱢᱟᱜ ᱴᱚᱢᱟᱴᱚ ᱪᱟᱥ ᱨᱮ Early Blight ᱨᱚᱜᱽ ᱧᱮᱞᱚᱜ ᱠᱟᱱᱟ᱾ ᱫᱟᱜ ᱞᱟᱦᱟ ᱨᱮ Copper Oxychloride ᱪᱟᱯᱟᱰ ᱢᱮ᱾",

    // Dashboard Focal Workspace
    greeting: " ᱡᱚᱦᱟᱨ, ᱪᱟᱥᱤ ᱵᱚᱭᱦᱟ",
    askFarmHeading: " ᱟᱢᱟᱜ ᱪᱟᱥ ᱠᱩᱞᱤᱭᱮᱢ",
    askFarmSubtext: " ᱨᱚᱲ ᱢᱮ, ᱪᱮᱫ ᱦᱚᱸ ᱠᱩᱞᱤᱭᱮᱢ",
    btnSpeak: " ᱨᱚᱲ ᱢᱮ 🎙️",
    btnScanCrop: " ᱪᱤᱛᱟᱹᱨ ᱥᱠᱮᱱ 📷",
    quickQuestions: [
      " ᱦᱩᱲᱩ ᱥᱟᱠᱟᱢ ᱥᱟᱥᱟᱝᱚᱜ ᱠᱟᱱᱟ?",
      " ᱠᱷᱩᱸᱴᱤ ᱨᱮ ᱫᱟᱜ ᱦᱩᱭᱩᱜ-ᱟ?",
      " ᱠᱷᱟᱨᱤᱯ ᱛᱟᱭᱚᱢ ᱪᱮᱫ ᱪᱟᱥ?",
      " ᱥᱚᱨᱠᱟᱨᱤ ᱠᱷᱟᱛ ᱫᱟᱢ?"
    ],

    // Farm Health Horizontal Strip
    farmHealthTitle: " ᱪᱟᱥ ᱦᱚᱲᱢᱚ ᱧᱮᱞ",
    healthSoil: " Soil Status",
    healthSoilVal: "Healthy (pH 6.2)",
    healthCrop: "Crop Status",
    healthCropVal: "Needs attention",
    healthWeather: "Weather Alert",
    healthWeatherVal: "Rain in 36h",
    healthRisk: "Pest Risk",
    healthRiskVal: "Moderate Risk",
    healthAction: "Action",
    healthActionVal: "Monitor crop",

    // AI Crop Scanner
    scannerTitle: " ᱨᱚᱜᱽ ᱪᱤᱛᱟᱹᱨ ᱩᱫᱩᱜ ᱢᱮ",
    scannerSub: " ᱥᱠᱮᱱ ᱪᱤᱛᱟᱹᱨ, AI ᱥᱚᱞᱦᱟ ᱞᱟᱹᱭᱟᱢᱟ᱾",
    btnTakePhoto: " ᱠᱮᱢᱨᱟ ᱪᱟᱞᱟᱣ",
    btnUploadPhoto: " ᱪᱤᱛᱟᱹᱨ ᱟᱹᱜᱩ",
    btnVoiceDescribe: " ᱨᱚᱲ ᱛᱮ ᱞᱟᱹᱭ",
    scanSimulating: " AI Scan ᱠᱟᱹᱢᱤᱭᱮᱫᱟ...",
    detectedIssueTitle: " ᱧᱮᱞ ᱧᱟᱢ ᱟᱠᱟᱱ ᱨᱚᱜᱽ",
    issueName: " Early Blight (Alternaria solani)",
    confidenceLabel: " Confidence Level",
    severityLabel: " Severity Level",
    severityVal: " Moderate Risk",
    symptomsHeading: " ᱪᱮᱫ ᱧᱮᱞᱮᱱᱟ",
    symptomsText: " ᱞᱟᱛᱟᱨ ᱥᱟᱠᱟᱢ ᱨᱮ ᱯᱮᱸᱰᱟ ᱧᱮᱞᱚᱜ ᱠᱟᱱᱟ᱾",
    actionHeading: " ᱪᱟᱥᱤ ᱪᱮᱫ ᱠᱟᱹᱢᱤᱭᱟ",
    actionSteps: [
      " ᱨᱚᱜᱽ ᱟᱠᱟᱱ ᱥᱟᱠᱟᱢ ᱚᱪᱚᱭ ᱢᱮ᱾",
      " ᱱᱤᱢ ᱥᱩᱱᱩᱢ (Neem oil 5ml/L) ᱪᱟᱯᱟᱰ ᱢᱮ᱾",
      " ᱫᱟᱜ ᱥᱟᱠᱟᱢ ᱨᱮ ᱟᱞᱚᱢ ᱫᱩᱞᱟ᱾"
    ],
    weatherLinkText: " ᱠᱷᱩᱸᱴᱤ ᱨᱮ ᱫᱟᱜ ᱦᱩᱭᱩᱜ ᱞᱟᱦᱟ ᱨᱮ ᱵᱚᱛᱚᱨ ᱢᱮᱱᱟᱜ-ᱟ᱾",
    listenHindi: " ᱦᱤᱱᱫᱤ ᱛᱮ ᱟᱸᱡᱚᱢ 🔊",
    listenSanthali: " ᱥᱟᱱᱛᱟᱲᱤ ᱛᱮ ᱟᱸᱡᱚᱢ 🔊",
    safetyDisclaimer: " AI Assistance Note: 91% visual accuracy. Consult local Krishi Vigyan Kendra (KVK) for severe field outbreaks.",

    // Crop Recommendation Engine
    recTitle: " ᱤᱱᱟᱹ ᱛᱟᱭᱚᱢ ᱪᱮᱫ ᱪᱟᱥ?",
    recSub: " ᱡᱷᱟᱨᱠᱷᱚᱸᱰ ᱦᱟᱥᱟ ᱟᱨ ᱫᱟᱜ ᱞᱟᱹᱜᱤᱫ ᱥᱚᱞᱦᱟ᱾",
    step1Label: "1. ᱡᱤᱞᱟᱹ ᱥᱟᱞᱟ (District)",
    step2Label: "2. ᱛᱤᱱᱟᱹᱜ ᱡᱟᱭᱜᱟ?",
    step3Label: "3. ᱫᱟᱜ ᱠᱷᱚᱱᱟᱜ ᱧᱟᱢᱚᱜ-ᱟ?",
    step4Label: "4. ᱦᱟᱥᱟ ᱪᱮᱫ ᱞᱮᱠᱟ?",
    step5Label: "5. ᱚᱠᱟ ᱥᱤᱡᱚᱱ?",
    btnCalculateRec: " ᱪᱟᱥ ᱥᱚᱞᱦᱟ ᱧᱮᱞ ᱢᱮ",
    recResultTitle: " ᱟᱢ ᱞᱟᱹᱜᱤᱫ ᱵᱩᱜᱤ ᱪᱟᱥ",
    recWhyHeading: " ᱪᱮᱫ ᱞᱟᱹᱜᱤᱫ ᱱᱚᱣᱟ?",
    waterOptions: [" ᱫᱟᱜ ᱡᱟᱹᱲᱤ (Monsoon)", " ᱵᱚᱨᱣᱮᱞ (Borewell)", " ᱯᱩᱠᱷᱨᱤ (Pond/Dobha)", " ᱫᱟᱜ ᱴᱚᱯᱚ (Drip)"],
    soilOptions: [" ᱟᱨᱟᱜ ᱦᱟᱥᱟ (Red Tanr)", " ᱦᱮᱸᱫᱮ ᱦᱟᱥᱟ (Black Don)", " ᱵᱟᱹᱞᱤ ᱦᱟᱥᱟ", " ᱫᱷᱤᱨᱤ ᱦᱟᱥᱟ"],
    seasonOptions: [" ᱠᱷᱟᱨᱤᱯ (Kharif)", " ᱨᱟᱵᱤ (Rabi)", " ᱡᱟᱭᱮᱫ (Zaid)"],
    districtOptions: ["Ranchi", "Khunti", "Hazaribagh", "West Singhbhum", "East Singhbhum", "Dumka", "Giridih", "Dhanbad", "Deoghar", "Palamu", "Gumla", "Garhwa", "Chatra", "Koderma", "Bokaro", "Ramgarh", "Latehar", "Simdega", "Seraikela Kharsawan", "Jamtara", "Godda", "Sahibganj", "Pakur", "Lohardaga"],

    // Weather Intelligence
    weatherTitle: " ᱫᱟᱜ ᱥᱤᱛᱩᱝ ᱠᱟᱵᱟᱨ",
    weatherSub: " ᱪᱟᱥ ᱞᱟᱹᱜᱤᱫ ᱫᱟᱜ ᱥᱤᱛᱩᱝ ᱠᱟᱵᱟᱨ᱾",
    currentTemp: "28°C",
    currentCondition: " ᱨᱤᱢᱤᱞ • ᱦᱚᱭ ᱨᱮ ᱫᱟᱜ (82%)",
    rainExpected: " 36 ᱜᱷᱚᱱᱴᱟ ᱨᱮ ᱫᱟᱜ ᱦᱩᱭᱩᱜ-ᱟ",
    weatherActionTitle: " ᱪᱟᱥ ᱠᱟᱹᱢᱤ",
    weatherActionDesc: " ᱛᱮᱦᱮᱧ ᱨᱟᱱ ᱟᱞᱚᱢ ᱪᱟᱯᱟᱰᱟ᱾ ᱫᱟᱜ ᱛᱮ ᱨᱟᱱ ᱟᱹᱛᱩᱜ-ᱟ᱾",
    weatherRiskTitle: " ᱨᱚᱜᱽ ᱵᱚᱛᱚᱨ",
    weatherRiskDesc: " ᱦᱚᱭ ᱨᱮ ᱫᱟᱜ ᱛᱟᱦᱮᱱ ᱠᱷᱟᱱ ᱦᱩᱲᱩ ᱨᱮ Sheath Blight ᱨᱚᱜᱽ ᱦᱩᱭᱩᱜ-ᱟ᱾",
    dayToday: " ᱛᱮᱦᱮᱧ",
    dayTomorrow: " ᱜᱟᱯᱟ",
    dayDay3: "+2 ᱢᱟᱦᱟ",
    dayDay4: "+3 ᱢᱟᱦᱟ",

    // Soil Health Profile
    soilTitle: " ᱦᱟᱥᱟ Nutrient Profile",
    soilSub: " ᱟᱢᱟᱜ ᱦᱟᱥᱟ ᱵᱩᱡᱷᱟᱹᱣ ᱢᱮ᱾",
    soilHealthText: " ᱦᱟᱥᱟ ᱪᱮᱫ ᱮ ᱞᱟᱹᱭᱟ",
    soilAdvisory: " Your soil has high organic carbon (0.75%), ideal for paddy & pulses. Nitrogen is slightly deficient (195 kg/ha). Apply vermicompost or Azotobacter.",
    layerTopsoil: " Topsoil Layer (0 - 15cm)",
    layerSubsoil: " Subsoil Layer (15 - 45cm)",
    layerBedrock: " Bedrock Layer (45cm+)",
    phLabel: "pH Level",
    nitrogenLabel: "Nitrogen (N)",
    phosphorusLabel: "Phosphorus (P)",
    potassiumLabel: "Potassium (K)",
    organicCarbonLabel: "Organic Carbon",
    moistureLabel: "Soil Moisture",

    // Voice-First Experience
    voiceTitle: " ᱨᱚᱲ ᱢᱮ",
    voiceSub: " ᱚᱞ ᱵᱟᱹᱱᱩᱜ-ᱟ᱾ ᱟᱢᱟᱜ ᱯᱟᱨᱥᱤ ᱛᱮ ᱨᱚᱲ ᱢᱮ᱾",
    voicePlaceholder: " ᱨᱚᱲ ᱞᱟᱹᱜᱤᱫ ᱢᱟᱭᱠ ᱫᱟᱵᱟᱣ ᱢᱮ...",
    voiceListening: " ᱟᱸᱡᱚᱢ ᱮᱫᱟ... ᱨᱚᱲ ᱢᱮ",
    voiceProcessing: " ᱵᱩᱡᱷᱟᱹᱣ ᱮᱫᱟ...",
    voiceLanguagesSupported: " ᱯᱟᱨᱥᱤ: English, Hindi (हिन्दी), Santhali (ᱥᱟᱱᱛᱟᱲᱤ)",

    // Local Knowledge
    knowledgeTitle: " ᱦᱟᱥᱟ ᱨᱮᱱᱟᱜ Traditional ᱧᱟᱢ",
    knowledgeSub: " ᱥᱟᱢᱟᱡᱤ traditional ᱧᱟᱢ ᱟᱨ ᱥᱟᱭᱤᱱᱥ ᱨᱮᱱᱟᱜ ᱢᱤᱞᱚᱢ",
    contributeBtn: "+ ᱟᱢᱟᱜ ᱧᱟᱢ ᱮᱢ ᱢᱮ",
    communityLabel: " Community Wisdom",
    scientificLabel: " Scientific Verified",
    aiVerifiedLabel: " AI Verified",

    // Jharkhand Map
    mapTitle: " ᱡᱷᱟᱨᱠᱷᱚᱸᱰ Map",
    mapSub: " ᱡᱤᱞᱟᱹ ᱪᱟᱥ ᱟᱨ ᱫᱟᱜ ᱥᱤᱛᱩᱝ ᱠᱟᱵᱟᱨ",
    mapDistrictSelect: " Select District",
    districtPaddyArea: " Paddy Coverage",
    districtPrimaryRisk: " Active Risk",
    districtSoilType: " Dominant Soil",

    // Farm History Journal
    historyTitle: " ᱪᱟᱥ Journal",
    historySub: " ᱟᱢᱟᱜ ᱪᱟᱥ timeline",
    addTimelineBtn: "+ Log Activity",

    // Admin Dashboard
    adminTitle: " ᱮᱠᱥᱯᱟᱨᱴ Panel",
    adminSub: " Real-time Jharkhand farm monitoring & KVK expert coordination.",
    statFarmers: " Registered Farmers",
    statScansToday: " Crop Scans Today",
    statAlertsActive: " Active Alerts",
    statKvkRequests: " KVK Queue",
    diseaseTrendsTitle: " Outbreak Trends",
    recentScansTitle: " Live Scan Feed",
    btnResolve: " KVK Expert Escalation",

    // Voice / Audio labels
    audioPlaying: "Playing Santhali response...",
    audioStop: "Pause Audio"
  }
};
