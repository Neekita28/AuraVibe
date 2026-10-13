export type TimeOfDay = 'Morning' | 'Afternoon' | 'Evening' | 'Night';

export type WeatherCondition = 'Sunny' | 'Raining' | 'Thunderstorm' | 'Cold / Overcast';

export type Mood = 'Energetic' | 'Focused' | 'Relaxed' | 'Melancholic' | 'Euphoric' | 'Chill';

export interface UserContext {
  timeOfDay: TimeOfDay;
  weather: WeatherCondition;
  mood: Mood;
}

export interface AcousticProfile {
  valence: number;       // 0.0 - 1.0 (musical positiveness)
  energy: number;        // 0.0 - 1.0 (intensity, activity)
  acousticness: number;  // 0.0 - 1.0 (acoustic vs electronic)
  danceability: number;  // 0.0 - 1.0 (rhythm and groove)
  tempo: number;         // 60 - 165 BPM
}

export interface TrackAudioFeatures {
  valence: number;
  energy: number;
  acousticness: number;
  danceability: number;
  tempo: number;
}

export interface SynthConfig {
  rootFreq: number;       // Base frequency for generative preview (e.g. 220 for A3)
  scale: number[];        // Interval semitones [0, 3, 7, 10, etc.]
  waveType: OscillatorType;
  filterFreq: number;     // Lowpass filter cutoff
  bpm: number;
  ambientNoise?: boolean; // Lofi vinyl or rain texture
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  album: string;
  genre: string;
  duration: number; // in seconds
  coverArt: string;
  audioFeatures: TrackAudioFeatures;
  tags: string[];
  explanation?: string;
  matchScore?: number; // 0 - 100%
  audioPreviewUrl?: string;
  synthConfig: SynthConfig;
}

export interface ScoredTrack extends Track {
  matchScore: number;
  matchBreakdown: {
    energyMatch: number;
    valenceMatch: number;
    acousticMatch: number;
    tempoMatch: number;
  };
  explanation: string;
}

export interface FilterState {
  vibeShift: number; // -50 to +50 (shifts energy & tempo)
  searchQuery: string;
  selectedGenre: string;
  viewMode: 'grid' | 'carousel';
  sortBy: 'match' | 'tempo' | 'energy' | 'title';
}
