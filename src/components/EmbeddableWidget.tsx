/**
 * Widget embeddable pour l'AI Act Auditor
 * 
 * Usage:
 * <script src="https://kenshu.dev/widget.js"></script>
 * <div id="ai-act-widget" data-company="Acme Corp"></div>
 */

"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type WidgetProps = {
  companyName?: string;
  theme?: "light" | "dark";
  compact?: boolean;
};

export default function EmbeddableWidget({
  companyName = "Votre Entreprise",
  theme = "dark",
  compact = false,
}: WidgetProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          whileHover={{ scale: 1.1 }}
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full shadow-2xl ${
            theme === "dark"
              ? "bg-emerald-500 text-white"
              : "bg-white text-emerald-500"
          }`}
        >
          <span className="text-2xl">🔍</span>
        </motion.button>
      )}

      {/* Widget Modal */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className={`fixed bottom-6 right-6 z-50 w-96 rounded-2xl border shadow-2xl ${
            theme === "dark"
              ? "border-white/10 bg-zinc-900 text-white"
              : "border-zinc-200 bg-white text-zinc-900"
          }`}
        >
          {/* Header */}
          <div
            className={`flex items-center justify-between border-b p-4 ${
              theme === "dark" ? "border-white/10" : "border-zinc-200"
            }`}
          >
            <div>
              <h3 className="font-bold">AI Act Auditor</h3>
              <p className="text-xs opacity-70">{companyName}</p>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-xl opacity-70 hover:opacity-100"
            >
              ×
            </button>
          </div>

          {/* Content */}
          <div className="p-4">
            <p className="mb-4 text-sm">
              Auditez gratuitement la conformité AI Act de vos systèmes d'IA en 2
              minutes.
            </p>

            <a
              href="https://kenshu.dev/ai-act-auditor"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full rounded-lg bg-emerald-500 py-3 text-center font-medium text-white transition hover:bg-emerald-600"
            >
              Démarrer l'Audit
            </a>

            <p className="mt-3 text-center text-xs opacity-50">
              Powered by{" "}
              <a
                href="https://kenshu.dev"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                kenshu.dev
              </a>
            </p>
          </div>
        </motion.div>
      )}
    </>
  );
}
