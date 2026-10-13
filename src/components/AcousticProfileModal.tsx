import React from 'react';
import { X, Activity, Zap, Heart, Disc, Sliders, Sparkles } from 'lucide-react';
import type { AcousticProfile, UserContext } from '../types';

interface AcousticProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetProfile: AcousticProfile;
  context: UserContext;
}

export const AcousticProfileModal: React.FC<AcousticProfileModalProps> = ({
  isOpen,
  onClose,
  targetProfile,
  context,
}) => {
  if (!isOpen) return null;

  const metrics = [
    {
      name: 'Target Valence (Positiveness)',
      value: targetProfile.valence,
      percentage: Math.round(targetProfile.valence * 100),
      desc: 'Musical cheerfulness and harmonic warmth vs melancholy.',
      color: 'bg-[#ff2a85]',
      icon: <Heart className="w-4 h-4 text-[#ff2a85] fill-[#ff2a85]" />,
    },
    {
      name: 'Target Energy (Intensity)',
      value: targetProfile.energy,
      percentage: Math.round(targetProfile.energy * 100),
      desc: 'Dynamic perception of loudness, attack, and velocity.',
      color: 'bg-[#0a0a0a]',
      icon: <Zap className="w-4 h-4 text-[#0a0a0a] fill-[#0a0a0a]" />,
    },
    {
      name: 'Acousticness (Organic Weight)',
      value: targetProfile.acousticness,
      percentage: Math.round(targetProfile.acousticness * 100),
      desc: 'Presence of acoustic instruments (piano, strings, guitar) vs synths.',
      color: 'bg-[#ff2a85]',
      icon: <Sliders className="w-4 h-4 text-[#ff2a85]" />,
    },
    {
      name: 'Rhythm & Danceability',
      value: targetProfile.danceability,
      percentage: Math.round(targetProfile.danceability * 100),
      desc: 'Metric regularity, tempo stability, and groove strength.',
      color: 'bg-[#0a0a0a]',
      icon: <Disc className="w-4 h-4 text-[#0a0a0a]" />,
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 relative border-[3px] border-[#0a0a0a] shadow-[8px_8px_0px_#0a0a0a] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-[#0a0a0a] mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#ff2a85] text-white border-2 border-[#0a0a0a] shadow-[2px_2px_0px_#0a0a0a]">
              <Activity className="w-5 h-5 font-black" />
            </div>
            <div>
              <h3 className="font-black text-xl text-[#0a0a0a]">Acoustic Vector Mathematics ✦</h3>
              <p className="text-xs font-bold text-neutral-600">Deterministic target profile computed from active vectors</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-xl bg-white hover:bg-[#ffe4ef] text-[#0a0a0a] border-2 border-[#0a0a0a] shadow-[2px_2px_0px_#0a0a0a] active:translate-x-[1px] active:translate-y-[1px] transition-all cursor-pointer"
          >
            <X className="w-5 h-5 font-black" />
          </button>
        </div>

        {/* Current Vector Summary */}
        <div className="p-4 rounded-2xl bg-[#fff0f6] border-2 border-[#0a0a0a] shadow-[3px_3px_0px_#0a0a0a] mb-6 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="font-extrabold text-[#0a0a0a]">
            Active Context: <strong className="text-[#ff2a85] font-black">{context.timeOfDay}</strong> •{' '}
            <strong className="text-[#ff2a85] font-black">{context.weather}</strong> •{' '}
            <strong className="text-[#ff2a85] font-black">{context.mood}</strong>
          </div>
          <div className="font-black text-[#0a0a0a] bg-white px-3 py-1 rounded-lg border border-[#0a0a0a] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#ff2a85]" /> Target: {targetProfile.tempo} BPM
          </div>
        </div>

        {/* Metric Sliders & Weights */}
        <div className="space-y-4 mb-6">
          {metrics.map((m) => (
            <div key={m.name} className="p-3.5 rounded-xl bg-white border-2 border-[#0a0a0a] shadow-[2px_2px_0px_#0a0a0a]">
              <div className="flex items-center justify-between mb-1.5 font-black">
                <span className="text-xs text-[#0a0a0a] flex items-center gap-2">
                  {m.icon}
                  {m.name}
                </span>
                <span className="text-xs font-black text-[#ff2a85]">{m.percentage}%</span>
              </div>

              <div className="w-full bg-[#ffe4ef] h-3 rounded-full border border-[#0a0a0a] overflow-hidden mb-1.5">
                <div
                  className={`h-full ${m.color} rounded-full transition-all duration-300`}
                  style={{ width: `${m.percentage}%` }}
                />
              </div>

              <p className="text-[11px] font-bold text-neutral-600">{m.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-3.5 rounded-xl bg-[#ffe4ef] border-2 border-[#0a0a0a] text-xs font-bold text-[#0a0a0a]">
          <strong>✦ Metric Formula:</strong> Multidimensional weighted Euclidean similarity compares tracks across Valence, Energy, Tempo, and Acousticness vectors.
        </div>
      </div>
    </div>
  );
};
