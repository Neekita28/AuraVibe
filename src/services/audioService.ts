import type { Track } from '../types';

/**
 * Web Audio Ambient Soundscape Synthesizer
 * Generates lush generative chords, ambient pads, arpeggios and vinyl noise
 * perfectly matched to each track's acoustic profile, BPM, and key.
 */
class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  public analyser: AnalyserNode | null = null;
  private isRunning = false;
  private currentTrack: Track | null = null;
  private timerId: number | null = null;
  private noiseNode: AudioNode | null = null;
  private activeVoices: { osc: OscillatorNode; gain: GainNode }[] = [];

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.7, this.ctx.currentTime);

      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.analyser.smoothingTimeConstant = 0.8;

      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setVolume(volume: number) {
    if (this.masterGain && this.ctx) {
      const clamped = Math.max(0, Math.min(1, volume));
      this.masterGain.gain.setTargetAtTime(clamped, this.ctx.currentTime, 0.05);
    }
  }

  public playTrack(track: Track) {
    this.initContext();
    this.stop();

    this.currentTrack = track;
    this.isRunning = true;

    // Start generative musical pattern loop
    this.startMusicalPattern(track);
  }

  public pause() {
    this.stopMusicalPattern();
    this.isRunning = false;
  }

  public resume() {
    if (this.currentTrack && !this.isRunning) {
      this.initContext();
      this.isRunning = true;
      this.startMusicalPattern(this.currentTrack);
    }
  }

  public stop() {
    this.stopMusicalPattern();
    this.isRunning = false;
  }

  private stopMusicalPattern() {
    if (this.timerId !== null) {
      window.clearInterval(this.timerId);
      this.timerId = null;
    }

    // Fade out active voices
    if (this.ctx) {
      const now = this.ctx.currentTime;
      this.activeVoices.forEach(({ osc, gain }) => {
        try {
          gain.gain.cancelScheduledValues(now);
          gain.gain.setValueAtTime(gain.gain.value, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);
          osc.stop(now + 0.35);
        } catch {
          // ignore
        }
      });
      this.activeVoices = [];

      if (this.noiseNode) {
        try {
          (this.noiseNode as AudioBufferSourceNode).stop();
        } catch {
          // ignore
        }
        this.noiseNode = null;
      }
    }
  }

  private startMusicalPattern(track: Track) {
    if (!this.ctx || !this.masterGain) return;

    const { synthConfig } = track;
    const bpm = synthConfig.bpm || 90;
    const beatIntervalMs = (60 / bpm) * 1000;
    const scale = synthConfig.scale || [0, 4, 7, 11];
    const root = synthConfig.rootFreq || 220;

    // If ambient noise is desired (rain / vinyl hum)
    if (synthConfig.ambientNoise) {
      this.playVinylCrackling();
    }

    let step = 0;

    const playStep = () => {
      if (!this.isRunning || !this.ctx || !this.masterGain) return;

      const semitone = scale[step % scale.length];
      const freq = root * Math.pow(2, semitone / 12);
      const isBassStep = step % 4 === 0;

      this.triggerTone(freq, synthConfig.waveType, isBassStep, synthConfig.filterFreq);

      // Play complementary ambient chord drone every 4 beats
      if (isBassStep) {
        const chordFifth = root * Math.pow(2, (scale[2] || 7) / 12) * 0.5;
        this.triggerTone(chordFifth, 'sine', true, 600);
      }

      step = (step + 1) % (scale.length * 2);
    };

    // Play immediate first beat
    playStep();
    this.timerId = window.setInterval(playStep, beatIntervalMs);
  }

  private triggerTone(freq: number, type: OscillatorType, isSub = false, filterCutoff = 1800) {
    if (!this.ctx || !this.masterGain) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = isSub ? 'triangle' : type;
    osc.frequency.setValueAtTime(freq, now);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(filterCutoff, now);

    const noteDuration = isSub ? 1.6 : 0.8;
    const targetGain = isSub ? 0.35 : 0.18;

    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.linearRampToValueAtTime(targetGain, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + noteDuration);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + noteDuration + 0.1);

    this.activeVoices.push({ osc, gain });

    // Clean up expired voices
    setTimeout(() => {
      this.activeVoices = this.activeVoices.filter((v) => v.osc !== osc);
    }, (noteDuration + 0.2) * 1000);
  }

  private playVinylCrackling() {
    if (!this.ctx || !this.masterGain) return;

    try {
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.015;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1000, this.ctx.currentTime);
      filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      noise.start();
      this.noiseNode = noise;
    } catch {
      // Audio buffer creation safe fallback
    }
  }

  public getFrequencyData(): Uint8Array {
    if (!this.analyser) {
      return new Uint8Array(16);
    }
    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);
    return dataArray;
  }
}

export const audioEngine = new AudioEngine();
