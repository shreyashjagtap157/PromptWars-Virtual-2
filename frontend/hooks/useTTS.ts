import { useState, useCallback, useEffect, useRef } from 'react';
import { useStore } from '@/store/useStore';

export function useTTS() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported] = useState(() => typeof window === 'undefined' ? true : 'speechSynthesis' in window);
  const language = useStore((state) => state.language);
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;

      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const setSpeakingState = useCallback((nextValue: boolean) => {
    if (isMountedRef.current) {
      setIsSpeaking(nextValue);
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

    utterance.onstart = () => setSpeakingState(true);
    utterance.onend = () => setSpeakingState(false);
    utterance.onerror = (e) => {
      console.error('Speech synthesis error', e);
      setSpeakingState(false);
    };

    window.speechSynthesis.speak(utterance);
  }, [isSupported, language, setSpeakingState]);

  const stop = useCallback(() => {
    if (!isSupported || typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    setSpeakingState(false);
  }, [isSupported, setSpeakingState]);

  return { speak, stop, isSpeaking, isSupported };
}
