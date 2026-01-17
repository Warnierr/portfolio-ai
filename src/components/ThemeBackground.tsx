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
                {theme === 'neon' && <NeonPulse key="neon" />}
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
                    className="absolute left-0 right-0 bottom-0 h-[85vh] origin-bottom"
                    style={{
                        transform: 'rotateX(78deg)',
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

// 🌊 MIDNIGHT SEASIDE - Ocean + Lighthouse + Real Moon Phases
function MidnightWaves() {
    const [shootingStars, setShootingStars] = useState<{ id: number, top: number, delay: number }[]>([]);

    // Calculate real moon phase (0-7: New, Waxing Crescent, First Quarter, Waxing Gibbous, Full, Waning Gibbous, Last Quarter, Waning Crescent)
    const getMoonPhase = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        // Simplified lunar phase calculation (29.53 day cycle)
        const c = Math.floor((year - 1900) / 100);
        const e = 2 - c + Math.floor(c / 4);
        const jd = Math.floor(365.25 * (year + 4716)) + Math.floor(30.6001 * (month + 1)) + day + e - 1524.5;
        const daysSinceNew = (jd - 2451549.5) / 29.53;
        const phase = daysSinceNew - Math.floor(daysSinceNew);

        // Map to 8 phases
        if (phase < 0.0625) return 0; // New Moon
        if (phase < 0.1875) return 1; // Waxing Crescent
        if (phase < 0.3125) return 2; // First Quarter
        if (phase < 0.4375) return 3; // Waxing Gibbous
        if (phase < 0.5625) return 4; // Full Moon
        if (phase < 0.6875) return 5; // Waning Gibbous
        if (phase < 0.8125) return 6; // Last Quarter
        return 7; // Waning Crescent
    };

    const moonPhase = getMoonPhase();
    const moonEmoji = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'][moonPhase];

    const triggerShootingStar = () => {
        const id = Date.now();
        const top = Math.random() * 40;
        setShootingStars(prev => [...prev, { id, top, delay: 0 }]);
        setTimeout(() => setShootingStars(prev => prev.filter(s => s.id !== id)), 3000);
    };

    useEffect(() => {
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
            {/* Sky Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#001122] via-[#0a192f] to-[#1a2332]"></div>

            {/* Moon (Real Phase) */}
            <div className="absolute top-[10%] right-[15%] text-8xl opacity-90 filter drop-shadow-[0_0_30px_rgba(200,220,255,0.5)]">
                {moonEmoji}
            </div>

            {/* Twinkling Stars */}
            <div className="absolute inset-0 opacity-40">
                {[...Array(30)].map((_, i) => (
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

            {/* Ocean Waves (Animated) */}
            <div className="absolute bottom-0 w-full h-64 overflow-hidden">
                <motion.div
                    animate={{ x: [0, -100, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-0 w-[200%] h-full opacity-40"
                >
                    <svg viewBox="0 0 2880 320" className="w-full h-full fill-blue-900/40">
                        <path d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z M1440,192L1488,197.3C1536,203,1632,213,1728,229.3C1824,245,1920,267,2016,250.7C2112,235,2208,181,2304,181.3C2400,181,2496,235,2592,234.7C2688,235,2784,181,2832,154.7L2880,128L2880,320L2832,320C2784,320,2688,320,2592,320C2496,320,2400,320,2304,320C2208,320,2112,320,2016,320C1920,320,1824,320,1728,320C1632,320,1536,320,1488,320L1440,320Z"></path>
                    </svg>
                </motion.div>
                <motion.div
                    animate={{ x: [0, 100, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-0 w-[200%] h-full opacity-30"
                >
                    <svg viewBox="0 0 2880 320" className="w-full h-full fill-cyan-900/30">
                        <path d="M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z M1440,96L1488,112C1536,128,1632,160,1728,186.7C1824,213,1920,235,2016,213.3C2112,192,2208,128,2304,128C2400,128,2496,192,2592,208C2688,224,2784,192,2832,176L2880,160L2880,320L2832,320C2784,320,2688,320,2592,320C2496,320,2400,320,2304,320C2208,320,2112,320,2016,320C1920,320,1824,320,1728,320C1632,320,1536,320,1488,320L1440,320Z"></path>
                    </svg>
                </motion.div>
            </div>

            {/* Lighthouse (Far right, rotating beam) */}
            <div className="absolute bottom-32 right-[5%] z-10">
                {/* Lighthouse tower */}
                <div className="relative w-4 h-32 bg-gradient-to-t from-gray-700 to-gray-500 rounded-t-sm shadow-xl">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-6 h-4 bg-yellow-500/80 rounded-full"></div>
                    {/* Rotating light beam */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                        className="absolute top-0 left-1/2 -translate-x-1/2 w-[200px] h-[2px] origin-left"
                        style={{
                            background: 'linear-gradient(to right, rgba(255,255,200,0.6), transparent)',
                            filter: 'blur(1px)',
                            transformOrigin: 'left center'
                        }}
                    />
                </div>
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

// 📖 ZEN LITERARY - Classic Book Elegance
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
            className="absolute inset-0 bg-[#fefdfb] overflow-hidden"
        >
            {/* Ink Drop Event */}
            <AnimatePresence>
                {inkDrop && (
                    <motion.div
                        initial={{ scale: 0, opacity: 0.8 }}
                        animate={{ scale: 25, opacity: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 4, ease: "easeOut" }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-[#1a1512] rounded-full blur-2xl pointer-events-none mix-blend-multiply opacity-15"
                    />
                )}
            </AnimatePresence>

            {/* Subtle Paper Texture (Very light) */}
            <div
                className="absolute inset-0 opacity-[0.03] mix-blend-multiply pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
                }}
            ></div>

            {/* Vignette (Book page depth) */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#f5f3ee]/40"></div>

            {/* Decorative corner ornaments (subtle) */}
            <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-[#cdc3b5]/20 rounded-tl-lg"></div>
            <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-[#cdc3b5]/20 rounded-tr-lg"></div>

            {/* Breathing light (very subtle) */}
            <motion.div
                animate={{ opacity: [0.0, 0.05, 0.0] }}
                transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-gradient-to-br from-[#8b5a3c]/5 via-transparent to-transparent"
            />

            {/* TEST EVENT BTN */}
            <button
                onClick={triggerInk}
                className="fixed bottom-20 left-6 z-[100] bg-[#1a1512]/5 border border-[#cdc3b5]/40 text-[#4a4137] px-3 py-1 text-[10px] font-serif italic rounded hover:bg-[#1a1512] hover:text-[#fefdfb] transition-all cursor-pointer backdrop-blur-sm"
            >
                Ink Drop
            </button>
        </motion.div>
    );
}
 
 / /   � xR�  N E O N   P U L S E   -   V e r t i c a l   T u b e s   &   O s c i l l a t i o n  
 f u n c t i o n   N e o n P u l s e ( )   {  
         c o n s t   [ f l a s h ,   s e t F l a s h ]   =   u s e S t a t e ( f a l s e ) ;  
  
         c o n s t   t r i g g e r F l a s h   =   ( )   = >   {  
                 s e t F l a s h ( t r u e ) ;  
                 s e t T i m e o u t ( ( )   = >   s e t F l a s h ( f a l s e ) ,   6 0 0 ) ;  
         } ;  
  
         u s e E f f e c t ( ( )   = >   {  
                 c o n s t   i n t e r v a l   =   s e t I n t e r v a l ( ( )   = >   {  
                         i f   ( M a t h . r a n d o m ( )   >   0 . 8 5 )   t r i g g e r F l a s h ( ) ;  
                 } ,   8 0 0 0 ) ;  
                 r e t u r n   ( )   = >   c l e a r I n t e r v a l ( i n t e r v a l ) ;  
         } ,   [ ] ) ;  
  
         r e t u r n   (  
                 < m o t i o n . d i v  
                         i n i t i a l = { {   o p a c i t y :   0   } }  
                         a n i m a t e = { {   o p a c i t y :   1   } }  
                         e x i t = { {   o p a c i t y :   0   } }  
                         c l a s s N a m e = " a b s o l u t e   i n s e t - 0   b g - b l a c k   o v e r f l o w - h i d d e n "  
                 >  
                         { / *   N e o n   F l a s h   E v e n t   * / }  
                         < A n i m a t e P r e s e n c e >  
                                 { f l a s h   & &   (  
                                         < m o t i o n . d i v  
                                                 i n i t i a l = { {   o p a c i t y :   0   } }  
                                                 a n i m a t e = { {   o p a c i t y :   [ 0 ,   0 . 3 ,   0 ]   } }  
                                                 e x i t = { {   o p a c i t y :   0   } }  
                                                 t r a n s i t i o n = { {   d u r a t i o n :   0 . 6 ,   e a s e :   " e a s e I n O u t "   } }  
                                                 c l a s s N a m e = " f i x e d   i n s e t - 0   b g - [ # 3 9 f f 1 4 ]   m i x - b l e n d - s c r e e n   p o i n t e r - e v e n t s - n o n e   z - 5 0 "  
                                         / >  
                                 ) }  
                         < / A n i m a t e P r e s e n c e >  
  
                         { / *   L e f t   N e o n   T u b e s   * / }  
                         < d i v   c l a s s N a m e = " a b s o l u t e   l e f t - 0   t o p - 0   b o t t o m - 0   w - 2 4   f l e x   f l e x - c o l   j u s t i f y - a r o u n d   i t e m s - c e n t e r   g a p - 8   p y - 1 0 " >  
                                 { [ 0 ,   1 ,   2 ,   3 ] . m a p ( i   = >   (  
                                         < m o t i o n . d i v  
                                                 k e y = { ` l e f t - $ { i } ` }  
                                                 a n i m a t e = { {  
                                                         o p a c i t y :   [ 0 . 4 ,   0 . 8 ,   0 . 4 ] ,  
                                                         b o x S h a d o w :   [  
                                                                 ' 0   0   1 0 p x   r g b a ( 5 7 , 2 5 5 , 2 0 , 0 . 4 ) ,   0   0   2 0 p x   r g b a ( 5 7 , 2 5 5 , 2 0 , 0 . 2 ) ' ,  
                                                                 ' 0   0   2 0 p x   r g b a ( 5 7 , 2 5 5 , 2 0 , 0 . 8 ) ,   0   0   4 0 p x   r g b a ( 5 7 , 2 5 5 , 2 0 , 0 . 4 ) ' ,  
                                                                 ' 0   0   1 0 p x   r g b a ( 5 7 , 2 5 5 , 2 0 , 0 . 4 ) ,   0   0   2 0 p x   r g b a ( 5 7 , 2 5 5 , 2 0 , 0 . 2 ) '  
                                                         ]  
                                                 } }  
                                                 t r a n s i t i o n = { {  
                                                         d u r a t i o n :   3   +   i ,  
                                                         r e p e a t :   I n f i n i t y ,  
                                                         d e l a y :   i   *   0 . 5 ,  
                                                         e a s e :   " e a s e I n O u t "  
                                                 } }  
                                                 c l a s s N a m e = " w - 3   h - 3 2   b g - [ # 3 9 f f 1 4 ]   r o u n d e d - f u l l   o p a c i t y - 6 0 "  
                                                 s t y l e = { {  
                                                         f i l t e r :   ' b l u r ( 1 p x ) ' ,  
                                                         b o x S h a d o w :   ' 0   0   1 5 p x   r g b a ( 5 7 , 2 5 5 , 2 0 , 0 . 6 ) ,   0   0   3 0 p x   r g b a ( 5 7 , 2 5 5 , 2 0 , 0 . 3 ) '  
                                                 } }  
                                         / >  
                                 ) ) }  
                         < / d i v >  
  
                         { / *   R i g h t   N e o n   T u b e s   * / }  
                         < d i v   c l a s s N a m e = " a b s o l u t e   r i g h t - 0   t o p - 0   b o t t o m - 0   w - 2 4   f l e x   f l e x - c o l   j u s t i f y - a r o u n d   i t e m s - c e n t e r   g a p - 8   p y - 1 0 " >  
                                 { [ 0 ,   1 ,   2 ,   3 ] . m a p ( i   = >   (  
                                         < m o t i o n . d i v  
                                                 k e y = { ` r i g h t - $ { i } ` }  
                                                 a n i m a t e = { {  
                                                         o p a c i t y :   [ 0 . 4 ,   0 . 8 ,   0 . 4 ] ,  
                                                         b o x S h a d o w :   [  
                                                                 ' 0   0   1 0 p x   r g b a ( 2 5 5 , 2 0 , 1 4 7 , 0 . 4 ) ,   0   0   2 0 p x   r g b a ( 2 5 5 , 2 0 , 1 4 7 , 0 . 2 ) ' ,  
                                                                 ' 0   0   2 0 p x   r g b a ( 2 5 5 , 2 0 , 1 4 7 , 0 . 8 ) ,   0   0   4 0 p x   r g b a ( 2 5 5 , 2 0 , 1 4 7 , 0 . 4 ) ' ,  
                                                                 ' 0   0   1 0 p x   r g b a ( 2 5 5 , 2 0 , 1 4 7 , 0 . 4 ) ,   0   0   2 0 p x   r g b a ( 2 5 5 , 2 0 , 1 4 7 , 0 . 2 ) '  
                                                         ]  
                                                 } }  
                                                 t r a n s i t i o n = { {  
                                                         d u r a t i o n :   3 . 5   +   i ,  
                                                         r e p e a t :   I n f i n i t y ,  
                                                         d e l a y :   i   *   0 . 6 ,  
                                                         e a s e :   " e a s e I n O u t "  
                                                 } }  
                                                 c l a s s N a m e = " w - 3   h - 3 2   b g - [ # f f 1 4 9 3 ]   r o u n d e d - f u l l   o p a c i t y - 6 0 "  
                                                 s t y l e = { {  
                                                         f i l t e r :   ' b l u r ( 1 p x ) ' ,  
                                                         b o x S h a d o w :   ' 0   0   1 5 p x   r g b a ( 2 5 5 , 2 0 , 1 4 7 , 0 . 6 ) ,   0   0   3 0 p x   r g b a ( 2 5 5 , 2 0 , 1 4 7 , 0 . 3 ) '  
                                                 } }  
                                         / >  
                                 ) ) }  
                         < / d i v >  
  
                         { / *   C e n t e r   a m b i e n t   g l o w   * / }  
                         < d i v   c l a s s N a m e = " a b s o l u t e   i n s e t - 0   b g - g r a d i e n t - r a d i a l   f r o m - [ # 3 9 f f 1 4 ] / 5   v i a - t r a n s p a r e n t   t o - [ # f f 1 4 9 3 ] / 5 " > < / d i v >  
  
                         { / *   T E S T   E V E N T   B T N   * / }  
                         < b u t t o n  
                                 o n C l i c k = { t r i g g e r F l a s h }  
                                 c l a s s N a m e = " f i x e d   b o t t o m - 2 0   l e f t - 6   z - [ 1 0 0 ]   b g - b l a c k   b o r d e r - 2   b o r d e r - [ # 3 9 f f 1 4 ]   t e x t - [ # 3 9 f f 1 4 ]   p x - 3   p y - 1   t e x t - [ 1 0 p x ]   f o n t - b o l d   u p p e r c a s e   t r a c k i n g - w i d e s t   h o v e r : b g - [ # 3 9 f f 1 4 ]   h o v e r : t e x t - b l a c k   t r a n s i t i o n - a l l   c u r s o r - p o i n t e r   s h a d o w - [ 0 _ 0 _ 2 0 p x _ r g b a ( 5 7 , 2 5 5 , 2 0 , 0 . 5 ) ] "  
                         >  
                                 � a�   F L A S H  
                         < / b u t t o n >  
                 < / m o t i o n . d i v >  
         ) ;  
 }  
 