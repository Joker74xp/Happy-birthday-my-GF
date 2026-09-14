import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Crown, Wand2, Check, Star, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEffects';

interface Step9CrownProps {
  recipientName: string;
  creatorName?: string;
  onNext: () => void;
}

interface CrownGem {
  id: string;
  name: string;
  emoji: string;
  virtue: string;
  proclamation: string;
  color: string;
  bgGlow: string;
  borderGlow: string;
  pitch: number;
}

const gemsData: CrownGem[] = [
  {
    id: 'g1',
    name: 'Rose Diamond',
    emoji: '💎',
    virtue: 'Sweetness & Grace',
    proclamation: 'You are officially proclaimed the sweetest, most radiant girl in the entire universe!',
    color: 'text-pink-300',
    bgGlow: 'from-pink-500/30 to-rose-500/20',
    borderGlow: 'border-pink-500/50 shadow-pink-500/30',
    pitch: 1.0,
  },
  {
    id: 'g2',
    name: 'Royal Amethyst',
    emoji: '🔮',
    virtue: 'Princess Privilege',
    proclamation: 'Immunity from all chores, worries, and stress. Only royal pampering and sweet treats allowed!',
    color: 'text-purple-300',
    bgGlow: 'from-purple-500/30 to-indigo-500/20',
    borderGlow: 'border-purple-500/50 shadow-purple-500/30',
    pitch: 1.2,
  },
  {
    id: 'g3',
    name: 'Golden Topaz',
    emoji: '🌟',
    virtue: 'Radiant Sunshine',
    proclamation: 'May every step you take this year be paved with warmth, golden memories, and joyful laughter!',
    color: 'text-amber-300',
    bgGlow: 'from-amber-500/30 to-orange-500/20',
    borderGlow: 'border-amber-500/50 shadow-amber-500/30',
    pitch: 1.35,
  },
  {
    id: 'g4',
    name: 'Emerald of Dreams',
    emoji: '💚',
    virtue: 'Destiny & Miracles',
    proclamation: 'Every heartfelt wish and silent prayer you hold close is hereby decreed to come true!',
    color: 'text-emerald-300',
    bgGlow: 'from-emerald-500/30 to-teal-500/20',
    borderGlow: 'border-emerald-500/50 shadow-emerald-500/30',
    pitch: 1.5,
  },
  {
    id: 'g5',
    name: 'Ruby of Endless Love',
    emoji: '💖',
    virtue: 'Everlasting Adoration',
    proclamation: 'Surrounded by genuine love, deep admiration, and unconditional protection forever.',
    color: 'text-rose-300',
    bgGlow: 'from-rose-600/30 to-red-500/20',
    borderGlow: 'border-rose-500/50 shadow-rose-500/30',
    pitch: 1.65,
  },
];

