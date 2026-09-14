import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Heart, Star, Wand2, CheckCircle2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEffects';

interface Step6ReasonsProps {
  recipientName: string;
  creatorName?: string;
  onNext: () => void;
}

interface ReasonCard {
  id: string;
  title: string;
  emoji: string;
  text: string;
  category: string;
  color: string;
  bgGradient: string;
}

const reasonsData: ReasonCard[] = [
  {
    id: 'r1',
    title: 'Your Radiant Smile',
    emoji: '😊',
    category: 'The Prettiest Light',
    text: 'The way your eyes crinkle and your whole face lights up whenever you laugh genuinely. It instantly turns the gloomiest day into pure sunshine.',
    color: 'text-amber-400',
    bgGradient: 'from-amber-500/15 via-rose-500/10 to-slate-900/90',
  },
  {
    id: 'r2',
    title: 'Your Pure Heart & Kindness',
    emoji: '💖',
    category: 'Gentle Soul',
    text: 'You have a rare gift for making everyone around you feel seen, valued, and safe. Your compassion makes the whole world a softer place.',
    color: 'text-pink-400',
    bgGradient: 'from-pink-500/15 via-purple-500/10 to-slate-900/90',
  },
  {
    id: 'r3',
    title: 'Your Playful & Cute Spark',
    emoji: '🦋',
    category: 'Joyful Spirit',
    text: 'The adorable excitement you get over little things, your cute expressions, your sense of humor, and that boundless, infectious energy.',
    color: 'text-fuchsia-400',
    bgGradient: 'from-fuchsia-500/15 via-rose-500/10 to-slate-900/90',
  },
  {
    id: 'r4',
    title: 'Your Natural Elegance & Grace',
    emoji: '👑',
    category: 'True Queen',
    text: 'Whether you are dressed up for an occasion or curled up in cozy pajamas, your poise, inner confidence, and beauty shine through effortlessly.',
    color: 'text-purple-400',
    bgGradient: 'from-purple-500/15 via-indigo-500/10 to-slate-900/90',
  },
  {
    id: 'r5',
    title: 'Your Sweet Voice & Laughter',
    emoji: '🎶',
    category: 'Pure Melody',
    text: 'Hearing you giggle or tell a passionate story is my absolute favorite sound in the world. It brings an instant sense of home and peace.',
    color: 'text-rose-400',
    bgGradient: 'from-rose-500/15 via-pink-500/10 to-slate-900/90',
  },
  {
    id: 'r6',
    title: 'Just Being Authentically You',
    emoji: '✨',
    category: 'One in Eight Billion',
    text: 'Never doubt how extraordinary you are. You are smart, strong, gorgeous, hilarious, and the world is endlessly better because you were born.',
    color: 'text-cyan-400',
    bgGradient: 'from-cyan-500/15 via-blue-500/10 to-slate-900/90',
  },
];

