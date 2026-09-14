import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Wind, Mic, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/soundEffects';

interface Step3CakeProps {
  recipientName: string;
  creatorName: string;
  onNext: () => void;
}

export const Step3Cake: React.FC<Step3CakeProps> = ({
  recipientName,
  creatorName,
  onNext,
}) => {
  const [isCandleLit, setIsCandleLit] = useState(true);
  const [isBlown, setIsBlown] = useState(false);
  const [isListeningMic, setIsListeningMic] = useState(false);
  const [micVolume, setMicVolume] = useState(0);
  const [wishMade, setWishMade] = useState(false);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  const handleBlowOut = () => {
    if (!isCandleLit) return;
    setIsCandleLit(false);
    setIsBlown(true);

    // Stop mic if running
    stopMicListening();

    // Play blow sound & cheer fanfare
    sound.playBlow();
    setTimeout(() => {
      sound.playFanfare();
      sound.startMelody();
    }, 400);

    // Confetti celebration burst
    confetti({
      particleCount: 85,
      spread: 110,
      origin: { y: 0.5 },
      colors: ['#ec4899', '#f59e0b', '#8b5cf6', '#10b981', '#3b82f6']
    });

    setTimeout(() => {
      setWishMade(true);
    }, 1200);
  };

  // Start microphone listener to detect blow
  const toggleMicBlow = async () => {
    if (isListeningMic) {
      stopMicListening();
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      streamRef.current = stream;

      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const analyser = ctx.createAnalyser();
      analyser.fftSize = 256;
      analyserRef.current = analyser;

      const source = ctx.createMediaStreamSource(stream);
      source.connect(analyser);

      setIsListeningMic(true);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const checkAudio = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        // Calculate average volume
        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const avg = sum / bufferLength;
        const normalized = Math.min(100, Math.round((avg / 128) * 100));
        setMicVolume(normalized);

        // If high energy detected (blowing air into mic)
        if (normalized > 35) {
          handleBlowOut();
          return;
        }

        animationFrameRef.current = requestAnimationFrame(checkAudio);
      };

      checkAudio();
    } catch (err) {
      console.warn('Microphone permission not granted or unavailable', err);
      setIsListeningMic(false);
    }
  };

  const stopMicListening = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(() => {});
      audioCtxRef.current = null;
    }
    setIsListeningMic(false);
    setMicVolume(0);
  };

  useEffect(() => {
    return () => {
      stopMicListening();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10 text-center select-none">
      {/* Step Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 flex items-center gap-2 px-3.5 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-xs font-semibold text-pink-400"
      >
        <Sparkles className="w-3.5 h-3.5" />
        <span>Step 7 of 10: Make A Wish & Blow The Candle</span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.05 }}
        className="text-3xl sm:text-5xl font-black text-white mb-2 font-['Playfair_Display',serif]"
      >
        Make A Secret Wish! 🎂
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-slate-300 text-xs sm:text-sm mb-6 max-w-sm"
      >
        {isCandleLit
          ? 'Close your eyes, make the deepest wish in your heart, and blow out the candle!'
          : '🎉 Your wish has been sent to the stars! Time to celebrate!'}
      </motion.p>

      {/* Birthday Cake Illustrated Graphic */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        className="relative w-64 sm:w-80 h-72 sm:h-80 flex flex-col items-center justify-end mb-8"
      >
        {/* Glow behind candle when lit */}
        {isCandleLit && (
          <div className="absolute top-4 w-32 h-32 bg-amber-400/30 rounded-full blur-2xl animate-pulse pointer-events-none" />
        )}

        {/* The Candle */}
        <div
          id="candle"
          onClick={handleBlowOut}
          className="relative flex flex-col items-center cursor-pointer group z-20"
        >
          {/* Flame or Smoke */}
          <AnimatePresence mode="wait">
            {isCandleLit ? (
              <motion.div
                key="flame"
                exit={{ opacity: 0, scale: 0.4 }}
                transition={{ duration: 0.25 }}
                className="relative flex flex-col items-center animate-flame"
              >
                {/* Outer halo */}
                <div className="w-7 h-10 bg-gradient-to-t from-amber-500 via-orange-400 to-yellow-200 rounded-full shadow-lg shadow-amber-500/80 filter blur-[0.5px]" />
                {/* Inner core */}
                <div className="absolute bottom-1 w-3 h-5 bg-white rounded-full opacity-90" />
              </motion.div>
            ) : (
              /* Smoke puff */
              <motion.div
                key="smoke"
                initial={{ opacity: 0.8, y: 0 }}
                animate={{ opacity: 0, y: -16 }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="flex flex-col items-center mb-1"
              >
                <div className="w-2 h-6 bg-slate-400/50 rounded-full blur-sm -translate-y-2" />
                <div className="w-4 h-4 bg-slate-400/30 rounded-full blur-md -translate-y-4" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Wick */}
          <div className="w-1 h-3 bg-slate-800 rounded-t" />

          {/* Candle Body */}
          <div className="w-5 h-16 bg-gradient-to-r from-pink-400 via-rose-300 to-pink-500 rounded-t-sm shadow-md border-x border-pink-600/30 relative overflow-hidden">
            {/* Spiral gold stripes */}
            <div className="absolute inset-0 opacity-40 bg-[repeating-linear-gradient(45deg,#fde047,#fde047_4px,transparent_4px,transparent_8px)]" />
          </div>
        </div>

        {/* Cake Layer 1 (Top Tier) */}
        <div className="w-40 sm:w-48 h-14 bg-gradient-to-b from-rose-200 to-rose-300 rounded-t-2xl shadow-inner border-t-4 border-amber-50 relative flex justify-around items-start pt-1">
          {/* Strawberries / Cherries on top tier */}
          {['🍓', '🍒', '🍓', '🍒'].map((fruit, idx) => (
            <span key={idx} className="text-sm transform -translate-y-3 drop-shadow">
              {fruit}
            </span>
          ))}
          {/* Dripping Frosting */}
          <div className="absolute top-0 inset-x-0 h-3 flex justify-between px-1">
            {[...Array(9)].map((_, i) => (
              <div
                key={i}
                className="w-4 h-4 bg-amber-50 rounded-b-full shadow-sm"
                style={{ height: `${(i % 3) * 3 + 12}px` }}
              />
            ))}
          </div>
        </div>

        {/* Cake Layer 2 (Middle Tier) */}
        <div className="w-52 sm:w-60 h-16 bg-gradient-to-b from-pink-400 via-rose-400 to-pink-500 shadow-md relative overflow-hidden border-t-2 border-rose-200/50">
          {/* Sugar sprinkles dots */}
          <div className="absolute inset-0 opacity-60 flex flex-wrap gap-3 p-2">
            {['bg-yellow-300', 'bg-blue-300', 'bg-emerald-300', 'bg-white', 'bg-purple-300'].map((col, idx) => (
              <div key={idx} className={`w-1.5 h-1.5 rounded-full ${col}`} />
            ))}
          </div>
        </div>

        {/* Cake Layer 3 (Base Tier) */}
        <div className="w-64 sm:w-72 h-18 bg-gradient-to-b from-purple-700 via-purple-800 to-slate-900 rounded-b-2xl shadow-2xl relative border-t-4 border-pink-200/40">
          {/* Cream ruffles at bottom */}
          <div className="absolute bottom-0 inset-x-0 h-4 flex justify-between px-2">
            {[...Array(11)].map((_, i) => (
              <div key={i} className="w-5 h-4 bg-amber-50 rounded-t-full shadow-inner" />
            ))}
          </div>
        </div>

        {/* Cake Plate Stand */}
        <div className="w-72 sm:w-84 h-4 bg-gradient-to-r from-slate-300 via-white to-slate-300 rounded-full shadow-xl" />
        <div className="w-36 h-3 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-400 rounded-b-lg shadow-md" />
      </motion.div>

      {/* Blow Action Controls */}
      <AnimatePresence mode="wait">
        {isCandleLit ? (
          <motion.div
            key="blow-controls"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center gap-3"
          >
            <div className="flex flex-wrap items-center justify-center gap-3">
              {/* Primary Blow Button */}
              <motion.button
                id="btn-blow-candle"
                onClick={handleBlowOut}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3.5 rounded-full bg-gradient-to-r from-amber-500 via-rose-500 to-pink-500 hover:from-amber-400 hover:to-pink-600 text-white font-bold text-sm shadow-xl shadow-rose-500/30 flex items-center gap-2 cursor-pointer"
              >
                <Wind className="w-5 h-5 animate-pulse" />
                <span>Click to Blow Candle! 💨</span>
              </motion.button>

              {/* Microphone Blow Detector */}
              <motion.button
                id="btn-mic-blow"
                onClick={toggleMicBlow}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-5 py-3 rounded-full border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                  isListeningMic
                    ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse'
                    : 'bg-slate-800/80 border-slate-700 text-slate-300 hover:bg-slate-700'
                }`}
                title="Blow directly into your computer or phone microphone"
              >
                <Mic className="w-4 h-4" />
                <span>{isListeningMic ? `Blow on Mic! (${micVolume}%)` : 'Blow With Mic 🎙️'}</span>
              </motion.button>
            </div>

            <p className="text-[11px] text-slate-400">
              Tip: You can also tap directly on the candle flame to blow it out!
            </p>
          </motion.div>
        ) : (
          /* Blown Out Celebratory Banner & Next Button */
          <motion.div
            key="blown-controls"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 250, damping: 20 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="px-5 py-2 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-sm font-semibold flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Wish sent to the stars! Ready for your Cosmic Birthday Fortune?</span>
            </div>

            <motion.button
              id="btn-goto-fortune"
              onClick={onNext}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-amber-500 via-pink-500 to-purple-600 hover:from-amber-400 hover:to-purple-500 text-white font-extrabold text-base shadow-2xl shadow-purple-500/40 flex items-center gap-3 cursor-pointer"
            >
              <span>Proceed to Step 8: Cosmic Birthday Fortune 🔮</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Festive footer message */}
      {creatorName ? (
        <div className="mt-8 text-xs text-slate-500">
          Specially prepared by <span className="text-pink-400 font-semibold">{creatorName}</span>
        </div>
      ) : (
        <div className="mt-8 text-xs text-slate-500">
          May all your birthday wishes come true today and always ✨
        </div>
      )}
    </div>
  );
};
