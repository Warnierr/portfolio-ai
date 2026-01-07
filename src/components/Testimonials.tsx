"use client";

import { motion } from "framer-motion";
import { testimonials } from "@/data/testimonials";

const fadeUp = {
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Testimonials() {
  return (
    <section className="relative">
      <motion.div {...fadeUp} className="mb-10 text-center">
        <p className="text-xs uppercase tracking-[0.3em] text-emerald-500">
          Témoignages
        </p>
        <h2 className="mt-3 text-3xl font-bold text-white sm:text-4xl">
          Ce Qu'en Disent Mes Clients
        </h2>
        <p className="mt-3 text-zinc-400">
          Retours d'expérience sur des projets à forte valeur ajoutée
        </p>
      </motion.div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial.id}
            variants={staggerItem}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm transition-all hover:border-emerald-500/40 hover:bg-white/10"
          >
            {/* Rating Stars */}
            <div className="mb-4 flex gap-1">
              {Array.from({ length: testimonial.rating }).map((_, i) => (
                <span key={i} className="text-yellow-500">
                  ★
                </span>
              ))}
            </div>

            {/* Content */}
            <p className="mb-6 text-sm leading-relaxed text-zinc-300">
              &ldquo;{testimonial.content}&rdquo;
            </p>

            {/* Project Badge */}
            <div className="mb-4">
              <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
                {testimonial.project}
              </span>
            </div>

            {/* Author */}
            <div className="flex items-center gap-3 border-t border-white/5 pt-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 text-sm font-bold text-white">
                {testimonial.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </div>
              <div>
                <div className="font-semibold text-white">{testimonial.name}</div>
                <div className="text-xs text-zinc-400">
                  {testimonial.role} @ {testimonial.company}
                </div>
              </div>
            </div>

            {/* Hover effect gradient */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </motion.div>
        ))}
      </motion.div>

      {/* CTA */}
      <motion.div {...fadeUp} className="mt-10 text-center">
        <p className="text-sm text-zinc-400">
          Rejoignez BNP Paribas, Orange, Safran et d'autres entreprises qui me font
          confiance
        </p>
      </motion.div>
    </section>
  );
}
