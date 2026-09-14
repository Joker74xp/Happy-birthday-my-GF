import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Heart, Flower2, Wand2, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEffects';

interface Step4BouquetProps {
  recipientName: string;
  creatorName?: string;
  onNext: () => void;
}

interface FlowerItem {
  id: string;
  name: string;
  emoji: string;
  meaning: string;
  description: string;
  color: string;
  bgGradient: string;
  borderGlow: string;
  pitch: number;
}

const flowersData: FlowerItem[] = [
  {
    id: 'f1',
    name: 'Velvet Rose',
    emoji: '🌹',
    meaning: 'Eternal Grace & Adoration',
    description: 'For your timeless beauty, captivating charm, and the warmth you radiate wherever you go.',
    color: 'text-rose-400',
    bgGradient: 'from-rose-500/20 to-pink-500/20',
    borderGlow: 'border-rose-500/40 hover:border-rose-400 shadow-rose-500/20',
    pitch: 1.0,
  },
  {
    id: 'f2',
    name: 'Pink Peony',
    emoji: '🌸',
    meaning: 'Pure Sweetness & Luck',
    description: 'For your soft heart, gentle compassion, and the effortless way you make everyone feel loved.',
    color: 'text-pink-300',
    bgGradient: 'from-pink-500/20 to-purple-500/20',
    borderGlow: 'border-pink-500/40 hover:border-pink-300 shadow-pink-500/20',
    pitch: 1.15,
  },
  {
    id: 'f3',
    name: 'Golden Sunflower',
    emoji: '🌻',
    meaning: 'Radiant Joy & Sunshine',
    description: 'For your bright smile and vibrant energy that lights up any room the moment you walk in.',
    color: 'text-amber-300',
    bgGradient: 'from-amber-500/20 to-orange-500/20',
    borderGlow: 'border-amber-500/40 hover:border-amber-300 shadow-amber-500/20',
    pitch: 1.25,
  },
  {
    id: 'f4',
    name: 'Pastel Tulip',
    emoji: '🌷',
    meaning: 'Playful Laughter & Wonder',
    description: 'For your adorable expressions, sweet sense of humor, and cheerful, loving spirit.',
    color: 'text-fuchsia-300',
    bgGradient: 'from-fuchsia-500/20 to-rose-500/20',
    borderGlow: 'border-fuchsia-500/40 hover:border-fuchsia-300 shadow-fuchsia-500/20',
    pitch: 1.35,
  },
  {
    id: 'f5',
    name: 'Royal Lavender',
    emoji: '🪻',
    meaning: 'Peace & Serenity',
    description: 'For your comforting presence, deep thoughts, and the tranquility you bring to my soul.',
    color: 'text-purple-300',
    bgGradient: 'from-purple-500/20 to-indigo-500/20',
    borderGlow: 'border-purple-500/40 hover:border-purple-300 shadow-purple-500/20',
    pitch: 1.45,
  },
  {
    id: 'f6',
    name: 'White Daisy',
    emoji: '🌼',
    meaning: 'Innocence & Sparkling Magic',
    description: 'For your true authenticity, sparkling eyes, and the genuine innocence that makes you unique.',
    color: 'text-emerald-300',
    bgGradient: 'from-emerald-500/20 to-teal-500/20',
    borderGlow: 'border-emerald-500/40 hover:border-emerald-300 shadow-emerald-500/20',
    pitch: 1.6,
  },
];

