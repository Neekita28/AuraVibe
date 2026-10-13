import React, { useRef } from 'react';
import {
  Sliders,
  Dices,
  Search,
  Grid3X3,
  Columns3,
  ChevronLeft,
  ChevronRight,
  Flame,
  Gauge,
  Music,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import type { ScoredTrack, FilterState } from '../types';
import { TrackCard } from './TrackCard';

interface RecommendationFeedProps {
  tracks: ScoredTrack[];
  filterState: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onSurpriseMe: () => void;
}

export const RecommendationFeed: React.FC<RecommendationFeedProps> = ({
  tracks,
  filterState,
  onFilterChange,
  onSurpriseMe,
}) => {
  const carouselContainerRef = useRef<HTMLDivElement | null>(null);

  const genres = ['All', 'Lofi Chillhop', 'Deep House', 'Synthwave', 'Ambient Neo-Classical', 'Indie Folk', 'Melodic Techno', 'Dream Pop / Indie'];

  const handleSurpriseClick = () => {
    confetti({
      particleCount: 70,
      spread: 75,
      origin: { y: 0.7 },
      colors: ['#ff2a85', '#ff69b4', '#0a0a0a', '#ffd1dc'],
    });
    onSurpriseMe();
  };

  const handleScrollCarousel = (direction: 'left' | 'right') => {
    if (carouselContainerRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      carouselContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  // Filter & Search application
  const filteredTracks = tracks.filter((track) => {
    const matchesSearch =
      track.title.toLowerCase().includes(filterState.searchQuery.toLowerCase()) ||
      track.artist.toLowerCase().includes(filterState.searchQuery.toLowerCase()) ||
      track.tags.some((t) => t.toLowerCase().includes(filterState.searchQuery.toLowerCase()));

    const matchesGenre =
      filterState.selectedGenre === 'All' || track.genre === filterState.selectedGenre;

    return matchesSearch && matchesGenre;
  });

  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-8 pb-36">
      {/* Header & Quick Action Controls Panel */}
      <div className="bg-white rounded-3xl p-6 mb-8 border-[3px] border-[#0a0a0a] shadow-[7px_7px_0px_#0a0a0a]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="w-3 h-3 rounded-full bg-[#ff2a85] border-2 border-black animate-ping" />
              <h2 className="text-xl sm:text-2xl font-black text-[#0a0a0a] tracking-tight">
                Recommended Soundscape Feed ✦
              </h2>
            </div>
            <p className="text-xs sm:text-sm font-bold text-neutral-600">
              Ranked dynamically by weighted cosine acoustic proximity ({filteredTracks.length} tracks matched)
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Surprise Me Novelty Button */}
            <button
              type="button"
              onClick={handleSurpriseClick}
              className="px-5 py-2.5 rounded-xl font-black text-xs text-white bg-[#ff2a85] hover:bg-[#e0176e] border-[2.5px] border-[#0a0a0a] shadow-[4px_4px_0px_#0a0a0a] hover:translate-x-[-1px] hover:translate-y-[-1px] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_#0a0a0a] transition-all cursor-pointer flex items-center gap-2"
            >
              <Dices className="w-4 h-4 animate-spin-slow" />
              <span>Surprise Me ✦</span>
            </button>

            {/* View Mode Toggle */}
            <div className="flex items-center p-1 rounded-xl bg-[#ffe4ef] border-2 border-[#0a0a0a] shadow-[2px_2px_0px_#0a0a0a]">
              <button
                type="button"
                onClick={() => onFilterChange({ ...filterState, viewMode: 'grid' })}
                className={`p-1.5 rounded-lg font-bold transition-all cursor-pointer border ${
                  filterState.viewMode === 'grid'
                    ? 'bg-[#0a0a0a] text-white border-[#0a0a0a] shadow-[2px_2px_0px_#ff2a85]'
                    : 'text-[#0a0a0a] border-transparent hover:bg-white'
                }`}
                title="Grid view"
              >
                <Grid3X3 className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => onFilterChange({ ...filterState, viewMode: 'carousel' })}
                className={`p-1.5 rounded-lg font-bold transition-all cursor-pointer border ${
                  filterState.viewMode === 'carousel'
                    ? 'bg-[#0a0a0a] text-white border-[#0a0a0a] shadow-[2px_2px_0px_#ff2a85]'
                    : 'text-[#0a0a0a] border-transparent hover:bg-white'
                }`}
                title="Interactive carousel view"
              >
                <Columns3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Vibe Shift Slider & Search Bar Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 pt-4 border-t-2 border-[#0a0a0a] items-center">
          {/* Vibe Shift Intensity Slider */}
          <div className="md:col-span-6 p-4 rounded-2xl bg-[#fff0f6] border-2 border-[#0a0a0a] shadow-[3px_3px_0px_#0a0a0a]">
            <div className="flex items-center justify-between text-xs mb-2 font-black">
              <span className="text-[#0a0a0a] flex items-center gap-1.5">
                <Flame className="w-4 h-4 text-[#ff2a85] fill-[#ff2a85]" />
                Vibe Shift: Energy Intensity
              </span>
              <span className="text-[#ff2a85] bg-white px-2 py-0.5 rounded-md border border-[#0a0a0a]">
                {filterState.vibeShift > 0
                  ? `+${filterState.vibeShift}% High-Octane`
                  : filterState.vibeShift < 0
                  ? `${filterState.vibeShift}% Chill Down`
                  : 'Balanced (0%)'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[11px] font-black text-neutral-600">Calm</span>
              <input
                type="range"
                min={-50}
                max={50}
                step={5}
                value={filterState.vibeShift}
                onChange={(e) =>
                  onFilterChange({ ...filterState, vibeShift: parseInt(e.target.value, 10) })
                }
                className="w-full h-3 bg-white rounded-lg appearance-none cursor-pointer accent-[#ff2a85] border-2 border-[#0a0a0a]"
              />
              <span className="text-[11px] font-black text-[#ff2a85]">Kinetic</span>
            </div>
          </div>

          {/* Search Query Input */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-neutral-600 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by track title, artist, or tags..."
              value={filterState.searchQuery}
              onChange={(e) => onFilterChange({ ...filterState, searchQuery: e.target.value })}
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border-2 border-[#0a0a0a] shadow-[3px_3px_0px_#0a0a0a] focus:shadow-[5px_5px_0px_#ff2a85] focus:outline-none text-sm font-bold text-[#0a0a0a] placeholder-neutral-400 transition-all"
            />
          </div>
        </div>

        {/* Genre Filter Pills */}
        <div className="flex items-center gap-2 mt-4 pt-4 border-t-2 border-[#0a0a0a] overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-black text-[#0a0a0a] whitespace-nowrap mr-1 flex items-center gap-1">
            <Sliders className="w-3 h-3 text-[#ff2a85]" /> Genres:
          </span>
          {genres.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => onFilterChange({ ...filterState, selectedGenre: g })}
              className={`px-3 py-1.5 rounded-xl text-xs font-black whitespace-nowrap transition-all cursor-pointer border-2 border-[#0a0a0a] ${
                filterState.selectedGenre === g
                  ? 'bg-[#ff2a85] text-white shadow-[3px_3px_0px_#0a0a0a] translate-x-[-1px] translate-y-[-1px]'
                  : 'bg-white text-[#0a0a0a] hover:bg-[#ffe4ef] shadow-[2px_2px_0px_#0a0a0a]'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      {/* Main Track Display: Grid or Carousel */}
      {filteredTracks.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border-[3px] border-[#0a0a0a] shadow-[6px_6px_0px_#0a0a0a]">
          <Music className="w-12 h-12 text-[#ff2a85] mx-auto mb-3 animate-bounce" />
          <h3 className="text-lg font-black text-[#0a0a0a] mb-1">No tracks found in this frequency</h3>
          <p className="text-xs font-bold text-neutral-600 max-w-sm mx-auto">
            Try resetting your search query or adjusting your Vibe Shift intensity.
          </p>
          <button
            type="button"
            onClick={() => onFilterChange({ ...filterState, searchQuery: '', selectedGenre: 'All', vibeShift: 0 })}
            className="mt-4 px-5 py-2.5 rounded-xl text-xs font-black bg-[#ff2a85] hover:bg-[#e0176e] text-white border-2 border-[#0a0a0a] shadow-[3px_3px_0px_#0a0a0a] transition-all cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      ) : filterState.viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredTracks.map((track, index) => (
            <TrackCard key={track.id} track={track} rankIndex={index} />
          ))}
        </div>
      ) : (
        /* Interactive Carousel View */
        <div className="relative group/carousel">
          {/* Navigation Controls */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-black text-[#0a0a0a] flex items-center gap-1.5 bg-[#ffe4ef] px-3 py-1 rounded-lg border border-[#0a0a0a]">
              <Gauge className="w-3.5 h-3.5 text-[#ff2a85]" />
              Scroll or swipe horizontally to navigate
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleScrollCarousel('left')}
                className="p-2 rounded-xl bg-white text-[#0a0a0a] hover:bg-[#ffe4ef] border-2 border-[#0a0a0a] shadow-[3px_3px_0px_#0a0a0a] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#0a0a0a] transition-all cursor-pointer"
                title="Previous slide"
              >
                <ChevronLeft className="w-4 h-4 font-black" />
              </button>
              <button
                type="button"
                onClick={() => handleScrollCarousel('right')}
                className="p-2 rounded-xl bg-white text-[#0a0a0a] hover:bg-[#ffe4ef] border-2 border-[#0a0a0a] shadow-[3px_3px_0px_#0a0a0a] active:translate-x-[1px] active:translate-y-[1px] active:shadow-[1px_1px_0px_#0a0a0a] transition-all cursor-pointer"
                title="Next slide"
              >
                <ChevronRight className="w-4 h-4 font-black" />
              </button>
            </div>
          </div>

          <div
            ref={carouselContainerRef}
            className="flex gap-5 overflow-x-auto pb-6 pt-2 snap-x snap-mandatory scroll-smooth"
          >
            {filteredTracks.map((track, index) => (
              <div key={track.id} className="min-w-[280px] sm:min-w-[320px] max-w-[320px] snap-center shrink-0">
                <TrackCard track={track} rankIndex={index} />
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};
