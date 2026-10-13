import React, { useState, useMemo, useEffect, useCallback, useRef } from 'react';
import confetti from 'canvas-confetti';
import type { UserContext, FilterState, TimeOfDay, WeatherCondition, Mood } from './types';
import { TRACKS_DATASET } from './data/tracks';
import { recommendTracks } from './engine/recommendationEngine';
import { AudioProvider, useAudio } from './context/AudioContext';
import { DynamicBackground } from './components/DynamicBackground';
import { Header } from './components/Header';
import { ContextSelector } from './components/ContextSelector';
import { RecommendationFeed } from './components/RecommendationFeed';
import { PlayerBar } from './components/PlayerBar';
import { AcousticProfileModal } from './components/AcousticProfileModal';

const AppContent: React.FC = () => {
  const { playTrack, isPlaying, setPlaylist } = useAudio();

  // Initial context based on current time
  const getInitialTimeOfDay = (): TimeOfDay => {
    const hr = new Date().getHours();
    if (hr >= 5 && hr < 12) return 'Morning';
    if (hr >= 12 && hr < 17) return 'Afternoon';
    if (hr >= 17 && hr < 22) return 'Evening';
    return 'Night';
  };

  const [context, setContext] = useState<UserContext>({
    timeOfDay: getInitialTimeOfDay(),
    weather: 'Sunny',
    mood: 'Energetic',
  });

  const [filterState, setFilterState] = useState<FilterState>({
    vibeShift: 0,
    searchQuery: '',
    selectedGenre: 'All',
    viewMode: 'grid',
    sortBy: 'match',
  });

  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isMathModalOpen, setIsMathModalOpen] = useState<boolean>(false);

  const feedRef = useRef<HTMLDivElement | null>(null);

  // Compute recommendations
  const { targetProfile, scoredTracks } = useMemo(() => {
    return recommendTracks(TRACKS_DATASET, context, filterState.vibeShift);
  }, [context, filterState.vibeShift]);

  // Keep playlist queue updated for next/previous navigation
  useEffect(() => {
    setPlaylist(scoredTracks);
  }, [scoredTracks, setPlaylist]);

  // Handle explicit "Generate Soundscape" action
  const handleGenerateSoundscape = useCallback(() => {
    setIsGenerating(true);

    confetti({
      particleCount: 65,
      spread: 70,
      origin: { y: 0.65 },
      colors: ['#ff2a85', '#ff69b4', '#0a0a0a', '#ffd1dc'],
    });

    setTimeout(() => {
      setIsGenerating(false);
      // Auto-preview top match if not already playing
      if (scoredTracks.length > 0 && !isPlaying) {
        playTrack(scoredTracks[0]);
      }
      feedRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 600);
  }, [scoredTracks, isPlaying, playTrack]);

  // Surprise Me novelty button
  const handleSurpriseMe = useCallback(() => {
    const times: TimeOfDay[] = ['Morning', 'Afternoon', 'Evening', 'Night'];
    const weathers: WeatherCondition[] = ['Sunny', 'Raining', 'Thunderstorm', 'Cold / Overcast'];
    const moods: Mood[] = ['Energetic', 'Focused', 'Relaxed', 'Melancholic', 'Euphoric', 'Chill'];

    const randomTime = times[Math.floor(Math.random() * times.length)];
    const randomWeather = weathers[Math.floor(Math.random() * weathers.length)];
    const randomMood = moods[Math.floor(Math.random() * moods.length)];

    const newContext: UserContext = {
      timeOfDay: randomTime,
      weather: randomWeather,
      mood: randomMood,
    };

    setContext(newContext);

    // Calculate new recommendations immediately and preview top song
    const result = recommendTracks(TRACKS_DATASET, newContext, 0);
    if (result.scoredTracks.length > 0) {
      playTrack(result.scoredTracks[0]);
    }
  }, [playTrack]);

  return (
    <div className="relative min-h-screen text-[#0a0a0a] flex flex-col font-sans selection:bg-[#ff2a85] selection:text-white">
      {/* Ambient reactive background */}
      <DynamicBackground context={context} isPlaying={isPlaying} />

      {/* Top Navigation & Live Branding */}
      <Header
        context={context}
        onOpenMathModal={() => setIsMathModalOpen(true)}
        onSelectPreset={(preset) => {
          setContext(preset);
          const res = recommendTracks(TRACKS_DATASET, preset, 0);
          if (res.scoredTracks.length > 0) {
            playTrack(res.scoredTracks[0]);
          }
        }}
      />

      {/* Main Interactive Workstation */}
      <main className="flex-1 w-full pb-32">
        {/* Step 1: Context Input Vector Selector */}
        <ContextSelector
          context={context}
          onContextChange={setContext}
          onGenerate={handleGenerateSoundscape}
          isGenerating={isGenerating}
        />

        {/* Step 2: Recommendations Feed */}
        <div ref={feedRef}>
          <RecommendationFeed
            tracks={scoredTracks}
            filterState={filterState}
            onFilterChange={setFilterState}
            onSurpriseMe={handleSurpriseMe}
          />
        </div>
      </main>

      {/* Sticky Bottom Persistent Audio Player */}
      <PlayerBar />

      {/* Acoustic Profile Math Inspection Modal */}
      <AcousticProfileModal
        isOpen={isMathModalOpen}
        onClose={() => setIsMathModalOpen(false)}
        targetProfile={targetProfile}
        context={context}
      />
    </div>
  );
};

export default function App() {
  return (
    <AudioProvider>
      <AppContent />
    </AudioProvider>
  );
}
