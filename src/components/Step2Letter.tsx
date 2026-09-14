import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, MailOpen, Sparkles, Cake, Heart, Stamp, ArrowRight } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface Step2LetterProps {
  recipientName: string;
  creatorName: string;
  greeting: string;
  messages: string[];
  closing: string;
  onNext: () => void;
}

export const Step2Letter: React.FC<Step2LetterProps> = ({
  recipientName,
  creatorName,
  greeting,
  messages,
  closing,
  onNext,
}) => {
  const [isSealBroken, setIsSealBroken] = useState(false);
  const [isLetterUnfolded, setIsLetterUnfolded] = useState(false);
  const [revealedParagraphs, setRevealedParagraphs] = useState<number>(0);

  const handleOpenEnvelope = () => {
    if (isSealBroken) return;
    setIsSealBroken(true);
    sound.playPop();

    setTimeout(() => {
      sound.playUnlock();
      setIsLetterUnfolded(true);
    }, 450);
  };

  // Line-by-line reveal animation
  useEffect(() => {
    if (!isLetterUnfolded) return;
    const interval = setInterval(() => {
      setRevealedParagraphs((prev) => {
        if (prev < messages.length + 2) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 380);

    return () => clearInterval(interval);
  }, [isLetterUnfolded, messages.length]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10 select-none">
      {/* Step Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs font-semibold text-pink-400"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Step 5 of 10: A Letter From The Heart</span>
      </motion.div>

      <AnimatePresence mode="wait">
        {!isLetterUnfolded ? (
          /* Envelope View */
          <motion.div
            key="envelope"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center text-center"
          >
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-2 font-['Playfair_Display',serif]">
              You've Got A Secret Letter 💌
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm mb-8">
              Click the wax seal to break it open and read the message inside
            </p>

            {/* Envelope Graphic */}
            <motion.div
              id="interactive-envelope"
              onClick={handleOpenEnvelope}
              whileHover={{ scale: 1.04, y: -4 }}
              whileTap={{ scale: 0.98 }}
              className="relative w-72 sm:w-88 h-48 sm:h-56 bg-amber-50 rounded-2xl shadow-2xl shadow-amber-950/40 border-2 border-amber-200 cursor-pointer group"
            >
              {/* Stamp on top-right */}
              <div className="absolute top-3 right-3 w-10 h-12 border-2 border-dashed border-rose-400/80 rounded bg-rose-50 flex flex-col items-center justify-center text-[8px] text-rose-500 font-bold rotate-6 shadow-sm">
                <Stamp className="w-4 h-4 text-rose-400" />
                <span>SPECIAL</span>
              </div>

              {/* Postal postmark */}
              <div className="absolute top-4 right-16 text-[9px] font-mono text-slate-400 border border-slate-300 rounded-full px-1.5 py-0.5 -rotate-12">
                POSTED WITH LOVE
              </div>

              {/* Center Recipient Address */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
                <div className="font-['Caveat',cursive] text-2xl sm:text-3xl font-bold text-slate-800">
                  To: {recipientName}
                </div>
                <div className="text-xs text-slate-500 font-medium mt-1">
                  {creatorName ? `Delivered straight from ${creatorName}` : 'Special Birthday Delivery'}
                </div>
              </div>

              {/* Wax Seal */}
              <motion.div
                animate={
                  isSealBroken
                    ? { scale: 0.3, opacity: 0 }
                    : { scale: 1, opacity: 1 }
                }
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-gradient-to-tr from-rose-700 via-rose-600 to-red-500 border-2 border-rose-800 shadow-xl flex items-center justify-center cursor-pointer group-hover:scale-110"
              >
                <div className="w-10 h-10 rounded-full border border-dashed border-rose-300/60 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-rose-200 fill-rose-200" />
                </div>
              </motion.div>
            </motion.div>

            <motion.button
              id="btn-break-seal"
              onClick={handleOpenEnvelope}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-12 px-6 py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-semibold text-xs shadow-lg shadow-rose-600/30 flex items-center gap-2 cursor-pointer transition-colors"
            >
              <MailOpen className="w-4 h-4" />
              <span>Break Wax Seal & Open Letter</span>
            </motion.button>
          </motion.div>
        ) : (
          /* Unfolded Letter View */
          <motion.div
            key="letter"
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            className="w-full max-w-xl flex flex-col items-center"
          >
            <div className="w-full parchment-bg text-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-amber-200/80 relative">
              {/* Top vintage header & stamp */}
              <div className="flex items-center justify-between border-b border-amber-200/60 pb-3 mb-5">
                <div className="flex items-center gap-2 text-rose-600">
                  <Heart className="w-4 h-4 fill-rose-600" />
                  <span className="text-xs tracking-wider uppercase font-semibold text-slate-600">
                    Birthday Greeting Dispatch
                  </span>
                </div>
                {creatorName ? (
                  <div className="text-xs text-slate-500 font-mono">
                    From: <span className="font-semibold text-rose-700">{creatorName}</span>
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 font-mono">
                    Private & Confidential 💌
                  </div>
                )}
              </div>

              {/* Letter Content in handwriting font */}
              <div className="font-['Caveat',cursive] text-xl sm:text-2xl leading-relaxed text-slate-800 space-y-4">
                {/* Salutation */}
                <p className="font-bold text-2xl sm:text-3xl text-rose-800">
                  {greeting || `Dearest ${recipientName},`}
                </p>

                {/* Paragraphs */}
                {messages.map((p, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{
                      opacity: revealedParagraphs > idx ? 1 : 0,
                      y: revealedParagraphs > idx ? 0 : 8
                    }}
                    transition={{ duration: 0.5 }}
                  >
                    {p}
                  </motion.p>
                ))}

                {/* Closing Sign-off */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: revealedParagraphs > messages.length ? 1 : 0 }}
                  transition={{ duration: 0.5 }}
                  className="pt-3 text-right whitespace-pre-line text-rose-900 font-bold"
                >
                  {closing || (creatorName ? `With endless love,\n${creatorName}` : 'With endless love & warmest wishes ✨')}
                </motion.div>
              </div>

              {/* Decorative bottom seal */}
              <div className="mt-6 pt-3 border-t border-amber-200/60 flex items-center justify-between text-[11px] text-slate-500 font-sans">
                <span>Made with love for your special day</span>
                <span className="text-pink-600 font-medium">{creatorName || 'Special Birthday Edition ✨'}</span>
              </div>
            </div>

            {/* Action button to proceed to Reasons */}
            <motion.button
              id="btn-proceed-reasons"
              onClick={() => {
                sound.playFanfare();
                onNext();
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-6 px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-pink-500/30 flex items-center gap-2 group transition-all cursor-pointer"
            >
              <Heart className="w-5 h-5 text-pink-200 group-hover:scale-110 transition-transform" />
              <span>Next: Why You Are So Cherished 💖</span>
              <ArrowRight className="w-4 h-4" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
