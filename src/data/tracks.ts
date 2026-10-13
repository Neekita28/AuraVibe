import type { Track } from '../types';

export const TRACKS_DATASET: Track[] = [
  {
    id: 'track-1',
    title: 'Midnight Raindrops',
    artist: 'Aura Echoes',
    album: 'Nocturnal Solitude',
    genre: 'Lofi Chillhop',
    duration: 168,
    coverArt: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=600&q=80',
    audioFeatures: {
      valence: 0.38,
      energy: 0.28,
      acousticness: 0.72,
      danceability: 0.52,
      tempo: 76,
    },
    tags: ['76 BPM', 'Lofi Beats', 'Rainy Cozy', 'Warm Vinyl'],
    synthConfig: {
      rootFreq: 220, // A3
      scale: [0, 3, 7, 10, 14], // Minor 9th
      waveType: 'sine',
      filterFreq: 850,
      bpm: 76,
      ambientNoise: true,
    },
  },
  {
    id: 'track-2',
    title: 'Neon Skyline Drive',
    artist: 'Cyberwave 84',
    album: 'Outrun Chronicles',
    genre: 'Synthwave',
    duration: 215,
    coverArt: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80',
    audioFeatures: {
      valence: 0.72,
      energy: 0.88,
      acousticness: 0.08,
      danceability: 0.76,
      tempo: 124,
    },
    tags: ['124 BPM', 'Synthwave', 'Electric Drive', 'Retro Bass'],
    synthConfig: {
      rootFreq: 146.83, // D3
      scale: [0, 4, 7, 11, 14], // Maj 9th
      waveType: 'sawtooth',
      filterFreq: 2400,
      bpm: 124,
    },
  },
  {
    id: 'track-3',
    title: 'Celestial Dawn',
    artist: 'Ethereal Botanica',
    album: 'Awakening Blooms',
    genre: 'Ambient Neo-Classical',
    duration: 240,
    coverArt: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=600&q=80',
    audioFeatures: {
      valence: 0.65,
      energy: 0.32,
      acousticness: 0.88,
      danceability: 0.35,
      tempo: 82,
    },
    tags: ['82 BPM', 'Ambient Piano', 'Morning Mist', 'Organic Warmth'],
    synthConfig: {
      rootFreq: 261.63, // C4
      scale: [0, 4, 7, 9, 12], // Major Pentatonic
      waveType: 'triangle',
      filterFreq: 1100,
      bpm: 82,
    },
  },
  {
    id: 'track-4',
    title: 'Solar Flare Groove',
    artist: 'Solarium Syndicate',
    album: 'Sunlit Horizons',
    genre: 'Deep House',
    duration: 285,
    coverArt: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    audioFeatures: {
      valence: 0.85,
      energy: 0.92,
      acousticness: 0.12,
      danceability: 0.89,
      tempo: 126,
    },
    tags: ['126 BPM', 'Deep House', 'Euphoric Pulse', 'Golden Hour'],
    synthConfig: {
      rootFreq: 130.81, // C3
      scale: [0, 3, 5, 7, 10], // Minor Pentatonic
      waveType: 'square',
      filterFreq: 2800,
      bpm: 126,
    },
  },
  {
    id: 'track-5',
    title: 'Foggy Harbor Echoes',
    artist: 'Grey Mist Collective',
    album: 'Overcast Horizon',
    genre: 'Ambient Drone',
    duration: 310,
    coverArt: 'https://images.unsplash.com/photo-1487621167305-5d248087c724?auto=format&fit=crop&w=600&q=80',
    audioFeatures: {
      valence: 0.22,
      energy: 0.24,
      acousticness: 0.82,
      danceability: 0.28,
      tempo: 68,
    },
    tags: ['68 BPM', 'Cold Ambient', 'Deep Reverie', 'Mist Drone'],
    synthConfig: {
      rootFreq: 110, // A2
      scale: [0, 7, 12, 15], // Fifth drone
      waveType: 'sine',
      filterFreq: 600,
      bpm: 68,
      ambientNoise: true,
    },
  },
  {
    id: 'track-6',
    title: 'Thunderstrike Paradox',
    artist: 'Voltic Pulse',
    album: 'Electric Tempest',
    genre: 'Dark Electro / Industrial',
    duration: 202,
    coverArt: 'https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?auto=format&fit=crop&w=600&q=80',
    audioFeatures: {
      valence: 0.34,
      energy: 0.95,
      acousticness: 0.05,
      danceability: 0.72,
      tempo: 138,
    },
    tags: ['138 BPM', 'Dark Synth', 'Thunderous Kick', 'Adrenaline'],
    synthConfig: {
      rootFreq: 98, // G2
      scale: [0, 1, 5, 7, 8], // Phrygian dark
      waveType: 'sawtooth',
      filterFreq: 3200,
      bpm: 138,
    },
  },
  {
    id: 'track-7',
    title: 'Autumn Leaves & Cinnamon',
    artist: 'The Velvet Oak',
    album: 'Porch Tales',
    genre: 'Indie Folk',
    duration: 194,
    coverArt: 'https://images.unsplash.com/photo-1445307806294-bff7f67ff225?auto=format&fit=crop&w=600&q=80',
    audioFeatures: {
      valence: 0.58,
      energy: 0.42,
      acousticness: 0.91,
      danceability: 0.48,
      tempo: 92,
    },
    tags: ['92 BPM', 'Acoustic Guitar', 'Warm Fireside', 'Gentle Vocals'],
    synthConfig: {
      rootFreq: 196, // G3
      scale: [0, 4, 7, 9, 14], // Folk Maj
      waveType: 'triangle',
      filterFreq: 1350,
      bpm: 92,
    },
  },
  {
    id: 'track-8',
    title: 'Flow State Architecture',
    artist: 'Synapse Diver',
    album: 'Deep Concentration',
    genre: 'Minimal Techno',
    duration: 320,
    coverArt: 'https://images.unsplash.com/photo-1507676184212-d03ab07a01bf?auto=format&fit=crop&w=600&q=80',
    audioFeatures: {
      valence: 0.48,
      energy: 0.58,
      acousticness: 0.35,
      danceability: 0.68,
      tempo: 118,
    },
    tags: ['118 BPM', 'Minimalism', 'Deep Focus', 'Repetitive Poly'],
    synthConfig: {
      rootFreq: 164.81, // E3
      scale: [0, 3, 7, 10, 12], // Minor
      waveType: 'sine',
      filterFreq: 1800,
      bpm: 118,
    },
  },
  {
    id: 'track-9',
    title: 'Prismatic Euphoria',
    artist: 'Luminescent Dream',
    album: 'Colors of Daylight',
    genre: 'Dream Pop / Indie',
    duration: 218,
    coverArt: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80',
    audioFeatures: {
      valence: 0.94,
      energy: 0.86,
      acousticness: 0.22,
      danceability: 0.81,
      tempo: 128,
    },
    tags: ['128 BPM', 'Dream Pop', 'Euphoric Rush', 'Sparkling Hooks'],
    synthConfig: {
      rootFreq: 293.66, // D4
      scale: [0, 4, 7, 11, 14], // Lydian shimmer
      waveType: 'sawtooth',
      filterFreq: 3000,
      bpm: 128,
    },
  },
  {
    id: 'track-10',
    title: 'Velvet Rain on Cedar',
    artist: 'Kanso Kumo',
    album: 'Japanese Garden Walks',
    genre: 'Organic Ambient',
    duration: 275,
    coverArt: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=600&q=80',
    audioFeatures: {
      valence: 0.45,
      energy: 0.22,
      acousticness: 0.94,
      danceability: 0.30,
      tempo: 64,
    },
    tags: ['64 BPM', 'Koto & Rain', 'Zen Solace', 'Deep Relaxation'],
    synthConfig: {
      rootFreq: 220, // A3
      scale: [0, 2, 5, 7, 9], // Insen / Pentatonic
      waveType: 'sine',
      filterFreq: 900,
      bpm: 64,
      ambientNoise: true,
    },
  },
  {
    id: 'track-11',
    title: 'Sunset Boulevard Drift',
    artist: 'Pacific Terrace',
    album: 'Golden Hour Memories',
    genre: 'Chillwave',
    duration: 225,
    coverArt: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
    audioFeatures: {
      valence: 0.78,
      energy: 0.62,
      acousticness: 0.41,
      danceability: 0.74,
      tempo: 104,
    },
    tags: ['104 BPM', 'Warm Sunset', 'Chillwave Rhodes', 'Coastline Breeze'],
    synthConfig: {
      rootFreq: 174.61, // F3
      scale: [0, 4, 7, 9, 11], // Maj 7th
      waveType: 'triangle',
      filterFreq: 1700,
      bpm: 104,
    },
  },
  {
    id: 'track-12',
    title: 'Solitary Stargazer',
    artist: 'Nova Nocturne',
    album: 'Deep Cosmos Vol. 2',
    genre: 'Space Ambient',
    duration: 345,
    coverArt: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=600&q=80',
    audioFeatures: {
      valence: 0.19,
      energy: 0.18,
      acousticness: 0.76,
      danceability: 0.21,
      tempo: 60,
    },
    tags: ['60 BPM', 'Deep Space', 'Melancholic Drone', 'Introspective'],
    synthConfig: {
      rootFreq: 87.31, // F2
      scale: [0, 3, 7, 10], // Minor 7th
      waveType: 'sine',
      filterFreq: 550,
      bpm: 60,
    },
  },
  {
    id: 'track-13',
    title: 'Kinetic Meridian',
    artist: 'Hyperion Drive',
    album: 'Accelerate',
    genre: 'Melodic Techno',
    duration: 242,
    coverArt: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    audioFeatures: {
      valence: 0.69,
      energy: 0.94,
      acousticness: 0.09,
      danceability: 0.84,
      tempo: 132,
    },
    tags: ['132 BPM', 'Melodic Techno', 'High Energy', 'Driving Arp'],
    synthConfig: {
      rootFreq: 123.47, // B2
      scale: [0, 2, 3, 7, 9], // Minor
      waveType: 'sawtooth',
      filterFreq: 3100,
      bpm: 132,
    },
  },
  {
    id: 'track-14',
    title: 'Coffee in Montmartre',
    artist: 'Rue des Rêves',
    album: 'Parisian Sketches',
    genre: 'Acoustic Jazz / Bossa',
    duration: 182,
    coverArt: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=600&q=80',
    audioFeatures: {
      valence: 0.74,
      energy: 0.44,
      acousticness: 0.89,
      danceability: 0.62,
      tempo: 98,
    },
    tags: ['98 BPM', 'Bossa Nova', 'Morning Coffee', 'Nylon Strings'],
    synthConfig: {
      rootFreq: 196, // G3
      scale: [0, 4, 7, 9, 11], // Maj 9
      waveType: 'triangle',
      filterFreq: 1500,
      bpm: 98,
    },
  },
  {
    id: 'track-15',
    title: 'Shadows Before Dawn',
    artist: 'Hollow Tides',
    album: 'Wanderer Remorse',
    genre: 'Post-Rock / Melancholy',
    duration: 295,
    coverArt: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=600&q=80',
    audioFeatures: {
      valence: 0.16,
      energy: 0.49,
      acousticness: 0.68,
      danceability: 0.38,
      tempo: 78,
    },
    tags: ['78 BPM', 'Post-Rock', 'Melancholic Crescendo', 'Reverb Guitars'],
    synthConfig: {
      rootFreq: 110, // A2
      scale: [0, 3, 7, 8, 12], // Aeolian minor
      waveType: 'sawtooth',
      filterFreq: 1200,
      bpm: 78,
    },
  },
  {
    id: 'track-16',
    title: 'Tokyo Rain Alley',
    artist: 'Kitsune Beatlab',
    album: 'Shibuya Night Market',
    genre: 'Lofi Chillhop',
    duration: 189,
    coverArt: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
    audioFeatures: {
      valence: 0.52,
      energy: 0.36,
      acousticness: 0.74,
      danceability: 0.66,
      tempo: 84,
    },
    tags: ['84 BPM', 'Lofi Grooves', 'Rainy Night', 'Mellow Keys'],
    synthConfig: {
      rootFreq: 220, // A3
      scale: [0, 4, 7, 10, 14], // Dominant 9th
      waveType: 'sine',
      filterFreq: 1050,
      bpm: 84,
      ambientNoise: true,
    },
  },
  {
    id: 'track-17',
    title: 'Overcast Tea Ceremony',
    artist: 'Yukihiro Serenade',
    album: 'Silent Moss',
    genre: 'Neo-Classical Piano',
    duration: 210,
    coverArt: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=600&q=80',
    audioFeatures: {
      valence: 0.31,
      energy: 0.20,
      acousticness: 0.96,
      danceability: 0.25,
      tempo: 72,
    },
    tags: ['72 BPM', 'Solo Piano', 'Overcast Afternoon', 'Contemplative'],
    synthConfig: {
      rootFreq: 261.63, // C4
      scale: [0, 2, 4, 7, 9], // Major pentatonic soft
      waveType: 'triangle',
      filterFreq: 880,
      bpm: 72,
    },
  },
  {
    id: 'track-18',
    title: 'Aurora Borealis Borealis',
    artist: 'Nordic Lightwave',
    album: 'Sub-Zero Horizons',
    genre: 'Chillout / Downtempo',
    duration: 260,
    coverArt: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?auto=format&fit=crop&w=600&q=80',
    audioFeatures: {
      valence: 0.62,
      energy: 0.45,
      acousticness: 0.52,
      danceability: 0.59,
      tempo: 90,
    },
    tags: ['90 BPM', 'Chillout', 'Glacial Pads', 'Atmospheric Bass'],
    synthConfig: {
      rootFreq: 146.83, // D3
      scale: [0, 5, 7, 12, 17], // Suspended 4th
      waveType: 'sine',
      filterFreq: 1400,
      bpm: 90,
    },
  },
  {
    id: 'track-19',
    title: 'Electric Monsoons',
    artist: 'Storm Chaser HQ',
    album: 'Lightning Over Grid',
    genre: 'Bass Music / Downtempo',
    duration: 232,
    coverArt: 'https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?auto=format&fit=crop&w=600&q=80',
    audioFeatures: {
      valence: 0.41,
      energy: 0.82,
      acousticness: 0.15,
      danceability: 0.78,
      tempo: 110,
    },
    tags: ['110 BPM', 'Heavy Sub', 'Thunder Rumbles', 'Intense Focus'],
    synthConfig: {
      rootFreq: 82.41, // E2
      scale: [0, 3, 5, 7, 10], // Minor pentatonic
      waveType: 'sawtooth',
      filterFreq: 2100,
      bpm: 110,
    },
  },
  {
    id: 'track-20',
    title: 'Sundown Rooftop Spritz',
    artist: 'Ibiza Sunset Project',
    album: 'Balearic Chords',
    genre: 'Balearic Chill',
    duration: 254,
    coverArt: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80',
    audioFeatures: {
      valence: 0.82,
      energy: 0.68,
      acousticness: 0.38,
      danceability: 0.82,
      tempo: 114,
    },
    tags: ['114 BPM', 'Balearic Beat', 'Evening Twilight', 'Warm Percussion'],
    synthConfig: {
      rootFreq: 174.61, // F3
      scale: [0, 4, 7, 9, 12], // Major
      waveType: 'triangle',
      filterFreq: 2200,
      bpm: 114,
    },
  },
  {
    id: 'track-21',
    title: 'Neon Library Study Session',
    artist: 'Scholar Wave',
    album: 'Midnight Thesis',
    genre: 'Lofi Chillhop',
    duration: 175,
    coverArt: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=600&q=80',
    audioFeatures: {
      valence: 0.50,
      energy: 0.34,
      acousticness: 0.80,
      danceability: 0.58,
      tempo: 80,
    },
    tags: ['80 BPM', 'Study Session', 'Focused Mind', 'Soft Rhymes'],
    synthConfig: {
      rootFreq: 220, // A3
      scale: [0, 3, 7, 10, 14], // Minor 9th
      waveType: 'sine',
      filterFreq: 950,
      bpm: 80,
      ambientNoise: true,
    },
  },
  {
    id: 'track-22',
    title: 'Supernova Breakthrough',
    artist: 'Pulsar Collective',
    album: 'Hyperdrive Awakening',
    genre: 'Synthwave / High Energy',
    duration: 210,
    coverArt: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    audioFeatures: {
      valence: 0.89,
      energy: 0.96,
      acousticness: 0.04,
      danceability: 0.86,
      tempo: 135,
    },
    tags: ['135 BPM', 'Supernova', 'Euphoric Rush', 'Epic Lead'],
    synthConfig: {
      rootFreq: 130.81, // C3
      scale: [0, 4, 7, 11, 14], // Major 9th
      waveType: 'sawtooth',
      filterFreq: 3400,
      bpm: 135,
    },
  },
];
