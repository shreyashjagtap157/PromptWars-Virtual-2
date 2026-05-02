"use client"
import { memo, useState } from 'react';
import { useTTS } from '@/hooks/useTTS';
import { translateText } from '@/lib/translate';

export const ReaderControls = memo(function ReaderControls({ text }: { text: string }) {
  const { speak, stop, isSpeaking, isSupported } = useTTS();
  const [translatedText, setTranslatedText] = useState<string | null>(null);
  const [isTranslating, setIsTranslating] = useState(false);

  const handleTranslate = async () => {
    setIsTranslating(true);
    try {
      const result = await translateText(text, 'es'); // Spanish demo
      setTranslatedText(result);
    } finally {
      setIsTranslating(false);
    }
  };

  if (!isSupported) return null;

  const contentToSpeak = translatedText || text;

  return (
    <div className="flex flex-col gap-4 mt-4 pt-4 border-t border-outline-variant/30">
      <div className="flex items-center gap-3">
        <span className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-widest font-black">Voice Engine</span>
        <div className="flex items-center gap-1">
          {isSpeaking ? (
            <button 
              onClick={stop}
              className="flex items-center gap-2 text-error hover:bg-error/10 px-3 py-1.5 rounded-full transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[16px]">stop_circle</span>
              <span className="font-bold text-[11px] uppercase tracking-wide">Stop</span>
            </button>
          ) : (
            <button 
              onClick={() => speak(contentToSpeak)}
              className="flex items-center gap-2 text-primary hover:bg-primary/10 px-3 py-1.5 rounded-full transition-colors cursor-pointer">
              <span className="material-symbols-outlined text-[16px]">play_circle</span>
              <span className="font-bold text-[11px] uppercase tracking-wide">Listen {translatedText ? '(ES)' : ''}</span>
            </button>
          )}
        </div>

        <div className="h-4 w-[1px] bg-outline-variant/30 mx-1"></div>

        <button 
          onClick={handleTranslate}
          disabled={isTranslating || !!translatedText}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-colors cursor-pointer ${translatedText ? 'text-secondary bg-secondary/5' : 'text-on-surface-variant hover:bg-surface-container-highest'}`}>
          <span className="material-symbols-outlined text-[16px]">{isTranslating ? 'sync' : 'translate'}</span>
          <span className="font-bold text-[11px] uppercase tracking-wide">
            {isTranslating ? 'Translating...' : translatedText ? 'Spanish Active' : 'Translate to Spanish'}
          </span>
        </button>
      </div>
      
      {translatedText && (
        <div className="bg-surface-container-low p-4 rounded-xl border border-outline-variant/10 animate-in fade-in slide-in-from-top-2 duration-300">
          <p className="text-sm font-body-md text-on-surface leading-relaxed italic">
            "{translatedText}"
          </p>
        </div>
      )}
    </div>
  );
});
