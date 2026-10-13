import type { UserContext, AcousticProfile, Track, ScoredTrack, TimeOfDay, WeatherCondition, Mood } from '../types';

/**
 * Acoustic profile contributions for Time of Day
 */
const TIME_VECTORS: Record<TimeOfDay, Partial<AcousticProfile>> = {
  Morning: {
    valence: 0.65,
    energy: 0.52,
    acousticness: 0.65,
    danceability: 0.45,
    tempo: 96,
  },
  Afternoon: {
    valence: 0.72,
    energy: 0.78,
    acousticness: 0.25,
    danceability: 0.70,
    tempo: 122,
  },
  Evening: {
    valence: 0.56,
    energy: 0.50,
    acousticness: 0.50,
    danceability: 0.60,
    tempo: 105,
  },
  Night: {
    valence: 0.38,
    energy: 0.32,
    acousticness: 0.72,
    danceability: 0.40,
    tempo: 78,
  },
};

/**
 * Acoustic profile adjustments for Weather Condition
 */
const WEATHER_VECTORS: Record<WeatherCondition, { valence: number; energy: number; acousticness: number; tempo: number }> = {
  Sunny: {
    valence: 0.20,
    energy: 0.15,
    acousticness: -0.10,
    tempo: 10,
  },
  Raining: {
    valence: -0.15,
    energy: -0.18,
    acousticness: 0.20,
    tempo: -12,
  },
  Thunderstorm: {
    valence: -0.10,
    energy: 0.25,
    acousticness: -0.15,
    tempo: 16,
  },
  'Cold / Overcast': {
    valence: -0.18,
    energy: -0.15,
    acousticness: 0.22,
    tempo: -10,
  },
};

/**
 * Acoustic profile baseline for Mood
 */
const MOOD_VECTORS: Record<Mood, AcousticProfile> = {
  Energetic: {
    valence: 0.78,
    energy: 0.92,
    acousticness: 0.10,
    danceability: 0.86,
    tempo: 132,
  },
  Focused: {
    valence: 0.50,
    energy: 0.46,
    acousticness: 0.62,
    danceability: 0.52,
    tempo: 90,
  },
  Relaxed: {
    valence: 0.60,
    energy: 0.26,
    acousticness: 0.82,
    danceability: 0.38,
    tempo: 72,
  },
  Melancholic: {
    valence: 0.20,
    energy: 0.24,
    acousticness: 0.78,
    danceability: 0.26,
    tempo: 68,
  },
  Euphoric: {
    valence: 0.95,
    energy: 0.88,
    acousticness: 0.12,
    danceability: 0.90,
    tempo: 128,
  },
  Chill: {
    valence: 0.58,
    energy: 0.36,
    acousticness: 0.68,
    danceability: 0.58,
    tempo: 82,
  },
};

/**
 * Computes deterministic target acoustic vector from context vectors
 */
export function calculateTargetProfile(context: UserContext, vibeShift = 0): AcousticProfile {
  const time = TIME_VECTORS[context.timeOfDay];
  const weather = WEATHER_VECTORS[context.weather];
  const mood = MOOD_VECTORS[context.mood];

  // Weighted blend: Mood (50%) + Time (30%) + Weather (20%)
  let valence = mood.valence * 0.5 + (time.valence ?? 0.5) * 0.3 + weather.valence * 0.2;
  let energy = mood.energy * 0.5 + (time.energy ?? 0.5) * 0.3 + weather.energy * 0.2;
  let acousticness = mood.acousticness * 0.5 + (time.acousticness ?? 0.5) * 0.3 + weather.acousticness * 0.2;
  let danceability = mood.danceability * 0.6 + (time.danceability ?? 0.5) * 0.4;
  let tempo = mood.tempo * 0.5 + (time.tempo ?? 90) * 0.35 + weather.tempo;

  // Apply Vibe Shift modifier (-50 to +50)
  const shiftNorm = vibeShift / 100; // -0.5 to +0.5
  energy += shiftNorm * 0.35;
  tempo += shiftNorm * 30;
  acousticness -= shiftNorm * 0.25;

  // Clamp boundaries to natural ranges
  valence = Math.max(0.05, Math.min(0.98, valence));
  energy = Math.max(0.08, Math.min(0.98, energy));
  acousticness = Math.max(0.02, Math.min(0.98, acousticness));
  danceability = Math.max(0.1, Math.min(0.96, danceability));
  tempo = Math.max(55, Math.min(160, Math.round(tempo)));

  return {
    valence: Number(valence.toFixed(2)),
    energy: Number(energy.toFixed(2)),
    acousticness: Number(acousticness.toFixed(2)),
    danceability: Number(danceability.toFixed(2)),
    tempo,
  };
}

