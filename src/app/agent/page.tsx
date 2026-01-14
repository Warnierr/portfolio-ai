"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import PageContainer from "@/components/PageContainer";
import TypingIndicator from "@/components/TypingIndicator";
import LeadCaptureModal from "@/components/LeadCaptureModal";
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
  const [showLeadCapture, setShowLeadCapture] = useState(false);

  // Refs pour le scroll intelligent
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const shouldAutoScrollRef = useRef(true);

  // Charger l'historique depuis localStorage au montage
  useEffect(() => {
    const savedMessages = localStorage.getItem("chat_history");
    if (savedMessages) {
      try {
        setMessages(JSON.parse(savedMessages));
      } catch (e) {
        console.error("Erreur lors du chargement de l'historique:", e);
      }
    }
  }, []);

  // Sauvegarder l'historique dans localStorage à chaque changement
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chat_history", JSON.stringify(messages));
    }
  }, [messages]);

  // Lire le cookie au chargement pour restaurer le compteur
  useEffect(() => {
    const usedCount = getCookieValue(COOKIE_NAME);
    const currentRemaining = MAX_REQUESTS - usedCount;
    setRemaining(currentRemaining);
    if (currentRemaining <= 0) {
      setLimitReached(true);
    }
  }, []);

  // Gestion du scroll intelligent
  const handleScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = scrollContainerRef.current;
      // Tolérance de 50px pour dire qu'on est en bas
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
      shouldAutoScrollRef.current = isAtBottom;
    }
  };

  const scrollToBottom = (instant = false) => {
    if (shouldAutoScrollRef.current) {
      messagesEndRef.current?.scrollIntoView({
        behavior: instant ? "auto" : "smooth",
        block: "end"
      });
    }
  };

  useEffect(() => {
    // Scroll instantané pendant le chargement (pour éviter les saccades)
    // Scroll smooth pour les nouveaux messages complets
    scrollToBottom(isLoading);
  }, [messages, isLoading]);

  const handleSuggestion = (text: string) => {
    if (!limitReached) {
      setInput(text);
      shouldAutoScrollRef.current = true; // Force scroll to bottom on new interaction
    }
  };

  const handleNewConversation = () => {
    setMessages([]);
    setInput("");
    setIsLoading(false);
    localStorage.removeItem("chat_history");
    shouldAutoScrollRef.current = true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading || limitReached) return;

    shouldAutoScrollRef.current = true; // Force scroll on user send
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

      // Afficher le modal de capture de leads après 3 échanges
      const userMessageCount = newMessages.filter(m => m.role === "user").length;
      if (userMessageCount === 3 && !localStorage.getItem("lead_captured")) {
        setTimeout(() => setShowLeadCapture(true), 2000);
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      console.error("Erreur:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: errorMessage || "Une erreur s'est produite. Contactez-moi directement : contact@kenshu.dev",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLeadSubmit = async (email: string, name: string, message: string) => {
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          message,
          source: "chat_agent",
        }),
      });
      localStorage.setItem("lead_captured", "true");
    } catch (error) {
      console.error("Erreur lors de l'envoi du lead:", error);
    }
  };

  const currentModel = models.find(m => m.id === selectedModel) || models[0];

  return (
    <>
      <PageContainer className="gap-6 !py-6 md:!py-14">
        {/* Header */}
        <section className="glass-panel p-4 md:p-8">
          <div className="flex flex-col gap-4 md:gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-emerald-300">
                Ask Raouf
              </p>
              <h1 className="mt-1 text-2xl md:mt-2 md:text-3xl lg:text-4xl font-semibold text-white">
                Décrivez votre projet
              </h1>
              <p className="mt-1 md:mt-2 text-sm md:text-base text-zinc-400">
                Je vous dis si je peux vous aider.
              </p>
            </div>

            <div className="flex flex-col items-start md:items-end gap-3 md:gap-4">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                  <span className="text-xs md:text-sm text-emerald-300">Agent en ligne</span>
                </div>
                <div className={`text-xs md:text-sm px-2 md:px-3 py-1 rounded-full border ${remaining > 5
                  ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                  : remaining > 2
                    ? 'border-yellow-500/30 bg-yellow-500/10 text-yellow-300'
                    : 'border-orange-500/30 bg-orange-500/10 text-orange-300'
                  }`}>
                  💬 {remaining}/{MAX_REQUESTS}
                </div>
              </div>

              {/* Compétences masquées sur mobile petit si on manque de place, sinon wrap */}
              <div className="hidden sm:block text-right text-xs text-zinc-500">
                <p className="mb-2">Compétences</p>
                <div className="flex flex-wrap gap-2 justify-end">
                  {skills.map((skill) => (
                    <span
                      key={skill.label}
                      className="rounded-full border border-white/10 bg-white/5 px-2 md:px-3 py-0.5 md:py-1 text-zinc-300"
                    >
                      {skill.icon} {skill.label}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                href="/contact"
                className="rounded-full border border-white/20 bg-white/5 px-4 py-1.5 md:px-6 md:py-2 text-xs md:text-sm font-medium text-white transition hover:bg-white/10"
              >
                Prendre rendez-vous
              </Link>
            </div>
          </div>
        </section>

        {/* Chat */}
        <section className="glass-panel flex h-[70vh] min-h-[500px] flex-col p-0 overflow-hidden relative">
          {/* Header avec contrôles */}
          <div className="border-b border-white/10 p-3 md:p-4 flex items-center justify-between bg-zinc-900/50 backdrop-blur-sm z-10">
            <div className="relative">
              <button
                onClick={() => setShowModelSelector(!showModelSelector)}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm text-zinc-300 transition hover:bg-white/10"
              >
                <span>{currentModel.icon}</span>
                <span className="font-medium text-white max-w-[80px] md:max-w-none truncate">{currentModel.name}</span>
                <span className="text-xs text-zinc-500 hidden sm:inline">•</span>
                <span className="text-zinc-500">▼</span>
              </button>

              {showModelSelector && (
                <div className="absolute top-full left-0 mt-2 z-20 min-w-[260px] md:min-w-[280px] rounded-xl border border-white/10 bg-zinc-900/95 backdrop-blur-xl shadow-xl">
                  {models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => {
                        setSelectedModel(model.id);
                        setShowModelSelector(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 text-left transition first:rounded-t-xl last:rounded-b-xl ${selectedModel === model.id
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
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm text-zinc-300 transition hover:bg-white/10 hover:text-white"
                title="Nouvelle conversation"
              >
                <span>🔄</span>
                <span className="hidden sm:inline">Nouvelle conversation</span>
              </button>
            )}
          </div>

          {/* Loading bar */}
          {isLoading && (
            <div className="absolute top-[52px] md:top-[64px] left-0 right-0 z-10 h-0.5 md:h-1 w-full overflow-hidden bg-transparent">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-blue-500 blur-[1px]"
                style={{
                  width: "30%",
                  animation: "loading 1.5s ease-in-out infinite"
                }}
              />
            </div>
          )}

          {/* Messages */}
          <div
            className="flex-1 overflow-y-auto p-3 md:p-6 scroll-smooth"
            ref={scrollContainerRef}
            onScroll={handleScroll}
          >
            {messages.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center text-center px-4">
                <div className="mb-4 md:mb-6 flex h-12 w-12 md:h-16 md:w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-xl md:text-2xl">
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
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm text-zinc-300 transition hover:border-emerald-400/30 hover:bg-emerald-400/5 hover:text-white"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4 md:space-y-6">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    {msg.role === "assistant" && (
                      <div className="mr-2 md:mr-3 flex h-6 w-6 md:h-8 md:w-8 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-xs md:text-sm mt-1">
                        🤖
                      </div>
                    )}
                    <div
                      className={`max-w-[90%] md:max-w-[85%] rounded-2xl px-4 py-3 md:px-5 md:py-4 text-sm md:text-base ${msg.role === "user"
                        ? "bg-emerald-500/20 text-white border border-emerald-500/30"
                        : "border border-white/10 bg-white/5"
                        }`}
                    >
                      {msg.role === "user" ? (
                        <p className="text-white whitespace-pre-wrap">{msg.content}</p>
                      ) : msg.content ? (
                        <div className="prose prose-invert prose-sm max-w-none prose-headings:text-white prose-headings:font-semibold prose-h1:text-lg prose-h2:text-base prose-h3:text-sm prose-p:text-zinc-300 prose-p:leading-relaxed prose-strong:text-white prose-strong:font-semibold prose-ul:text-zinc-300 prose-ol:text-zinc-300 prose-li:my-1 prose-code:text-emerald-300 prose-code:bg-emerald-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:before:content-[''] prose-code:after:content-[''] prose-pre:bg-zinc-900/50 prose-pre:border prose-pre:border-white/10 prose-pre:p-3 prose-pre:text-xs md:prose-pre:text-sm prose-a:text-emerald-400 prose-a:no-underline hover:prose-a:underline">
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {msg.content}
                          </ReactMarkdown>
                        </div>
                      ) : (
                        <span className="inline-flex gap-1 h-5 items-center">
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400" />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400" style={{ animationDelay: "0.1s" }} />
                          <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-400" style={{ animationDelay: "0.2s" }} />
                        </span>
                      )}
                    </div>
                    {msg.role === "user" && (
                      <div className="ml-2 md:ml-3 flex h-6 w-6 md:h-8 md:w-8 shrink-0 items-center justify-center rounded-full border border-blue-400/30 bg-blue-400/10 text-xs md:text-sm mt-1">
                        👤
                      </div>
                    )}
                  </div>
                ))}

                {/* Typing Indicator if not streaming but waiting */}
                {isLoading && !messages[messages.length - 1]?.content && <TypingIndicator />}

                <div ref={messagesEndRef} className="h-1" />
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-white/10 p-3 md:p-4 bg-zinc-900/50 backdrop-blur-sm">
            {/* Compteur de messages */}
            {remaining <= 5 && remaining > 0 && (
              <div className="mb-2 flex items-center justify-center gap-2 text-xs">
                <span className={`${remaining <= 2 ? 'text-orange-400' : 'text-zinc-400'}`}>
                  💬 {remaining} message{remaining > 1 ? 's' : ''} restant{remaining > 1 ? 's' : ''}
                </span>
                {remaining <= 2 && (
                  <Link href="/contact" className="text-emerald-400 hover:underline">
                    Continuer par email →
                  </Link>
                )}
              </div>
            )}

            {/* Message limite atteinte */}
            {limitReached && (
              <div className="mb-3 rounded-lg bg-orange-500/10 border border-orange-500/30 p-3 md:p-4 text-center">
                <p className="text-orange-300 font-medium mb-1 text-sm md:text-base">
                  ⚠️ Limite de messages gratuits atteinte
                </p>
                <div className="flex flex-wrap justify-center gap-2 mt-2">
                  <a
                    href="mailto:contact@kenshu.dev"
                    className="rounded-full bg-emerald-500/20 border border-emerald-500/30 px-3 py-1.5 text-xs font-medium text-emerald-300 hover:bg-emerald-500/30 transition"
                  >
                    📧 Email
                  </a>
                  <Link
                    href="/contact"
                    className="rounded-full bg-white/10 border border-white/20 px-3 py-1.5 text-xs font-medium text-white hover:bg-white/20 transition"
                  >
                    📅 Rendez-vous
                  </Link>
                </div>
              </div>
            )}

            <div className="flex gap-2 md:gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={limitReached ? "Limite atteinte..." : "Votre message..."}
                className={`flex-1 rounded-full border bg-white/5 px-4 py-2.5 md:px-6 md:py-3 text-sm md:text-base text-white placeholder-zinc-500 outline-none transition ${limitReached
                  ? 'border-orange-500/30 cursor-not-allowed opacity-50'
                  : 'border-white/10 focus:border-emerald-400/50 focus:bg-white/10'
                  }`}
                disabled={isLoading || limitReached}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim() || limitReached}
                className="flex items-center justify-center rounded-full border border-emerald-400 bg-emerald-400/10 w-10 h-10 md:w-auto md:h-auto md:px-6 md:py-3 font-medium text-emerald-300 transition hover:bg-emerald-400/20 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-300 border-t-transparent" />
                ) : (
                  <>
                    <span className="hidden md:inline">Envoyer</span>
                    <span className="md:hidden">➤</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </section>

        {/* Footer */}
        <p className="text-center text-xs text-zinc-500 px-4">
          IA expérimentale (peut faire des erreurs).{" "}
          <Link href="/contact" className="text-emerald-400 hover:underline">
            Me contacter
          </Link>
          .
        </p>

        {/* Contenu statique indexable pour SEO */}
        <section className="mt-8 md:mt-16 glass-panel p-6 md:p-10">
          <h2 className="text-xl md:text-2xl font-bold text-white mb-6">Questions fréquentes</h2>

          <div className="space-y-3 md:space-y-4">
            <details className="group rounded-xl border border-white/10 bg-white/5 p-4 md:p-6">
              <summary className="cursor-pointer font-semibold text-white text-base md:text-lg hover:text-emerald-400 transition">
                Quelles sont vos compétences en Spark ?
              </summary>
              <p className="mt-2 md:mt-3 text-sm md:text-base text-zinc-300">
                Expert Spark depuis 7 ans (Scala et PySpark). Expérience en migration ETL legacy vers Spark,
                optimisation de jobs (partitioning, broadcast joins, memory tuning), debugging de pipelines complexes.
                Missions récentes chez BNP Paribas (migration ETL critiques), Orange (infrastructure Big Data),
                ACC Industrie 4.0 (pipelines TBs).
              </p>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/5 p-4 md:p-6">
              <summary className="cursor-pointer font-semibold text-white text-base md:text-lg hover:text-emerald-400 transition">
                Intervenez-vous en environnement bancaire ?
              </summary>
              <p className="mt-2 md:mt-3 text-sm md:text-base text-zinc-300">
                Oui, avec contraintes fortes : sécurité renforcée, traçabilité complète, RGPD strict,
                séparation des accès, validation par équipes sécurité. Expérience BNP Paribas (sept-déc 2025)
                sur flux financiers critiques avec SLA stricts. Familier des processus de validation grands comptes.
              </p>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/5 p-4 md:p-6">
              <summary className="cursor-pointer font-semibold text-white text-base md:text-lg hover:text-emerald-400 transition">
                Maîtrisez-vous Airflow en production ?
              </summary>
              <p className="mt-2 md:mt-3 text-sm md:text-base text-zinc-300">
                Oui, niveau expert. Orchestration de pipelines complexes (Airflow 2.x), patterns anti-fragiles
                (idempotence, retry intelligents, alerting), monitoring Grafana/Prometheus, intégration CI/CD.
                Déploiement Ansible automatisé chez Orange (Zeppelin, Airflow, Spark). Stack complémentaire
                avec n8n pour automatisations low-code.
              </p>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/5 p-4 md:p-6">
              <summary className="cursor-pointer font-semibold text-white text-base md:text-lg hover:text-emerald-400 transition">
                Proposez-vous de l'audit AI Act / RGPD ?
              </summary>
              <p className="mt-2 md:mt-3 text-sm md:text-base text-zinc-300">
                Oui, service en développement pour 2026-2027. Classification des risques IA (inacceptable, élevé,
                limité, minimal), checklists obligations high-risk, documentation réglementaire, rapport d'audit.
                Outil prototype "AI Compliance Audit Tool" disponible pour early adopters. Veille active sur
                calendrier AI Act (obligations progressives jusqu'en août 2027).
              </p>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/5 p-4 md:p-6">
              <summary className="cursor-pointer font-semibold text-white text-base md:text-lg hover:text-emerald-400 transition">
                Quels sont vos tarifs et modalités ?
              </summary>
              <p className="mt-2 md:mt-3 text-sm md:text-base text-zinc-300">
                Tarification sur devis selon le projet. Disponibilité immédiate, remote/hybride/présentiel
                (IDF). Missions minimum 3 mois (renouvelable). Premier appel de 30 minutes gratuit pour diagnostic.
              </p>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/5 p-4 md:p-6">
              <summary className="cursor-pointer font-semibold text-white text-base md:text-lg hover:text-emerald-400 transition">
                Travaillez-vous avec des startups ou uniquement des grands comptes ?
              </summary>
              <p className="mt-2 md:mt-3 text-sm md:text-base text-zinc-300">
                Les deux. Grands comptes : BNP Paribas, Orange, Safran (missions longues, environnements complexes).
                Startups/PME : projets sur-mesure (sites web, agents IA, automatisations n8n/Make).
                Méthodologie adaptée selon la maturité : industrialisation lourde pour grands comptes,
                approche agile/lean pour startups.
              </p>
            </details>

            <details className="group rounded-xl border border-white/10 bg-white/5 p-4 md:p-6">
              <summary className="cursor-pointer font-semibold text-white text-base md:text-lg hover:text-emerald-400 transition">
                Stack technique complète ?
              </summary>
              <p className="mt-2 md:mt-3 text-sm md:text-base text-zinc-300">
                <strong>Big Data :</strong> Spark (Scala/PySpark), Airflow, Hadoop, MinIO.
                <strong>Langages :</strong> Python, Scala, TypeScript, SQL, Shell.
                <strong>BDD :</strong> PostgreSQL, MSSQL, MariaDB.
                <strong>DevOps :</strong> Ansible, Docker, Jenkins, GitLab CI, Proxmox.
                <strong>Observabilité :</strong> Grafana, Prometheus, Loki.
                <strong>IA/LLM :</strong> n8n, OpenRouter, RAG, agents autonomes.
                <strong>Web :</strong> Next.js, React, Tailwind, Prisma.
              </p>
            </details>
          </div>

          <div className="mt-6 md:mt-8 text-center">
            <Link
              href="/contact"
              className="inline-block rounded-full bg-white px-6 py-2.5 md:px-8 md:py-3 text-sm md:text-base font-medium text-black hover:bg-zinc-200 transition"
            >
              Discuter de votre projet
            </Link>
          </div>
        </section>
      </PageContainer>

      {/* Lead Capture Modal */}
      <LeadCaptureModal
        isOpen={showLeadCapture}
        onClose={() => setShowLeadCapture(false)}
        onSubmit={handleLeadSubmit}
      />
    </>
  );
}
