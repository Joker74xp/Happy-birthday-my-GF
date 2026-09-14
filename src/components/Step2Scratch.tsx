import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, CheckCircle2, Award, Wand2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEffects';

interface Step2ScratchProps {
  recipientName: string;
  creatorName?: string;
  onNext: () => void;
}

interface ScratchCard {
  id: string;
  category: string;
  badgeEmoji: string;
  secretMessage: string;
  color: string;
  accent: string;
}

const defaultCards: ScratchCard[] = [
  {
    id: 'c1',
    category: 'Your Superpower',
    badgeEmoji: '✨',
    secretMessage: 'Lighting up any room with your radiant smile, warmth, and delightfully contagious laugh!',
    color: 'from-amber-500/20 to-orange-500/20',
    accent: 'text-amber-400 border-amber-500/30'
  },
  {
    id: 'c2',
    category: 'Our Favorite Trait',
    badgeEmoji: '💖',
    secretMessage: 'Your pure gold heart, genuine kindness, and the effortless way you make everyone feel special.',
    color: 'from-pink-500/20 to-rose-500/20',
    accent: 'text-pink-400 border-pink-500/30'
  },
  {
    id: 'c3',
    category: 'The Secret Truth',
    badgeEmoji: '🌟',
    secretMessage: 'Life is genuinely 100x more fun, colorful, and heartwarming whenever you are part of it.',
    color: 'from-purple-500/20 to-indigo-500/20',
    accent: 'text-purple-400 border-purple-500/30'
  },
  {
    id: 'c4',
    category: 'Birthday Wish For You',
    badgeEmoji: '🍀',
    secretMessage: 'May every goal you chase turn into gold, and may true joy find you at every turn this year!',
    color: 'from-emerald-500/20 to-teal-500/20',
    accent: 'text-emerald-400 border-emerald-500/30'
  }
];

