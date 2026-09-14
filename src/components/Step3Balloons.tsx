import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, CheckCircle2, Ticket, PartyPopper, Wand2 } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEffects';

interface Step3BalloonsProps {
  recipientName: string;
  creatorName?: string;
  onNext: () => void;
}

interface BalloonPerk {
  id: string;
  emoji: string;
  title: string;
  description: string;
  color: string;
  badgeBg: string;
  textColor: string;
}

const perksData: BalloonPerk[] = [
  {
    id: 'b1',
    emoji: '🎟️',
    title: 'Unlimited Birthday Wishes Pass',
    description: 'Valid forever & across all galaxies with zero expiration date!',
    color: 'from-pink-500 to-rose-600',
    badgeBg: 'bg-pink-500/20 border-pink-500/30',
    textColor: 'text-pink-400'
  },
  {
    id: 'b2',
    emoji: '🍰',
    title: 'Zero-Calorie Cake Privilege',
    description: 'Permission to devour as many slices of birthday cake as your heart desires today!',
    color: 'from-amber-400 to-orange-500',
    badgeBg: 'bg-amber-500/20 border-amber-500/30',
    textColor: 'text-amber-400'
  },
  {
    id: 'b3',
    emoji: '👑',
    title: 'Royal Immunity VIP Pass',
    description: 'Total immunity from chores, dishes, and stressful tasks today — only royalty rules!',
    color: 'from-purple-500 to-indigo-600',
    badgeBg: 'bg-purple-500/20 border-purple-500/30',
    textColor: 'text-purple-400'
  },
  {
    id: 'b4',
    emoji: '✈️',
    title: 'Spontaneous Adventure Coupon',
    description: 'Good for one impromptu fun trip, road voyage, or decadent late-night feast!',
    color: 'from-cyan-400 to-blue-500',
    badgeBg: 'bg-cyan-500/20 border-cyan-500/30',
    textColor: 'text-cyan-400'
  },
  {
    id: 'b5',
    emoji: '🫂',
    title: 'Infinite Warm Hugs Guarantee',
    description: 'Claimable anytime with zero questions asked, whenever you need comfort or love!',
    color: 'from-emerald-400 to-teal-600',
    badgeBg: 'bg-emerald-500/20 border-emerald-500/30',
    textColor: 'text-emerald-400'
  }
];

