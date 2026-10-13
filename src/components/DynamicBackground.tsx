import React, { useMemo, useEffect, useRef } from 'react';
import type { UserContext } from '../types';

interface DynamicBackgroundProps {
  context: UserContext;
  isPlaying: boolean;
}

export const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ context, isPlaying }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Dynamic pastel and hot pink hues derived from Time + Weather + Mood
  const theme = useMemo(() => {
    const { timeOfDay, weather, mood } = context;

    let primaryGlow = 'rgba(255, 42, 133, 0.22)';    // Hot Pink
    let secondaryGlow = 'rgba(255, 182, 193, 0.35)'; // Light Pink
    let accentGlow = 'rgba(244, 114, 182, 0.25)';    // Bubblegum

    if (weather === 'Thunderstorm') {
      primaryGlow = 'rgba(236, 72, 153, 0.35)';   // Deep magenta
      secondaryGlow = 'rgba(168, 85, 247, 0.25)'; // Electric purple
      accentGlow = 'rgba(255, 42, 133, 0.3)';
    } else if (weather === 'Raining') {
      primaryGlow = 'rgba(244, 114, 182, 0.25)';
      secondaryGlow = 'rgba(147, 197, 253, 0.3)'; // Pastel blue rain
      accentGlow = 'rgba(251, 207, 232, 0.4)';
    } else if (weather === 'Cold / Overcast') {
      primaryGlow = 'rgba(203, 213, 225, 0.4)';  // Soft frost slate
      secondaryGlow = 'rgba(251, 207, 232, 0.3)'; // Soft blush
      accentGlow = 'rgba(244, 114, 182, 0.2)';
    } else if (weather === 'Sunny') {
      if (timeOfDay === 'Morning') {
        primaryGlow = 'rgba(255, 42, 133, 0.22)';
        secondaryGlow = 'rgba(253, 224, 71, 0.25)'; // Pastel sunrise yellow
        accentGlow = 'rgba(254, 215, 170, 0.35)';  // Warm peach
      } else if (timeOfDay === 'Afternoon') {
        primaryGlow = 'rgba(255, 42, 133, 0.28)';
        secondaryGlow = 'rgba(251, 146, 60, 0.25)';
        accentGlow = 'rgba(253, 230, 138, 0.3)';
      } else if (timeOfDay === 'Evening') {
        primaryGlow = 'rgba(244, 63, 94, 0.3)';     // Rose coral
        secondaryGlow = 'rgba(232, 121, 249, 0.28)';// Twilight pink
        accentGlow = 'rgba(255, 182, 193, 0.35)';
      } else {
        primaryGlow = 'rgba(219, 39, 119, 0.25)';
        secondaryGlow = 'rgba(192, 132, 252, 0.22)';
        accentGlow = 'rgba(244, 114, 182, 0.2)';
      }
    }

    if (mood === 'Energetic' || mood === 'Euphoric') {
      primaryGlow = 'rgba(255, 42, 133, 0.35)';
    }

    return { primaryGlow, secondaryGlow, accentGlow };
  }, [context]);

  // Cute interactive particle canvas: floating retro sparkles (✦), dots, and playful rain streaks
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const isRain = context.weather === 'Raining' || context.weather === 'Thunderstorm';
    const count = isRain ? 70 : 35;

    const particles = Array.from({ length: count }).map(() => ({
      x: Math.random() * width,
      y: Math.random() * height,
      speedY: isRain ? 5 + Math.random() * 6 : 0.2 + Math.random() * 0.6,
      speedX: isRain ? -1 - Math.random() : (Math.random() - 0.5) * 0.4,
      size: isRain ? 12 + Math.random() * 14 : 3 + Math.random() * 5,
      isSparkle: Math.random() > 0.6,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.04,
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.rotation += p.rotSpeed;

        if (p.y > height) {
          p.y = -10;
          p.x = Math.random() * width;
        }
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;

        if (isRain) {
          // Playful stylized pink/black raindrops
          ctx.strokeStyle = '#ff2a85';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.x + p.speedX * 1.5, p.y + p.size);
          ctx.stroke();
        } else if (p.isSparkle) {
          // Retro 4-point sparkle ✦
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rotation);
          ctx.fillStyle = '#ff2a85';
          ctx.beginPath();
          const s = p.size;
          ctx.moveTo(0, -s);
          ctx.quadraticCurveTo(0, 0, s, 0);
          ctx.quadraticCurveTo(0, 0, 0, s);
          ctx.quadraticCurveTo(0, 0, -s, 0);
          ctx.quadraticCurveTo(0, 0, 0, -s);
          ctx.fill();
          ctx.restore();
        } else {
          // Playful black/pink mini dots
          ctx.fillStyle = 'rgba(10, 10, 10, 0.15)';
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [context.weather]);

  return (
    <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none bg-[#faf5f8]">
      {/* Neo-brutalist retro grid texture */}
      <div className="absolute inset-0 bg-neo-grid opacity-70" />

      {/* Dynamic ambient pink/pastel gradient bubbles */}
      <div
        className="absolute -top-[15%] -left-[10%] w-[55vw] h-[55vw] rounded-full blur-[90px] transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${theme.primaryGlow} 0%, transparent 70%)`,
          transform: isPlaying ? 'scale(1.1)' : 'scale(1)',
        }}
      />
      <div
        className="absolute top-[30%] -right-[10%] w-[50vw] h-[50vw] rounded-full blur-[100px] transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${theme.secondaryGlow} 0%, transparent 70%)`,
          transform: isPlaying ? 'scale(1.08)' : 'scale(1)',
        }}
      />
      <div
        className="absolute -bottom-[15%] left-[25%] w-[60vw] h-[50vw] rounded-full blur-[100px] transition-all duration-1000"
        style={{
          background: `radial-gradient(circle, ${theme.accentGlow} 0%, transparent 70%)`,
        }}
      />

      {/* Floating Canvas Elements */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-60" />
    </div>
  );
};
