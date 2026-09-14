import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music, Play, Pause, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { youtubeAudio } from '../utils/youtubeAudio';
import { sound } from '../utils/soundEffects';

interface AudioBarProps {
  musicUrl?: string;
}

export const AudioBar: React.FC<AudioBarProps> = ({ musicUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(85);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);

  useEffect(() => {
    // Initialize YouTube audio with provided musicUrl or default
    youtubeAudio.init(musicUrl);

    const updateState = () => {
      const state = youtubeAudio.getState();
      setIsPlaying(state.isPlaying);
      setIsMuted(state.isMuted);
      setVolume(state.volume);
    };

    updateState();
    const unsubscribe = youtubeAudio.subscribe(updateState);

    return () => {
      unsubscribe();
    };
  }, [musicUrl]);

  const handleTogglePlay = () => {
    sound.playClick(600);
    youtubeAudio.togglePlay();
  };

  const handleToggleMute = () => {
    sound.playClick(500);
    const newMutedState = youtubeAudio.toggleMute();
    sound.setMuted(newMutedState);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setVolume(val);
    youtubeAudio.setVolume(val);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-1.5 bg-slate-900/85 backdrop-blur-md border border-slate-800/90 rounded-full px-2.5 py-1.5 shadow-xl shadow-black/40 text-xs select-none"
    >
      {/* Play/Pause Button */}
      <motion.button
        id="btn-toggle-music"
        onClick={handleTogglePlay}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
          isPlaying
            ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 text-pink-300 border border-pink-500/30 shadow-sm shadow-pink-500/10'
            : 'bg-slate-800/80 text-slate-300 hover:text-white border border-slate-700/60'
        }`}
        title={isPlaying ? 'Pause Background Music' : 'Play Background Music (YouTube)'}
      >
        {isPlaying ? (
          <>
            <Pause className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
            <span className="hidden sm:inline">Playing</span>
            {/* Animated equalizer waves */}
            <span className="flex items-end gap-0.5 h-3">
              <span className="w-0.5 h-3 bg-pink-400 rounded-full animate-pulse" />
              <span className="w-0.5 h-2 bg-pink-400 rounded-full animate-pulse delay-75" />
              <span className="w-0.5 h-3.5 bg-pink-400 rounded-full animate-pulse delay-150" />
              <span className="w-0.5 h-1.5 bg-pink-400 rounded-full animate-pulse delay-100" />
            </span>
          </>
        ) : (
          <>
            <Play className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Play Music</span>
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-ping" />
          </>
        )}
      </motion.button>

      {/* Volume / Mute Control */}
      <div
        className="relative flex items-center"
        onMouseEnter={() => setShowVolumeSlider(true)}
        onMouseLeave={() => setShowVolumeSlider(false)}
      >
        <motion.button
          id="btn-toggle-mute"
          onClick={handleToggleMute}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          className="p-1.5 text-slate-400 hover:text-slate-100 rounded-full transition-colors cursor-pointer"
          title={isMuted ? 'Unmute (YouTube Music & FX)' : 'Mute (YouTube Music & FX)'}
        >
          {isMuted || volume === 0 ? (
            <VolumeX className="w-4 h-4 text-rose-400" />
          ) : (
            <Volume2 className="w-4 h-4 text-slate-300" />
          )}
        </motion.button>

        {/* Volume popover slider */}
        <AnimatePresence>
          {showVolumeSlider && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 5 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 5 }}
              transition={{ duration: 0.15 }}
              className="absolute top-8 right-0 bg-slate-900 border border-slate-700 rounded-2xl p-2.5 shadow-2xl z-50 flex items-center gap-2 min-w-[120px]"
            >
              <input
                type="range"
                min="0"
                max="100"
                value={isMuted ? 0 : volume}
                onChange={handleVolumeChange}
                className="w-20 accent-pink-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                title={`Volume: ${isMuted ? 0 : volume}%`}
              />
              <span className="text-[10px] text-slate-400 font-mono w-6 text-right">
                {isMuted ? '0%' : `${volume}%`}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