export const Step3Balloons: React.FC<Step3BalloonsProps> = ({
  recipientName,
  creatorName,
  onNext
}) => {
  const [poppedIds, setPoppedIds] = useState<string[]>([]);

  const handlePopBalloon = (id: string, e?: React.MouseEvent) => {
    if (poppedIds.includes(id)) return;

    sound.playPop();

    // Trigger localized confetti burst
    const x = e ? e.clientX / window.innerWidth : 0.5;
    const y = e ? e.clientY / window.innerHeight : 0.5;

    confetti({
      particleCount: 35,
      spread: 65,
      origin: { x, y },
      colors: ['#ff0a54', '#ff477e', '#ff7096', '#fde047', '#38bdf8']
    });

    const updated = [...poppedIds, id];
    setPoppedIds(updated);

    if (updated.length === perksData.length) {
      setTimeout(() => {
        sound.playUnlock();
        confetti({
          particleCount: 85,
          spread: 110,
          origin: { y: 0.5 },
          colors: ['#f43f5e', '#ec4899', '#a855f7', '#3b82f6', '#fde047']
        });
      }, 300);
    }
  };

  const handlePopAll = () => {
    if (poppedIds.length === perksData.length) return;
    sound.playUnlock();
    setPoppedIds(perksData.map((p) => p.id));
    confetti({
      particleCount: 90,
      spread: 120,
      origin: { y: 0.5 }
    });
  };

  const isAllPopped = poppedIds.length === perksData.length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10 text-center select-none max-w-4xl mx-auto">
      {/* Step Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs font-semibold text-pink-400"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Step 3 of 10: Balloon Pop VIP Privileges</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.05 }}
        className="text-3xl sm:text-5xl font-black text-white mb-2 font-['Playfair_Display',serif]"
      >
        Pop To Claim Your Birthday Perks 🎈
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-slate-300 text-xs sm:text-sm mb-6 max-w-lg"
      >
        Every balloon carries an exclusive, non-transferable VIP Birthday Voucher for <span className="font-semibold text-pink-400">{recipientName}</span>. Tap each balloon to burst it open!
      </motion.p>

      {/* Progress header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-md flex items-center justify-between gap-4 mb-8 bg-slate-900/80 border border-slate-800 rounded-full px-4 py-2 text-xs backdrop-blur-md shadow-lg"
      >
        <div className="flex items-center gap-2 text-slate-300">
          <PartyPopper className="w-4 h-4 text-pink-400" />
          <span>Vouchers Unlocked:</span>
          <span className="font-bold text-pink-400">{poppedIds.length} / {perksData.length}</span>
        </div>

        {!isAllPopped ? (
          <button
            onClick={handlePopAll}
            className="text-pink-400 hover:text-pink-300 font-semibold cursor-pointer flex items-center gap-1 text-[11px] transition-colors"
          >
            <Wand2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Pop All</span>
          </button>
        ) : (
          <span className="text-emerald-400 font-semibold flex items-center gap-1 text-[11px]">
            <CheckCircle2 className="w-3.5 h-3.5" /> Full VIP Perks Collected!
          </span>
        )}
      </motion.div>

      {/* Floating Helium Balloons Container */}
      <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mb-10 w-full max-w-2xl min-h-[140px]">
        {perksData.map((perk, index) => {
          const isPopped = poppedIds.includes(perk.id);

          return (
            <div key={perk.id} className="flex flex-col items-center relative">
              <AnimatePresence mode="wait">
                {!isPopped ? (
                  <motion.button
                    id={`balloon-btn-${perk.id}`}
                    onClick={(e) => handlePopBalloon(perk.id, e)}
                    animate={{
                      y: [0, -8, 0, 8, 0],
                      rotate: [0, 2, 0, -2, 0]
                    }}
                    transition={{
                      duration: 3 + index * 0.4,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                    exit={{ scale: [1, 1.4, 0], opacity: [1, 0.8, 0] }}
                    className={`w-16 sm:w-20 h-20 sm:h-24 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] bg-gradient-to-br ${perk.color} shadow-lg cursor-pointer flex flex-col items-center justify-center relative group select-none`}
                    title="Click to pop!"
                  >
                    {/* Balloon knot and string */}
                    <span className="text-xl sm:text-2xl select-none group-hover:scale-125 transition-transform">
                      {perk.emoji}
                    </span>
                    <div className="absolute -bottom-1 w-2.5 h-1.5 bg-white/40 rounded-full" />
                    <div className="absolute -bottom-5 w-0.5 h-4 bg-white/30" />
                    {/* Sheen reflection */}
                    <div className="absolute top-2 left-3 w-3 h-6 bg-white/30 rounded-full rotate-[-25deg]" />
                  </motion.button>
                ) : (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="w-16 sm:w-20 h-20 sm:h-24 flex items-center justify-center text-xs text-emerald-400 font-mono bg-slate-900/60 border border-slate-800/90 rounded-2xl shadow-inner"
                  >
                    <div className="flex flex-col items-center">
                      <CheckCircle2 className="w-5 h-5 mb-1" />
                      <span className="text-[11px] font-bold">Claimed</span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <span className="text-[10px] text-slate-400 mt-2 font-medium">
                #{index + 1}
              </span>
            </div>
          );
        })}
      </div>

      {/* Collected VIP Passes Wallet */}
      <div className="w-full max-w-2xl mb-8 text-left">
        <h3 className="text-xs uppercase tracking-widest font-bold text-slate-400 mb-3 flex items-center gap-2">
          <Ticket className="w-3.5 h-3.5 text-pink-400" />
          <span>Your Collected Birthday Passes ({poppedIds.length})</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {perksData.map((perk, idx) => {
            const isCollected = poppedIds.includes(perk.id);

            if (!isCollected) {
              return (
                <div
                  key={perk.id}
                  className="border border-dashed border-slate-800 rounded-xl p-3.5 flex items-center gap-3 bg-slate-900/30 opacity-40 text-slate-500"
                >
                  <div className="text-2xl">🎈</div>
                  <div className="text-xs">Pop balloon #{idx + 1} to reveal pass...</div>
                </div>
              );
            }

            return (
              <motion.div
                key={perk.id}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                className={`border rounded-xl p-3.5 flex items-start gap-3 bg-slate-900/90 shadow-md ${perk.badgeBg}`}
              >
                <div className="text-2xl sm:text-3xl p-1 bg-white/10 rounded-lg">
                  {perk.emoji}
                </div>
                <div>
                  <h4 className={`text-xs sm:text-sm font-bold ${perk.textColor}`}>
                    {perk.title}
                  </h4>
                  <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">
                    {perk.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Action to Next Step */}
      <div className="flex flex-col items-center gap-3">
        <motion.button
          id="btn-next-step-4"
          onClick={() => {
            sound.playPop();
            onNext();
          }}
          disabled={!isAllPopped}
          whileHover={isAllPopped ? { scale: 1.05 } : {}}
          whileTap={isAllPopped ? { scale: 0.95 } : {}}
          className={`px-8 py-3.5 rounded-full font-bold text-sm sm:text-base flex items-center gap-2 shadow-lg transition-all cursor-pointer ${
            isAllPopped
              ? 'bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white shadow-pink-500/25 animate-pulse'
              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700/50'
          }`}
        >
          <span>{isAllPopped ? 'Continue to Step 4: Flower Bouquet Garden' : 'Pop All Balloons to Continue'}</span>
          <ArrowRight className="w-4 h-4" />
        </motion.button>

        <p className="text-xs text-slate-500">
          Step 3 of 10 • VIP Birthday Perks Collection
        </p>
      </div>
    </div>
  );
};
