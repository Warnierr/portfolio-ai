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

const WELCOME_MESSAGE = `Bonjour ! 👋 Je suis **Kenshu IA**, l'assistant intelligent de Raouf Warnier.

Je fonctionne avec **${AI_CONFIG.displayName}** par ${AI_CONFIG.provider} pour vous offrir une expérience conversationnelle naturelle et dynamique 🚀

Raouf est un **développeur passionné** par la création de projets innovants en **Data Engineering** et **Intelligence Artificielle**. Je peux vous parler de :

- 🏢 **Ses expériences professionnelles** : BNP Paribas, Orange, Safran, ACC
- 💻 **Ses projets en cours** : Budget AI, AI Compliance Tool, automatisations
- 🎯 **Comment il peut vous aider** sur votre projet data ou web

Pour mieux vous guider, j'aimerais savoir qui vous êtes 😊

@@@PROFILE_SELECTOR@@@

N'hésitez pas à me poser vos questions ! Je suis là pour vous orienter 🎯`;

const MAX_REQUESTS = 10000;
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
    // Check local storage / cookies
    const saved = localStorage.getItem("ask_kenshu_history");
    const count = getCookieValue(COOKIE_NAME);
    setRemaining(Math.max(0, MAX_REQUESTS - count));
    if (count >= MAX_REQUESTS) {
      setLimitReached(true);
    }

    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
          setTimeout(scrollToBottom, 100);
          return;
        }
      } catch (e) {
        console.error("Error parsing history", e);
      }
    }

    // Default welcome message
    setMessages([{ role: "assistant", content: WELCOME_MESSAGE }]);
  }, []);

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

    // Check UI actions immediately
    const lowerInput = text.toLowerCase();

    // CONFETTI
    if (lowerInput.includes("confetti") || lowerInput.includes("fête") || lowerInput.includes("bravo")) {
      throwConfetti();
    }

    // NAVIGATION
    if (lowerInput.includes("projet")) {
      router.prefetch('/projets');
    }
    if (lowerInput.includes("contact")) {
      router.prefetch('/contact');
    }

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

      if (!res.ok) {
        throw new Error(`API Error: ${res.status}`);
      }

      // Update remaining count from headers
      const used = res.headers.get("X-RateLimit-Used");
      if (used) {
        const val = parseInt(used, 10);
        const newRemaining = Math.max(0, MAX_REQUESTS - val);
        setRemaining(newRemaining);
        if (newRemaining === 0) setLimitReached(true);
      }

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

        // Check for triggers in the streaming response
        if (chunk.includes("CONFETTI")) {
          throwConfetti();
        }
      }
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "⚠️ Une erreur s'est produite. Veuillez réessayer.",
        },
      ]);
    } finally {
      setIsStreaming(false);
    }
  };

  // Profile Selector Handler
  const handleProfileSelect = (profile: string) => {
    // Remove the profile selector from messages by filtering it out from the last message content
    // Or simpler: just send a message as the user
    onSend(`Je suis ${profile}`);
  };

  const getCardColorClasses = (color: string) => {
    switch (color) {
      case "emerald":
        return "border-emerald-500/30 hover:border-emerald-500/50 hover:shadow-emerald-500/10";
      case "blue":
        return "border-blue-500/30 hover:border-blue-500/50 hover:shadow-blue-500/10";
      case "purple":
        return "border-purple-500/30 hover:border-purple-500/50 hover:shadow-purple-500/10";
      case "amber":
        return "border-amber-500/30 hover:border-amber-500/50 hover:shadow-amber-500/10";
      default:
        return "border-white/10 hover:border-white/20";
    }
  };

  return (
    <div className={`text-white transition-colors duration-500
      ${!compactMode ? 'min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950' : 'h-full flex flex-col'}
      ${theme === 'matrix' ? 'theme-matrix' : ''}
      ${theme === 'cyberpunk' ? 'theme-cyberpunk' : ''}
      ${theme === 'retro' ? 'theme-retro' : ''}
      ${theme === 'zen' ? 'theme-zen' : ''}
    `}>
      {/* Main Content */}
      <main className={`mx-auto ${compactMode ? 'flex-1 flex flex-col overflow-hidden' : 'grid max-w-7xl grid-cols-1 gap-8 px-4 py-6 lg:grid-cols-12 lg:py-8'}`}>

        {/* Chat Section */}
        <section className={`${compactMode ? 'flex-1 flex flex-col overflow-hidden min-h-0' : 'lg:col-span-8 w-full'}`}>
          <div className={`${compactMode ? 'flex-1 flex flex-col overflow-hidden bg-zinc-900/50' : 'rounded-3xl border border-white/10 bg-white/5 p-4 md:p-6 shadow-2xl backdrop-blur-sm'}`}>

            {/* Chat Header (only visible if not compact or if needed) */}
            {!compactMode && (
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="mt-1 text-sm text-zinc-400">
                    Dis-moi ton besoin — je te guide vers les bons services et projets.
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
                    <span className={`text-xs px-2 py-1 rounded-full border ${remaining > 5
                      ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-300"
                      : remaining > 2
                        ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-300"
                        : "border-orange-500/30 bg-orange-500/10 text-orange-300"
                      }`}>
                      💬 {remaining}/{MAX_REQUESTS}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* In compact mode, maybe just a simpler header or none if handled by modal */}
            {compactMode && (
              <div className="flex items-center justify-between p-4 border-b border-white/5 shrink-0">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-lg">🤖</div>
                  <div>
                    <h3 className="font-semibold text-white">Ask Kenshu</h3>
                    <p className="text-[10px] text-zinc-400">AI Assistant • Powered by Grok Beta</p>
                  </div>
                </div>
                {onClose && (
                  <button onClick={onClose} className="p-2 text-zinc-400 hover:text-white transition">✕</button>
                )}
              </div>
            )}

            {/* Quick Chips */}
            <div className={`flex flex-wrap gap-2 shrink-0 ${compactMode ? 'p-4 pb-2 overflow-x-auto no-scrollbar' : 'mb-4'}`}>
              {quickChips.map((c) => (
                <button
                  key={c.label}
                  onClick={() => onSend(c.value)}
                  className={`rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300 transition hover:border-emerald-400/30 hover:bg-emerald-400/5 hover:text-white whitespace-nowrap`}
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
              className={`overflow-auto ${compactMode ? 'flex-1 p-4' : 'h-[75vh] md:h-[650px] lg:h-[700px] min-h-[500px] rounded-2xl border border-white/10 bg-zinc-950/50 p-4'}`}
            >
              {messages.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-2xl">
                    🤖
                  </div>
                  <p className="text-lg font-medium text-white">
                    Bonjour, je suis Ask Kenshu !
                  </p>
                  <p className="mt-2 max-w-sm text-sm text-zinc-400">
                    Je suis là pour répondre à toutes tes questions sur le profil de Raouf, ses projets et ses disponibilités.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {msg.role === "assistant" && (
                        <div className="mr-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-sm mt-1">
                          🤖
                        </div>
                      )}
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 text-sm ${msg.role === "user"
                          ? "bg-emerald-500/20 text-white border border-emerald-500/30"
                          : "border border-white/10 bg-white/5"
                          }`}
                      >
                        {/* Render Profile Selector if marker present */}
                        {msg.content.includes('@@@PROFILE_SELECTOR@@@') ? (
                          <>
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {msg.content.replace('@@@PROFILE_SELECTOR@@@', '')}
                            </ReactMarkdown>
                            <div className="mt-4 not-prose">
                              <ProfileSelector onSelect={handleProfileSelect} />
                            </div>
                          </>
                        ) : (
                          <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {msg.content}
                          </ReactMarkdown>
                        )}
                      </div>
                    </div>
                  ))}
                  {isStreaming && (
                    <div className="flex justify-start">
                      <div className="mr-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-400/10 text-sm mt-1">
                        🤖
                      </div>
                      <div className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                        <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-400" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-400 delay-100" />
                        <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-400 delay-200" />
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Input Area */}
            <div className={`relative shrink-0 ${compactMode ? 'p-4 border-t border-white/5' : 'mt-4'}`}>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSend();
                }}
                className="relative"
              >
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    limitReached
                      ? "Limite atteinte. Contacte-moi !"
                      : "Pose ta question... (ex: TJM, dispo, stack technique)"
                  }
                  disabled={isStreaming || limitReached}
                  className="w-full rounded-xl border border-white/10 bg-zinc-900/50 py-3.5 pl-4 pr-12 text-sm text-white placeholder:text-zinc-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50 disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isStreaming || limitReached}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-white/10 p-1.5 text-zinc-400 transition hover:bg-emerald-500 hover:text-white disabled:pointer-events-none disabled:opacity-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
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
              <p className={`mt-2 text-center text-[10px] text-zinc-600 ${compactMode ? 'mb-0' : ''}`}>
                IA expérimentale (peut faire des erreurs).
              </p>
            </div>
          </div>
        </section>

        {/* Sidebar - Hidden in compact mode */}
        {!compactMode && (
          <aside className="lg:col-span-4 w-full space-y-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <p className="mb-4 text-xs font-semibold uppercase tracking-widest text-zinc-500">
                Ce que je fais
              </p>
              <h2 className="mb-6 text-xl font-bold text-white">
                Services & Expertise
              </h2>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {CARDS.map((card) => (
                  <Link
                    key={card.key}
                    href={card.href}
                    className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br p-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg ${getCardColorClasses(
                      card.color
                    )}`}
                  >
                    <div className="relative z-10 flex items-start gap-4">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-black/20">
                        <img
                          src={card.imgSrc}
                          alt=""
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white transition group-hover:text-emerald-300">
                          {card.title}
                        </h3>
                        <p className="mt-1 text-xs text-zinc-400">
                          {card.subtitle}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Dispo Card */}
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm">
              <div className="flex items-center gap-2 mb-3">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
                <span className="text-sm font-semibold text-white">Disponible bientôt</span>
              </div>
              <p className="text-xs text-zinc-400 mb-4 leading-relaxed">
                Freelance Data Engineer & AI Product Builder. Disponible pour missions courtes ou longues.
              </p>
              <div className="flex items-center gap-2">
                <Link
                  href="/projets"
                  className="flex-1 rounded-lg bg-amber-500/10 px-3 py-2 text-center text-xs font-medium text-amber-300 hover:bg-amber-500/20 transition border border-amber-500/20"
                >
                  👉 Voir les projets
                </Link>
                <Link
                  href="/contact"
                  className="flex-1 rounded-lg bg-emerald-500/10 px-3 py-2 text-center text-xs font-medium text-emerald-300 hover:bg-emerald-500/20 transition border border-emerald-500/20"
                >
                  📝 Me contacter
                </Link>
              </div>
            </div>
          </aside>
        )}
      </main>
    </div>
  );
}
