"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export default function EyeComfortControl() {
    const { theme } = useTheme();
    const [config, setConfig] = useState<{ color: string, intensity: number, mode: 'soft' | 'warm' | 'intense' }>({
        color: '255, 179, 71', // Default Warm
        intensity: 0,
        mode: 'warm'
    });
    const [isVisible, setIsVisible] = useState(false);

    // Auto-activate filter for Zen theme
    useEffect(() => {
        if (theme === 'zen') {
            // Default to Warm (Beige) 15% when entering Zen
            setConfig({ color: '255, 179, 71', intensity: 0.15, mode: 'warm' });
            setIsVisible(true);
        } else {
            setConfig(prev => ({ ...prev, intensity: 0 }));
            setIsVisible(false);
        }
    }, [theme]);

    const handlePreset = (mode: 'soft' | 'warm' | 'intense') => {
        switch (mode) {
            case 'soft': // Bleu Lin (Doux, frais)
                setConfig({ color: '168, 192, 255', intensity: 0.2, mode: 'soft' });
                break;
            case 'warm': // Beige Doré (Moyen, Chaleureux) - Default
                setConfig({ color: '255, 179, 71', intensity: 0.15, mode: 'warm' });
                break;
            case 'intense': // Bordeaux (Fort, Soir)
                setConfig({ color: '139, 47, 47', intensity: 0.25, mode: 'intense' });
                break;
        }
    };

    if (!isVisible && config.intensity === 0) return null;

    return (
        <>
            {/* The Actual Filter Overlay */}
            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9999,
                    pointerEvents: 'none',
                    backgroundColor: `rgba(${config.color}, ${config.intensity})`,
                    mixBlendMode: 'multiply',
                    transition: 'background-color 0.8s ease'
                }}
            />

            {/* Control Panel (Only visible in Zen) */}
            {theme === 'zen' && (
                <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-2 group">
                    <div className="bg-[#fbf7f0]/90 backdrop-blur border border-[#d2c0a9] p-4 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 duration-300 pointer-events-none group-hover:pointer-events-auto w-56">
                        <div className="flex flex-col gap-3">
                            <label className="text-xs font-serif font-bold text-[#6d5a4b] flex justify-between items-center border-b border-[#d2c0a9]/50 pb-2">
                                <span>Confort des Yeux</span>
                                <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full ${config.mode === 'soft' ? 'bg-blue-100 text-blue-800' :
                                        config.mode === 'warm' ? 'bg-orange-100 text-orange-800' :
                                            'bg-red-100 text-red-800'
                                    }`}>
                                    {config.mode === 'soft' ? 'Lin' : config.mode === 'warm' ? 'Doré' : 'Sanguine'}
                                </span>
                            </label>

                            {/* Preset Buttons - Bleu / Blanc(Beige) / Rouge */}
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    onClick={() => handlePreset('soft')}
                                    className={`relative h-10 w-full rounded-lg border-2 transition-all overflow-hidden group/btn ${config.mode === 'soft' ? 'border-blue-400 scale-105 shadow-md' : 'border-transparent hover:border-blue-200'
                                        }`}
                                    title="Doux (Bleu Lin)"
                                >
                                    <div className="absolute inset-0 bg-[#a8c0ff] opacity-50"></div>
                                    <span className="relative z-10 text-[10px] font-bold text-blue-900">Doux</span>
                                </button>

                                <button
                                    onClick={() => handlePreset('warm')}
                                    className={`relative h-10 w-full rounded-lg border-2 transition-all overflow-hidden group/btn ${config.mode === 'warm' ? 'border-orange-400 scale-105 shadow-md' : 'border-transparent hover:border-orange-200'
                                        }`}
                                    title="Chaleureux (Beige Doré)"
                                >
                                    <div className="absolute inset-0 bg-[#ffb347] opacity-60"></div>
                                    <span className="relative z-10 text-[10px] font-bold text-orange-900">Moyen</span>
                                </button>

                                <button
                                    onClick={() => handlePreset('intense')}
                                    className={`relative h-10 w-full rounded-lg border-2 transition-all overflow-hidden group/btn ${config.mode === 'intense' ? 'border-red-800 scale-105 shadow-md' : 'border-transparent hover:border-red-300'
                                        }`}
                                    title="Fort (Bordeaux)"
                                >
                                    <div className="absolute inset-0 bg-[#8b2f2f] opacity-60"></div>
                                    <span className="relative z-10 text-[10px] font-bold text-red-900">Fort</span>
                                </button>
                            </div>

                            <p className="text-[10px] text-[#96816d] italic leading-tight text-center pt-1">
                                {config.mode === 'soft' && "Teinte Lin apaisante pour la lecture de jour."}
                                {config.mode === 'warm' && "Lueur dorée standard pour réduire la fatigue."}
                                {config.mode === 'intense' && "Filtre Sanguine profond pour la protection nocturne."}
                            </p>
                        </div>
                    </div>

                    <button className="bg-[#fbf7f0] border-2 border-[#d2c0a9] text-[#a63c2f] p-2.5 rounded-full shadow-lg hover:scale-110 hover:border-[#a63c2f] transition-all relative z-50 cursor-pointer" title="Réglage Yeux">
                        <span className="text-lg">👁️</span>
                        {/* Indicateur de mode actif sur l'icone */}
                        <span className={`absolute top-0 right-0 w-3 h-3 rounded-full border border-white ${config.mode === 'soft' ? 'bg-[#a8c0ff]' :
                                config.mode === 'warm' ? 'bg-[#ffb347]' : 'bg-[#8b2f2f]'
                            }`}></span>
                    </button>
                </div>
            )}
        </>
    );
}
