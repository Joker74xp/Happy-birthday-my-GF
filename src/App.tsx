import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { ChevronLeft, Sparkles } from 'lucide-react';
import { SurpriseStep, BirthdayConfig } from './types';
import { initialBirthdayConfig } from './data/defaultConfig';
import { PasscodeScreen } from './components/PasscodeScreen';
import { Step1Welcome } from './components/Step1Welcome';
import { Step2Scratch } from './components/Step2Scratch';
import { Step3Balloons } from './components/Step3Balloons';
import { Step4Bouquet } from './components/Step4Bouquet';
import { Step2Letter } from './components/Step2Letter';
import { Step6Reasons } from './components/Step6Reasons';
import { Step3Cake } from './components/Step3Cake';
import { Step6Fortune } from './components/Step6Fortune';
import { Step9Crown } from './components/Step9Crown';
import { Step4Celebration } from './components/Step4Celebration';
import { BackgroundStars } from './components/BackgroundStars';
import { AudioBar } from './components/AudioBar';
import { sound } from './utils/soundEffects';
import { youtubeAudio } from './utils/youtubeAudio';

const stepIndexMap: Record<SurpriseStep, number> = {
  passcode: 0,
  welcome: 1,
  scratch: 2,
  balloons: 3,
  bouquet: 4,
  letter: 5,
  reasons: 6,
  cake: 7,
  fortune: 8,
  crown: 9,
  celebration: 10,
};

const stepLabels: Record<SurpriseStep, string> = {
  passcode: 'Secret Access',
  welcome: 'Mystery Gift',
  scratch: 'Scratch Cards',
  balloons: 'VIP Birthday Perks',
  bouquet: 'Flower Garden',
  letter: 'Heartfelt Letter',
  reasons: 'Why You Are Cherished',
  cake: 'Make A Wish',
  fortune: 'Cosmic Fortune',
  crown: 'Birthday Queen',
  celebration: 'Grand Finale',
};

