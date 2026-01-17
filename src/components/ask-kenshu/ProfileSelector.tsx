import React from 'react';
import { motion } from 'framer-motion';

type ProfileOption = {
    id: string;
    label: string;
    icon: string;
    description: string;
    gradient: string;
};

const profiles: ProfileOption[] = [
    {
        id: 'dev',
        label: 'Développeur',
        icon: '👨‍💻',
        description: 'Tech Lead / Dev',
        gradient: 'from-blue-500 to-cyan-500'
    },
    {
        id: 'entrepreneur',
        label: 'Entrepreneur',
        icon: '🚀',
        description: 'Porteur de projet',
        gradient: 'from-purple-500 to-pink-500'
    },
    {
        id: 'recruiter',
        label: 'Recruteur',
        icon: '💼',
        description: 'RH / Chasseur',
        gradient: 'from-amber-500 to-orange-500'
    },
    {
        id: 'curious',
        label: 'Curieux',
        icon: '🤔',
        description: 'Découverte',
        gradient: 'from-emerald-500 to-teal-500'
    }
];

interface ProfileSelectorProps {
    onSelect: (profileId: string, label: string) => void;
}

export default function ProfileSelector({ onSelect }: ProfileSelectorProps) {
    return (
        <div className="grid grid-cols-2 gap-3 my-4 w-full">
            {profiles.map((profile, index) => (
                <motion.button
                    key={profile.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => onSelect(profile.id, profile.label)}
                    className="relative group p-4 rounded-xl border border-[var(--border)] bg-[var(--bg-elevated)] hover:border-[var(--border-strong)] transition-all duration-300 text-left overflow-hidden"
                >
                    {/* Background Gradient on Hover */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 bg-gradient-to-br ${profile.gradient} transition-opacity duration-300`} />

                    <div className="relative z-10 flex flex-col gap-2">
                        <span className="text-2xl filter drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
                            {profile.icon}
                        </span>
                        <div>
                            <div className="font-bold text-sm text-[var(--text-primary)] group-hover:text-[var(--text-primary)]">
                                {profile.label}
                            </div>
                            <div className="text-xs text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]">
                                {profile.description}
                            </div>
                        </div>
                    </div>

                    {/* Shine Effect */}
                    <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:animate-shine" />
                </motion.button>
            ))}
        </div>
    );
}
