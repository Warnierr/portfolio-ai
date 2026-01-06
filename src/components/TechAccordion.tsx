"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type TechAccordionProps = {
  title: string;
  technologies: string[];
  description?: string;
  defaultOpen?: boolean;
};

export default function TechAccordion({
  title,
  technologies,
  description,
  defaultOpen,
}: TechAccordionProps) {
  // Ouvert par défaut sur desktop, fermé sur mobile
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 640; // sm breakpoint
      setIsMobile(mobile);
      // Si defaultOpen est spécifié, l'utiliser, sinon ouvrir sur desktop uniquement
      if (defaultOpen !== undefined) {
        setIsOpen(defaultOpen);
      } else {
        setIsOpen(!mobile);
      }
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, [defaultOpen]);

  return (
    <div className="mt-4 rounded-lg border border-white/10 bg-white/5">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-4 text-left transition hover:bg-white/5"
      >
        <span className="text-sm font-medium text-zinc-300">{title}</span>
        <motion.svg
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="h-5 w-5 text-zinc-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/10 p-4 pt-3">
              {description && (
                <p className="mb-3 whitespace-pre-line text-sm text-zinc-400">
                  {description}
                </p>
              )}
              
              {technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-white"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
