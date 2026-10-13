import React from 'react';
import {
  Sunrise,
  Sun,
  Sunset,
  Moon,
  SunMedium,
  CloudRain,
  CloudLightning,
  CloudFog,
  Zap,
  Target,
  Waves,
  Heart,
  Sparkles,
  Headphones,
  Wand2,
  Clock,
  Compass,
} from 'lucide-react';
import type { TimeOfDay, WeatherCondition, Mood, UserContext } from '../types';

interface ContextSelectorProps {
  context: UserContext;
  onContextChange: (newContext: UserContext) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const ContextSelector: React.FC<ContextSelectorProps> = ({
  context,
  onContextChange,
  onGenerate,
  isGenerating,
}) => {
  const times: { id: TimeOfDay; label: string; period: string; icon: React.ReactNode }[] = [
    { id: 'Morning', label: 'Morning', period: '06:00 - 12:00', icon: <Sunrise className="w-5 h-5" /> },
    { id: 'Afternoon', label: 'Afternoon', period: '12:00 - 17:00', icon: <Sun className="w-5 h-5" /> },
    { id: 'Evening', label: 'Evening', period: '17:00 - 21:00', icon: <Sunset className="w-5 h-5" /> },
    { id: 'Night', label: 'Night', period: '21:00 - 06:00', icon: <Moon className="w-5 h-5" /> },
  ];

  const weathers: { id: WeatherCondition; label: string; desc: string; icon: React.ReactNode }[] = [
    { id: 'Sunny', label: 'Sunny', desc: 'Crisp & Warm', icon: <SunMedium className="w-5 h-5" /> },
    { id: 'Raining', label: 'Raining', desc: 'Gentle Drizzle', icon: <CloudRain className="w-5 h-5" /> },
    { id: 'Thunderstorm', label: 'Thunderstorm', desc: 'Electric & Surge', icon: <CloudLightning className="w-5 h-5" /> },
    { id: 'Cold / Overcast', label: 'Cold / Overcast', desc: 'Misty & Chilled', icon: <CloudFog className="w-5 h-5" /> },
  ];

  const moods: { id: Mood; label: string; vibe: string; icon: React.ReactNode }[] = [
    { id: 'Energetic', label: 'Energetic', vibe: 'High Voltage', icon: <Zap className="w-5 h-5" /> },
    { id: 'Focused', label: 'Focused', vibe: 'Deep Flow', icon: <Target className="w-5 h-5" /> },
    { id: 'Relaxed', label: 'Relaxed', vibe: 'Slow Breaths', icon: <Waves className="w-5 h-5" /> },
    { id: 'Melancholic', label: 'Melancholic', vibe: 'Poetic Solitude', icon: <Heart className="w-5 h-5" /> },
    { id: 'Euphoric', label: 'Euphoric', vibe: 'Pure Ecstasy', icon: <Sparkles className="w-5 h-5" /> },
    { id: 'Chill', label: 'Chill', vibe: 'Laidback Sway', icon: <Headphones className="w-5 h-5" /> },
  ];

  const handleAutoDetect = () => {
    const currentHour = new Date().getHours();
    let detectedTime: TimeOfDay = 'Afternoon';
    if (currentHour >= 5 && currentHour < 12) detectedTime = 'Morning';
    else if (currentHour >= 12 && currentHour < 17) detectedTime = 'Afternoon';
    else if (currentHour >= 17 && currentHour < 22) detectedTime = 'Evening';
    else detectedTime = 'Night';

    onContextChange({
      ...context,
      timeOfDay: detectedTime,
    });
  };

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-6">
      {/* Container Neo-Brutalist card */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border-[3px] border-[#0a0a0a] shadow-[7px_7px_0px_#0a0a0a] relative overflow-hidden transition-all duration-300">
        
        {/* Playful background decorative sticker */}
        <div className="absolute top-4 right-4 pointer-events-none select-none text-2xl font-black text-[#ffe4ef] opacity-80 hidden sm:block">
          ✦ ✦ ✦
        </div>

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b-[2.5px] border-[#0a0a0a]">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black bg-[#ff2a85] text-white border-2 border-[#0a0a0a] shadow-[2px_2px_0px_#0a0a0a]">
                <Compass className="w-3.5 h-3.5" /> Acoustic Vectors
              </span>
              <span className="text-xs font-black text-[#0a0a0a] px-2 py-0.5 rounded-full bg-[#ffe4ef] border-2 border-[#0a0a0a]">
                Step 1: Set Your Vibe
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-[#0a0a0a]">
              Synthesize Your Atmosphere
            </h2>
            <p className="text-sm font-semibold text-neutral-600 mt-1">
              Select your environmental vectors to compute music tailored precisely to your moment.
            </p>
          </div>

          <button
            onClick={handleAutoDetect}
            type="button"
            className="flex items-center self-start sm:self-center gap-2 px-4 py-2.5 rounded-xl text-xs font-extrabold text-[#0a0a0a] bg-white hover:bg-[#ffe4ef] border-2 border-[#0a0a0a] shadow-[3px_3px_0px_#0a0a0a] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#0a0a0a] transition-all cursor-pointer"
            title="Auto-detect current local time"
          >
            <Clock className="w-3.5 h-3.5 text-[#ff2a85]" />
            <span>Sync Local Time</span>
          </button>
        </div>

        {/* Inputs Grid */}
        <div className="space-y-7">
          {/* 1. Time of Day */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-black uppercase tracking-wider text-[#0a0a0a] flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff2a85] border-2 border-black" />
                1. Time of Day
              </label>
              <span className="text-xs font-bold text-[#0a0a0a] bg-[#ffe4ef] px-2 py-0.5 rounded-md border border-[#0a0a0a]">
                Selected: <strong className="text-[#ff2a85] font-black">{context.timeOfDay}</strong>
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {times.map((t) => {
                const isActive = context.timeOfDay === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => onContextChange({ ...context, timeOfDay: t.id })}
                    className={`relative text-left p-4 rounded-2xl transition-all duration-150 cursor-pointer overflow-hidden border-[2.5px] border-[#0a0a0a] ${
                      isActive
                        ? 'bg-[#ff2a85] text-white shadow-[4px_4px_0px_#0a0a0a] translate-x-[-1px] translate-y-[-1px]'
                        : 'bg-white hover:bg-[#fff5f8] text-[#0a0a0a] shadow-[3px_3px_0px_#0a0a0a] hover:shadow-[5px_5px_0px_#0a0a0a] hover:translate-x-[-1px] hover:translate-y-[-1px]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className={`p-2 rounded-xl border-2 border-[#0a0a0a] transition-colors ${
                          isActive
                            ? 'bg-white text-[#ff2a85] shadow-[2px_2px_0px_#0a0a0a]'
                            : 'bg-[#ffe4ef] text-[#0a0a0a]'
                        }`}
                      >
                        {t.icon}
                      </div>
                      <span className={`text-[10px] font-black tracking-tight ${isActive ? 'text-white/90' : 'text-neutral-500'}`}>
                        {t.period}
                      </span>
                    </div>
                    <div className="font-black text-base tracking-tight">{t.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Weather Condition */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-black uppercase tracking-wider text-[#0a0a0a] flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff2a85] border-2 border-black" />
                2. Weather Condition
              </label>
              <span className="text-xs font-bold text-[#0a0a0a] bg-[#ffe4ef] px-2 py-0.5 rounded-md border border-[#0a0a0a]">
                Selected: <strong className="text-[#ff2a85] font-black">{context.weather}</strong>
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {weathers.map((w) => {
                const isActive = context.weather === w.id;
                return (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => onContextChange({ ...context, weather: w.id })}
                    className={`relative text-left p-4 rounded-2xl transition-all duration-150 cursor-pointer overflow-hidden border-[2.5px] border-[#0a0a0a] ${
                      isActive
                        ? 'bg-[#ff2a85] text-white shadow-[4px_4px_0px_#0a0a0a] translate-x-[-1px] translate-y-[-1px]'
                        : 'bg-white hover:bg-[#fff5f8] text-[#0a0a0a] shadow-[3px_3px_0px_#0a0a0a] hover:shadow-[5px_5px_0px_#0a0a0a] hover:translate-x-[-1px] hover:translate-y-[-1px]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className={`p-2 rounded-xl border-2 border-[#0a0a0a] transition-colors ${
                          isActive
                            ? 'bg-white text-[#ff2a85] shadow-[2px_2px_0px_#0a0a0a]'
                            : 'bg-[#ffe4ef] text-[#0a0a0a]'
                        }`}
                      >
                        {w.icon}
                      </div>
                    </div>
                    <div className="font-black text-base tracking-tight">{w.label}</div>
                    <div className={`text-xs font-bold mt-0.5 ${isActive ? 'text-white/90' : 'text-neutral-500'}`}>{w.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3. Current Mood */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-black uppercase tracking-wider text-[#0a0a0a] flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff2a85] border-2 border-black" />
                3. Current Mood
              </label>
              <span className="text-xs font-bold text-[#0a0a0a] bg-[#ffe4ef] px-2 py-0.5 rounded-md border border-[#0a0a0a]">
                Selected: <strong className="text-[#ff2a85] font-black">{context.mood}</strong>
              </span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
              {moods.map((m) => {
                const isActive = context.mood === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => onContextChange({ ...context, mood: m.id })}
                    className={`relative text-left p-3.5 rounded-2xl transition-all duration-150 cursor-pointer overflow-hidden border-[2.5px] border-[#0a0a0a] ${
                      isActive
                        ? 'bg-[#ff2a85] text-white shadow-[4px_4px_0px_#0a0a0a] translate-x-[-1px] translate-y-[-1px]'
                        : 'bg-white hover:bg-[#fff5f8] text-[#0a0a0a] shadow-[3px_3px_0px_#0a0a0a] hover:shadow-[5px_5px_0px_#0a0a0a] hover:translate-x-[-1px] hover:translate-y-[-1px]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div
                        className={`p-1.5 rounded-xl border-2 border-[#0a0a0a] transition-colors ${
                          isActive
                            ? 'bg-white text-[#ff2a85] shadow-[2px_2px_0px_#0a0a0a]'
                            : 'bg-[#ffe4ef] text-[#0a0a0a]'
                        }`}
                      >
                        {m.icon}
                      </div>
                    </div>
                    <div className="font-black text-sm tracking-tight">{m.label}</div>
                    <div className={`text-[10px] font-bold mt-0.5 truncate ${isActive ? 'text-white/90' : 'text-neutral-500'}`}>{m.vibe}</div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Generate Soundscape Action Button */}
        <div className="mt-8 pt-6 border-t-[2.5px] border-[#0a0a0a] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-black text-[#0a0a0a] bg-[#ffe4ef] px-3.5 py-2 rounded-xl border-2 border-[#0a0a0a] shadow-[2px_2px_0px_#0a0a0a]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff2a85] animate-ping" />
            Active Vector: <span className="text-[#ff2a85]">{context.timeOfDay}</span> •{' '}
            <span className="text-[#ff2a85]">{context.weather}</span> •{' '}
            <span className="text-[#ff2a85]">{context.mood}</span>
          </div>

          <button
            onClick={onGenerate}
            disabled={isGenerating}
            type="button"
            className="w-full sm:w-auto px-8 py-3.5 rounded-2xl font-black text-sm tracking-wider text-white bg-[#ff2a85] hover:bg-[#e0176e] border-[3px] border-[#0a0a0a] shadow-[5px_5px_0px_#0a0a0a] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[7px_7px_0px_#0a0a0a] active:translate-x-[3px] active:translate-y-[3px] active:shadow-[2px_2px_0px_#0a0a0a] transition-all cursor-pointer flex items-center justify-center gap-3 disabled:opacity-50"
          >
            <Wand2 className={`w-5 h-5 ${isGenerating ? 'animate-spin' : 'animate-bounce'}`} />
            <span>{isGenerating ? 'Synthesizing...' : '✦ Generate Soundscape ✦'}</span>
          </button>
        </div>
      </div>
    </section>
  );
};