export const Step2Scratch: React.FC<Step2ScratchProps> = ({
  recipientName,
  creatorName,
  onNext
}) => {
  const [revealedIds, setRevealedIds] = useState<string[]>([]);
  const [activeScratchingId, setActiveScratchingId] = useState<string | null>(null);

  const handleReveal = (id: string) => {
    if (revealedIds.includes(id)) return;

    sound.playScratch();
    setActiveScratchingId(id);

    setTimeout(() => {
      sound.playChime();
      const updated = [...revealedIds, id];
      setRevealedIds(updated);
      setActiveScratchingId(null);

      // Card burst confetti
      confetti({
        particleCount: 30,
        spread: 55,
        origin: { y: 0.65 },
        colors: ['#f59e0b', '#ec4899', '#8b5cf6', '#10b981']
      });

      // If all revealed, trigger bigger celebratory confetti
      if (updated.length === defaultCards.length) {
        setTimeout(() => {
          sound.playUnlock();
          confetti({
            particleCount: 75,
            spread: 95,
            origin: { y: 0.55 },
            colors: ['#fbbf24', '#f43f5e', '#a855f7', '#38bdf8']
          });
        }, 300);
      }
    }, 400);
  };

  const handleRevealAll = () => {
    if (revealedIds.length === defaultCards.length) return;
    sound.playUnlock();
    setRevealedIds(defaultCards.map((c) => c.id));
    confetti({
      particleCount: 90,
      spread: 110,
      origin: { y: 0.6 }
    });
  };

  const isAllRevealed = revealedIds.length === defaultCards.length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10 text-center select-none max-w-4xl mx-auto">
      {/* Step Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs font-semibold text-pink-400"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Step 2 of 10: Scratch & Reveal Mystery Cards</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.05 }}
        className="text-3xl sm:text-5xl font-black text-white mb-2 font-['Playfair_Display',serif]"
      >
        Four Reasons You're Celebrated ✨
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-slate-300 text-xs sm:text-sm mb-6 max-w-lg"
      >
        Hey <span className="font-semibold text-pink-400">{recipientName}</span>, scratch or tap each golden card below to reveal the secret compliments hidden underneath!
      </motion.p>

      {/* Progress & Quick Action Bar */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-md flex items-center justify-between gap-4 mb-6 bg-slate-900/80 border border-slate-800 rounded-full px-4 py-2 text-xs backdrop-blur-md shadow-lg"
      >
        <div className="flex items-center gap-2 text-slate-300">
          <Award className="w-4 h-4 text-amber-400" />
          <span>Cards Uncovered:</span>
          <span className="font-bold text-amber-400">{revealedIds.length} / {defaultCards.length}</span>
        </div>

        {!isAllRevealed ? (
          <button
            onClick={handleRevealAll}
            className="text-pink-400 hover:text-pink-300 font-semibold cursor-pointer flex items-center gap-1 text-[11px] transition-colors"
          >
            <Wand2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Scratch All</span>
          </button>
        ) : (
          <span className="text-emerald-400 font-semibold flex items-center gap-1 text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5" /> All Unlocked!
          </span>
        )}
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 w-full max-w-2xl mb-8">
        {defaultCards.map((card, idx) => {
          const isRevealed = revealedIds.includes(card.id);
          const isScratching = activeScratchingId === card.id;

          return (
            <motion.div
              key={card.id}
              id={`scratch-card-${card.id}`}
              onClick={() => handleReveal(card.id)}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 + idx * 0.08 }}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`relative rounded-2xl overflow-hidden border p-5 cursor-pointer min-h-[160px] flex flex-col justify-between text-left shadow-xl transition-colors duration-300 ${
                isRevealed
                  ? `bg-gradient-to-br ${card.color} ${card.accent}`
                  : 'bg-slate-900/90 border-slate-700/80 hover:border-amber-400/50'
              }`}
            >
              {/* Foil Scratch Layer Overlay */}
              <AnimatePresence>
                {!isRevealed && (
                  <motion.div
                    exit={{ opacity: 0, scale: 0.92, filter: 'blur(4px)' }}
                    transition={{ duration: 0.35 }}
                    className={`absolute inset-0 z-20 flex flex-col items-center justify-center p-4 bg-gradient-to-br from-amber-200 via-amber-300 to-amber-500 text-slate-900 shadow-inner ${
                      isScratching ? 'animate-pulse opacity-40' : 'opacity-100'
                    }`}
                  >
                    <div className="w-11 h-11 rounded-full bg-white/50 border border-white/70 flex items-center justify-center text-xl mb-2 shadow-sm animate-pulse">
                      ✨
                    </div>
                    <div className="text-xs font-black tracking-widest uppercase text-slate-950">
                      Scratch To Reveal
                    </div>
                    <div className="text-[10px] text-slate-800 font-semibold opacity-90 mt-0.5">
                      Tap or rub golden foil
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Secret Content Underneath */}
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs uppercase tracking-wider font-bold text-slate-300 flex items-center gap-1.5">
                    <span>{card.badgeEmoji}</span>
                    <span>{card.category}</span>
                  </span>
                  {isRevealed && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-2.5 h-2.5" /> Revealed
                    </motion.span>
                  )}
                </div>

                <p className="text-sm sm:text-base font-medium text-slate-100 leading-relaxed font-['Playfair_Display',serif]">
                  "{card.secretMessage}"
                </p>

                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Birthday Affirmation</span>
                  <span className="text-amber-300 font-serif">★ ★ ★ ★ ★</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Next Step Action Button */}
      <div className="flex flex-col items-center gap-3">
        <motion.button
          id="btn-next-step-3"
          onClick={() => {
            sound.playPop();
            onNext();
          }}
          disabled={!isAllRevealed}
          whileHover={isAllRevealed ? { scale: 1.05 } : {}}
          whileTap={isAllRevealed ? { scale: 0.95 } : {}}
          className={`px-8 py-3.5 rounded-full font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg transition-all cursor-pointer ${
            isAllRevealed
              ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white shadow-pink-500/25 animate-pulse'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
          }`}
        >
          <span>{isAllRevealed ? 'Continue to Step 3: Balloon Quest' : 'Scratch All Cards to Proceed'}</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>

        <p className="text-xs text-slate-500">
          Step 2 of 7 • Interactive Birthday Scratch Cards
        </p>
      </div>
    </div>
  );
};
