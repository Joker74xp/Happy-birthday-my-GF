import React, { useState, useEffect, useCallback } from 'react';
import { Lock, Unlock, Sparkles, Delete, Heart, HelpCircle } from 'lucide-react';
import { sound } from '../utils/soundEffects';

interface PasscodeScreenProps {
  expectedPasscode: string;
  creatorName: string;
  onSuccess: () => void;
}

export const PasscodeScreen: React.FC<PasscodeScreenProps> = ({
  expectedPasscode,
  creatorName,
  onSuccess,
}) => {
  const [pin, setPin] = useState<string>('');
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  const handleDigit = useCallback((digit: string) => {
    if (pin.length >= 4 || isSuccess) return;
    sound.playClick(500 + pin.length * 100);
    const newPin = pin + digit;
    setPin(newPin);

    if (newPin.length === 4) {
      if (newPin === expectedPasscode) {
        setIsSuccess(true);
        sound.playUnlock();
        setTimeout(() => {
          onSuccess();
        }, 800);
      } else {
        setIsError(true);
        sound.playError();
        setTimeout(() => {
          setPin('');
          setIsError(false);
        }, 700);
      }
    }
  }, [pin, isSuccess, expectedPasscode, onSuccess]);

  const handleDelete = useCallback(() => {
    if (pin.length > 0 && !isSuccess) {
      sound.playClick(400);
      setPin((prev) => prev.slice(0, -1));
    }
  }, [pin, isSuccess]);

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (/^[0-9]$/.test(e.key)) {
        handleDigit(e.key);
      } else if (e.key === 'Backspace') {
        handleDelete();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleDigit, handleDelete]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 relative z-10 select-none">
      {/* Decorative backdrop glow */}
      <div className="absolute w-72 h-72 sm:w-96 sm:h-96 bg-pink-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-sm flex flex-col items-center">
        {/* Lock icon header */}
        <div
          className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-500 ${
            isSuccess
              ? 'bg-gradient-to-tr from-emerald-500 to-teal-400 text-white scale-110 shadow-lg shadow-emerald-500/40'
              : isError
              ? 'bg-gradient-to-tr from-rose-500 to-red-600 text-white animate-bounce'
              : 'bg-gradient-to-tr from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/30'
          }`}
        >
          {isSuccess ? (
            <Unlock className="w-8 h-8 animate-pulse" />
          ) : (
            <Lock className="w-8 h-8" />
          )}
        </div>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2 text-center flex items-center justify-center gap-2">
          <span>Secret Birthday Surprise</span>
          <Sparkles className="w-5 h-5 text-amber-400 fill-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
        </h1>
        <p className="text-sm text-slate-400 text-center mb-6 max-w-xs">
          Enter the 4-digit secret passcode to unlock your special birthday experience
        </p>

        {/* PIN dots display */}
        <div
          className={`flex items-center gap-4 mb-8 py-3 px-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md transition-all duration-300 ${
            isError ? 'border-rose-500/80 bg-rose-950/30 animate-shake' : ''
          } ${isSuccess ? 'border-emerald-500/80 bg-emerald-950/30' : ''}`}
        >
          {[0, 1, 2, 3].map((idx) => {
            const isFilled = pin.length > idx;
            return (
              <div
                key={idx}
                className={`w-4 h-4 rounded-full transition-all duration-200 ${
                  isFilled
                    ? isSuccess
                      ? 'bg-emerald-400 shadow-md shadow-emerald-400/50 scale-125'
                      : isError
                      ? 'bg-rose-400 shadow-md shadow-rose-400/50'
                      : 'bg-pink-500 shadow-md shadow-pink-500/60 scale-125'
                    : 'bg-slate-700/80'
                }`}
              />
            );
          })}
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-3 gap-3 w-64 mb-6">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              id={`keypad-${digit}`}
              onClick={() => handleDigit(digit)}
              className="h-14 rounded-2xl bg-slate-800/70 hover:bg-slate-700/80 active:bg-pink-600/30 active:scale-95 border border-slate-700/60 text-xl font-semibold text-slate-100 transition-all shadow-sm flex items-center justify-center cursor-pointer"
            >
              {digit}
            </button>
          ))}

          {/* Hint helper / Quick Fill */}
          <button
            id="keypad-hint"
            onClick={() => setShowHint(!showHint)}
            title="Need a hint?"
            className="h-14 rounded-2xl bg-slate-900/50 hover:bg-slate-800/60 active:scale-95 border border-slate-800 text-xs font-medium text-amber-400/90 transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-amber-400" />
            <span>Hint</span>
          </button>

          {/* 0 digit */}
          <button
            id="keypad-0"
            onClick={() => handleDigit('0')}
            className="h-14 rounded-2xl bg-slate-800/70 hover:bg-slate-700/80 active:bg-pink-600/30 active:scale-95 border border-slate-700/60 text-xl font-semibold text-slate-100 transition-all shadow-sm flex items-center justify-center cursor-pointer"
          >
            0
          </button>

          {/* Backspace */}
          <button
            id="keypad-backspace"
            onClick={handleDelete}
            title="Delete digit"
            className="h-14 rounded-2xl bg-slate-900/50 hover:bg-slate-800/60 active:scale-95 border border-slate-800 text-slate-400 hover:text-slate-200 transition-all flex items-center justify-center cursor-pointer"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>

        {/* Hint Box if toggled */}
        {showHint && (
          <div className="mb-5 px-4 py-2 bg-amber-500/10 border border-amber-500/30 rounded-xl text-center text-xs text-amber-300 flex items-center justify-between gap-3 animate-fade-in">
            <span>Passcode is <strong>{expectedPasscode}</strong></span>
            <button
              id="btn-quick-unlock"
              onClick={() => {
                setPin(expectedPasscode);
                setIsSuccess(true);
                sound.playUnlock();
                setTimeout(() => onSuccess(), 800);
              }}
              className="px-2 py-1 bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 rounded text-amber-200 font-semibold text-[11px] transition-all"
            >
              Auto Unlock
            </button>
          </div>
        )}

        {/* Celebration Attribution */}
        {creatorName ? (
          <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-900/70 border border-slate-800/80 text-xs text-slate-400 shadow-inner">
            <span>Created with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline animate-pulse" />
            <span>by</span>
            <span className="font-semibold text-pink-400 hover:text-pink-300 tracking-wide">
              {creatorName}
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-slate-900/70 border border-slate-800/80 text-xs text-slate-400 shadow-inner">
            <span>A special surprise made with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline animate-pulse" />
            <span>just for you</span>
          </div>
        )}
      </div>
    </div>
  );
};
