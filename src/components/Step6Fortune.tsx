import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Send, Moon, Compass, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEffects';

interface Step6FortuneProps {
  recipientName: string;
  creatorName?: string;
  onNext: () => void;
}

interface FortuneProphecy {
  theme: string;
  aura: string;
  luckyNumbers: string;
  blessing: string;
}

const prophecies: FortuneProphecy[] = [
  {
    theme: 'Magnificent Leaps & Boundless Joy',
    aura: 'Sunburst Gold & Radiant Rose Quartz',
    luckyNumbers: '7 • 11 • 23 • 44 • 88',
    blessing: 'The universe is conspiring in your favor. Every door you knock on this year will open with warmth.'
  },
  {
    theme: 'Serenity, Success & Unstoppable Creativity',
    aura: 'Electric Amethyst & Cosmic Indigo',
    luckyNumbers: '3 • 9 • 18 • 27 • 77',
    blessing: 'Your passions will turn into realities. Trust your instincts and celebrate your unique brilliance.'
  },
  {
    theme: 'Laughter, Deep Friendships & Great Adventures',
    aura: 'Emerald Green & Honey Topaz',
    luckyNumbers: '5 • 12 • 21 • 36 • 99',
    blessing: 'Expect unexpected heartwarming reunions, spontaneous journeys, and smiles that make your cheeks ache.'
  }
];

