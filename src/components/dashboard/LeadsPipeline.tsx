"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

type Lead = {
  id: string;
  name: string;
  email: string;
  source: string | null;
  status: string;
  score: number | null;
  createdAt: string;
  lastContactAt: string | null;
};

const sourceColors: Record<string, string> = {
  linkedin: "bg-blue-500/20 text-blue-400",
  website: "bg-emerald-500/20 text-emerald-400",
  referral: "bg-purple-500/20 text-purple-400",
  "cold-email": "bg-orange-500/20 text-orange-400",
};

const statusLabels: Record<string, string> = {
  NEW: "Nouveau",
  CONTACTED: "Contacté",
  QUALIFIED: "Qualifié",
};

export default function LeadsPipeline() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/leads-pipeline")
      .then((r) => r.json())
      .then((data) => {
        setLeads(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching leads:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Pipeline de Leads</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 animate-pulse rounded-lg border border-white/10 bg-white/5"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-white/10 bg-white/5 p-6"
    >
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-white">Pipeline de Leads</h2>
        <Link
          href="/admin/leads"
          className="text-sm text-emerald-400 hover:text-emerald-300"
        >
          Voir tout →
        </Link>
      </div>

      {leads.length === 0 ? (
        <p className="py-8 text-center text-sm text-zinc-400">
          Aucun lead en cours
        </p>
      ) : (
        <div className="space-y-3">
          {leads.slice(0, 5).map((lead) => (
            <div
              key={lead.id}
              className="flex items-center justify-between rounded-lg border border-white/10 bg-white/5 p-4"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-white">{lead.name}</p>
                  {lead.source && (
                    <span
                      className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                        sourceColors[lead.source] || "bg-zinc-500/20 text-zinc-400"
                      }`}
                    >
                      {lead.source}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-zinc-400">{lead.email}</p>
                <div className="mt-2 flex items-center gap-3 text-xs text-zinc-500">
                  <span>{statusLabels[lead.status] || lead.status}</span>
                  {lead.score !== null && (
                    <span className="text-emerald-400">Score: {lead.score}/100</span>
                  )}
                  <span>
                    {new Date(lead.createdAt).toLocaleDateString("fr-FR")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
