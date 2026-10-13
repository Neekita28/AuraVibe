import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Sparkles, Activity, Info } from 'lucide-react';
import type { ScoredTrack } from '../types';
import { useAudio } from '../context/AudioContext';

interface TrackCardProps {
  track: ScoredTrack;
  rankIndex: number;
}

export const TrackCard: React.FC<TrackCardProps> = ({ track, rankIndex }) => {
  const { currentTrack, isPlaying, playTrack, togglePlay, currentTime, seek, volume, setVolume, isMuted, toggleMute } = useAudio();
  const [showDetails, setShowDetails] = useState(false);
  const [cardVolume, setCardVolume] = useState(volume);

  const isCurrent = currentTrack?.id === track.id;
  const isCurrentlyPlaying = isCurrent && isPlaying;

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handlePlayToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrent) {
      togglePlay();
    } else {
      playTrack(track);
    }
  };

  const handleMiniScrub = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSec = parseFloat(e.target.value);
    if (isCurrent) {
      seek(newSec);
    } else {
      playTrack(track);
      seek(newSec);
    }
  };

  const handleMiniVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setCardVolume(val);
    setVolume(val);
  };

  return (
    <div
      className={`bg-white rounded-2xl p-4 flex flex-col justify-between relative transition-all duration-200 border-[2.5px] border-[#0a0a0a] ${
        isCurrentlyPlaying
          ? 'bg-[#fff5f8] shadow-[6px_6px_0px_#ff2a85] translate-x-[-2px] translate-y-[-2px]'
          : 'shadow-[4px_4px_0px_#0a0a0a] hover:shadow-[7px_7px_0px_#0a0a0a] hover:translate-x-[-2px] hover:translate-y-[-2px]'
      }`}
    >
      {/* Top Bar: Rank Index & Match Badge */}
      <div className="flex items-center justify-between gap-2 mb-3 z-10">
        <div className="flex items-center gap-1.5">
          <span className="text-[11px] font-black px-2 py-0.5 rounded-md bg-[#0a0a0a] text-white border-2 border-[#0a0a0a]">
            #{rankIndex + 1}
          </span>
          <span className="text-[11px] text-[#0a0a0a] font-bold truncate max-w-[120px] bg-[#ffe4ef] px-2 py-0.5 rounded-md border border-[#0a0a0a]">
            {track.genre}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="p-1 rounded-md text-[#0a0a0a] hover:bg-[#ffe4ef] border border-transparent hover:border-[#0a0a0a] transition-colors cursor-pointer"
            title="Inspect match breakdown"
          >
            <Info className="w-3.5 h-3.5 text-[#0a0a0a]" />
          </button>

          <span className="inline-flex items-center gap-1 text-[11px] font-black px-2.5 py-0.5 rounded-full bg-[#ff2a85] text-white border-2 border-[#0a0a0a] shadow-[2px_2px_0px_#0a0a0a]">
            <Sparkles className="w-3 h-3 fill-white" />
            {track.matchScore}%
          </span>
        </div>
      </div>

      {/* Album Art & Play Overlay */}
      <div className="relative aspect-square rounded-xl overflow-hidden mb-3.5 bg-neutral-100 border-2 border-[#0a0a0a] shadow-[3px_3px_0px_#0a0a0a] group/art">
        <img
          src={track.coverArt}
          alt={track.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover/art:scale-105"
        />

        {/* Center Play/Pause button */}
        <button
          type="button"
          onClick={handlePlayToggle}
          className={`absolute inset-0 m-auto w-14 h-14 rounded-full flex items-center justify-center transition-all duration-200 border-2 border-[#0a0a0a] cursor-pointer ${
            isCurrentlyPlaying
              ? 'bg-[#ff2a85] text-white shadow-[3px_3px_0px_#0a0a0a] scale-105'
              : 'bg-white text-[#0a0a0a] hover:bg-[#ff2a85] hover:text-white shadow-[4px_4px_0px_#0a0a0a] hover:scale-110'
          }`}
          title={isCurrentlyPlaying ? 'Pause soundscape' : 'Play soundscape'}
        >
          {isCurrentlyPlaying ? (
            <Pause className="w-6 h-6 fill-current" />
          ) : (
            <Play className="w-6 h-6 fill-current translate-x-0.5" />
          )}
        </button>

        {/* Live Audio Visualizer Waveform Overlay */}
        {isCurrentlyPlaying && (
          <div className="absolute bottom-2 left-3 right-3 flex items-center justify-center gap-1.5 h-6 bg-white/95 px-2 rounded-lg border-2 border-[#0a0a0a] shadow-[2px_2px_0px_#0a0a0a] pointer-events-none">
            <span className="w-1.5 bg-[#ff2a85] rounded-full animate-bounce [animation-delay:0.1s] h-3" />
            <span className="w-1.5 bg-[#0a0a0a] rounded-full animate-bounce [animation-delay:0.3s] h-5" />
            <span className="w-1.5 bg-[#ff2a85] rounded-full animate-bounce [animation-delay:0.2s] h-4" />
            <span className="w-1.5 bg-[#0a0a0a] rounded-full animate-bounce [animation-delay:0.4s] h-5" />
            <span className="w-1.5 bg-[#ff2a85] rounded-full animate-bounce [animation-delay:0.15s] h-3.5" />
          </div>
        )}
      </div>

      {/* Track Title & Artist */}
      <div className="mb-2">
        <h3 className="font-black text-base text-[#0a0a0a] truncate tracking-tight hover:text-[#ff2a85] transition-colors">
          {track.title}
        </h3>
        <p className="text-xs text-neutral-600 font-bold truncate mt-0.5">{track.artist}</p>
      </div>

      {/* Tags & Acoustic Metadata */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {track.tags.map((tag, i) => (
          <span
            key={i}
            className="text-[10px] font-black px-2 py-0.5 rounded-md bg-[#fff0f6] text-[#0a0a0a] border border-[#0a0a0a]"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Contextual Recommendation Reason */}
      <p className="text-[11px] text-neutral-600 font-semibold italic mb-3 line-clamp-2 min-h-[32px]">
        "{track.explanation}"
      </p>

      {/* Acoustic Match Breakdown Drawer */}
      {showDetails && (
        <div className="mb-3 p-3 rounded-xl bg-[#fff0f6] border-2 border-[#0a0a0a] shadow-[2px_2px_0px_#0a0a0a] text-[10px] space-y-2 animate-in fade-in duration-150">
          <div className="flex items-center justify-between text-[#0a0a0a] font-bold">
            <span>Energy Resonance</span>
            <span className="font-black text-[#ff2a85]">{track.matchBreakdown.energyMatch}%</span>
          </div>
          <div className="w-full bg-white h-2 rounded-full border border-[#0a0a0a] overflow-hidden">
            <div
              className="bg-[#ff2a85] h-full rounded-full transition-all"
              style={{ width: `${track.matchBreakdown.energyMatch}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[#0a0a0a] font-bold">
            <span>Valence Mood</span>
            <span className="font-black text-[#0a0a0a]">{track.matchBreakdown.valenceMatch}%</span>
          </div>
          <div className="w-full bg-white h-2 rounded-full border border-[#0a0a0a] overflow-hidden">
            <div
              className="bg-[#0a0a0a] h-full rounded-full transition-all"
              style={{ width: `${track.matchBreakdown.valenceMatch}%` }}
            />
          </div>

          <div className="flex items-center justify-between text-[#0a0a0a] font-bold">
            <span>Tempo & Rhythm</span>
            <span className="font-black text-[#ff2a85]">{track.matchBreakdown.tempoMatch}%</span>
          </div>
          <div className="w-full bg-white h-2 rounded-full border border-[#0a0a0a] overflow-hidden">
            <div
              className="bg-[#ff2a85] h-full rounded-full transition-all"
              style={{ width: `${track.matchBreakdown.tempoMatch}%` }}
            />
          </div>
        </div>
      )}

      {/* Integrated Mini Audio Player Controls */}
      <div className="pt-3 border-t-2 border-[#0a0a0a] mt-auto flex flex-col gap-2">
        {/* Scrub Bar & Timers */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black text-[#0a0a0a] w-7 text-right">
            {formatTime(isCurrent ? currentTime : 0)}
          </span>

          <input
            type="range"
            min={0}
            max={track.duration}
            value={isCurrent ? currentTime : 0}
            onChange={handleMiniScrub}
            className="w-full h-2 bg-[#ffe4ef] rounded-lg appearance-none cursor-pointer accent-[#ff2a85] border border-[#0a0a0a]"
          />

          <span className="text-[10px] font-black text-neutral-500 w-7">
            {formatTime(track.duration)}
          </span>
        </div>

        {/* Mini Volume & Frequency Tag */}
        <div className="flex items-center justify-between gap-2 text-[#0a0a0a]">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={toggleMute}
              className="text-[#0a0a0a] hover:text-[#ff2a85] transition-colors cursor-pointer"
              title="Toggle mute"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5 text-[#ff2a85]" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : cardVolume}
              onChange={handleMiniVolume}
              className="w-14 h-1.5 bg-[#ffe4ef] rounded-lg appearance-none cursor-pointer accent-[#ff2a85] border border-[#0a0a0a]"
            />
          </div>

          <div className="flex items-center gap-1 text-[10px] font-black text-[#0a0a0a] bg-[#ffe4ef] px-2 py-0.5 rounded border border-[#0a0a0a]">
            <Activity className="w-3 h-3 text-[#ff2a85]" />
            <span>{track.audioFeatures.tempo} BPM</span>
          </div>
        </div>
      </div>
    </div>
  );
};