export const Step6Reasons: React.FC<Step6ReasonsProps> = ({
  recipientName,
  creatorName,
  onNext,
}) => {
  const [revealedIds, setRevealedIds] = useState<string[]>([]);

  const handleRevealCard = (id: string, index: number) => {
    if (revealedIds.includes(id)) return;
    sound.playChime(1.0 + index * 0.1);
    const updated = [...revealedIds, id];
    setRevealedIds(updated);

    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#ec4899', '#fde047', '#c084fc'],
    });

    if (updated.length === reasonsData.length) {
      setTimeout(() => {
        sound.playFanfare();
        confetti({
          particleCount: 85,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#f43f5e', '#ec4899', '#fbbf24', '#a855f7'],
        });
      }, 400);
    }
  };

  const handleRevealAll = () => {
    if (revealedIds.length === reasonsData.length) return;
    sound.playFanfare();
    setRevealedIds(reasonsData.map((r) => r.id));
    confetti({
      particleCount: 90,
      spread: 110,
      origin: { y: 0.55 },
      colors: ['#fbbf24', '#f43f5e', '#a855f7', '#38bdf8'],
    });
  };

  const isComplete = revealedIds.length === reasonsData.length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10 text-center select-none max-w-4xl mx-auto">
      {/* Step Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs font-semibold text-pink-400"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Step 6 of 10: Why You Are So Cherished</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.05 }}
        className="text-3xl sm:text-5xl font-black text-white mb-2 font-['Playfair_Display',serif]"
      >
        Reasons You Are So Special 💖
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-slate-300 text-xs sm:text-sm mb-6 max-w-lg"
      >
        There are a million reasons to celebrate you today,{' '}
        <span className="font-semibold text-pink-400">{recipientName}</span>. Tap
        each card to reveal what makes you so deeply cherished!
      </motion.p>

      {/* Progress & Quick Reveal Button */}
      <div className="w-full flex items-center justify-between gap-2 mb-6 px-2">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <Heart className="w-4 h-4 text-pink-400" />
          <span>
            {revealedIds.length} of {reasonsData.length} reasons unlocked
          </span>
        </div>

        {!isComplete && (
          <motion.button
            id="btn-reveal-all-reasons"
            onClick={handleRevealAll}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700 text-pink-300 text-xs font-semibold flex items-center gap-1.5 border border-pink-500/30 cursor-pointer transition-colors"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>Unlock All</span>
          </motion.button>
        )}
      </div>

      {/* Reasons Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-8">
        {reasonsData.map((item, idx) => {
          const isRevealed = revealedIds.includes(item.id);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleRevealCard(item.id, idx)}
              className={`p-5 rounded-2xl bg-gradient-to-b ${item.bgGradient} border ${
                isRevealed ? 'border-pink-500/40 shadow-pink-500/10' : 'border-slate-800 hover:border-slate-700'
              } backdrop-blur-sm cursor-pointer transition-all duration-300 relative text-left overflow-hidden shadow-lg flex flex-col justify-between min-h-[170px]`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-2xl filter drop-shadow-sm">{item.emoji}</span>
                  <div>
                    <span className="text-[10px] font-bold tracking-wider uppercase text-pink-400/80">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  </div>
                </div>

                <div
                  className={`p-1 rounded-full text-[10px] font-bold ${
                    isRevealed ? 'bg-pink-500/20 text-pink-300' : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {isRevealed ? <CheckCircle2 className="w-3.5 h-3.5 text-pink-400" /> : <Star className="w-3.5 h-3.5" />}
                </div>
              </div>

              {/* Body */}
              <div className="mt-2">
                <AnimatePresence mode="wait">
                  {isRevealed ? (
                    <motion.p
                      key="revealed"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-slate-200 leading-relaxed"
                    >
                      "{item.text}"
                    </motion.p>
                  ) : (
                    <motion.div
                      key="hidden"
                      className="py-4 flex flex-col items-center justify-center text-slate-500 gap-1"
                    >
                      <Sparkles className="w-4 h-4 text-pink-400/40 animate-pulse" />
                      <span className="text-[11px] italic">Tap to reveal sweet confession...</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Shimmer line */}
              {isRevealed && (
                <div className="mt-3 pt-2 border-t border-white/5 flex items-center justify-between text-[10px] text-pink-400/70 font-semibold">
                  <span>Adored forever</span>
                  <span>✨</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Completion Banner */}
      <AnimatePresence>
        {isComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.45 }}
            className="w-full max-w-xl p-5 rounded-2xl bg-gradient-to-r from-pink-900/40 via-purple-900/40 to-slate-900/90 border border-pink-500/40 shadow-xl shadow-pink-500/10 backdrop-blur-md mb-6"
          >
            <div className="flex items-center justify-center gap-2 mb-2 text-pink-300 font-bold text-sm">
              <Heart className="w-4 h-4 fill-pink-400 text-pink-400 animate-pulse" />
              <span>You Are Truly Cherished Beyond Words 💖</span>
            </div>
            <p className="text-xs text-slate-300 mb-4">
              "Never forget how deeply you are loved and appreciated. Now, make a wish on your birthday cake!"
            </p>

            <motion.button
              id="btn-next-step-cake"
              onClick={() => {
                sound.playClick(600);
                onNext();
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-pink-500/30 flex items-center gap-2 mx-auto cursor-pointer transition-all"
            >
              <span>Make A Wish & Blow Candles</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {!isComplete && revealedIds.length >= 3 && (
        <motion.button
          id="btn-continue-early-reasons"
          onClick={() => {
            sound.playClick(600);
            onNext();
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-2 text-xs text-pink-400 hover:text-pink-300 underline underline-offset-4 cursor-pointer"
        >
          Proceed to Cake & Candles &rarr;
        </motion.button>
      )}
    </div>
  );
};
