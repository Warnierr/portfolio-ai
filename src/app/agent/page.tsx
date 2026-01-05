"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import PageContainer from "@/components/PageContainer";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

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

const models = [
  { 
    id: "anthropic/claude-3.5-haiku", 
    name: "Claude Haiku", 
    description: "Rapide et efficace", 
    icon: "⚡" 
  },
  { 
    id: "anthropic/claude-3.5-sonnet", 
    name: "Claude Sonnet", 
    description: "Équilibré et précis", 
    icon: "✨" 
  },
  { 
    id: "openai/gpt-4o", 
    name: "GPT-4o", 
    description: "Puissant et créatif", 
    icon: "🧠" 
  },
];

type Message = {
  role: "user" | "assistant";
  content: string;
};

const MAX_REQUESTS = 10;
const COOKIE_NAME = "chat_requests";

// Fonction pour lire le cookie
function getCookieValue(name: string): number {
  if (typeof document === "undefined") return 0;
  const cookies = document.cookie.split(";").map((c) => c.trim());
  const cookie = cookies.find((c) => c.startsWith(`${name}=`));
  if (!cookie) return 0;
  const value = parseInt(cookie.split("=")[1], 10);
  return isNaN(value) ? 0 : value;
}

export default function AgentPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [remaining, setRemaining] = useState(MAX_REQUESTS);
  const [limitReached, setLimitReached] = useState(false);
  const [selectedModel, setSelectedModel] = useState(models[0].id);
  const [showModelSelector, setShowModelSelector] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Lire le cookie au chargement pour restaurer le compteur
  useEffect(() => {
    const usedCount = getCookieValue(COOKIE_NAME);
    const currentRemaining = MAX_REQUESTS - usedCount;
    setRemaining(currentRemaining);
    if (currentRemaining <= 0) {
      setLimitReached(true);
    }
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSuggestion = (text: string) => {
    if (!limitReached) {
      setInput(text);
    }
  };

  const handleNewConversation = () => {
    setMessages([]);
    setInput("");
    setIsLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || limitReached) return;

    const userMessage: Message = { role: "user", content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, model: selectedModel }),
      });

      // Récupérer le nombre restant depuis les headers
      const remainingHeader = response.headers.get("X-Requests-Remaining");
      if (remainingHeader) {
        const newRemaining = parseInt(remainingHeader, 10);
        setRemaining(newRemaining);
        if (newRemaining <= 0) {
          setLimitReached(true);
        }
      }

      if (response.status === 429) {
        const errorData = await response.json();
        setLimitReached(true);
        setRemaining(0);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: errorData.message || "Limite de messages atteinte. Contactez-moi directement !",
          },
        ]);
        return;
      }

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
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      console.error("Erreur:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessage || "Une erreur s'est produite. Contactez-moi directement : rww.warnier@gmail.com",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const currentModel = models.find(m => m.id === selectedModel) || models[0];

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
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                <span className="text-sm text-emerald-300">Agent en ligne</span>
              </div>
              <div className={`text-sm px-3 py-1 rounded-full border ${remaining > 5
                ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                : remaining > 2
                  ? 'border-yellow-500/30 bg-yellow-500/10 text-yellow-300'
                  : 'border-orange-500/30 bg-orange-500/10 text-orange-300'
                }`}>
                💬 {remaining}/{MAX_REQUESTS}
              </div>
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
      <section className="glass-panel flex min-h-[500px] flex-col p-0">
        {/* Header avec contrôles */}
        <div className="border-b border-white/10 p-4 flex items-center justify-between">
          <div className="relative">
            <button
              onClick={() => setShowModelSelector(!showModelSelector)}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/10"
            >
              <span>{currentModel.icon}</span>
              <span className="font-medium text-white">{currentModel.name}</span>
              <span className="text-xs text-zinc-500">•</span>
              <span className="text-xs">{currentModel.description}</span>
              <span className="text-zinc-500">▼</span>
            </button>
            
            {showModelSelector && (
              <div className="absolute top-full left-0 mt-2 z-10 min-w-[280px] rounded-xl border border-white/10 bg-zinc-900/95 backdrop-blur-xl shadow-xl">
                {models.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => {
                      setSelectedModel(model.id);
                      setShowModelSelector(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-left transition first:rounded-t-xl last:rounded-b-xl ${
                      selectedModel === model.id
                        ? 'bg-emerald-500/10 border-l-2 border-l-emerald-500'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    <span className="text-xl">{model.icon}</span>
                    <div className="flex-1">
                      <p className={`text-sm font-medium ${selectedModel === model.id ? 'text-emerald-300' : 'text-white'}`}>
                        {model.name}
                      </p>
                      <p className="text-xs text-zinc-400">{model.description}</p>
                    </div>
                    {selectedModel === model.id && (
                      <span className="text-emerald-400">✓</span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {messages.length > 0 && (
            <button
              onClick={handleNewConversation}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white"
            >
              <span>🔄</span>
              <span>Nouvelle conversation</span>
            </button>
          )}
        </div>

        {/* Loading bar */}
        {isLoading && (
          <div className="h-1 w-full overflow-hidden bg-white/5">
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
            <div className="space-y-6">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "assistant" && (
                    <div className="mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-sm">
                      🤖
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] rounded-2xl px-5 py-4 ${msg.role === "user"
                      ? "bg-emerald-500/20 text-white border border-emerald-500/30"
                      : "border border-white/10 bg-white/5"
                      }`}
                  >
                    {msg.role === "user" ? (
                      <p className="text-white">{msg.content}</p>
                    ) : msg.content ? (
                      <div className="prose prose-invert prose-sm max-w-none prose-headings:text-white prose-headings:font-semibold prose-h1:text-xl prose-h2:text-lg prose-h3:text-base prose-p:text-zinc-300 prose-p:leading-relaxed prose-strong:text-white prose-strong:font-semibold prose-ul:text-zinc-300 prose-ol:text-zinc-300 prose-li:my-1 prose-code:text-emerald-300 prose-code:bg-emerald-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:bg-zinc-900/50 prose-pre:border prose-pre:border-white/10 prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                          {msg.content}
                        </ReactMarkdown>
                      </div>
                    ) : (
                      <span className="inline-flex gap-1">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400" style={{ animationDelay: "0.1s" }} />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-zinc-400" style={{ animationDelay: "0.2s" }} />
                      </span>
                    )}
                  </div>
                  {msg.role === "user" && (
                    <div className="ml-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-blue-400/30 bg-blue-400/10 text-sm">
                      👤
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="border-t border-white/10 p-4">
          {/* Compteur de messages */}
          {remaining <= 5 && remaining > 0 && (
            <div className="mb-3 flex items-center justify-center gap-2 text-sm">
              <span className={`${remaining <= 2 ? 'text-orange-400' : 'text-zinc-400'}`}>
                💬 {remaining} message{remaining > 1 ? 's' : ''} restant{remaining > 1 ? 's' : ''}
              </span>
              {remaining <= 2 && (
                <Link href="/contact" className="text-emerald-400 hover:underline text-xs">
                  Continuer par email →
                </Link>
              )}
            </div>
          )}

          {/* Message limite atteinte */}
          {limitReached && (
            <div className="mb-3 rounded-lg bg-orange-500/10 border border-orange-500/30 p-4 text-center">
              <p className="text-orange-300 font-medium mb-2">
                ⚠️ Limite de messages gratuits atteinte
              </p>
              <p className="text-sm text-zinc-400 mb-3">
                Pour continuer notre échange, contactez-moi directement :
              </p>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href="mailto:rww.warnier@gmail.com"
                  className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-4 py-2 text-sm text-emerald-300 hover:bg-emerald-500/30 transition"
                >
                  📧 rww.warnier@gmail.com
                </a>
                <Link
                  href="/contact"
                  className="rounded-full bg-white/10 border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/20 transition"
                >
                  📅 Prendre rendez-vous
                </Link>
              </div>
            </div>
          )}

          <div className="flex gap-3">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={limitReached ? "Limite atteinte — Contactez-moi directement" : "Décrivez votre projet ou posez une question..."}
              className={`flex-1 rounded-full border bg-white/5 px-6 py-3 text-white placeholder-zinc-500 outline-none transition ${limitReached
                ? 'border-orange-500/30 cursor-not-allowed opacity-50'
                : 'border-white/10 focus:border-emerald-400/50 focus:bg-white/10'
                }`}
              disabled={isLoading || limitReached}
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim() || limitReached}
              className="rounded-full border border-emerald-400 bg-emerald-400/10 px-6 py-3 font-medium text-emerald-300 transition hover:bg-emerald-400/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "..." : "Envoyer"}
            </button>
          </div>
        </form>
      </section>

      {/* Footer */}
      <p className="text-center text-sm text-zinc-500">
        Agent IA propulsé par {currentModel.name}.{" "}
        <Link href="/contact" className="text-emerald-400 hover:underline">
          Contactez-moi directement
        </Link>{" "}
        pour un échange plus approfondi.
      </p>
    </PageContainer>
  );
}