export const Step4Bouquet: React.FC<Step4BouquetProps> = ({
  recipientName,
  creatorName,
  onNext,
}) => {
  const [bloomedIds, setBloomedIds] = useState<string[]>([]);

  const handleBloomFlower = (flower: FlowerItem) => {
    if (bloomedIds.includes(flower.id)) return;

    sound.playChime(flower.pitch);
    const newBloomed = [...bloomedIds, flower.id];
    setBloomedIds(newBloomed);

    // Sweet flower petal shower
    confetti({
      particleCount: 28,
      spread: 60,
      origin: { y: 0.65 },
      colors: ['#fda4af', '#f472b6', '#fde047', '#e879f9', '#ffffff'],
    });

    if (newBloomed.length === flowersData.length) {
      setTimeout(() => {
        sound.playFanfare();
        confetti({
          particleCount: 80,
          spread: 100,
          origin: { y: 0.5 },
          colors: ['#f43f5e', '#ec4899', '#fbbf24', '#c084fc'],
        });
      }, 400);
    }
  };

  const handleBloomAll = () => {
    if (bloomedIds.length === flowersData.length) return;
    sound.playFanfare();
    setBloomedIds(flowersData.map((f) => f.id));
    confetti({
      particleCount: 90,
      spread: 110,
      origin: { y: 0.55 },
      colors: ['#f43f5e', '#fbbf24', '#a855f7', '#38bdf8', '#34d399'],
    });
  };

  const isComplete = bloomedIds.length === flowersData.length;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 relative z-10 text-center select-none max-w-4xl mx-auto">
      {/* Step Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs font-semibold text-pink-400"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Step 4 of 10: The Magic Flower Garden</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.05 }}
        className="text-3xl sm:text-5xl font-black text-white mb-2 font-['Playfair_Display',serif]"
      >
        A Bouquet For My Birthday Girl 💐
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-slate-300 text-xs sm:text-sm mb-6 max-w-lg"
      >
        Every single blossom represents something precious about{' '}
        <span className="font-semibold text-pink-400">{recipientName}</span>. Tap
        each flower bud to watch it bloom and reveal its message!
      </motion.p>

      {/* Progress Counter & Auto-bloom button */}
      <div className="w-full flex items-center justify-between gap-2 mb-6 px-2">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
          <Flower2 className="w-4 h-4 text-pink-400" />
          <span>
            {bloomedIds.length} of {flowersData.length} flowers bloomed
          </span>
        </div>

        {!isComplete && (
          <motion.button
            id="btn-bloom-all-flowers"
            onClick={handleBloomAll}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3 py-1 rounded-full bg-slate-800/80 hover:bg-slate-700/80 text-pink-300 text-xs font-semibold flex items-center gap-1.5 border border-pink-500/30 cursor-pointer transition-colors"
          >
            <Wand2 className="w-3.5 h-3.5" />
            <span>Bloom All</span>
          </motion.button>
        )}
      </div>

      {/* Flowers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-8">
        {flowersData.map((flower, idx) => {
          const isBloomed = bloomedIds.includes(flower.id);

          return (
            <motion.div
              key={flower.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.08 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleBloomFlower(flower)}
              className={`p-4 sm:p-5 rounded-2xl bg-gradient-to-b ${flower.bgGradient} bg-slate-900/80 border ${
                isBloomed ? flower.borderGlow : 'border-slate-800 hover:border-slate-700'
              } backdrop-blur-sm cursor-pointer transition-all duration-300 relative text-left overflow-hidden shadow-lg flex flex-col justify-between`}
            >
              {/* Top Row: Emoji & Status Badge */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div
                  className={`text-3xl sm:text-4xl filter ${
                    isBloomed ? 'drop-shadow-[0_0_12px_rgba(244,63,94,0.6)] scale-110' : 'grayscale-50 opacity-60'
                  } transition-all duration-300`}
                >
                  {flower.emoji}
                </div>

                <div
                  className={`px-2.5 py-0.8 rounded-full text-[11px] font-bold flex items-center gap-1 ${
                    isBloomed
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      : 'bg-slate-800 text-slate-400 border border-slate-700'
                  }`}
                >
                  {isBloomed ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span>Bloomed</span>
                    </>
                  ) : (
                    <span>Tap to Bloom</span>
                  )}
                </div>
              </div>

              {/* Flower Name & Meaning */}
              <div>
                <h3 className={`text-base font-bold ${flower.color} mb-1 flex items-center gap-1.5`}>
                  <span>{flower.name}</span>
                </h3>
                <p className="text-xs font-semibold text-slate-300 mb-2">
                  {flower.meaning}
                </p>

                {/* Description Reveal */}
                <AnimatePresence>
                  {isBloomed ? (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      transition={{ duration: 0.35 }}
                      className="text-xs text-slate-300/90 leading-relaxed italic border-t border-slate-800/80 pt-2"
                    >
                      "{flower.description}"
                    </motion.p>
                  ) : (
                    <p className="text-[11px] text-slate-500 italic">
                      Tap this blossom to see what it symbolizes for {recipientName}...
                    </p>
                  )}
                </AnimatePresence>
              </div>

              {/* Shimmer overlay when bloomed */}
              {isBloomed && (
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-full -mr-6 -mt-6 pointer-events-none" />
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Completed Bouquet Card & Proceed to Next Step */}
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
              <span>Your Birthday Bouquet Is Hand-Tied With Love 🎀</span>
            </div>
            <p className="text-xs text-slate-300 mb-4">
              "Just like these flowers, you bring color, sweetness, and beauty into every day. May your life blossom with joy and wonder!"
            </p>

            <motion.button
              id="btn-next-step-letter"
              onClick={() => {
                sound.playClick(600);
                onNext();
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-xs shadow-lg shadow-pink-500/30 flex items-center gap-2 mx-auto cursor-pointer transition-all"
            >
              <span>Read Your Secret Letter</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* If not complete, show continue when at least 3 flowers bloomed */}
      {!isComplete && bloomedIds.length >= 3 && (
        <motion.button
          id="btn-continue-early-bouquet"
          onClick={() => {
            sound.playClick(600);
            onNext();
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="mt-2 text-xs text-pink-400 hover:text-pink-300 underline underline-offset-4 cursor-pointer"
        >
          Skip ahead to next surprise &rarr;
        </motion.button>
      )}
    </div>
  );
};
