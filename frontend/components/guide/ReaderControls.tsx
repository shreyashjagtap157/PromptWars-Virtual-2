"use client"
import React from 'react';
import { useTTS } from '@/hooks/useTTS';

export function ReaderControls({ text }: { text: string }) {
  const { speak, stop, isSpeaking, isSupported } = useTTS();

  if (!isSupported) return null;

  return (
    <div className="flex items-center gap-2 mt-4 pt-4 border-t border-outline-variant/30">
      <span className="font-label-caps text-label-caps text-on-surface-variant uppercase tracking-wider">Audio Guide</span>
      {isSpeaking ? (
        <button 
          onClick={stop}
          className="flex items-center gap-2 text-error hover:bg-error/10 px-3 py-1.5 rounded-full transition-colors">
          <span className="material-symbols-outlined text-[18px]">stop_circle</span>
          <span className="font-button text-[13px] font-medium">Stop</span>
        </button>
      ) : (
        <button 
          onClick={() => speak(text)}
          className="flex items-center gap-2 text-secondary hover:bg-secondary/10 px-3 py-1.5 rounded-full transition-colors">
          <span className="material-symbols-outlined text-[18px]">play_circle</span>
          <span className="font-button text-[13px] font-medium">Listen</span>
        </button>
      )}
    </div>
  );
}