export const Step6Fortune: React.FC<Step6FortuneProps> = ({
  recipientName,
  creatorName,
  onNext
}) => {
  const [isCracked, setIsCracked] = useState(false);
  const [activeProphecy] = useState<FortuneProphecy>(() => prophecies[Math.floor(Math.random() * prophecies.length)]);
  const [customWish, setCustomWish] = useState('');
  const [isLanternLaunched, setIsLanternLaunched] = useState(false);

  const handleCrackCookie = () => {
    if (isCracked) return;
    sound.playCrack();

    confetti({
      particleCount: 65,
      spread: 85,
      origin: { y: 0.5 },
      shapes: ['star', 'circle'],
      colors: ['#fbbf24', '#f59e0b', '#fde047', '#ffffff']
    });

    setTimeout(() => {
      sound.playChime();
      setIsCracked(true);
    }, 220);
  };

  const handleLaunchLantern = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLanternLaunched) return;

    sound.playWhoosh();
    setIsLanternLaunched(true);

    confetti({
      particleCount: 50,
      spread: 120,
      origin: { y: 0.4 },
      colors: ['#f97316', '#fbbf24', '#f43f5e', '#a855f7']
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10 text-center select-none max-w-3xl mx-auto">
      {/* Step Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs font-semibold text-pink-400"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Step 8 of 10: Cosmic Fortune & Wishing Lantern</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-3xl sm:text-5xl font-black text-white mb-2 font-['Playfair_Display',serif]"
      >
        Your Cosmic Birthday Prophecy 🔮
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-slate-300 text-xs sm:text-sm mb-8 max-w-md"
      >
        Crack open the golden celestial fortune cookie to reveal what the stars have written for <span className="font-semibold text-pink-400">{recipientName}</span>'s year ahead!
      </motion.p>

      {/* Interactive Golden Fortune Cookie */}
      <div className="w-full max-w-lg mb-8">
        <AnimatePresence mode="wait">
          {!isCracked ? (
            <motion.div
              key="uncracked"
              id="btn-crack-cookie"
              onClick={handleCrackCookie}
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.96 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="group cursor-pointer p-8 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border-2 border-amber-500/40 hover:border-amber-400 shadow-2xl hover:shadow-amber-500/20 transition-colors flex flex-col items-center"
            >
              {/* Fortune Cookie Visual */}
              <div className="relative mb-4">
                <div className="text-6xl sm:text-7xl filter drop-shadow-[0_0_20px_rgba(251,191,36,0.5)] group-hover:rotate-6 transition-transform">
                  🥠
                </div>
                <div className="absolute -inset-2 bg-amber-400/20 rounded-full blur-xl -z-10 animate-pulse" />
              </div>

              <div className="font-bold text-amber-300 text-base sm:text-lg tracking-wide uppercase flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Tap To Crack Open</span>
                <Sparkles className="w-4 h-4" />
              </div>
              <p className="text-xs text-slate-400 mt-1">
                Listen for the golden crack!
              </p>
            </motion.div>
          ) : (
            /* Revealed Prophecy Parchment Card */
            <motion.div
              key="cracked"
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: 'spring', stiffness: 220, damping: 20 }}
              className="p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-amber-50/95 to-amber-100/90 text-slate-900 border-2 border-amber-300 shadow-2xl text-left"
            >
              <div className="flex items-center justify-between border-b border-amber-900/10 pb-3 mb-4">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-800">
                  <Compass className="w-4 h-4 text-amber-600" />
                  <span>Celestial Horoscope</span>
                </div>
                <span className="text-[11px] font-mono text-amber-700 bg-amber-200/60 px-2 py-0.5 rounded">
                  Personalized for {recipientName}
                </span>
              </div>

              {/* Prophecy Theme */}
              <div className="mb-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-700 block">
                  Yearly Cosmic Theme
                </span>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 font-['Playfair_Display',serif]">
                  ✨ {activeProphecy.theme}
                </h3>
              </div>

              {/* Blessing Message */}
              <p className="text-sm text-slate-800 italic leading-relaxed mb-4 border-l-2 border-amber-500 pl-3">
                "{activeProphecy.blessing}"
              </p>

              {/* Quick Metrics */}
              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-amber-900/10 text-xs">
                <div className="bg-white/60 p-2.5 rounded-xl border border-amber-200">
                  <span className="text-[10px] text-amber-800 font-semibold block uppercase">
                    Radiant Aura
                  </span>
                  <span className="font-bold text-slate-900 text-xs">
                    {activeProphecy.aura}
                  </span>
                </div>
                <div className="bg-white/60 p-2.5 rounded-xl border border-amber-200">
                  <span className="text-[10px] text-amber-800 font-semibold block uppercase">
                    Lucky Coordinates
                  </span>
                  <span className="font-mono font-bold text-amber-700 text-xs">
                    {activeProphecy.luckyNumbers}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sky Lantern Wish Launcher */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-lg mb-8 p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-left"
      >
        <div className="flex items-center gap-2 text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
          <Moon className="w-3.5 h-3.5 text-pink-400" />
          <span>Launch A Floating Sky Lantern</span>
        </div>

        <AnimatePresence mode="wait">
          {!isLanternLaunched ? (
            <motion.form
              key="lantern-form"
              onSubmit={handleLaunchLantern}
              className="flex flex-col gap-2.5"
            >
              <p className="text-xs text-slate-400">
                Cast a private wish, dream, or goal to the heavens:
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customWish}
                  onChange={(e) => setCustomWish(e.target.value)}
                  placeholder="e.g. Unconditional happiness, epic voyages & peace..."
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3.5 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-pink-500 transition-colors"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-400 hover:to-pink-400 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer transition-colors shadow-md"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Launch</span>
                </motion.button>
              </div>
            </motion.form>
          ) : (
            <motion.div
              key="lantern-launched"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300"
            >
              <motion.div
                animate={{ y: [-2, -8, -2] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                className="text-2xl"
              >
                🏮
              </motion.div>
              <div>
                <div className="font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Your Sky Lantern Is Soaring!</span>
                </div>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  "{customWish || 'A secret, beautiful wish'}" is now floating through the cosmic sky.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Action to Grand Celebration Finale */}
      <div className="flex flex-col items-center gap-3">
        <motion.button
          id="btn-next-step-7"
          onClick={() => {
            sound.playFanfare();
            onNext();
          }}
          disabled={!isCracked}
          whileHover={isCracked ? { scale: 1.05 } : {}}
          whileTap={isCracked ? { scale: 0.95 } : {}}
          className={`px-8 py-3.5 rounded-full font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg transition-all cursor-pointer ${
            isCracked
              ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white shadow-pink-500/25'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
          }`}
        >
          <span>{isCracked ? 'Continue to Step 9: Crown The Birthday Queen 👑' : 'Crack Open Cookie to Proceed'}</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>

        <p className="text-xs text-slate-500">
          Step 8 of 10 • Celestial Birthday Prophecy & Wish Lantern
        </p>
      </div>
    </div>
  );
};
