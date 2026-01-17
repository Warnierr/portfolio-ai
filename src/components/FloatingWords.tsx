'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const WORDS = [
    "Data Engineering", "Cloud Architecture", "Intelligence Artificielle", "Veille Technologique",
    "SIBCA", "Apache Spark", "DevOps", "Innovation", "Python Expert", "Automation",
    "Kenshu Philosophy", "Continuous Learning", "System Design", "Cyber Security",
    "React & Next.js", "Docker Containers", "Kubernetes Orchestration", "Apache Airflow",
    "Kafka Streaming", "SQL Optimization", "NoSQL Databases", "API Design", "SaaS Development",
    "Product Builder", "User Experience", "Performance Tuning", "Scalability", "Compliance & GDPR",
    "AI Act Ready", "Large Language Models", "RAG Systems", "Autonomous Agents", "Code Quality",
    "CI/CD Pipelines", "Monitoring & Alerts", "Data Visualization", "ETL Pipelines", "Data Warehouse",
    "Data Lake", "Data Mesh", "Analytics", "Machine Learning"
];

export default function FloatingWords() {
    const [activeWord, setActiveWord] = useState<{ id: number, text: string, x: number, y: number } | null>(null);

    useEffect(() => {
        // Apparition toutes les 3-6 secondes
        const interval = setInterval(() => {
            const id = Date.now();
            const text = WORDS[Math.floor(Math.random() * WORDS.length)];
            const x = Math.random() * 80 + 10; // 10-90% width
            const y = Math.random() * 80 + 10; // 10-90% height
            setActiveWord({ id, text, x, y });

            // Disparition après 4s
            setTimeout(() => {
                setActiveWord(null);
            }, 4000);

        }, 5000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden mix-blend-overlay">
            <AnimatePresence>
                {activeWord && (
                    <motion.div
                        key={activeWord.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute flex items-center"
                        style={{ left: `${activeWord.x}%`, top: `${activeWord.y}%` }}
                    >
                        <TypewriterText text={activeWord.text} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

const TypewriterText = ({ text }: { text: string }) => {
    // Animation lettre par lettre
    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const child = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <motion.span
            variants={container}
            initial="hidden"
            animate="visible"
            className="text-2xl md:text-4xl font-light tracking-tighter text-[var(--text-muted)] opacity-30 blur-[1px]"
        >
            {text.split("").map((letter, index) => (
                <motion.span key={index} variants={child}>
                    {letter}
                </motion.span>
            ))}
        </motion.span>
    );
};
