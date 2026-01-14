"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Project = {
  id: string;
  name: string;
  clientName: string;
  status: string;
  priority: string;
  progress: number;
  mrr: number | null;
  startDate: string;
  deadline: string | null;
  description: string | null;
};

const statusColors: Record<string, string> = {
  active: "bg-emerald-500/20 text-emerald-400",
  paused: "bg-orange-500/20 text-orange-400",
  completed: "bg-blue-500/20 text-blue-400",
  cancelled: "bg-red-500/20 text-red-400",
};

const priorityColors: Record<string, string> = {
  low: "text-zinc-400",
  normal: "text-blue-400",
  high: "text-orange-400",
  urgent: "text-red-400",
};

export default function ProjectsTable() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/dashboard/projects")
      .then((r) => r.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl border border-white/10 bg-white/5 p-6">
        <h2 className="mb-4 text-lg font-semibold text-white">Projets en Cours</h2>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-20 animate-pulse rounded-lg border border-white/10 bg-white/5"
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
      <h2 className="mb-4 text-lg font-semibold text-white">Projets en Cours</h2>

      {projects.length === 0 ? (
        <p className="py-8 text-center text-sm text-zinc-400">
          Aucun projet actif
        </p>
      ) : (
        <div className="space-y-3">
          {projects.map((project) => {
            const daysUntilDeadline = project.deadline
              ? Math.ceil(
                  (new Date(project.deadline).getTime() - new Date().getTime()) /
                    (1000 * 60 * 60 * 24)
                )
              : null;
            const isUrgent =
              daysUntilDeadline !== null && daysUntilDeadline <= 7;

            return (
              <div
                key={project.id}
                className={`rounded-lg border p-4 ${
                  isUrgent
                    ? "border-orange-500/40 bg-orange-500/10"
                    : "border-white/10 bg-white/5"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-white">{project.name}</p>
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          statusColors[project.status] ||
                          "bg-zinc-500/20 text-zinc-400"
                        }`}
                      >
                        {project.status}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-zinc-400">
                      {project.clientName}
                    </p>

                    {/* Progress Bar */}
                    <div className="mt-3">
                      <div className="mb-1 flex items-center justify-between text-xs">
                        <span className="text-zinc-500">Progression</span>
                        <span className="text-emerald-400">
                          {project.progress}%
                        </span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-white/10">
                        <div
                          className="h-full bg-emerald-500 transition-all"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-4 text-xs text-zinc-500">
                      <span
                        className={priorityColors[project.priority] || "text-zinc-500"}
                      >
                        Priorité: {project.priority}
                      </span>
                      {project.mrr && (
                        <span className="text-emerald-400">
                          MRR: {project.mrr.toFixed(0)}€
                        </span>
                      )}
                      {daysUntilDeadline !== null && (
                        <span className={isUrgent ? "text-orange-400" : ""}>
                          {daysUntilDeadline > 0
                            ? `J-${daysUntilDeadline}`
                            : "En retard"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
