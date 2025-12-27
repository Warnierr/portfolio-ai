"use client";

import { motion } from "framer-motion";

export default function BackgroundDecoration() {
    return (
        <div className="absolute inset-0 -z-10 overflow-hidden">
            {/* Orb 1 */}
            <motion.div
                animate={{
                    x: [0, 50, 0],
                    y: [0, 30, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute -top-20 -left-20 h-96 w-96 rounded-full bg-emerald-500/10 blur-[100px]"
            />

            {/* Orb 2 */}
            <motion.div
                animate={{
                    x: [0, -40, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-1/2 -right-20 h-80 w-80 rounded-full bg-blue-500/10 blur-[80px]"
            />

            {/* Grid mask overlay */}
            <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
        </div>
    );
}
