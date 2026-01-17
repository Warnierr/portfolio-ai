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
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none transition-colors duration-700 bg-[var(--bg-primary)]">
            <AnimatePresence mode="wait">
                {theme === 'matrix' && (
                    <div key="matrix">
                        <MatrixRain />
                        <MatrixDataBursts />
                    </div>
                )}
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
            // Fade effect (trail) - Darker mostly black background
            ctx.fillStyle = 'rgba(2, 2, 5, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.font = `${fontSize}px monospace`;

            for (let i = 0; i < drops.length; i++) {
                // Determine if we are on the edges (Sidebars)
                const x = i * fontSize;
                const isEdge = x < 120 || x > canvas.width - 120; // Sidebars slightly wider

                // Color logic: TERMINAL STYLE
                // Edges: Bright Terminal Green
                // Center: Very dark, subtle organic code
                if (isEdge) {
                    ctx.fillStyle = '#0F0'; // Neon Green
                    ctx.shadowBlur = 8;
                    ctx.shadowColor = 'rgba(0, 255, 0, 0.8)';
                } else {
                    // Center: Nuanced dark green, varying opacity
                    const opacity = Math.random() * 0.5 + 0.1;
                    ctx.fillStyle = `rgba(0, 60, 0, ${opacity})`;
                    ctx.shadowBlur = 0;
                }

                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, x, drops[i] * fontSize);

                // Reset logic
                const threshold = isEdge ? 0.98 : 0.998; // Center flows VERY rarely reset to keep it clean

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

// 🟢 MATRIX DATA BURSTS (Event-driven background glitches)
function MatrixDataBursts() {
    const [bursts, setBursts] = useState<{ id: number, x: number, y: number, text: string }[]>([]);

    const addBurst = () => {
        const texts = ["0x4F2A", "SYSTEM_CHECK", "CONNECTING...", "ENCRYPTED", "::ROOT_ACCESS::", "101101", "NULL_POINTER", "TRACE_COMPLETE", "WAKE_UP_NEO"];
        const id = Date.now();
        const text = texts[Math.floor(Math.random() * texts.length)];
        const x = Math.random() * 80 + 10;
        const y = Math.random() * 80 + 10;
        setBursts(prev => [...prev.slice(-4), { id, x, y, text }]);

        // Sound effect placeholder? 
        // new Audio('/sounds/glitch.mp3').play().catch(() => {});

        setTimeout(() => {
            setBursts(prev => prev.filter(b => b.id !== id));
        }, 2000);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (Math.random() > 0.7) return;
            addBurst(); // Auto trigger
        }, 1500);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <AnimatePresence>
                    {bursts.map(b => (
                        <motion.div
                            key={b.id}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: [0, 1, 0], scale: 1.2 }} // Plus visible pour le test
                            exit={{ opacity: 0 }}
                            transition={{ duration: 1.5, ease: "easeInOut" }}
                            className="absolute font-mono text-sm font-bold text-[#0F0] tracking-widest whitespace-nowrap bg-black/50 px-2 py-1 border border-[#0F0]/30 shadow-[0_0_10px_rgba(0,255,0,0.3)]"
                            style={{ left: `${b.x}%`, top: `${b.y}%` }}
                        >
                            {b.text}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {/* DEV TRIGGER BUTTON */}
            <button
                onClick={addBurst}
                className="fixed bottom-20 left-6 z-[100] bg-black/80 border border-[#0F0] text-[#0F0] px-3 py-1 text-[10px] font-mono font-bold rounded hover:bg-[#0F0] hover:text-black transition-colors cursor-pointer active:scale-95"
            >
                [TEST_EVENT]
            </button>
        </>
    );
}

