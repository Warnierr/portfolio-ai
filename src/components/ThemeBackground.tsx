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

// 🟢 MATRIX EFFECT (SIDEBARS & FLOW)
function MatrixRain() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const chars = "XYZ019GLITCH";
        const fontSize = 14;
        const columns = Math.ceil(canvas.width / fontSize);
        const drops: number[] = [];

        // Init drops randomly
        for (let i = 0; i < columns; i++) {
            drops[i] = Math.random() * -100;
        }

        const draw = () => {
            // Fade effect (trail)
            ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Determine if we are on the edges (Sidebars)
                const x = i * fontSize;
                const isEdge = x < 100 || x > canvas.width - 100;

                // Color logic: Edges are brighter/greener, Center is darker/subtle
                if (isEdge) {
                    ctx.fillStyle = '#0F0';
                    ctx.shadowBlur = 5;
                    ctx.shadowColor = '#0F0';
                } else {
                    ctx.fillStyle = '#003300';
                    ctx.shadowBlur = 0;
                }

                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, x, drops[i] * fontSize);

                // Reset logic
                // Edges flow faster and restart more often
                const threshold = isEdge ? 0.975 : 0.995;

                if (drops[i] * fontSize > canvas.height && Math.random() > threshold) {
                    drops[i] = 0;
                }

                // Speed difference
                drops[i] += isEdge ? 1 : 0.5;
            }
        };

        const interval = setInterval(draw, 40);

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            // Re-init drops on resize to avoid gaps
            const newCols = Math.ceil(canvas.width / fontSize);
            for (let i = 0; i < newCols; i++) {
                if (!drops[i]) drops[i] = Math.random() * -100;
            }
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
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 w-full h-full mix-blend-screen"
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

            {/* Deep gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#020c1b] via-[#0a192f] to-[#112240]"></div>

            {/* Twinkling Stars */}
            <div className="absolute inset-0 opacity-40">
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 0] }}
                        transition={{
                            duration: Math.random() * 3 + 2,
                            repeat: Infinity,
                            delay: Math.random() * 5
                        }}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 60}%`, // Stars mostly in upper part
                        }}
                        className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_5px_white]"
                    />
                ))}
            </div>

            {/* Ocean Waves Effect (CSS) */}
            <div className="absolute bottom-0 w-[200%] h-48 opacity-30 animate-wave-slow">
                <svg viewBox="0 0 1440 320" className="w-full h-full fill-blue-500/20">
                    <path fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>
            <div className="absolute bottom-[-20px] left-[-50px] w-[210%] h-48 opacity-20 animate-wave-fast">
                <svg viewBox="0 0 1440 320" className="w-full h-full fill-cyan-500/20">
                    <path fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>
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

            {/* Effet vignettage violet plus doux */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-60"></div>
        </motion.div>
    );
}

// 🟤 ZEN AMBIENT (LIVING PARCHMENT)
function ZenAmbient() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#fdfbf7]" // Base paper color
        >
            {/* STRONG Parchment Texture */}
            <div className="absolute inset-0 opacity-[0.4] mix-blend-multiply pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                    filter: 'contrast(120%) brightness(95%) sepia(20%)'
                }}
            ></div>

            {/* Subtle fiber overlay */}
            <div className="absolute inset-0 opacity-[0.05] bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]"></div>

            {/* Warm natural gradient overlay - Breathing */}
            <motion.div
                animate={{ opacity: [0.3, 0.5, 0.3] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-br from-[#e6dcc3] via-transparent to-[#d2c0a9] mix-blend-multiply pointer-events-none"
            />
        </motion.div>
    );
}
