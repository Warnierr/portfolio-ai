"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import confetti from "canvas-confetti";
import ProfileSelector from "./ProfileSelector";
import { AI_CONFIG } from "@/lib/ai-config";
import { useTheme } from "@/contexts/ThemeContext";

type CardKey = "web" | "apps" | "automation" | "data";

// (CARDS constant reste, même si masquée en mode compact)
const CARDS: Array<{
  key: CardKey;
  title: string;
  subtitle: string;
  href: string;
  imgSrc: string;
  color: string;
}> = [
    {
      key: "web",
      title: "Création de sites web",
      subtitle: "Sites vitrines, landing pages, SEO",
      href: "/services",
      imgSrc: "/ask-kenshu/web.png",
      color: "emerald",
    },
    {
      key: "apps",
      title: "Développement d'apps",
      subtitle: "MVP, outils internes, produits digitaux",
      href: "/services",
      imgSrc: "/ask-kenshu/apps.png",
      color: "blue",
    },
    {
      key: "automation",
      title: "Automatisation (n8n)",
      subtitle: "Process, CRM, emails, intégrations",
      href: "/services",
      imgSrc: "/ask-kenshu/n8n.png",
      color: "purple",
    },
    {
      key: "data",
      title: "Data Engineer / DevOps",
      subtitle: "Pipelines fiables, grands comptes",
      href: "/services",
      imgSrc: "/ask-kenshu/data.png",
      color: "amber",
    },
  ];

type ChatMsg = { role: "user" | "assistant"; content: string };

// NOUVEAU MESSAGE DE BIENVENUE ÉPURÉ
const WELCOME_MESSAGE = `Bonjour ! 👋 Je suis **Kenshu IA**, l'assistant intelligent de Raouf Warnier.

Pour mieux vous guider vers les bons projets et services, j'aimerais savoir qui vous êtes 😊

@@@PROFILE_SELECTOR@@@

N'hésitez pas à me poser vos questions ! Je suis là pour vous orienter 🎯`;

// On remet les points à 10 pour le style
const MAX_REQUESTS = 10;
const COOKIE_NAME = "chat_requests";

function getCookieValue(name: string): number {
  if (typeof document === "undefined") return 0;
  const cookies = document.cookie.split(";").map((c) => c.trim());
  const cookie = cookies.find((c) => c.startsWith(`${name}=`));
  if (!cookie) return 0;
  const value = parseInt(cookie.split("=")[1], 10);
  return isNaN(value) ? 0 : value;
}

interface AskKenshuHomeProps {
  isOpen?: boolean;
  onClose?: () => void;
  compactMode?: boolean;
}

