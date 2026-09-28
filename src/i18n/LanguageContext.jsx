import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';
import { 
  playSarvamAudio, 
  stopSarvamAudio, 
  sarvamTranslate, 
  DEFAULT_SARVAM_KEY, 
  INDIAN_VOICES 
} from '../api/sarvamApi';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Default to Hindi ('hi') for Jharkhand farmer focus, easily switchable to 'en' or 'sat'
  const [lang, setLang] = useState('hi');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioText, setAudioText] = useState('');
  
  // Sarvam AI Voice & Translation Settings
  const [isSarvamVoiceActive, setIsSarvamVoiceActive] = useState(true);
  const [selectedVoice, setSelectedVoice] = useState('ritu'); // 'ritu', 'simran', 'shubh', 'aditya', etc.
  const [sarvamApiKey, setSarvamApiKey] = useState(
    localStorage.getItem('sarvam_api_key') || DEFAULT_SARVAM_KEY
  );

  const t = (key) => {
    const langDict = translations[lang] || translations['en'];
    return langDict[key] || translations['en'][key] || key;
  };

  // Indian Accent Text-to-Speech via Sarvam AI with WebSpeech Fallback
  const playAudioResponse = async (textToSpeak, targetLangOverride = null, customSpeaker = null) => {
    const speakLang = targetLangOverride || lang;
    const speakerToUse = customSpeaker || selectedVoice || (speakLang === 'hi' ? 'ritu' : 'simran');

    if (isPlayingAudio) {
      stopAudio();
      return;
    }

    setAudioText(textToSpeak);
    setIsPlayingAudio(true);

    if (isSarvamVoiceActive) {
      try {
        await playSarvamAudio(
          textToSpeak,
          speakLang,
          speakerToUse,
          () => setIsPlayingAudio(true),
          () => setIsPlayingAudio(false),
          (err) => {
            console.warn('[Sarvam AI TTS Error] Falling back to browser speech synthesis:', err);
            fallbackWebSpeech(textToSpeak, speakLang);
          },
          sarvamApiKey
        );
        return;
      } catch (err) {
        console.warn('[Sarvam AI Play Failure] Using WebSpeech fallback:', err);
        fallbackWebSpeech(textToSpeak, speakLang);
        return;
      }
    }

    fallbackWebSpeech(textToSpeak, speakLang);
  };

  const fallbackWebSpeech = (textToSpeak, speakLang) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.lang = speakLang === 'hi' ? 'hi-IN' : 'en-US';
      utterance.rate = 0.9;
      
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);

      window.speechSynthesis.speak(utterance);
    } else {
      setTimeout(() => setIsPlayingAudio(false), 4000);
    }
  };

  const stopAudio = () => {
    stopSarvamAudio();
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsPlayingAudio(false);
  };

  // Live Sarvam AI Translation Helper
  const translateWithSarvam = async (text, targetLang = 'hi', sourceLang = 'auto') => {
    try {
      return await sarvamTranslate({
        input: text,
        targetLang,
        sourceLang,
        customKey: sarvamApiKey
      });
    } catch (err) {
      console.error('[LanguageContext Translate Error]:', err);
      return text;
    }
  };

  const updateSarvamKey = (key) => {
    setSarvamApiKey(key);
    if (key) {
      localStorage.setItem('sarvam_api_key', key);
    } else {
      localStorage.removeItem('sarvam_api_key');
    }
  };

  return (
    <LanguageContext.Provider value={{
      lang,
      setLang,
      t,
      playAudioResponse,
      stopAudio,
      isPlayingAudio,
      audioText,
      // Sarvam AI Indian Accent Voice & Translation exports
      isSarvamVoiceActive,
      setIsSarvamVoiceActive,
      selectedVoice,
      setSelectedVoice,
      sarvamApiKey,
      setSarvamApiKey: updateSarvamKey,
      translateWithSarvam,
      indianVoices: INDIAN_VOICES
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