// 🌆 CYBERPUNK GRID & GLITCH
function CyberpunkGrid() {
    const [glitchActive, setGlitchActive] = useState(false);

    const triggerGlitch = () => {
        setGlitchActive(true);
        // Rapid strobe effect
        setTimeout(() => setGlitchActive(false), 50);
        setTimeout(() => setGlitchActive(true), 100);
        setTimeout(() => setGlitchActive(false), 200);
    };

    return (
        <div className="absolute inset-0 bg-[#050510] overflow-hidden">
            {/* GLITCH OVERLAY EVENT */}
            {glitchActive && (
                <>
                    <div className="fixed inset-0 bg-red-600 mix-blend-exclusion opacity-30 z-50 pointer-events-none"></div>
                    <div className="fixed inset-0 bg-blue-600 mix-blend-difference opacity-30 translate-x-2 z-50 pointer-events-none"></div>
                </>
            )}

            {/* Scanline overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[length:100%_2px,3px_100%] pointer-events-none"></div>

            {/* RADIAL PERSPECTIVE GRID - Converges to center horizon */}
            <div className="absolute inset-0" style={{ perspective: '800px', perspectiveOrigin: 'center center' }}>
                {/* Main floor grid with central vanishing point */}
                <div
                    className="absolute left-0 right-0 bottom-0 h-[70vh] origin-bottom"
                    style={{
                        transform: 'rotateX(75deg)',
                        background: `
                            repeating-linear-gradient(
                                0deg,
                                transparent 0px,
                                transparent 49px,
                                rgba(236, 72, 153, 0.4) 49px,
                                rgba(236, 72, 153, 0.4) 50px
                            ),
                            repeating-linear-gradient(
                                90deg,
                                transparent 0px,
                                transparent 49px,
                                rgba(236, 72, 153, 0.4) 49px,
                                rgba(236, 72, 153, 0.4) 50px
                            ),
                            radial-gradient(ellipse at center, rgba(236, 72, 153, 0.15) 0%, transparent 70%)
                        `,
                        backgroundSize: '50px 50px, 50px 50px, 100% 100%',
                        boxShadow: '0 0 100px rgba(236, 72, 153, 0.5), inset 0 0 100px rgba(236, 72, 153, 0.2)',
                    }}
                >
                    {/* Central glow at vanishing point */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-pink-500 rounded-full blur-[80px] opacity-60 animate-pulse"></div>
                </div>
            </div>

            {/* Atmospheric gradient */}
            <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-[#050510] via-[#1a0e22]/50 to-transparent opacity-90 pointer-events-none"></div>

            {/* TEST EVENT BTN */}
            <button
                onClick={triggerGlitch}
                className="fixed bottom-20 left-6 z-[100] bg-yellow-400 text-black border-2 border-black px-3 py-1 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-red-600 hover:border-red-600 transition-all cursor-pointer shadow-[4px_4px_0px_#000]"
            >
                [BREACH_SYSTEM]
            </button>
        </div>
    );
}

// 🌊 MIDNIGHT WAVE & STARS
function MidnightWaves() {
    const [shootingStars, setShootingStars] = useState<{ id: number, top: number, delay: number }[]>([]);

    const triggerShootingStar = () => {
        const id = Date.now();
        const top = Math.random() * 40; // Starts in top 40%
        setShootingStars(prev => [...prev, { id, top, delay: 0 }]);
        setTimeout(() => setShootingStars(prev => prev.filter(s => s.id !== id)), 3000);
    };

    useEffect(() => {
        // Auto trigger sometimes
        const interval = setInterval(() => {
            if (Math.random() > 0.8) triggerShootingStar();
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 overflow-hidden"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-[#020c1b] via-[#0a192f] to-[#112240]"></div>

            {/* Light Rays */}
            <div className="absolute top-0 left-1/4 w-96 h-[120%] bg-blue-500/10 rotate-[20deg] blur-[100px]"></div>

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
                            top: `${Math.random() * 60}%`,
                        }}
                        className="absolute w-1 h-1 bg-white rounded-full shadow-[0_0_5px_white]"
                    />
                ))}
            </div>

            {/* Shooting Stars */}
            <AnimatePresence>
                {shootingStars.map(star => (
                    <motion.div
                        key={star.id}
                        initial={{ x: '120vw', y: `${star.top}vh`, opacity: 0, scale: 0.5 }}
                        animate={{ x: '-20vw', y: `${star.top + 40}vh`, opacity: [0, 1, 1, 0], scale: 1 }}
                        transition={{ duration: 2, ease: "easeOut" }}
                        className="absolute w-[300px] h-[2px] bg-gradient-to-l from-transparent via-cyan-200 to-transparent shadow-[0_0_10px_rgba(165,243,252,0.8)] -rotate-[15deg] z-0"
                    >
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full blur-[2px] shadow-[0_0_15px_white]" />
                    </motion.div>
                ))}
            </AnimatePresence>

            {/* Ocean Waves Effect (CSS) */}
            <div className="absolute bottom-0 w-[200%] h-48 opacity-30 animate-wave-slow pointer-events-none">
                <svg viewBox="0 0 1440 320" className="w-full h-full fill-blue-500/20">
                    <path fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>
            <div className="absolute bottom-[-20px] left-[-50px] w-[210%] h-48 opacity-20 animate-wave-fast pointer-events-none">
                <svg viewBox="0 0 1440 320" className="w-full h-full fill-cyan-500/20">
                    <path fillOpacity="1" d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
                </svg>
            </div>

            {/* TEST EVENT BTN */}
            <button
                onClick={triggerShootingStar}
                className="fixed bottom-20 left-6 z-[100] bg-blue-900/50 border border-blue-400/30 text-blue-200 px-3 py-1 text-[10px] font-bold rounded backdrop-blur hover:bg-blue-500/30 hover:text-white transition-all cursor-pointer shadow-[0_0_15px_rgba(59,130,246,0.3)]"
            >
                [EVENT: SHOOTING_STAR]
            </button>
        </motion.div>
    );
}