export default function AskKenshuHome({ isOpen, onClose, compactMode = false }: AskKenshuHomeProps) {
  const { theme } = useTheme();
  const router = useRouter();
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [input, setInput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);
  const [remaining, setRemaining] = useState(MAX_REQUESTS);
  const [limitReached, setLimitReached] = useState(false);

  const chatRef = useRef<HTMLDivElement | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const shouldAutoScrollRef = useRef(true);

  const quickChips = useMemo(
    () => [
      { label: "Je veux un site web", value: "Je veux un site web pour mon activité." },
      { label: "Automatiser mon business", value: "Je veux automatiser des tâches répétitives avec n8n." },
      { label: "Créer une app", value: "Je veux développer une application web ou mobile." },
      { label: "Mission data/devops", value: "Je cherche un freelance data engineer ou devops." },
      { label: "Voir les projets", value: "Montre-moi les projets réalisés par Raouf." },
    ],
    []
  );

  useEffect(() => {
    // Load local storage / cookies
    // Remettre les compteurs à jour
    const count = getCookieValue(COOKIE_NAME);
    const newRemaining = Math.max(0, MAX_REQUESTS - count);
    setRemaining(newRemaining);
    if (count >= MAX_REQUESTS) {
      setLimitReached(true);
    }

    const saved = localStorage.getItem("ask_kenshu_history");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          setTimeout(scrollToBottom, 100);
          return;
        }
      } catch (e) { console.error(e); }
    }

    // Si pas d'historique (ou vide), mettre le welcome message
    setMessages([{ role: "assistant", content: WELCOME_MESSAGE }]);
  }, [isOpen]); // Re-run when modal opens

  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("ask_kenshu_history", JSON.stringify(messages));
    }
  }, [messages]);

  useEffect(() => {
    if (!shouldAutoScrollRef.current) return;
    scrollToBottom();
  }, [messages, isStreaming]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const clearHistory = () => {
    setMessages([{ role: "assistant", content: WELCOME_MESSAGE }]);
    localStorage.removeItem("ask_kenshu_history");
  };

  const handleScroll = () => {
    if (!chatRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
    const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
    shouldAutoScrollRef.current = isAtBottom;
  };

  const throwConfetti = () => {
    const end = Date.now() + 1000;
    const colors = ["#34d399", "#60a5fa", "#fbbf24", "#ffffff"];
    (function frame() {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });
      if (Date.now() < end) requestAnimationFrame(frame);
    })();
  };

  const onSend = async (manualInput?: string) => {
    const text = manualInput || input;
    if (!text.trim() || isStreaming || limitReached) return;

    const lowerInput = text.toLowerCase();
    if (lowerInput.includes("confetti") || lowerInput.includes("fête") || lowerInput.includes("bravo")) throwConfetti();
    if (lowerInput.includes("projet")) router.prefetch('/projets');
    if (lowerInput.includes("contact")) router.prefetch('/contact');

    setInput("");
    const userMsg: ChatMsg = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setIsStreaming(true);
    shouldAutoScrollRef.current = true;

    try {
      const res = await fetch("/api/ask-kenshu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, history: messages }),
      });

      if (!res.ok) throw new Error(`API Error: ${res.status}`);

      const used = res.headers.get("X-RateLimit-Used");
      // Pour l'affichage, on simule une décrémentation locale si l'API ne retourne pas ce qu'on attend avec la nouvelle limite de 10
      // En réalité l'API route a 10000, donc "used" sera petit.
      // On va gérer le compteur visuellement ici :
      setRemaining(prev => Math.max(0, prev - 1));
      if (remaining <= 1) setLimitReached(true);
      // On ignore le header X-RateLimit-Used pour l'instant car l'API est configurée large (10000) mais l'UI doit montrer 10.

      if (!res.body) throw new Error("No body");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantMsg: ChatMsg = { role: "assistant", content: "" };
      setMessages((prev) => [...prev, assistantMsg]);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        assistantMsg.content += chunk;
        setMessages((prev) => {
          const newArr = [...prev];
          newArr[newArr.length - 1] = { ...assistantMsg };
          return newArr;
        });
        if (chunk.includes("CONFETTI")) throwConfetti();
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { role: "assistant", content: "⚠️ Une erreur s'est produite." }]);
    } finally {
      setIsStreaming(false);
    }
  };

  const handleProfileSelect = (profile: string) => {
    // Si l'utilisateur clique sur le profil, on envoie le message pour lui
    // Le ProfileSelector est déjà rendu, donc on fait juste onSend
    onSend(`Je suis un ${profile}`);
  };

  const getCardColorClasses = (color: string) => {
    // (unchanged)
    switch (color) {
      case "emerald": return "border-emerald-500/30 hover:border-emerald-500/50 hover:shadow-emerald-500/10";
      case "blue": return "border-blue-500/30 hover:border-blue-500/50 hover:shadow-blue-500/10";
      case "purple": return "border-purple-500/30 hover:border-purple-500/50 hover:shadow-purple-500/10";
      case "amber": return "border-amber-500/30 hover:border-amber-500/50 hover:shadow-amber-500/10";
      default: return "border-white/10 hover:border-white/20";
    }
  };

  return (
    <div className={`text-white transition-colors duration-500 h-full flex flex-col
      ${!compactMode ? 'min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950' : ''}
      ${theme === 'matrix' ? 'theme-matrix' : ''}
      ${theme === 'cyberpunk' ? 'theme-cyberpunk' : ''}
      ${theme === 'retro' ? 'theme-retro' : ''}
      ${theme === 'zen' ? 'theme-zen' : ''}
    `}>
      <main className={`mx-auto w-full h-full ${compactMode ? 'flex flex-col' : 'grid max-w-7xl grid-cols-1 gap-8 px-4 py-6 lg:grid-cols-12 lg:py-8'}`}>

        {/* Chat Section */}
        <section className={`w-full h-full flex flex-col ${compactMode ? '' : 'lg:col-span-8'}`}>
          <div className={`flex-1 flex flex-col overflow-hidden ${compactMode ? 'bg-[#0a0a0a]' : 'rounded-3xl border border-white/10 bg-white/5 p-4 md:p-6 shadow-2xl backdrop-blur-sm'}`}>

            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 shrink-0 bg-[#0a0a0a]">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xl">🤖</div>
                <div>
                  <h3 className="font-semibold text-white text-sm">Ask Kenshu</h3>
                  <div className="flex items-center gap-2">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <p className="text-[10px] text-zinc-400">
                      Online <span className="text-zinc-600">•</span> Powered by {AI_CONFIG.displayName}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {/* Compteur Points */}
                <span className={`text-[10px] px-2 py-0.5 rounded-full border border-white/10 bg-white/5 text-zinc-400`}>
                  {remaining}/10
                </span>

                {/* Refresh Button */}
                <button onClick={clearHistory} className="p-2 text-zinc-500 hover:text-white transition" title="Nouvelle conversation">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" /><path d="M3 3v5h5" /></svg>
                </button>

                {onClose && (
                  <button onClick={onClose} className="p-2 text-zinc-500 hover:text-white transition">✕</button>
                )}
              </div>
            </div>

            {/* Quick Chips */}
            <div className={`flex flex-wrap gap-2 shrink-0 p-4 border-b border-white/5 bg-[#0a0a0a]`}>
              {quickChips.map((c) => (
                <button
                  key={c.label}
                  onClick={() => onSend(c.value)}
                  className={`rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-zinc-400 transition hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-400 whitespace-nowrap`}
                  disabled={isStreaming || limitReached}
                >
                  {c.label}
                </button>
              ))}
            </div>

            {/* Messages Container */}
            <div
              ref={chatRef}
              onScroll={handleScroll}
              className={`flex-1 overflow-auto p-4 space-y-6 ${compactMode ? 'bg-[#0a0a0a]' : 'rounded-2xl border border-white/10 bg-zinc-950/50'}`}
            >
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center p-8">
                  <div className="mb-4 text-4xl opacity-20">💬</div>
                  <p className="text-zinc-500">Commencez une conversation...</p>
                </div>
              ) : (
                <div className="space-y-6 pb-4">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.role === "assistant" && (
                        <div className="mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm mt-1">
                          🤖
                        </div>
                      )}

                      <div className={`max-w-[85%] ${msg.role === 'user' ? 'ml-12' : ''}`}>
                        <div
                          className={`rounded-2xl px-5 py-3.5 text-sm shadow-sm ${msg.role === "user"
                            ? "bg-zinc-800 text-white border border-white/5"
                            : "bg-transparent text-zinc-300 border border-white/5 bg-zinc-900/40"
                            }`}
                        >
                          {/* Render Profile Selector if marker present */}
                          {msg.content.includes('@@@PROFILE_SELECTOR@@@') ? (
                            <>
                              <div className="prose prose-invert prose-sm max-w-none">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                  {msg.content.replace('@@@PROFILE_SELECTOR@@@', '')}
                                </ReactMarkdown>
                              </div>
                              <div className="mt-6 not-prose">
                                <ProfileSelector onSelect={handleProfileSelect} />
                              </div>
                            </>
                          ) : (
                            <div className="prose prose-invert prose-sm max-w-none">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {msg.content}
                              </ReactMarkdown>
                            </div>
                          )}
                        </div>
                      </div>

                    </div>
                  ))}
                  {isStreaming && (
                    <div className="flex justify-start">
                      <div className="mr-3 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/20 text-sm mt-1">
                        🤖
                      </div>
                      <div className="flex items-center gap-1 rounded-2xl border border-white/5 bg-zinc-900/40 px-4 py-3">
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500 delay-100" />
                        <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-zinc-500 delay-200" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className={`relative shrink-0 p-4 border-t border-white/10 bg-[#0a0a0a]`}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSend();
                }}
                className="relative flex items-center gap-2"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    limitReached
                      ? "Limite atteinte."
                      : "Pose ta question... (ex: TJM, dispo, stack technique)"
                  }
                  disabled={isStreaming || limitReached}
                  className="flex-1 rounded-xl border border-white/10 bg-zinc-900/50 py-3.5 pl-4 pr-12 text-sm text-white placeholder:text-zinc-600 focus:border-emerald-500/30 focus:outline-none focus:ring-1 focus:ring-emerald-500/30 disabled:opacity-50 transition-all"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isStreaming || limitReached}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-zinc-400 hover:text-emerald-400 transition-colors disabled:opacity-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="m12 5 7 7-7 7" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </section>

        {/* Sidebar - Hidden in compact mode (kept for potential future non-compact usage) */}
        {!compactMode && (
          <aside className="lg:col-span-4 w-full space-y-6">
            {/* ... (sidebar content) ... */}
          </aside>
        )}
      </main>
    </div>
  );
}
