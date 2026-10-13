import React, { useState, useEffect } from 'react';
import { Sparkles, Activity, Clock, Heart } from 'lucide-react';
import type { UserContext } from '../types';

interface HeaderProps {
  context: UserContext;
  onOpenMathModal: () => void;
  onSelectPreset: (preset: UserContext) => void;
}

export const Header: React.FC<HeaderProps> = ({ context, onOpenMathModal, onSelectPreset }) => {
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeString(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const presets: { name: string; ctx: UserContext }[] = [
    {
      name: '🌧️ Midnight Rain',
      ctx: { timeOfDay: 'Night', weather: 'Raining', mood: 'Melancholic' },
    },
    {
      name: '⚡ Thunder Focus',
      ctx: { timeOfDay: 'Evening', weather: 'Thunderstorm', mood: 'Focused' },
    },
    {
      name: '☕ Morning Chill',
      ctx: { timeOfDay: 'Morning', weather: 'Sunny', mood: 'Chill' },
    },
    {
      name: '💖 Euphoria Pop',
      ctx: { timeOfDay: 'Evening', weather: 'Sunny', mood: 'Euphoric' },
    },
  ];

  return (
    <header className="w-full border-b-[3px] border-[#0a0a0a] bg-white sticky top-0 z-40 transition-colors shadow-[0_4px_0_rgba(10,10,10,0.06)]">
      <div className="max-w-6xl mx-auto px-4 py-3.5 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Brand & Neo-Brutalist Pop Logo */}
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-[#ff2a85] border-2 border-[#0a0a0a] shadow-[3px_3px_0px_#0a0a0a] flex items-center justify-center transform -rotate-2 hover:rotate-0 transition-transform">
            <Heart className="w-6 h-6 text-white fill-white animate-pulse" />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black tracking-tight text-[#0a0a0a] m-0 flex items-center gap-1.5">
                AuraVibe
                <span className="text-[#ff2a85]">✦</span>
              </h1>
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#ff2a85] text-white border-2 border-[#0a0a0a] shadow-[2px_2px_0px_#0a0a0a]">
                Y2K POP
              </span>
            </div>
            <p className="text-xs text-neutral-600 font-bold">
              Adaptive Soundscape Engine • <span className="text-[#ff2a85] font-black">{context.weather}</span> {context.timeOfDay}
            </p>
          </div>
        </div>

        {/* Quick presets & Vector Inspector */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {/* Quick Presets Pills */}
          <div className="hidden lg:flex items-center gap-1.5 p-1 rounded-xl bg-[#ffe4ef] border-2 border-[#0a0a0a] shadow-[2px_2px_0px_#0a0a0a]">
            <span className="text-[11px] font-extrabold text-[#0a0a0a] px-2 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#ff2a85]" /> Presets:
            </span>
            {presets.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => onSelectPreset(p.ctx)}
                className="px-2.5 py-1 rounded-lg text-xs font-bold text-[#0a0a0a] hover:bg-[#ff2a85] hover:text-white border border-transparent hover:border-[#0a0a0a] transition-all cursor-pointer active:scale-95"
              >
                {p.name}
              </button>
            ))}
          </div>

          {/* Inspect Vector Mathematics Button */}
          <button
            type="button"
            onClick={onOpenMathModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-extrabold bg-white hover:bg-[#ffe4ef] text-[#0a0a0a] border-2 border-[#0a0a0a] shadow-[3px_3px_0px_#0a0a0a] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#0a0a0a] transition-all cursor-pointer"
            title="Inspect computed acoustic vectors"
          >
            <Activity className="w-4 h-4 text-[#ff2a85]" />
            <span className="hidden sm:inline">Inspect Vector Math</span>
            <span className="sm:hidden">Math</span>
          </button>

          {/* Live Clock Pill */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-[#0a0a0a] shadow-[3px_3px_0px_#0a0a0a] text-xs font-black text-[#0a0a0a]">
            <Clock className="w-3.5 h-3.5 text-[#ff2a85]" />
            <span>{timeString}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