/**
 * Normalizes tempo from BPM [50..165] to [0..1]
 */
function normalizeTempo(bpm: number): number {
  return Math.max(0, Math.min(1, (bpm - 50) / 115));
}

/**
 * Scores a track against the target profile using weighted Euclidean distance
 */
export function scoreTrack(track: Track, target: AcousticProfile, context: UserContext): ScoredTrack {
  const tFeatures = track.audioFeatures;

  const diffEnergy = Math.abs(tFeatures.energy - target.energy);
  const diffValence = Math.abs(tFeatures.valence - target.valence);
  const diffAcoustic = Math.abs(tFeatures.acousticness - target.acousticness);
  const diffTempo = Math.abs(normalizeTempo(tFeatures.tempo) - normalizeTempo(target.tempo));
  const diffDance = Math.abs(tFeatures.danceability - target.danceability);

  // Feature weights
  const wEnergy = 0.28;
  const wValence = 0.24;
  const wAcoustic = 0.18;
  const wTempo = 0.20;
  const wDance = 0.10;

  const weightedDistanceSq =
    wEnergy * Math.pow(diffEnergy, 2) +
    wValence * Math.pow(diffValence, 2) +
    wAcoustic * Math.pow(diffAcoustic, 2) +
    wTempo * Math.pow(diffTempo, 2) +
    wDance * Math.pow(diffDance, 2);

  const distance = Math.sqrt(weightedDistanceSq);

  // Map distance to a 60% - 99% match scale so recommendations feel organic
  const rawScore = 1 - distance * 1.35;
  const matchScore = Math.max(45, Math.min(99, Math.round(rawScore * 100)));

  // Detailed breakdown percentages
  const energyMatch = Math.round((1 - diffEnergy) * 100);
  const valenceMatch = Math.round((1 - diffValence) * 100);
  const acousticMatch = Math.round((1 - diffAcoustic) * 100);
  const tempoMatch = Math.round((1 - diffTempo) * 100);

  // Contextual reason generation
  const explanation = generateExplanation(track, context, target, matchScore);

  return {
    ...track,
    matchScore,
    matchBreakdown: {
      energyMatch,
      valenceMatch,
      acousticMatch,
      tempoMatch,
    },
    explanation,
  };
}

/**
 * Generates human-friendly soundscape context explanations
 */
function generateExplanation(
  track: Track,
  context: UserContext,
  target: AcousticProfile,
  matchScore: number
): string {
  if (matchScore >= 92) {
    return `Prime resonance (${target.energy >= 0.6 ? 'High' : 'Calm'} energy target) for a ${context.weather.toLowerCase()} ${context.timeOfDay.toLowerCase()} with ${context.mood.toLowerCase()} frequencies.`;
  } else if (matchScore >= 80) {
    return `Harmonizes with ${context.mood} mood at ${track.audioFeatures.tempo} BPM, tuned for ${context.timeOfDay}.`;
  } else {
    return `Balanced contrast providing ambient nuance for ${context.weather} conditions.`;
  }
}

/**
 * Ranks all tracks against context
 */
export function recommendTracks(
  tracks: Track[],
  context: UserContext,
  vibeShift = 0
): { targetProfile: AcousticProfile; scoredTracks: ScoredTrack[] } {
  const targetProfile = calculateTargetProfile(context, vibeShift);

  const scoredTracks = tracks
    .map((track) => scoreTrack(track, targetProfile, context))
    .sort((a, b) => b.matchScore - a.matchScore);

  return { targetProfile, scoredTracks };
}
