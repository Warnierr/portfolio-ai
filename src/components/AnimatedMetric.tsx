"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

type AnimatedMetricProps = {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  decimals?: number;
  label: string;
  color?: "emerald" | "blue" | "purple" | "orange";
};

export default function AnimatedMetric({
  value,
  suffix = "",
  prefix = "",
  duration = 2,
  decimals = 0,
  label,
  color = "emerald",
}: AnimatedMetricProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  const colorClasses = {
    emerald: "from-emerald-400 to-emerald-600 text-emerald-400",
    blue: "from-blue-400 to-blue-600 text-blue-400",
    purple: "from-purple-400 to-purple-600 text-purple-400",
    orange: "from-orange-400 to-orange-600 text-orange-400",
  };

  useEffect(() => {
    if (!isInView) return;

    const startTime = Date.now();
    const endTime = startTime + duration * 1000;

    const updateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / (duration * 1000), 1);
      
      // Easing function (easeOutExpo)
      const easedProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      
      setCount(easedProgress * value);

      if (now < endTime) {
        requestAnimationFrame(updateCount);
      } else {
        setCount(value);
      }
    };

    requestAnimationFrame(updateCount);
  }, [isInView, value, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-white/20 hover:bg-white/10"
    >
      {/* Gradient glow effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colorClasses[color].split(" ")[0]} ${colorClasses[color].split(" ")[1]} opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-20`} />
      
      <div className="relative">
        <div className="mb-2 flex items-baseline justify-center gap-1">
          <span className="text-sm font-medium text-zinc-400">{prefix}</span>
          <span className={`bg-gradient-to-br ${colorClasses[color]} bg-clip-text text-5xl font-bold tabular-nums text-transparent md:text-6xl`}>
            {count.toFixed(decimals)}
          </span>
          <span className="text-2xl font-semibold text-zinc-400">{suffix}</span>
        </div>
        <p className="text-center text-sm font-medium text-zinc-400">{label}</p>
      </div>
    </motion.div>
  );
}
