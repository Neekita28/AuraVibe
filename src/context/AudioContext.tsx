import React, { createContext, useContext, useState, useEffect, useRef, useCallback } from 'react';
import type { Track } from '../types';
import { audioEngine } from '../services/audioService';

interface AudioContextType {
  currentTrack: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  isLooping: boolean;
  playlist: Track[];
  playTrack: (track: Track) => void;
  togglePlay: () => void;
  pauseTrack: () => void;
  seek: (seconds: number) => void;
  setVolume: (volume: number) => void;
  toggleMute: () => void;
  toggleLoop: () => void;
  nextTrack: () => void;
  prevTrack: () => void;
  setPlaylist: (tracks: Track[]) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolumeState] = useState<number>(0.75);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLooping, setIsLooping] = useState<boolean>(false);
  const [playlist, setPlaylist] = useState<Track[]>([]);

  const progressIntervalRef = useRef<number | null>(null);

  const duration = currentTrack ? currentTrack.duration : 180;

  // Sync volume with audio engine
  const handleSetVolume = useCallback((newVol: number) => {
    setVolumeState(newVol);
    if (newVol > 0 && isMuted) {
      setIsMuted(false);
    }
    audioEngine.setVolume(isMuted ? 0 : newVol);
  }, [isMuted]);

  const toggleMute = useCallback(() => {
    if (isMuted) {
      setIsMuted(false);
      audioEngine.setVolume(volume);
    } else {
      setIsMuted(true);
      audioEngine.setVolume(0);
    }
  }, [isMuted, volume]);

  const toggleLoop = useCallback(() => {
    setIsLooping((prev) => !prev);
  }, []);

  const playTrack = useCallback((track: Track) => {
    setCurrentTrack(track);
    setCurrentTime(0);
    setIsPlaying(true);
    audioEngine.playTrack(track);
  }, []);

  const pauseTrack = useCallback(() => {
    setIsPlaying(false);
    audioEngine.pause();
  }, []);

  const togglePlay = useCallback(() => {
    if (!currentTrack) {
      if (playlist.length > 0) {
        playTrack(playlist[0]);
      }
      return;
    }

    if (isPlaying) {
      pauseTrack();
    } else {
      setIsPlaying(true);
      audioEngine.resume();
    }
  }, [currentTrack, isPlaying, pauseTrack, playTrack, playlist]);

  const nextTrack = useCallback(() => {
    if (!currentTrack || playlist.length === 0) return;
    const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % playlist.length;
    playTrack(playlist[nextIndex]);
  }, [currentTrack, playlist, playTrack]);

  const prevTrack = useCallback(() => {
    if (!currentTrack || playlist.length === 0) return;
    const currentIndex = playlist.findIndex((t) => t.id === currentTrack.id);
    const prevIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    playTrack(playlist[prevIndex]);
  }, [currentTrack, playlist, playTrack]);

  const seek = useCallback((seconds: number) => {
    setCurrentTime(Math.max(0, Math.min(seconds, duration)));
  }, [duration]);

  // Handle playback timer simulation
  useEffect(() => {
    if (isPlaying && currentTrack) {
      progressIntervalRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= duration) {
            if (isLooping) {
              return 0;
            } else {
              nextTrack();
              return 0;
            }
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (progressIntervalRef.current !== null) {
        clearInterval(progressIntervalRef.current);
        progressIntervalRef.current = null;
      }
    }

    return () => {
      if (progressIntervalRef.current !== null) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isPlaying, currentTrack, duration, isLooping, nextTrack]);

  return (
    <AudioContext.Provider
      value={{
        currentTrack,
        isPlaying,
        currentTime,
        duration,
        volume,
        isMuted,
        isLooping,
        playlist,
        playTrack,
        togglePlay,
        pauseTrack,
        seek,
        setVolume: handleSetVolume,
        toggleMute,
        toggleLoop,
        nextTrack,
        prevTrack,
        setPlaylist,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
