import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sparkles,
  Heart,
  Share2,
  RefreshCw,
  Send,
  PartyPopper,
  Edit3,
  Camera,
  Check,
  Music
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BirthdayConfig } from '../types';
import { sound } from '../utils/soundEffects';
import { youtubeAudio } from '../utils/youtubeAudio';
import { FireworksDisplay } from './FireworksDisplay';

interface Step4CelebrationProps {
  config: BirthdayConfig;
  onUpdateConfig: (newConfig: BirthdayConfig) => void;
  onRestart: () => void;
}

interface FloatingBalloon {
  id: number;
  x: number;
  color: string;
  speed: number;
  delay: number;
  size: number;
}

export const Step4Celebration: React.FC<Step4CelebrationProps> = ({
  config,
  onUpdateConfig,
  onRestart,
}) => {
  const [poppedCount, setPoppedCount] = useState(0);
  const [balloons, setBalloons] = useState<FloatingBalloon[]>([]);
  const [newWishText, setNewWishText] = useState('');
  const [newWishAuthor, setNewWishAuthor] = useState('');
  const [floatingLanterns, setFloatingLanterns] = useState<string[]>([]);
  const [customWishInput, setCustomWishInput] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [activePhotoModal, setActivePhotoModal] = useState<string | null>(null);
  const [showFireworks, setShowFireworks] = useState(false);

  // Editable config state for customize modal
  const [editRecipient, setEditRecipient] = useState(config.recipientName);
  const [editCreator, setEditCreator] = useState(config.creatorName);
  const [editPasscode, setEditPasscode] = useState(config.passcode);
  const [editGreeting, setEditGreeting] = useState(config.letterGreeting);
  const [editMusicUrl, setEditMusicUrl] = useState(
    config.musicUrl || 'https://youtu.be/PpXoKtxADdE?si=ez2vAmv5njlqXY4-'
  );

  // Setup automatic particle-based celebratory confetti barrage on entering Celebration step
  useEffect(() => {
    // 1. Initial immediate centerpiece detonation
    confetti({
      particleCount: 120,
      spread: 100,
      origin: { y: 0.55 },
      colors: ['#f43f5e', '#ec4899', '#a855f7', '#3b82f6', '#fde047', '#10b981'],
      startVelocity: 45,
      ticks: 350
    });

    // 2. Twin celebratory cannons from both bottom corners
    const leftCannonTimer = setTimeout(() => {
      confetti({
        particleCount: 90,
        angle: 60,
        spread: 75,
        origin: { x: 0.05, y: 0.8 },
        colors: ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#fde047'],
        startVelocity: 55,
        ticks: 300
      });
    }, 280);

    const rightCannonTimer = setTimeout(() => {
      confetti({
        particleCount: 90,
        angle: 120,
        spread: 75,
        origin: { x: 0.95, y: 0.8 },
        colors: ['#8b5cf6', '#a855f7', '#c084fc', '#38bdf8', '#fbbf24', '#f43f5e'],
        startVelocity: 55,
        ticks: 300
      });
    }, 450);

    // 3. Golden sparkles and stars cascading shower
    const starShowerTimer = setTimeout(() => {
      confetti({
        particleCount: 70,
        spread: 140,
        origin: { y: 0.35 },
        shapes: ['star', 'circle'],
        colors: ['#fbbf24', '#f59e0b', '#fde047', '#ffffff', '#ec4899'],
        scalar: 1.25,
        startVelocity: 35,
        ticks: 300
      });
    }, 750);

    // 4. Ongoing ambient side-cannon volleys
    const interval = setInterval(() => {
      confetti({
        particleCount: 35,
        angle: 60,
        spread: 55,
        origin: { x: 0.02, y: 0.75 },
        colors: ['#f43f5e', '#ec4899', '#fde047', '#8b5cf6']
      });
      confetti({
        particleCount: 35,
        angle: 120,
        spread: 55,
        origin: { x: 0.98, y: 0.75 },
        colors: ['#8b5cf6', '#06b6d4', '#fde047', '#ec4899']
      });
    }, 4500);

    // Generate initial interactive balloons
    const initialBalloons: FloatingBalloon[] = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: 10 + i * 11,
      color: ['#f43f5e', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#06b6d4'][i % 7],
      speed: 10 + (i % 4) * 2,
      delay: i * 1.5,
      size: 45 + (i % 3) * 8
    }));
    setBalloons(initialBalloons);

    return () => {
      clearTimeout(leftCannonTimer);
      clearTimeout(rightCannonTimer);
      clearTimeout(starShowerTimer);
      clearInterval(interval);
    };
  }, []);

  const handlePopBalloon = (id: number) => {
    sound.playPop();
    setPoppedCount((prev) => prev + 1);

    confetti({
      particleCount: 20,
      spread: 50,
      origin: { y: 0.5 },
      colors: ['#fde047', '#f43f5e', '#a855f7']
    });

    // Remove popped balloon and respawn after 2 seconds
    setBalloons((prev) => prev.filter((b) => b.id !== id));
    setTimeout(() => {
      setBalloons((prev) => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * 85 + 5,
          color: ['#f43f5e', '#ec4899', '#8b5cf6', '#3b82f6', '#10b981', '#f59e0b'][Math.floor(Math.random() * 6)],
          speed: 11 + Math.random() * 4,
          delay: 0,
          size: 45 + Math.random() * 15
        }
      ]);
    }, 1800);
  };

  const handleBurstMoreConfetti = () => {
    sound.playClick(800);
    confetti({
      particleCount: 90,
      spread: 100,
      origin: { y: 0.4 }
    });
  };

  const handleReleaseLantern = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customWishInput.trim()) return;

    sound.playUnlock();
    setFloatingLanterns((prev) => [...prev, customWishInput.trim()]);
    setCustomWishInput('');

    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.7 }
    });
  };

  const handleAddWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWishText.trim()) return;

    sound.playClick(600);
    const newWish = {
      id: `w-${Date.now()}`,
      sender: newWishAuthor.trim() || 'A Dear Friend',
      text: newWishText.trim(),
      avatarEmoji: ['🎈', '🌟', '💖', '🎂', '🎉', '💫'][Math.floor(Math.random() * 6)]
    };

    onUpdateConfig({
      ...config,
      wishes: [newWish, ...config.wishes]
    });

    setNewWishText('');
    setNewWishAuthor('');
  };

  const handleShare = () => {
    sound.playClick(700);
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2500);
    }
  };

  const handleSaveCustomize = () => {
    const updatedMusicUrl =
      editMusicUrl.trim() ||
      config.musicUrl ||
      'https://youtu.be/PpXoKtxADdE?si=ez2vAmv5njlqXY4-';

    if (updatedMusicUrl !== config.musicUrl) {
      youtubeAudio.setVideo(updatedMusicUrl);
    }

    onUpdateConfig({
      ...config,
      recipientName: editRecipient.trim() || config.recipientName,
      creatorName: editCreator.trim() || config.creatorName,
      passcode: editPasscode.trim() || config.passcode,
      letterGreeting: editGreeting.trim() || config.letterGreeting,
      musicUrl: updatedMusicUrl,
    });
    setIsCustomizing(false);
    sound.playFanfare();
  };

  return (
    <div className="min-h-screen py-12 px-4 relative z-10 select-none max-w-5xl mx-auto flex flex-col items-center">
      {/* Floating Interactive Balloons layer */}
      <div className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
        {balloons.map((b) => (
          <div
            key={b.id}
            onClick={() => handlePopBalloon(b.id)}
            className="absolute cursor-pointer pointer-events-auto hover:scale-125 transition-transform"
            style={{
              left: `${b.x}%`,
              animation: `floatUpSlow ${b.speed}s cubic-bezier(0.4, 0, 0.2, 1) infinite`,
              animationDelay: `${b.delay}s`,
            }}
            title="Click to pop!"
          >
            <div
              className="rounded-full shadow-lg flex items-center justify-center relative"
              style={{
                width: `${b.size}px`,
                height: `${b.size * 1.25}px`,
                backgroundColor: b.color,
                boxShadow: `0 8px 20px ${b.color}66`
              }}
            >
              {/* Balloon Highlight */}
              <div className="absolute top-2 left-2 w-2.5 h-4 bg-white/40 rounded-full rotate-12" />
              {/* String knot */}
              <div
                className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-sm"
                style={{ backgroundColor: b.color }}
              />
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-0.5 h-8 bg-slate-300/40" />
            </div>
          </div>
        ))}

        {/* Floating Wish Lanterns in the sky */}
        {floatingLanterns.map((wish, idx) => (
          <div
            key={idx}
            className="absolute pointer-events-none flex flex-col items-center animate-fade-in"
            style={{
              left: `${20 + (idx * 23) % 65}%`,
              bottom: '10%',
              animation: 'floatUpSlow 15s linear infinite',
              animationDelay: `${idx * 0.6}s`
            }}
          >
            <div className="px-3 py-1.5 rounded-2xl bg-amber-400/90 text-amber-950 font-bold text-xs shadow-xl shadow-amber-400/40 flex items-center gap-1.5 border border-amber-200">
              <span>🏮</span>
              <span className="truncate max-w-[140px]">{wish}</span>
            </div>
            <div className="w-1 h-8 bg-amber-300/40" />
          </div>
        ))}
      </div>

      {/* Floating top bar info */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full flex items-center justify-between gap-2 mb-8 px-2"
      >
        <div className="flex items-center gap-2">
          <motion.button
            id="btn-restart-journey"
            onClick={onRestart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3.5 py-1.5 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 text-xs font-semibold flex items-center gap-1.5 border border-slate-700 shadow-sm cursor-pointer transition-colors"
            title="Replay from Step 1"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Replay Surprise</span>
          </motion.button>

          <motion.button
            id="btn-edit-surprise"
            onClick={() => setIsCustomizing(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3.5 py-1.5 rounded-full bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 text-xs font-semibold flex items-center gap-1.5 border border-pink-500/40 shadow-sm cursor-pointer transition-colors"
            title="Customize names, messages & passcode"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Personalize</span>
          </motion.button>
        </div>

        <div className="flex items-center gap-2">
          {poppedCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-semibold border border-rose-500/30"
            >
              🎈 {poppedCount} Balloons Popped!
            </motion.span>
          )}

          <motion.button
            id="btn-share-link"
            onClick={handleShare}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-3.5 py-1.5 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-purple-600/30 cursor-pointer transition-all"
          >
            {isCopied ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{isCopied ? 'Link Copied!' : 'Share'}</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Main Birthday Header Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center relative mb-10"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500/20 via-purple-500/20 to-amber-500/20 border border-pink-500/30 text-xs font-bold text-pink-300 mb-4 shadow-sm">
          <PartyPopper className="w-4 h-4 text-amber-400" />
          <span>Step 10 of 10: Grand Celebration Finale</span>
          <Sparkles className="w-4 h-4 text-pink-400" />
        </div>

        <h1 className="text-4xl sm:text-7xl font-black tracking-tight text-white mb-3 font-['Playfair_Display',serif]">
          HAPPY BIRTHDAY
          <br />
          <span className="bg-gradient-to-r from-pink-400 via-rose-300 to-amber-300 bg-clip-text text-transparent drop-shadow-md">
            {config.recipientName}!
          </span>
        </h1>

        <p className="text-slate-300 text-sm sm:text-lg max-w-xl mx-auto font-medium">
          May your special day be filled with magic, sparkling smiles, endless warm hugs, and all the happiness your heart can hold!
        </p>

        {/* Celebration Stamp */}
        {config.creatorName ? (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
            <span>Surprise curated with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline animate-bounce" />
            <span>by</span>
            <span className="text-pink-400 font-bold bg-pink-500/10 px-2.5 py-0.5 rounded-full border border-pink-500/20">
              {config.creatorName}
            </span>
          </div>
        ) : (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
            <span>Curated with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline animate-bounce" />
            <span>especially for you</span>
          </div>
        )}

        {/* Confetti and Fireworks buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          <motion.button
            id="btn-trigger-fireworks"
            onClick={() => {
              sound.playClick(700);
              setShowFireworks(true);
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-amber-500 hover:from-purple-500 hover:via-pink-500 hover:to-amber-400 text-white font-bold text-xs shadow-lg shadow-purple-500/25 flex items-center gap-2 cursor-pointer transition-all border border-purple-400/30"
            title="Launch Fullscreen Animated Fireworks Display using CSS Keyframes"
          >
            <span className="text-base leading-none">🎆</span>
            <span>Launch Fireworks Display</span>
            <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse" />
          </motion.button>

          <motion.button
            id="btn-burst-confetti"
            onClick={handleBurstMoreConfetti}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-pink-500 hover:from-amber-400 hover:to-pink-400 text-white font-bold text-xs shadow-lg shadow-pink-500/20 flex items-center gap-2 cursor-pointer transition-colors"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>Launch More Confetti! 🎉</span>
          </motion.button>
        </div>
      </motion.div>

      {/* Polaroid Photo Memory Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="w-full mb-14"
      >
        <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-pink-400" />
            <h2 className="text-xl sm:text-2xl font-bold text-white font-['Playfair_Display',serif]">
              Sweet Memories & Moments
            </h2>
          </div>
          <span className="text-xs text-slate-400">Click to enlarge</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {config.photos.map((photo) => (
            <motion.div
              key={photo.id}
              onClick={() => setActivePhotoModal(photo.url)}
              whileHover={{ scale: 1.04, y: -6, rotate: 0 }}
              whileTap={{ scale: 0.98 }}
              className="bg-white p-3 pb-5 rounded-lg shadow-xl shadow-black/40 hover:shadow-pink-500/20 transition-shadow duration-300 cursor-pointer"
              style={{ transform: `rotate(${photo.rotation}deg)` }}
            >
              <div className="w-full h-52 overflow-hidden rounded bg-slate-100">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
              <div className="mt-3 font-['Caveat',cursive] text-lg text-slate-800 text-center font-bold">
                {photo.caption}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Make a Birthday Wish / Send Lantern Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="w-full max-w-2xl bg-gradient-to-br from-slate-900/90 to-purple-950/50 border border-purple-800/40 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl mb-14 relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center gap-2 mb-2 text-amber-400">
          <Sparkles className="w-5 h-5" />
          <h3 className="text-xl font-bold text-white font-['Playfair_Display',serif]">
            Make A Birthday Wish To The Stars
          </h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 mb-5">
          Write down your biggest wish or ambition for this year. Release it into the sky as a glowing sky lantern!
        </p>

        <form onSubmit={handleReleaseLantern} className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            id="input-sky-wish"
            value={customWishInput}
            onChange={(e) => setCustomWishInput(e.target.value)}
            placeholder="e.g., May this year be full of happiness, peace and adventures..."
            className="flex-1 bg-slate-800/80 border border-slate-700/80 rounded-2xl px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-pink-500 focus:ring-1 focus:ring-pink-500 transition-colors"
          />
          <motion.button
            type="submit"
            id="btn-release-lantern"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-rose-500 hover:from-amber-400 hover:to-rose-400 text-white text-xs font-bold shadow-md shadow-rose-500/20 flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <span>Release Lantern 🏮</span>
            <Send className="w-3.5 h-3.5" />
          </motion.button>
        </form>
      </motion.div>

      {/* Wishes & Love Guestbook */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.5 }}
        className="w-full mb-14"
      >
        <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-500 fill-rose-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-white font-['Playfair_Display',serif]">
              Wishes & Blessings Wall
            </h2>
          </div>
          <span className="text-xs text-slate-400">{config.wishes.length} lovely wishes</span>
        </div>

        {/* Wishes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {config.wishes.map((w) => (
            <motion.div
              key={w.id}
              whileHover={{ y: -4 }}
              className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 shadow-lg flex flex-col justify-between hover:border-pink-500/30 transition-all"
            >
              <p className="text-sm text-slate-200 leading-relaxed italic mb-4">
                "{w.text}"
              </p>
              <div className="flex items-center justify-between border-t border-slate-800/80 pt-3">
                <span className="text-xs font-semibold text-pink-400 flex items-center gap-1.5">
                  <span>{w.avatarEmoji}</span>
                  <span>{w.sender}</span>
                </span>
                <Heart className="w-3.5 h-3.5 text-rose-500/60" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add Wish Form */}
        <form
          onSubmit={handleAddWish}
          className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-4 flex flex-col sm:flex-row gap-3"
        >
          <input
            type="text"
            id="input-wish-author"
            value={newWishAuthor}
            onChange={(e) => setNewWishAuthor(e.target.value)}
            placeholder="Your Name / Nickname"
            className="sm:w-1/3 bg-slate-800/80 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-pink-500 transition-colors"
          />
          <input
            type="text"
            id="input-wish-text"
            value={newWishText}
            onChange={(e) => setNewWishText(e.target.value)}
            placeholder="Leave a sweet birthday wish..."
            className="flex-1 bg-slate-800/80 border border-slate-700/80 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-pink-500 transition-colors"
          />
          <motion.button
            type="submit"
            id="btn-submit-wish"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
          >
            <span>Post Wish</span>
            <Send className="w-3 h-3" />
          </motion.button>
        </form>
      </motion.div>

      {/* Footer Bar */}
      <footer className="w-full text-center border-t border-slate-800/80 pt-8 pb-4 text-xs text-slate-500 flex flex-col items-center gap-2">
        {config.creatorName ? (
          <div className="flex items-center gap-1 text-slate-400">
            <span>Website crafted with boundless love by</span>
            <span className="font-bold text-pink-400 bg-pink-500/10 px-2 py-0.5 rounded border border-pink-500/20">
              {config.creatorName}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-slate-400">
            <span>Wishing you a magical and joyous birthday celebration! 🎂✨</span>
          </div>
        )}
        <p className="text-[11px] text-slate-500">
          Birthday Surprise Experience • Passcode Protected ({config.passcode || '1111'})
        </p>
      </footer>

      {/* Photo Enlarge Lightbox Modal */}
      <AnimatePresence>
        {activePhotoModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhotoModal(null)}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="max-w-2xl w-full bg-white p-4 rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={activePhotoModal}
                alt="Enlarged Memory"
                className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
              />
              <div className="text-center mt-3 text-slate-700 font-bold font-['Caveat',cursive] text-2xl">
                Memorable Moment 💖
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Personalize & Customize Modal */}
      <AnimatePresence>
        {isCustomizing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="bg-slate-900 border border-slate-700 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl"
            >
              <div className="flex items-center justify-between mb-5 border-b border-slate-800 pb-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Edit3 className="w-4 h-4 text-pink-400" />
                  <span>Personalize Surprise</span>
                </h3>
                <button
                  onClick={() => setIsCustomizing(false)}
                  className="text-slate-400 hover:text-white text-xs px-2 py-1 rounded bg-slate-800 cursor-pointer"
                >
                  ✕ Close
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Recipient Name:
                  </label>
                  <input
                    type="text"
                    id="edit-recipient-name"
                    value={editRecipient}
                    onChange={(e) => setEditRecipient(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Creator Name:
                  </label>
                  <input
                    type="text"
                    id="edit-creator-name"
                    value={editCreator}
                    onChange={(e) => setEditCreator(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Secret Passcode (4 Digits):
                  </label>
                  <input
                    type="text"
                    id="edit-passcode"
                    maxLength={4}
                    value={editPasscode}
                    onChange={(e) => setEditPasscode(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-500 font-mono tracking-widest"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1">
                    Letter Salutation:
                  </label>
                  <input
                    type="text"
                    id="edit-letter-greeting"
                    value={editGreeting}
                    onChange={(e) => setEditGreeting(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-slate-300 font-medium mb-1 flex items-center justify-between">
                    <span>Background Music (YouTube Video / Shorts):</span>
                    <span className="text-[10px] text-pink-400">Autoplays from start</span>
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      id="edit-music-url"
                      value={editMusicUrl}
                      onChange={(e) => setEditMusicUrl(e.target.value)}
                      placeholder="https://youtube.com/shorts/... or video URL"
                      className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-pink-500 pr-8"
                    />
                    <Music className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                  <p className="text-[10px] text-slate-500 mt-1">
                    Paste any YouTube Shorts or standard YouTube video link.
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  onClick={() => setIsCustomizing(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <motion.button
                  id="btn-save-custom-changes"
                  onClick={handleSaveCustomize}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-xs shadow-md shadow-pink-500/30 cursor-pointer"
                >
                  Save & Apply
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Animated Fireworks Display with CSS Keyframes */}
      <AnimatePresence>
        {showFireworks && (
          <FireworksDisplay
            recipientName={config.recipientName}
            onClose={() => setShowFireworks(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
