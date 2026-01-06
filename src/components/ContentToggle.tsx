"use client";

import { useState } from "react";

type ContentToggleProps = {
  businessContent: React.ReactNode;
  technicalContent: React.ReactNode;
  defaultView?: "business" | "technical";
};

export default function ContentToggle({
  businessContent,
  technicalContent,
  defaultView = "business",
}: ContentToggleProps) {
  const [activeTab, setActiveTab] = useState<"business" | "technical">(defaultView);

  return (
    <div className="w-full">
      {/* Tabs */}
      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setActiveTab("business")}
          className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
            activeTab === "business"
              ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
              : "bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10"
          }`}
        >
          <span className="mr-1.5">🎯</span>
          Pour vous
        </button>
        <button
          onClick={() => setActiveTab("technical")}
          className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition ${
            activeTab === "technical"
              ? "bg-blue-500/20 text-blue-300 border border-blue-500/40"
              : "bg-white/5 text-zinc-400 border border-white/10 hover:bg-white/10"
          }`}
        >
          <span className="mr-1.5">🔧</span>
          Technique
        </button>
      </div>

      {/* Content */}
      <div className="min-h-[120px]">
        {activeTab === "business" ? businessContent : technicalContent}
      </div>
    </div>
  );
}
