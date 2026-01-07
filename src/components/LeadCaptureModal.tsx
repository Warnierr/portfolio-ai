"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type LeadCaptureModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (email: string, name: string, message: string) => void;
};

export default function LeadCaptureModal({
  isOpen,
  onClose,
  onSubmit,
}: LeadCaptureModalProps) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(email, name, message);
      onClose();
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/10 bg-zinc-900 p-8 shadow-2xl"
          >
            {/* Header */}
            <div className="mb-6 text-center">
              <div className="mb-3 text-4xl">💡</div>
              <h2 className="text-2xl font-bold text-white">
                Allons Plus Loin Ensemble
              </h2>
              <p className="mt-2 text-sm text-zinc-400">
                Vous avez un projet data en tête ? Laissez-moi vos coordonnées et je vous
                recontacte sous 24h.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="mb-1 block text-sm font-medium text-zinc-300">
                  Votre nom
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-500 transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="Jean Dupont"
                />
              </div>

              <div>
                <label htmlFor="email" className="mb-1 block text-sm font-medium text-zinc-300">
                  Votre email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-500 transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="jean.dupont@entreprise.fr"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-1 block text-sm font-medium text-zinc-300">
                  Votre besoin (optionnel)
                </label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-zinc-500 transition focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                  placeholder="Ex: Migration pipeline ETL, plateforme analytics..."
                />
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-3 font-medium text-white transition hover:bg-white/10"
                >
                  Plus tard
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 rounded-lg bg-emerald-500 px-4 py-3 font-medium text-white transition hover:bg-emerald-600 disabled:opacity-50"
                >
                  {isSubmitting ? "Envoi..." : "Envoyer"}
                </button>
              </div>
            </form>

            {/* Privacy note */}
            <p className="mt-4 text-center text-xs text-zinc-500">
              🔒 Vos données sont confidentielles et ne seront jamais partagées.
            </p>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
