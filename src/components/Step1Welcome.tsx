import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Gift, Sparkles, ArrowRight, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEffects';

interface Step1WelcomeProps {
  recipientName: string;
  creatorName: string;
  onNext: () => void;
}

export const Step1Welcome: React.FC<Step1WelcomeProps> = ({
  recipientName,
  creatorName,
  onNext,
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const [isOpened, setIsOpened] = useState(false);

  const handleOpenGift = () => {
    if (isOpening || isOpened) return;
    setIsOpening(true);
    sound.playPop();

    // Trigger sweet burst of confetti
    confetti({
      particleCount: 55,
      spread: 75,
      origin: { y: 0.6 },
      colors: ['#f472b6', '#ec4899', '#c084fc', '#fde047', '#38bdf8']
    });

    setTimeout(() => {
      setIsOpened(true);
      sound.playUnlock();
      setTimeout(() => {
        onNext();
      }, 1000);
    }, 850);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10 text-center select-none">
      {/* Step Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-5 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs font-semibold text-pink-400"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Step 1 of 10: The Mystery Gift</span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white mb-3 max-w-lg"
      >
        A Surprise For You,{' '}
        <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300 bg-clip-text text-transparent font-['Playfair_Display',serif]">
          {recipientName}
        </span>
      </motion.h1>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-slate-300 text-sm sm:text-base mb-10 max-w-md"
      >
        Someone special has prepared an unforgettable birthday journey just for you. Tap the gift box below to unwrap your first surprise!
      </motion.p>

      {/* Interactive 3D Gift Box */}
      <motion.div
        id="gift-box-container"
        onClick={handleOpenGift}
        whileHover={{ scale: isOpened ? 1 : 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="relative group cursor-pointer mb-10"
      >
        {/* Glow halo */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-amber-500 rounded-3xl blur-2xl opacity-40 group-hover:opacity-75 transition-opacity" />

        {/* The Gift Box */}
        <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex flex-col items-center justify-center">
          {/* Lid with spring motion */}
          <motion.div
            animate={
              isOpening || isOpened
                ? { y: -80, rotate: -18, opacity: 0 }
                : { y: 6, rotate: 0, opacity: 1 }
            }
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className="w-52 sm:w-60 h-14 bg-gradient-to-r from-pink-600 via-pink-500 to-purple-600 rounded-2xl shadow-xl relative z-20 flex items-center justify-center border-b border-pink-400/30"
          >
            {/* Top Ribbon Knot */}
            <div className="absolute -top-5 flex items-center justify-center">
              <div className="w-9 h-9 rounded-full bg-amber-400 shadow-md border-2 border-amber-300 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-amber-950 animate-spin" style={{ animationDuration: '4s' }} />
              </div>
            </div>
            {/* Horizontal ribbon on lid */}
            <div className="w-full h-3 bg-amber-400/90 absolute" />
            <div className="h-full w-8 bg-amber-400/90 absolute" />
          </motion.div>

          {/* Internal light beam when opening */}
          {(isOpening || isOpened) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: 1, scale: 1.5 }}
              className="absolute -top-12 z-15 w-32 h-32 bg-amber-300/30 rounded-full blur-xl pointer-events-none"
            />
          )}

          {/* Box Body */}
          <motion.div
            animate={isOpened ? { scale: 1.08 } : { scale: 1 }}
            transition={{ type: 'spring', stiffness: 250, damping: 22 }}
            className="w-44 sm:w-52 h-36 sm:h-40 bg-gradient-to-b from-purple-700 via-pink-700 to-pink-800 rounded-b-2xl shadow-2xl relative overflow-hidden flex flex-col items-center justify-center border-t-2 border-pink-400/40"
          >
            {/* Vertical ribbon */}
            <div className="absolute inset-y-0 w-8 bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 shadow-md" />

            {/* Gift Tag */}
            <div className="absolute right-3 top-4 bg-amber-100 text-slate-900 px-2.5 py-1 rounded-md text-[10px] font-bold shadow-md transform rotate-6 border border-amber-200">
              <div>TO: {recipientName}</div>
              <div className="text-pink-600 flex items-center gap-0.5">
                {creatorName ? `FROM: ${creatorName}` : 'WITH LOVE'} <Heart className="w-2.5 h-2.5 fill-pink-600" />
              </div>
            </div>

            {/* Center gift prompt */}
            <div className="relative z-10 mt-6 flex flex-col items-center">
              <Gift className="w-10 h-10 text-white/90 drop-shadow animate-bounce" />
              <span className="text-xs font-semibold text-white/95 mt-1 tracking-wider uppercase">
                {isOpening ? 'Unwrapping Magic...' : 'Tap To Open'}
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Button fallback */}
      <motion.button
        id="btn-open-gift"
        onClick={handleOpenGift}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold text-sm shadow-lg shadow-pink-500/30 flex items-center gap-2 group transition-all cursor-pointer"
      >
        <span>Open Birthday Surprise</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </motion.button>

      {/* Footer message */}
      {creatorName ? (
        <p className="mt-8 text-xs text-slate-500">
          Created with genuine love and care by <span className="text-pink-400 font-semibold">{creatorName}</span>
        </p>
      ) : (
        <p className="mt-8 text-xs text-slate-500">
          Created with genuine love and care for your celebration ✨
        </p>
      )}
    </div>
  );
};
