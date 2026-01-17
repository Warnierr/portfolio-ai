"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ThemeBackground() {
    const { theme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <div className="fixed inset-0 pointer-events-none z-[-1] overflow-hidden">
            <AnimatePresence mode="wait">
                {theme === 'matrix' && <MatrixRain key="matrix" />}
                {theme === 'midnight' && <MidnightWaves key="midnight" />}
                {theme === 'cyberpunk' && <CyberpunkGrid key="cyberpunk" />}
                {theme === 'zen' && <ZenAmbient key="zen" />}
            </AnimatePresence>
        </div>
    );
}

// 🟢 MATRIX EFFECT
function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = "XYZ019";
        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops: number[] = [];

        for (let i = 0; i < columns; i++) {
            drops[i] = 1;
        }

        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'; // Trail effect
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#0F0'; // Green text
            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };

        const interval = setInterval(draw, 50);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <motion.canvas
            ref={canvasRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.15 }} // Subtil
            exit={{ opacity: 0 }}
            className="absolute inset-0 w-full h-full"
        />
    );
}

// 🔵 MIDNIGHT WAVES
function MidnightWaves() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 overflow-hidden"
        >
            <div className="absolute -bottom-[400px] left-0 right-0 h-[600px] opacity-30 bg-gradient-to-t from-blue-900 via-transparent to-transparent animate-pulse" />

            {/* Vague 1 */}
            <div className="absolute bottom-0 left-0 w-[200%] h-[300px] bg-gradient-to-r from-transparent via-blue-900/10 to-transparent animate-[wave_15s_linear_infinite]"
                style={{ transform: "translateX(-50%)" }} />

            {/* Particules flottantes (bulles/plancton) */}
            <div className="absolute inset-0 bg-[url('/effects/noise.png')] opacity-5 mix-blend-overlay"></div>

            {/* Rayons de lumière sous-marine */}
            <div className="absolute top-0 left-1/4 w-32 h-[120vh] bg-gradient-to-b from-blue-400/5 to-transparent rotate-12 blur-3xl transform -translate-y-1/2 animate-pulse"></div>
        </motion.div>
    );
}

// 🟣 CYBERPUNK GRID
function CyberpunkGrid() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 perspective-grid"
        >
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>

            {/* Ligne d'horizon neon */}
            <div className="absolute w-full h-[2px] top-1/2 bg-purple-500 blur-sm shadow-[0_0_20px_#d946ef]"></div>

            {/* Effet vignettage violet */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-80"></div>
        </motion.div>
    );
}

// 🟤 ZEN AMBIENT
function ZenAmbient() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
        >
            {/* Noise Texture subtile pour effet papier */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>

            {/* Slow Breathing Light */}
            <motion.div
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] rounded-full bg-orange-100/10 blur-[120px]"
            />
        </motion.div>
    );
}