// 🎋 ZEN AMBIENT - Wabi-sabi (Gentle Wind & Natural Elements)
function ZenAmbient() {
    const [inkDrop, setInkDrop] = useState(false);

    const triggerInk = () => {
        setInkDrop(true);
        setTimeout(() => setInkDrop(false), 4000);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-gradient-to-b from-[#faf8f3] to-[#f0ead8] overflow-hidden"
        >
            {/* Ink Drop Event */}
            <AnimatePresence>
                {inkDrop && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0.8 }}
                        animate={{ scale: 25, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 4, ease: "easeOut" }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#2c241b] rounded-full blur-2xl pointer-events-none mix-blend-multiply opacity-20"
                    />
                )}
            </AnimatePresence>

            {/* Gentle Gradient Clouds (Ma - Negative Space) */}
            <div className="absolute top-[-5%] right-[10%] w-[40vw] h-[40vh] bg-[#e8ddc8] rounded-full blur-[100px] opacity-30"></div>
            <div className="absolute bottom-[10%] left-[5%] w-[50vw] h-[45vh] bg-[#f0e5d3] rounded-full blur-[120px] opacity-25"></div>

            {/* Bamboo Stalks (Subtle vertical elements) */}
            <div className="absolute left-[5%] top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#8b7355]/20 to-transparent"></div>
            <div className="absolute left-[8%] top-[10%] bottom-[5%] w-[3px] bg-gradient-to-b from-transparent via-[#6b5d4f]/15 to-transparent"></div>
            <div className="absolute right-[12%] top-[5%] bottom-[15%] w-[2px] bg-gradient-to-b from-transparent via-[#a89074]/20 to-transparent"></div>

            {/* Floating Leaves (Gentle Wind Effect - Refined) */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{ x: '-10vw', y: `${Math.random() * 70 + 10}vh`, opacity: 0 }}
                        animate={{
                            x: '110vw',
                            y: [`${Math.random() * 70 + 10}vh`, `${Math.random() * 70 + 20}vh`, `${Math.random() * 70 + 10}vh`],
                            opacity: [0, 0.15, 0.15, 0],
                            rotate: [0, 180, 360]
                        }}
                        transition={{
                            duration: 25 + Math.random() * 15,
                            repeat: Infinity,
                            delay: i * 5,
                            ease: "linear"
                        }}
                        className="absolute w-8 h-8"
                    >
                        <svg viewBox="0 0 24 24" className="w-full h-full fill-[#8b7355] opacity-40">
                            <path d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
                        </svg>
                    </motion.div>
                ))}
            </div>

            {/* Water Ripples (Serenity) */}
            <div className="absolute bottom-0 left-0 right-0 h-24 opacity-10">
                <svg className="w-full h-full" viewBox="0 0 1440 120" preserveAspectRatio="none">
                    <motion.path
                        d="M0,60 Q360,30 720,60 T1440,60 L1440,120 L0,120 Z"
                        fill="#a89074"
                        initial={{ d: "M0,60 Q360,30 720,60 T1440,60 L1440,120 L0,120 Z" }}
                        animate={{ d: "M0,60 Q360,90 720,60 T1440,60 L1440,120 L0,120 Z" }}
                        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    />
                </svg>
            </div>

            {/* Breathing Light (Subtle) */}
            <motion.div
                animate={{ opacity: [0.1, 0.25, 0.1] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent"
            />

            {/* TEST EVENT BTN */}
            <button
                onClick={triggerInk}
                className="fixed bottom-20 left-6 z-[100] bg-[#2c241b]/10 border border-[#2c241b]/20 text-[#2c241b] px-3 py-1 text-[10px] font-serif italic rounded hover:bg-[#2c241b] hover:text-[#f4ebd0] transition-all cursor-pointer backdrop-blur-sm"
            >
                墨 Ink Drop
            </button>
        </motion.div>
    );
}
