"use client";

export default function TypingIndicator() {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
      <div className="flex gap-1">
        <div className="h-2 w-2 animate-bounce rounded-full bg-emerald-400 [animation-delay:-0.3s]" />
        <div className="h-2 w-2 animate-bounce rounded-full bg-emerald-400 [animation-delay:-0.15s]" />
        <div className="h-2 w-2 animate-bounce rounded-full bg-emerald-400" />
      </div>
      <span className="text-sm text-zinc-400">Kenshu IA réfléchit...</span>
    </div>
  );
}