export default function App() {
  const [config, setConfig] = useState<BirthdayConfig>(initialBirthdayConfig);
  const [step, setStep] = useState<SurpriseStep>('passcode');

  // Smooth scroll to top whenever the active step changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Initialize YouTube background music on mount
  useEffect(() => {
    youtubeAudio.init(config.musicUrl);
  }, [config.musicUrl]);

  const handlePasscodeSuccess = () => {
    youtubeAudio.play();
    setStep('welcome');
  };

  const handleStep1Next = () => {
    setStep('scratch');
  };

  const handleStep2Next = () => {
    setStep('balloons');
  };

  const handleStep3Next = () => {
    setStep('bouquet');
  };

  const handleStep4Next = () => {
    setStep('letter');
  };

  const handleStep5Next = () => {
    setStep('reasons');
  };

  const handleStep6Next = () => {
    setStep('cake');
  };

  const handleStep7Next = () => {
    setStep('fortune');
  };

  const handleStep8Next = () => {
    setStep('crown');
  };

  const handleStep9Next = () => {
    setStep('celebration');
  };

  const handleBackStep = () => {
    sound.playClick(500);
    const stepsOrder: SurpriseStep[] = [
      'welcome',
      'scratch',
      'balloons',
      'bouquet',
      'letter',
      'reasons',
      'cake',
      'fortune',
      'crown',
      'celebration',
    ];
    const currentIndex = stepsOrder.indexOf(step);
    if (currentIndex > 0) {
      setStep(stepsOrder[currentIndex - 1]);
    }
  };

  const handleRestart = () => {
    sound.playClick(600);
    setStep('welcome');
  };

  const currentStepNum = stepIndexMap[step];
  const progressPercent = currentStepNum > 0 ? (currentStepNum / 10) * 100 : 0;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-x-hidden selection:bg-pink-500 selection:text-white flex flex-col">
      {/* Starry Night Atmosphere */}
      <BackgroundStars />

      {/* Ultra-smooth luminous top progress indicator */}
      {currentStepNum > 0 && (
        <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-slate-800/40">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-500 via-purple-500 to-amber-400 shadow-[0_0_12px_rgba(244,63,94,0.7)]"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          />
        </div>
      )}

      {/* Floating Header Controls */}
      <header className="fixed top-4 left-4 right-4 z-40 flex items-center justify-between pointer-events-none">
        {/* Left: Step Breadcrumb & Back button (if past step 1) */}
        <div className="pointer-events-auto flex items-center gap-2">
          {currentStepNum > 1 && (
            <button
              id="btn-back-step"
              onClick={handleBackStep}
              className="px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800/90 text-slate-300 hover:text-white border border-slate-800 backdrop-blur-md text-xs font-medium flex items-center gap-1 shadow-lg transition-all active:scale-95 cursor-pointer"
              title="Return to previous step"
            >
              <ChevronLeft className="w-3.5 h-3.5 text-pink-400" />
              <span className="hidden sm:inline">Back</span>
            </button>
          )}

          {currentStepNum > 0 && (
            <div className="px-3.5 py-1.5 rounded-full bg-slate-900/70 border border-slate-800/90 backdrop-blur-md text-xs font-medium text-slate-300 shadow-lg flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold text-pink-400">Step {currentStepNum}/10</span>
              <span className="text-slate-500 hidden sm:inline">•</span>
              <span className="text-slate-400 hidden sm:inline">{stepLabels[step]}</span>
            </div>
          )}
        </div>

        {/* Right: Audio Controller */}
        <div className="pointer-events-auto">
          <AudioBar musicUrl={config.musicUrl} />
        </div>
      </header>

      {/* Main Experience View with AnimatePresence fluid transitions */}
      <main className="flex-1 flex flex-col justify-center relative z-10 pt-14 pb-8">
        <AnimatePresence mode="wait">
          {step === 'passcode' && (
            <motion.div
              key="passcode"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <PasscodeScreen
                expectedPasscode={config.passcode}
                creatorName={config.creatorName}
                onSuccess={handlePasscodeSuccess}
              />
            </motion.div>
          )}

          {step === 'welcome' && (
            <motion.div
              key="welcome"
              initial={{ opacity: 0, y: 16, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.99 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Step1Welcome
                recipientName={config.recipientName}
                creatorName={config.creatorName}
                onNext={handleStep1Next}
              />
            </motion.div>
          )}

          {step === 'scratch' && (
            <motion.div
              key="scratch"
              initial={{ opacity: 0, y: 16, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.99 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Step2Scratch
                recipientName={config.recipientName}
                creatorName={config.creatorName}
                onNext={handleStep2Next}
              />
            </motion.div>
          )}

          {step === 'balloons' && (
            <motion.div
              key="balloons"
              initial={{ opacity: 0, y: 16, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.99 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Step3Balloons
                recipientName={config.recipientName}
                creatorName={config.creatorName}
                onNext={handleStep3Next}
              />
            </motion.div>
          )}

          {step === 'bouquet' && (
            <motion.div
              key="bouquet"
              initial={{ opacity: 0, y: 16, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.99 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Step4Bouquet
                recipientName={config.recipientName}
                creatorName={config.creatorName}
                onNext={handleStep4Next}
              />
            </motion.div>
          )}

          {step === 'letter' && (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 16, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.99 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Step2Letter
                recipientName={config.recipientName}
                creatorName={config.creatorName}
                greeting={config.letterGreeting}
                messages={config.letterMessage}
                closing={config.letterClosing}
                onNext={handleStep5Next}
              />
            </motion.div>
          )}

          {step === 'reasons' && (
            <motion.div
              key="reasons"
              initial={{ opacity: 0, y: 16, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.99 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Step6Reasons
                recipientName={config.recipientName}
                creatorName={config.creatorName}
                onNext={handleStep6Next}
              />
            </motion.div>
          )}

          {step === 'cake' && (
            <motion.div
              key="cake"
              initial={{ opacity: 0, y: 16, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.99 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Step3Cake
                recipientName={config.recipientName}
                creatorName={config.creatorName}
                onNext={handleStep7Next}
              />
            </motion.div>
          )}

          {step === 'fortune' && (
            <motion.div
              key="fortune"
              initial={{ opacity: 0, y: 16, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.99 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Step6Fortune
                recipientName={config.recipientName}
                creatorName={config.creatorName}
                onNext={handleStep8Next}
              />
            </motion.div>
          )}

          {step === 'crown' && (
            <motion.div
              key="crown"
              initial={{ opacity: 0, y: 16, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.99 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Step9Crown
                recipientName={config.recipientName}
                creatorName={config.creatorName}
                onNext={handleStep9Next}
              />
            </motion.div>
          )}

          {step === 'celebration' && (
            <motion.div
              key="celebration"
              initial={{ opacity: 0, y: 16, scale: 0.99 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.99 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <Step4Celebration
                config={config}
                onUpdateConfig={setConfig}
                onRestart={handleRestart}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

