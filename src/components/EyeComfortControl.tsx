"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

export default function EyeComfortControl() {
    const { theme } = useTheme();
    // Default intensity 0.1 (low blue light filter) by default
    const [intensity, setIntensity] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    // Auto-activate filter for Zen theme
    useEffect(() => {
        if (theme === 'zen') {
            setIntensity(0.15); // Start with mild filter for Zen
            setIsVisible(true);
        } else {
            setIntensity(0);
            setIsVisible(false);
        }
    }, [theme]);

    if (!isVisible && intensity === 0) return null;

    return (
        <>
            {/* The Actual Blue Light Filter Overlay */}
            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 9999,
                    pointerEvents: 'none',
                    // Amber color strictly filters blue light
                    backgroundColor: `rgba(255, 147, 41, ${intensity})`,
                    mixBlendMode: 'multiply',
                    transition: 'background-color 0.5s ease'
                }}
            />

            {/* Control Panel (Only visible in Zen or if manually toggled) */}
            {theme === 'zen' && (
                <div className="fixed bottom-24 right-6 z-50 flex flex-col items-end gap-2 group">
                    <div className="bg-[#fbf7f0] border border-[#d2c0a9] p-3 rounded-xl shadow-lg opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0 duration-300 pointer-events-none group-hover:pointer-events-auto">
                        <div className="flex flex-col gap-3 w-48">
                            <label className="text-xs font-serif font-bold text-[#6d5a4b] flex justify-between">
                                <span>Filtre Lumière Bleue</span>
                                <span className="text-[#8b2f2f]">{Math.round(intensity * 100)}%</span>
                            </label>

                            {/* Preset Buttons */}
                            <div className="grid grid-cols-3 gap-2">
                                <button
                                    onClick={() => setIntensity(0.08)}
                                    className={`px-2 py-1.5 text-[10px] font-bold rounded border transition-all ${Math.abs(intensity - 0.08) < 0.01
                                            ? 'bg-[#8b2f2f] text-white border-[#8b2f2f]'
                                            : 'bg-white text-[#6d5a4b] border-[#d2c0a9] hover:border-[#8b2f2f]'
                                        }`}
                                >
                                    Doux
                                </button>
                                <button
                                    onClick={() => setIntensity(0.15)}
                                    className={`px-2 py-1.5 text-[10px] font-bold rounded border transition-all ${Math.abs(intensity - 0.15) < 0.01
                                            ? 'bg-[#8b2f2f] text-white border-[#8b2f2f]'
                                            : 'bg-white text-[#6d5a4b] border-[#d2c0a9] hover:border-[#8b2f2f]'
                                        }`}
                                >
                                    Moyen
                                </button>
                                <button
                                    onClick={() => setIntensity(0.25)}
                                    className={`px-2 py-1.5 text-[10px] font-bold rounded border transition-all ${Math.abs(intensity - 0.25) < 0.01
                                            ? 'bg-[#8b2f2f] text-white border-[#8b2f2f]'
                                            : 'bg-white text-[#6d5a4b] border-[#d2c0a9] hover:border-[#8b2f2f]'
                                        }`}
                                >
                                    Fort
                                </button>
                            </div>

                            <p className="text-[10px] text-[#96816d] italic leading-tight">
                                Protège ta mélatonine en filtrant la lumière bleue.
                            </p>
                        </div>
                    </div>

                    <button className="bg-[#fbf7f0] border border-[#d2c0a9] text-[#a63c2f] p-2 rounded-full shadow-md hover:scale-110 transition-transform" title="Confort Visuel">
                        👁️
                    </button>
                </div>
            )}
        </>
    );
}
