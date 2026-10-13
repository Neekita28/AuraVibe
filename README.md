# 💖 AuraVibe ✦ Adaptive Music Recommendation Platform

> **An adaptive, contextual music recommendation engine built with React, TypeScript, Vite, Tailwind CSS v4, and the Web Audio API.** Styled with a high-energy **Neo-Brutalist / Y2K Pop** aesthetic (White, Hot Pink, Pitch Black).

---

## ✦ Core Contextual Vectors

AuraVibe curates and dynamically ranks soundscapes across three user environmental vectors:

1. **Time of Day**: Morning, Afternoon, Evening, Night
2. **Weather Condition**: Sunny, Raining, Thunderstorm, Cold / Overcast
3. **Current Mood**: Energetic, Focused, Relaxed, Melancholic, Euphoric, Chill

---

## 🚀 Key Features

- **Deterministic Acoustic Weighting Algorithm**: Calculates target audio parameters (Valence, Energy, Acousticness, Tempo BPM, Danceability).
- **Multi-Dimensional Proximity Scoring**: Weighted Euclidean distance similarity calculation mapping tracks to real-time percentage matches (e.g., `98% Match`).
- **Web Audio Generative Synthesizer**: Built-in browser Web Audio API engine providing procedural polyphonic chords, ambient drone pads, and vinyl noise matched to key and BPM.
- **Neo-Brutalist / Y2K Pop Aesthetic**: Crisp white backgrounds, vibrant hot pink (`#ff2a85`) accents, 3px solid black outlines, hard offset drop-shadows, and micro-press interactions.
- **Dynamic Reactive Background**: Ambient canvas with retro grid textures and floating sparkles that adapt to active weather and time vectors.
- **Interactive PlayerBar**: Sticky bottom audio player with dual-tone frequency visualizer waveform, scrub bar, duration tracker, and volume controls.
- **"Vibe Shift" Slider & "Surprise Me" Novelty Action**: Instant energy recalibration and serendipitous discovery with confetti celebrations.
- **Vector Mathematics Inspector**: Interactive modal detailing the exact mathematical weights computed behind each recommendation.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS (v4) + Neo-Brutalist Design System
- **Icons**: Lucide React
- **Audio**: Web Audio API (AnalyserNode, OscillatorNode, BiquadFilterNode)
- **Delight**: Canvas-Confetti

---

## 💻 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

---

## 🌐 Deploy to Vercel

1. Push this repository to GitHub:
   ```bash
   git push -u origin main
   ```
2. Open [Vercel Dashboard](https://vercel.com/new).
3. Import your GitHub repository (`auravibe`).
4. Keep standard Vite framework presets:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **Deploy**!
