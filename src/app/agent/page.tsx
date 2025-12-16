"use client";

import { useState } from "react";
import Link from "next/link";
import PageContainer from "@/components/PageContainer";

const suggestions = [
  "J'ai des documents à traiter automatiquement",
  "Je veux un chatbot sur mes données",
  "Je perds du temps sur des tâches répétitives",
  "Quels sont tes tarifs ?",
  "Montre-moi un projet similaire",
];

const skills = [
  { label: "OCR documentaire", icon: "📄" },
  { label: "RAG / Chatbots", icon: "💬" },
  { label: "Dashboards", icon: "📊" },
  { label: "Intégration", icon: "🔗" },
];

const stack = ["Python", "Next.js", "PostgreSQL", "LLMs"];

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AgentPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSuggestion = (text: string) => {
    setInput(text);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      if (!response.ok) {
        throw new Error("Erreur API");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

      // Ajouter un message assistant vide
      setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

      while (reader) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        assistantContent += chunk;
        setMessages((prev) => {
          const updated = [...prev];
          updated[updated.length - 1] = {
            role: "assistant",
            content: assistantContent,
          };
          return updated;
        });
      }
    } catch (error) {
      console.error("Erreur:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Désolé, une erreur s'est produite. Contactez-moi directement pour discuter de votre projet.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <PageContainer className="gap-6">
      {/* Header */}
      <section className="glass-panel p-6 md:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">
              Ask Kenshu
            </p>
            <h1 className="mt-2 text-2xl font-semibold text-white md:text-3xl">
              Décrivez votre projet
            </h1>
            <p className="mt-2 text-zinc-400">
              Je vous dis si je peux vous aider.
            </p>
          </div>

          {/* Infos sidebar */}
          <div className="flex flex-wrap gap-4 md:flex-col md:items-end md:text-right">
            <div>
              <p className="text-xs text-zinc-500">Compétences</p>
              <div className="mt-1 flex flex-wrap gap-2">
                {skills.map((s) => (
                  <span
                    key={s.label}
                    className="rounded-full border border-white/10 bg-white/5 px-2 py-1 text-xs text-zinc-300"
                  >
                    {s.icon} {s.label}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs text-zinc-500">Stack</p>
              <p className="mt-1 text-sm text-zinc-300">{stack.join(" · ")}</p>
            </div>
            <div>
              <p className="text-xs text-zinc-500">Disponibilité</p>
              <p className="mt-1 text-sm text-emerald-300">Janvier 2025</p>
            </div>
          </div>
        </div>
      </section>

      {/* Zone de chat */}
      <section className="glass-panel flex min-h-[400px] flex-col p-0">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          {messages.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-2xl">
                🤖
              </div>
              <p className="text-lg font-medium text-white">
                Comment puis-je vous aider ?
              </p>
              <p className="mt-2 max-w-md text-sm text-zinc-400">
                Décrivez votre projet ou cliquez sur une suggestion ci-dessous.
              </p>

              {/* Suggestions */}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {suggestions.map((s) => (
                  <button
                    key={s}
                    onClick={() => handleSuggestion(s)}
                    className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition hover:border-emerald-400/30 hover:bg-emerald-400/5 hover:text-white"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      msg.role === "user"
                        ? "bg-emerald-500/20 text-white"
                        : "border border-white/10 bg-white/5 text-zinc-300"
                    }`}
                  >
                    {msg.content || (
                      <span className="inline-flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-500" />
                        <span
                          className="h-2 w-2 animate-bounce rounded-full bg-zinc-500"
                          style={{ animationDelay: "0.1s" }}
                        />
                        <span
                          className="h-2 w-2 animate-bounce rounded-full bg-zinc-500"
                          style={{ animationDelay: "0.2s" }}
                        />
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="border-t border-white/10 p-4">
          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Décrivez votre projet ou posez une question..."
              disabled={isLoading}
              className="flex-1 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-white placeholder-zinc-500 outline-none transition focus:border-emerald-400/50 focus:ring-1 focus:ring-emerald-400/20 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="rounded-full bg-white px-6 py-3 font-medium text-black transition hover:bg-zinc-200 disabled:opacity-50"
            >
              {isLoading ? "..." : "Envoyer"}
            </button>
          </div>
        </form>
      </section>

      {/* Note */}
      <section className="text-center">
        <p className="text-sm text-zinc-500">
          Agent IA propulsé par Claude.{" "}
          <Link href="/contact" className="text-emerald-300 hover:underline">
            Contactez-moi directement
          </Link>{" "}
          pour un échange plus approfondi.
        </p>
      </section>
    </PageContainer>
  );
}
