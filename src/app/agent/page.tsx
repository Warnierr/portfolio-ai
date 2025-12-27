"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import PageContainer from "@/components/PageContainer";

const suggestions = [
  "Quelles sont tes compétences en Big Data ?",
  "Je cherche un Data Engineer freelance",
  "Parle-moi de ton expérience chez Orange",
  "Quels sont tes tarifs ?",
  "Tu connais Spark et Airflow ?",
];

const skills = [
  { label: "Data Engineering", icon: "📊" },
  { label: "DevOps & CI/CD", icon: "🔧" },
  { label: "Big Data", icon: "💾" },
  { label: "Cloud & Infra", icon: "☁️" },
];

type Message = {
  role: "user" | "assistant";
  content: string;
};

export default function AgentPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

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
        const errorText = await response.text();
        throw new Error(errorText || "Erreur API");
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let assistantContent = "";

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
    } catch (error: any) {
      console.error("Erreur:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: error.message || "Une erreur s'est produite. Contactez-moi directement : rww.warnier@gmail.com",
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
              Ask Raouf
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-white md:text-4xl">
              Décrivez votre projet
            </h1>
            <p className="mt-2 text-zinc-400">
              Je vous dis si je peux vous aider.
            </p>
          </div>

          <div className="flex flex-col items-end gap-4">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span className="text-sm text-emerald-300">Agent en ligne</span>
            </div>

            <div className="text-right text-xs text-zinc-500">
              <p>Compétences</p>
              <div className="mt-2 flex flex-wrap gap-2 justify-end">
                {skills.map((skill) => (
                  <span
                    key={skill.label}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-zinc-300"
                  >
                    {skill.icon} {skill.label}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href="/contact"
              className="rounded-full border border-white/20 bg-white/5 px-6 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              Prendre rendez-vous
            </Link>
          </div>
        </div>
      </section>

      {/* Chat */}
      <section className="glass-panel flex min-h-[400px] flex-col p-0">
        {/* Loading bar */}
        {isLoading && (
          <div className="h-1 w-full overflow-hidden rounded-t-2xl bg-white/10">
            <div
              className="h-full bg-gradient-to-r from-emerald-400 to-blue-500"
              style={{
                width: "30%",
                animation: "loading 1.5s ease-in-out infinite"
              }}
            />
          </div>
        )}

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
                Décrivez votre projet data ou posez-moi une question.
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
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${msg.role === "user"
                      ? "bg-emerald-500/20 text-white"
                      : "border border-white/10 bg-white/5 text-zinc-300"
                      }`}
                  >
                    {msg.content || (
                      <span className="inline-flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-500" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-500" style={{ animationDelay: "0.1s" }} />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-500" style={{ animationDelay: "0.2s" }} />
                      </span>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
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
              className="flex-1 rounded-full border border-white/10 bg-white/5 px-6 py-3 text-white placeholder-zinc-500 outline-none focus:border-emerald-400/50"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="rounded-full border border-emerald-400 bg-emerald-400/10 px-6 py-3 font-medium text-emerald-300 transition hover:bg-emerald-400/20 disabled:opacity-50"
            >
              Envoyer
            </button>
          </div>
        </form>
      </section>

      {/* Footer */}
      <p className="text-center text-sm text-zinc-500">
        Agent IA propulsé par Claude.{" "}
        <Link href="/contact" className="text-emerald-400 hover:underline">
          Contactez-moi directement
        </Link>{" "}
        pour un échange plus approfondi.
      </p>
    </PageContainer>
  );
}
