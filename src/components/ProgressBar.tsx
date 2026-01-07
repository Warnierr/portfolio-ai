"use client";

import { motion } from "framer-motion";

type ProgressBarProps = {
  currentStep: number;
  totalSteps: number;
  estimatedTimeRemaining?: number; // en secondes
};

export default function ProgressBar({
  currentStep,
  totalSteps,
  estimatedTimeRemaining,
}: ProgressBarProps) {
  const progress = (currentStep / totalSteps) * 100;

  const formatTime = (seconds: number): string => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}min ${secs}s`;
  };

  return (
    <div className="w-full">
      {/* Progress Info */}
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-medium text-white">
          Étape {currentStep} sur {totalSteps}
        </span>
        {estimatedTimeRemaining !== undefined && (
          <span className="text-zinc-400">
            ⏱️ Temps restant : {formatTime(estimatedTimeRemaining)}
          </span>
        )}
      </div>

      {/* Progress Bar */}
      <div className="relative h-3 overflow-hidden rounded-full bg-white/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-full bg-gradient-to-r from-emerald-500 to-blue-500"
        />
        
        {/* Shimmer Effect */}
        <motion.div
          animate={{
            x: ["-100%", "200%"],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
      </div>

      {/* Progress Percentage */}
      <div className="mt-1 text-right text-xs text-zinc-500">
        {Math.round(progress)}% complété
      </div>
    </div>
  );
}
