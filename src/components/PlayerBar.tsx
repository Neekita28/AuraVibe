import React, { useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,
  Repeat,
  Radio,
  Sparkles,
} from 'lucide-react';
import { useAudio } from '../context/AudioContext';
import { audioEngine } from '../services/audioService';

export const PlayerBar: React.FC = () => {
  const {
    currentTrack,
    isPlaying,
    currentTime,
    duration,
    volume,
    isMuted,
    isLooping,
    togglePlay,
    seek,
    setVolume,
    toggleMute,
    toggleLoop,
    nextTrack,
    prevTrack,
  } = useAudio();

  const visualizerCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Live real-time Web Audio API visualizer on canvas styled with Pink and Black
  useEffect(() => {
    const canvas = visualizerCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;

    const renderVisualizer = () => {
      animId = requestAnimationFrame(renderVisualizer);

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      if (!isPlaying) {
        // Idle straight baseline
        ctx.fillStyle = '#0a0a0a';
        ctx.fillRect(0, height - 2, width, 2);
        return;
      }

      const freqData = audioEngine.getFrequencyData();
      const barCount = 18;
      const barWidth = 3;
      const gap = (width - barCount * barWidth) / (barCount - 1);

      for (let i = 0; i < barCount; i++) {
        const val = freqData[i] || Math.sin(Date.now() * 0.005 + i) * 60 + 60;
        const barHeight = Math.max(3, (val / 255) * height);
        const x = i * (barWidth + gap);
        const y = height - barHeight;

        // Alternate pink and black bars
        ctx.fillStyle = i % 2 === 0 ? '#ff2a85' : '#0a0a0a';
        ctx.fillRect(x, y, barWidth, barHeight);
      }
    };

    renderVisualizer();

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isPlaying]);

  if (!currentTrack) {
    return null;
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-50 px-3 sm:px-6 py-3 bg-white border-t-[3px] border-[#0a0a0a] shadow-[0_-6px_0_rgba(10,10,10,0.06)] transition-all duration-200">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4">
        {/* Left: Track Information */}
        <div className="flex items-center gap-3.5 w-full md:w-1/4 min-w-0">
          <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border-2 border-[#0a0a0a] shadow-[2px_2px_0px_#0a0a0a]">
            <img
              src={currentTrack.coverArt}
              alt={currentTrack.title}
              className={`w-full h-full object-cover transition-transform ${
                isPlaying ? 'scale-105' : 'scale-100'
              }`}
            />
            {isPlaying && (
              <div className="absolute inset-0 bg-[#ff2a85]/30 flex items-center justify-center">
                <Radio className="w-5 h-5 text-white animate-pulse" />
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-black text-[#0a0a0a] truncate">{currentTrack.title}</h4>
              {currentTrack.matchScore && (
                <span className="hidden sm:inline-flex items-center gap-0.5 text-[9px] font-black px-1.5 py-0.2 rounded-full bg-[#ff2a85] text-white border border-[#0a0a0a]">
                  <Sparkles className="w-2.5 h-2.5" />
                  {currentTrack.matchScore}%
                </span>
              )}
            </div>
            <p className="text-xs text-neutral-600 font-bold truncate mt-0.5">{currentTrack.artist}</p>
          </div>
        </div>

        {/* Center: Controls & Progress Bar */}
        <div className="flex flex-col items-center w-full md:w-2/4 max-w-xl">
          {/* Action buttons */}
          <div className="flex items-center gap-4 mb-1">
            <button
              type="button"
              onClick={toggleLoop}
              className={`p-1.5 rounded-lg border-2 transition-all cursor-pointer ${
                isLooping
                  ? 'bg-[#ff2a85] text-white border-[#0a0a0a] shadow-[2px_2px_0px_#0a0a0a]'
                  : 'bg-white text-[#0a0a0a] border-transparent hover:border-[#0a0a0a]'
              }`}
              title={isLooping ? 'Looping enabled' : 'Loop track'}
            >
              <Repeat className="w-4 h-4 font-black" />
            </button>

            <button
              type="button"
              onClick={prevTrack}
              className="p-1.5 text-[#0a0a0a] hover:text-[#ff2a85] transition-colors cursor-pointer"
              title="Previous track"
            >
              <SkipBack className="w-5 h-5 fill-current" />
            </button>

            <button
              type="button"
              onClick={togglePlay}
              className="w-11 h-11 rounded-full bg-[#ff2a85] hover:bg-[#e0176e] text-white flex items-center justify-center border-2 border-[#0a0a0a] shadow-[3px_3px_0px_#0a0a0a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#0a0a0a] transition-all cursor-pointer"
              title={isPlaying ? 'Pause' : 'Play'}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current translate-x-0.5" />
              )}
            </button>

            <button
              type="button"
              onClick={nextTrack}
              className="p-1.5 text-[#0a0a0a] hover:text-[#ff2a85] transition-colors cursor-pointer"
              title="Next track"
            >
              <SkipForward className="w-5 h-5 fill-current" />
            </button>

            {/* Mini Visualizer Canvas */}
            <div className="hidden sm:flex items-center pl-2">
              <canvas
                ref={visualizerCanvasRef}
                width={80}
                height={20}
                className="w-20 h-5"
              />
            </div>
          </div>

          {/* Scrub Bar */}
          <div className="flex items-center gap-3 w-full">
            <span className="text-[10px] font-black text-[#0a0a0a] w-8 text-right">
              {formatTime(currentTime)}
            </span>

            <div className="relative flex-1 group py-1 flex items-center">
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={(e) => seek(parseFloat(e.target.value))}
                className="w-full h-2 bg-[#ffe4ef] rounded-lg appearance-none cursor-pointer accent-[#ff2a85] border-2 border-[#0a0a0a] z-10"
              />
              <div
                className="absolute left-0 top-1/2 -translate-y-1/2 h-2 bg-[#ff2a85] rounded-l-lg pointer-events-none"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            <span className="text-[10px] font-black text-neutral-500 w-8">
              {formatTime(duration)}
            </span>
          </div>
        </div>

        {/* Right: Volume & Sound Info */}
        <div className="hidden md:flex items-center justify-end gap-3 w-1/4">
          <span className="text-[10px] font-black text-[#0a0a0a] px-2.5 py-1 rounded-md bg-[#ffe4ef] border border-[#0a0a0a]">
            {currentTrack.audioFeatures.tempo} BPM
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleMute}
              className="text-[#0a0a0a] hover:text-[#ff2a85] transition-colors cursor-pointer"
              title="Mute / Unmute"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-[#ff2a85]" /> : <Volume2 className="w-4 h-4" />}
            </button>

            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={isMuted ? 0 : volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-20 h-2 bg-[#ffe4ef] rounded-lg appearance-none cursor-pointer accent-[#ff2a85] border border-[#0a0a0a]"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};
