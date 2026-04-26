import { useState, useCallback, useEffect } from 'react';
import { useStore } from '@/store/useStore';

export function useTTS() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const { language } = useStore();

  useEffect(() => {
    if (typeof window !== 'undefined' && !('speechSynthesis' in window)) {
      setIsSupported(false);
    }
    
    return () => {
      if (typeof window !== 'undefined') {
         window.speechSynthesis.cancel();
      }
    }
  }, []);

  const speak = useCallback((text: string) => {
    if (!isSupported || typeof window === 'undefined') return;
    
    // Stop any ongoing speech
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language; // Use the user's selected language
    utterance.rate = 0.95;
    utterance.pitch = 1;
    
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = (e) => {
      console.error('Speech synthesis error', e);
      setIsSpeaking(false);
    };

    window.speechSynthesis.speak(utterance);
  }, [isSupported, language]);

  const stop = useCallback(() => {
    if (!isSupported || typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  }, [isSupported]);

  return { speak, stop, isSpeaking, isSupported };
}