export const Step9Crown: React.FC<Step9CrownProps> = ({
  recipientName,
  creatorName,
  onNext,
}) => {
  const [placedGemIds, setPlacedGemIds] = useState<string[]>([]);
  const [activeProclamation, setActiveProclamation] = useState<CrownGem | null>(null);

  const handlePlaceGem = (gem: CrownGem) => {
    if (placedGemIds.includes(gem.id)) {
      setActiveProclamation(gem);
      return;
    }

    sound.playChime(gem.pitch);
    const updated = [...placedGemIds, gem.id];
    setPlacedGemIds(updated);
    setActiveProclamation(gem);

    confetti({
      particleCount: 30,
      spread: 60,
      origin: { y: 0.55 },
      colors: ['#fbbf24', '#ec4899', '#a855f7', '#38bdf8'],
    });

    if (updated.length === gemsData.length) {
      setTimeout(() => {
        sound.playFanfare();
        confetti({
          particleCount: 100,
          spread: 120,
          origin: { y: 0.45 },
          colors: ['#fbbf24', '#f59e0b', '#ec4899', '#8b5cf6', '#ffffff'],
        });
      }, 400);
    }
  };

  const handlePlaceAll = () => {
    if (placedGemIds.length === gemsData.length) return;
    sound.playFanfare();
    setPlacedGemIds(gemsData.map((g) => g.id));
    setActiveProclamation(gemsData[0]);
    confetti({
      particleCount: 100,
      spread: 120,
      origin: { y: 0.5 },
      colors: ['#fbbf24', '#ec4899', '#f43f5e', '#38bdf8', '#a855f7'],
    });
  };

  const isAllCrowned = placedGemIds.length === gemsData.length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10 text-center select-none max-w-4xl mx-auto">
      {/* Step Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-xs font-semibold text-amber-400"
      >
        <Crown className="w-3.5 h-3.5" />
        <span>Step 9 of 10: Crown of Birthday Royalty</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.05 }}
        className="text-3xl sm:text-5xl font-black text-white mb-2 font-['Playfair_Display',serif]"
      >
        Crown The Birthday Queen 👑
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-slate-300 text-xs sm:text-sm mb-6 max-w-lg"
      >
        Every queen deserves her sparkling tiara. Place the five celestial gemstones
        into <span className="font-semibold text-pink-400">{recipientName}</span>'s crown
        to unlock her royal birthday decrees!
      </motion.p>

      {/* Interactive Royal Crown Display */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-md p-6 rounded-3xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border-2 border-amber-500/40 shadow-2xl mb-8 flex flex-col items-center"
      >
        {/* Glow halo */}
        <div
          className={`absolute -inset-1 rounded-3xl transition-opacity duration-700 pointer-events-none ${
            isAllCrowned ? 'bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-purple-500/20 blur-xl opacity-100 animate-pulse' : 'opacity-0'
          }`}
        />

        {/* Crown Icon / Visual */}
        <div className="relative mb-4">
          <motion.div
            animate={isAllCrowned ? { rotate: [0, -3, 3, 0], scale: [1, 1.05, 1] } : {}}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="text-6xl sm:text-7xl filter drop-shadow-[0_0_25px_rgba(251,191,36,0.6)]"
          >
            👑
          </motion.div>
          {isAllCrowned && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-2 -right-3 px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-pink-500 text-slate-950 text-[10px] font-black uppercase tracking-wider shadow-md"
            >
              Coronated
            </motion.div>
          )}
        </div>

        {/* Gem Slots on the Crown */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-4">
          {gemsData.map((gem) => {
            const isPlaced = placedGemIds.includes(gem.id);
            return (
              <motion.button
                key={gem.id}
                id={`gem-slot-${gem.id}`}
                onClick={() => handlePlaceGem(gem)}
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                className={`w-11 h-11 sm:w-13 sm:h-13 rounded-2xl flex items-center justify-center text-lg sm:text-xl transition-all duration-300 border cursor-pointer ${
                  isPlaced
                    ? `bg-gradient-to-b ${gem.bgGlow} ${gem.borderGlow} shadow-lg scale-105`
                    : 'bg-slate-800/80 border-slate-700 text-slate-500 hover:border-amber-400/50 hover:text-slate-400'
                }`}
                title={gem.name}
              >
                {isPlaced ? gem.emoji : '✧'}
              </motion.button>
            );
          })}
        </div>

        <p className="text-xs text-amber-300/90 font-medium">
          {placedGemIds.length} of {gemsData.length} Gemstones Embedded
        </p>
      </motion.div>

      {/* Proclamation / Decree Card Display */}
      <AnimatePresence mode="wait">
        {activeProclamation ? (
          <motion.div
            key={activeProclamation.id}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className={`w-full max-w-xl p-4 sm:p-5 rounded-2xl bg-gradient-to-r ${activeProclamation.bgGlow} bg-slate-900/90 border ${activeProclamation.borderGlow} backdrop-blur-md mb-6 text-left shadow-xl`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xl">{activeProclamation.emoji}</span>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
                  Royal Decree • {activeProclamation.virtue}
                </span>
              </div>
              <span className="text-[10px] font-semibold text-slate-400 px-2 py-0.5 rounded-full bg-slate-800 border border-slate-700">
                Official Law 📜
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-100 font-medium leading-relaxed italic">
              "{activeProclamation.proclamation}"
            </p>
          </motion.div>
        ) : (
          <div className="mb-6 text-xs text-slate-400 italic">
            Tap the gemstones above to place them and reveal your royal birthday decrees!
          </div>
        )}
      </AnimatePresence>

      {/* Action Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        {!isAllCrowned ? (
          <motion.button
            id="btn-crown-all-gems"
            onClick={handlePlaceAll}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-amber-300 text-xs font-semibold flex items-center gap-2 border border-amber-500/30 cursor-pointer shadow-sm transition-colors"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>Crown Instantly</span>
          </motion.button>
        ) : (
          <motion.button
            id="btn-next-step-finale"
            onClick={() => {
              sound.playClick(600);
              onNext();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-7 py-3 rounded-full bg-gradient-to-r from-amber-400 via-pink-500 to-purple-600 hover:from-amber-300 hover:to-purple-500 text-slate-950 font-black text-xs sm:text-sm shadow-xl shadow-pink-500/30 flex items-center gap-2 cursor-pointer transition-all uppercase tracking-wider"
          >
            <Crown className="w-4 h-4 text-slate-950" />
            <span>Enter The Grand Finale & Fireworks</span>
            <ArrowRight className="w-4 h-4 text-slate-950" />
          </motion.button>
        )}
      </div>
    </div>
  );
};
