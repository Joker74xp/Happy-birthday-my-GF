import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Flame, Volume2, VolumeX } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface FireworkBurstData {
  id: string;
  x: number; // percentage or px
  y: number;
  colorPalette: string[];
  scale: number;
  duration: number;
  numSparks: number;
  hasRocket?: boolean;
}

const COLOR_PALETTES = [
  // Golden Royalty
  ['#fbbf24', '#f59e0b', '#fde68a', '#ffffff'],
  // Neon Love (Rose & Pink)
  ['#f43f5e', '#ec4899', '#fda4af', '#ffffff'],
  // Cosmic Violet & Cyan
  ['#8b5cf6', '#a855f7', '#06b6d4', '#38bdf8'],
  // Emerald Starburst
  ['#10b981', '#34d399', '#6ee7b7', '#fde047'],
  // Sunset Twilight
  ['#f97316', '#fb923c', '#e11d48', '#fef08a'],
  // Rainbow Spark
  ['#ec4899', '#8b5cf6', '#06b6d4', '#f59e0b'],
];

interface FireworksDisplayProps {
  recipientName: string;
  onClose: () => void;
}

export const FireworksDisplay: React.FC<FireworksDisplayProps> = ({
  recipientName,
  onClose,
}) => {
  const [activeBursts, setActiveBursts] = useState<FireworkBurstData[]>([]);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Helper to spawn a firework at coordinates (x, y)
  const spawnFirework = useCallback(
    (x: number, y: number, withSound = true) => {
      const palette =
        COLOR_PALETTES[Math.floor(Math.random() * COLOR_PALETTES.length)];
      const id = `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
      const scale = 0.85 + Math.random() * 0.45;
      const duration = 1.3 + Math.random() * 0.4;
      const numSparks = 18 + Math.floor(Math.random() * 8);

      const newBurst: FireworkBurstData = {
        id,
        x,
        y,
        colorPalette: palette,
        scale,
        duration,
        numSparks,
        hasRocket: true,
      };

      if (withSound && soundEnabled) {
        sound.playFirework();
      }

      setActiveBursts((prev) => [...prev.slice(-15), newBurst]);

      // Automatically clean up after animation finishes
      setTimeout(() => {
        setActiveBursts((prev) => prev.filter((b) => b.id !== id));
      }, (duration + 1.2) * 1000);
    },
    [soundEnabled]
  );

  // Trigger automated ambient fireworks volley
  useEffect(() => {
    // Initial opening salvo
    const timer1 = setTimeout(() => spawnFirework(50, 25), 100);
    const timer2 = setTimeout(() => spawnFirework(28, 35), 700);
    const timer3 = setTimeout(() => spawnFirework(72, 30), 1300);
    const timer4 = setTimeout(() => spawnFirework(40, 20), 2000);
    const timer5 = setTimeout(() => spawnFirework(60, 40), 2700);

    // Continuous ambient rhythm
    const interval = setInterval(() => {
      const randomX = 15 + Math.random() * 70;
      const randomY = 15 + Math.random() * 45;
      spawnFirework(randomX, randomY);
    }, 1900);

    // Close on Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
      clearTimeout(timer5);
      clearInterval(interval);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [spawnFirework, onClose]);

  // Click on the sky to launch custom fireworks at tap point
  const handleSkyClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Avoid triggering if clicked on control buttons
    if ((e.target as HTMLElement).closest('button')) return;

    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    spawnFirework(x, y);
  };

  // Launch Grand Finale Barrage
  const handleLaunchFinale = () => {
    const locations = [
      { x: 20, y: 35 },
      { x: 35, y: 20 },
      { x: 50, y: 30 },
      { x: 65, y: 18 },
      { x: 80, y: 32 },
      { x: 45, y: 42 },
      { x: 55, y: 15 },
    ];

    locations.forEach((loc, idx) => {
      setTimeout(() => {
        spawnFirework(loc.x, loc.y, idx % 2 === 0);
      }, idx * 260);
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      ref={containerRef}
      onClick={handleSkyClick}
      className="fixed inset-0 z-50 bg-slate-950/95 flex flex-col justify-between overflow-hidden cursor-crosshair select-none"
    >
      {/* Background Starry Night Sky with Twinkles */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/30 via-slate-950 to-black" />
        {/* Sky illumination flash layer */}
        <div
          className="absolute inset-0 pointer-events-none transition-opacity duration-300"
          style={{
            background:
              activeBursts.length > 0
                ? 'radial-gradient(circle at 50% 30%, rgba(244, 63, 94, 0.08), transparent 70%)'
                : 'transparent',
          }}
        />
      </div>

      {/* Floating Header Controls */}
      <div className="relative z-30 w-full px-4 pt-4 sm:pt-6 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-purple-500/40 shadow-lg shadow-purple-500/10 backdrop-blur-md">
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" />
            <span className="text-xs sm:text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-amber-200 to-purple-300">
              Happy Birthday, {recipientName}! 🎆
            </span>
          </div>
          <span className="hidden md:inline-block text-[11px] text-slate-400 font-medium">
            (Tap anywhere on screen to launch)
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2">
          {/* Audio toggle */}
          <motion.button
            id="btn-firework-sound"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSoundEnabled((prev) => !prev)}
            className="p-2 rounded-full bg-slate-900/80 border border-slate-700/80 text-slate-300 hover:text-white shadow-md cursor-pointer transition-colors"
            title={soundEnabled ? 'Mute Firework Audio' : 'Unmute Firework Audio'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-pink-400" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
          </motion.button>

          {/* Launch Finale Barrage Button */}
          <motion.button
            id="btn-launch-barrage"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleLaunchFinale}
            className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-white text-xs font-bold shadow-lg shadow-rose-500/20 flex items-center gap-1.5 cursor-pointer transition-all"
          >
            <Flame className="w-3.5 h-3.5 text-amber-200" />
            <span>Grand Barrage</span>
          </motion.button>

          {/* Close button */}
          <motion.button
            id="btn-close-fireworks"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-full bg-slate-800/90 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 border border-slate-700 shadow-md cursor-pointer transition-colors"
            title="Return to Celebration (Esc)"
          >
            <X className="w-4 h-4" />
            <span className="hidden sm:inline">Close</span>
          </motion.button>
        </div>
      </div>

      {/* RENDER CSS KEYFRAME FIREWORKS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {activeBursts.map((burst) => {
          const primaryColor = burst.colorPalette[0];
          const secondaryColor = burst.colorPalette[1];
          const accentColor = burst.colorPalette[2];

          return (
            <div
              key={burst.id}
              className="absolute"
              style={{
                left: `${burst.x}%`,
                top: `${burst.y}%`,
                transform: `scale(${burst.scale})`,
              }}
            >
              {/* 1. Rocket Ascent Trail (Shooting Upward via Keyframe) */}
              {burst.hasRocket && (
                <div
                  className="firework-rocket absolute bottom-0 left-1/2 -translate-x-1/2 w-1 rounded-full pointer-events-none"
                  style={
                    {
                      height: '60px',
                      background: `linear-gradient(to top, transparent, ${primaryColor}, #ffffff)`,
                      boxShadow: `0 0 12px ${primaryColor}`,
                      '--duration': '0.75s',
                    } as React.CSSProperties
                  }
                />
              )}

              {/* 2. Central Core Flash */}
              <div
                className="firework-center-flash absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full pointer-events-none"
                style={
                  {
                    background: `radial-gradient(circle, #ffffff 15%, ${primaryColor} 55%, transparent 75%)`,
                    boxShadow: `0 0 35px ${secondaryColor}`,
                    '--duration': `${burst.duration * 0.7}s`,
                  } as React.CSSProperties
                }
              />

              {/* 3. Concentric Shockwave Ring */}
              <div
                className="firework-shockwave absolute -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full border border-solid pointer-events-none"
                style={
                  {
                    borderColor: accentColor,
                    boxShadow: `0 0 20px ${primaryColor}`,
                    '--duration': `${burst.duration * 0.85}s`,
                  } as React.CSSProperties
                }
              />

              {/* 4. Radial Sparks Array (Using Keyframes with dynamic angles & distances) */}
              {Array.from({ length: burst.numSparks }).map((_, sparkIdx) => {
                const angle = (360 / burst.numSparks) * sparkIdx;
                const distance = 85 + (sparkIdx % 4) * 22;
                const sparkColor =
                  burst.colorPalette[sparkIdx % burst.colorPalette.length];
                const sparkSize = sparkIdx % 3 === 0 ? 5 : 3.5;

                return (
                  <div
                    key={sparkIdx}
                    className="firework-spark absolute -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                    style={
                      {
                        width: `${sparkSize}px`,
                        height: `${sparkSize * 1.6}px`,
                        backgroundColor: sparkColor,
                        color: sparkColor,
                        boxShadow: `0 0 8px ${sparkColor}, 0 0 16px ${secondaryColor}`,
                        '--angle': `${angle}deg`,
                        '--dist': `${distance}px`,
                        '--duration': `${burst.duration}s`,
                      } as React.CSSProperties
                    }
                  />
                );
              })}

              {/* 5. Glittering Willow Falling Trails */}
              {Array.from({ length: 8 }).map((_, willowIdx) => {
                const angle = willowIdx * 45;
                const drift = (willowIdx % 2 === 0 ? 1 : -1) * (10 + willowIdx * 3);
                const willowColor = burst.colorPalette[willowIdx % 3];

                return (
                  <div
                    key={`willow-${willowIdx}`}
                    className="firework-willow absolute -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
                    style={
                      {
                        left: `${Math.cos((angle * Math.PI) / 180) * 35}px`,
                        top: `${Math.sin((angle * Math.PI) / 180) * 35}px`,
                        width: '3px',
                        height: '3px',
                        backgroundColor: willowColor,
                        boxShadow: `0 0 6px ${willowColor}`,
                        '--drift': `${drift}px`,
                        '--duration': `${burst.duration * 1.3}s`,
                      } as React.CSSProperties
                    }
                  />
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Bottom Hint Banner */}
      <div className="relative z-30 pb-6 text-center pointer-events-none px-4">
        <p className="inline-block px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800 text-slate-400 text-xs backdrop-blur-sm shadow-lg">
          🎇 Fireworks powered by CSS Keyframes • Click anywhere to explode a shell
        </p>
      </div>
    </motion.div>
  );
};
