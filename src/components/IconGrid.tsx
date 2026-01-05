"use client";

import { motion } from "framer-motion";

type IconItem = {
  name: string;
  icon: string;
  color: string;
};

const technologies: IconItem[] = [
  { name: "Python", icon: "🐍", color: "text-blue-400" },
  { name: "Spark", icon: "⚡", color: "text-orange-400" },
  { name: "Airflow", icon: "🌬️", color: "text-cyan-400" },
  { name: "n8n", icon: "🔗", color: "text-purple-400" },
  { name: "Grafana", icon: "📊", color: "text-orange-400" },
  { name: "PostgreSQL", icon: "🐘", color: "text-blue-400" },
  { name: "Docker", icon: "🐳", color: "text-blue-400" },
  { name: "Ansible", icon: "🔧", color: "text-red-400" },
];

export default function IconGrid() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mt-12"
    >
      <p className="mb-6 text-center text-xs uppercase tracking-[0.2em] text-zinc-500">
        Technologies & Outils
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        {technologies.map((tech, i) => (
          <motion.div
            key={tech.name}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            whileHover={{ scale: 1.1, y: -4 }}
            className="group relative flex flex-col items-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all group-hover:border-white/30 group-hover:bg-white/10 group-hover:shadow-lg">
              <span className="text-3xl transition-transform group-hover:scale-110">
                {tech.icon}
              </span>
            </div>
            <span className={`mt-2 text-xs font-medium ${tech.color} opacity-0 transition-opacity group-hover:opacity-100`}>
              {tech.name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
