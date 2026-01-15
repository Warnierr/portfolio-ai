"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import confetti from "canvas-confetti";
import ProfileSelector from "./ProfileSelector";
import { AI_CONFIG } from "@/lib/ai-config";

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

export default function AskKenshuHome() {
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

  // Load history from localStorage OR use welcome message
  useEffect(() => {
    const savedMessages = localStorage.getItem("ask_kenshu_history");
    if (savedMessages) {
      try {
        const parsedMessages = JSON.parse(savedMessages);
        setMessages(parsedMessages);
      } catch (e) {
        console.error("Error loading chat history:", e);
      }
    } else {
      // First visit - use local welcome message
      setMessages([{ role: "assistant", content: WELCOME_MESSAGE }]);
    }
  }, []);



  // Save history to localStorage
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("ask_kenshu_history", JSON.stringify(messages));
    }
  }, [messages]);

  // Load rate limit from cookie
  useEffect(() => {
    const usedCount = getCookieValue(COOKIE_NAME);
    const currentRemaining = MAX_REQUESTS - usedCount;
    setRemaining(currentRemaining);
    if (currentRemaining <= 0) {
      setLimitReached(true);
    }
  }, []);

  // Handle scroll
  const handleScroll = () => {
    if (chatRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
      const isAtBottom = scrollHeight - scrollTop - clientHeight < 50;
      shouldAutoScrollRef.current = isAtBottom;
    }
  };

  const scrollToBottom = (instant = false) => {
    if (shouldAutoScrollRef.current) {
      messagesEndRef.current?.scrollIntoView({
        behavior: instant ? "auto" : "smooth",
        block: "end",
      });
    }
  };

  const handleAction = (action: any) => {
    console.log("Executing Action:", action);

    if (action.type === "NAVIGATE" && action.path) {
      router.push(action.path);
    }

    if (action.type === "CONFETTI") {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#10b981', '#3b82f6', '#8b5cf6'] // Emerald, Blue, Purple
      });
    }

    if (action.type === "OPEN_MODAL") {
      // TODO: Implement Modal
      console.log("Open Modal:", action.modal);
    }
  };

  useEffect(() => {
    scrollToBottom(isStreaming);
  }, [messages, isStreaming]);

  async function onSend(text?: string) {
    const content = (text ?? input).trim();
    if (!content || isStreaming || limitReached) return;

    setInput("");
    shouldAutoScrollRef.current = true;
    const userMessage: ChatMsg = { role: "user", content };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setIsStreaming(true);

    try {
      const res = await fetch("/api/ask-kenshu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages,
        }),
      });

      // Get remaining count from headers
      const remainingHeader = res.headers.get("X-Requests-Remaining");
      if (remainingHeader) {
        const newRemaining = parseInt(remainingHeader, 10);
        setRemaining(newRemaining);
        if (newRemaining <= 0) {
          setLimitReached(true);
        }
      }

      if (res.status === 429) {
        const errorData = await res.json();
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

      if (!res.ok) {
        let errorMessage = "Erreur API";
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
          if (errorData.details) console.warn("API Error Details:", errorData.details);
        } catch {
          try {
            errorMessage = await res.text() || errorMessage;
          } catch { }
        }
        throw new Error(errorMessage);
      }

      if (!res.body) {
        throw new Error("Pas de flux de réponse");
      }

      // Stream response
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      setMessages((m) => [...m, { role: "assistant", content: "" }]);
      scrollToBottom();

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        assistantText += chunk;

        setMessages((m) => {
          const copy = [...m];
          const last = copy[copy.length - 1];
          if (last?.role === "assistant") last.content = assistantText;
          return copy;
        });
        scrollToBottom();
      }

      // Check for navigation directive at end
      // Check for ACTION marker
      const actionMarker = "@@@ACTION@@@";
      const actionIdx = assistantText.lastIndexOf(actionMarker);

      if (actionIdx !== -1) {
        const jsonStr = assistantText.slice(actionIdx + actionMarker.length).trim();

        // Clean up the message in UI (remove the hidden command)
        setMessages((m) => {
          const copy = [...m];
          const last = copy[copy.length - 1];
          if (last?.role === "assistant") {
            last.content = assistantText.slice(0, actionIdx).trim();
          }
          return copy;
        });

        try {
          // Attempt to parse incomplete JSON as it streams? No, wait for end usually better but let's try
          // If it's at the end of stream, it's safer. 
          // But here we are inside while(true), so we might catch it early.
          // Let's rely on valid JSON closure.
          if (jsonStr.endsWith("}")) {
            const action = JSON.parse(jsonStr);
            handleAction(action);
          }
        } catch {
          // Ignore parse errors while streaming
        }
      }
    } catch (error: any) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: error.message || "Une erreur s'est produite. Contactez-moi directement : contact@kenshu.dev",
        },
      ]);
    } finally {
      setIsStreaming(false);
      scrollToBottom();
    }
  }

  function handleNewConversation() {
    setMessages([{ role: "assistant", content: WELCOME_MESSAGE }]);
    setInput("");
    localStorage.removeItem("ask_kenshu_history");
    shouldAutoScrollRef.current = true;
  }

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
    <div className="min-h-screen bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 text-white">
      {/* Main Content */}
      <main className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-6 lg:grid-cols-12 lg:py-8">
        {/* Chat Section */}
        <section className="lg:col-span-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 md:p-6 shadow-2xl backdrop-blur-sm">
            {/* Chat Header */}
            <div className="mb-4 flex items-start justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-emerald-400 mb-1">
                  Assistant IA
                </p>
                <h1 className="text-2xl font-bold text-white md:text-3xl">
                  Ask Kenshu
                </h1>
                <p className="mt-1 text-sm text-zinc-400">
                  Dis-moi ton besoin — je te guide vers les bons services et projets.
                </p>
              </div>
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

            {/* Quick Chips */}
            <div className="mb-4 flex flex-wrap gap-2">
              {quickChips.map((c) => (
                <button
                  key={c.label}
                  onClick={() => onSend(c.value)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-zinc-300 transition hover:border-emerald-400/30 hover:bg-emerald-400/5 hover:text-white"
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
              className="h-[60vh] md:h-[650px] lg:h-[700px] min-h-[400px] overflow-auto rounded-2xl border border-white/10 bg-zinc-950/50 p-4"
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
                    Décris-moi ton projet ou clique sur une suggestion pour commencer.
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
                        {msg.role === "user" ? (
                          <p className="text-white whitespace-pre-wrap leading-relaxed">{msg.content}</p>
                        ) : msg.content ? (
                          <>
                            {msg.content.includes("@@@PROFILE_SELECTOR@@@") ? (
                              <div>
                                <div className="prose prose-invert prose-base max-w-none 
                                  prose-p:leading-loose prose-p:text-zinc-200 prose-p:mb-4 
                                  prose-headings:text-white prose-headings:font-semibold prose-headings:mb-3 prose-headings:mt-6
                                  prose-strong:text-emerald-300 prose-strong:font-bold">
                                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {msg.content.split("@@@PROFILE_SELECTOR@@@")[0]}
                                  </ReactMarkdown>
                                </div>

                                <ProfileSelector onSelect={(id, label) => {
                                  // Trigger send automatically
                                  onSend(`Je suis ${label.toLowerCase()} ${id === 'curious' ? 'et je découvre' : ''}`);
                                }} />

                                <div className="prose prose-invert prose-base max-w-none 
                                  prose-p:leading-loose prose-p:text-zinc-200 prose-p:mb-4 
                                  prose-headings:text-white prose-headings:font-semibold prose-headings:mb-3 prose-headings:mt-6
                                  prose-strong:text-emerald-300 prose-strong:font-bold">
                                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {msg.content.split("@@@PROFILE_SELECTOR@@@")[1]}
                                  </ReactMarkdown>
                                </div>
                              </div>
                            ) : (
                              <div className="prose prose-invert prose-base max-w-none 
                                prose-p:leading-loose prose-p:text-zinc-200 prose-p:mb-4 
                                prose-headings:text-white prose-headings:font-semibold prose-headings:mb-3 prose-headings:mt-6
                                prose-strong:text-emerald-300 prose-strong:font-bold
                                prose-ul:text-zinc-300 prose-ul:my-4 prose-li:my-2
                                prose-code:text-emerald-300 prose-code:bg-emerald-500/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:before:content-none prose-code:after:content-none
                                prose-a:inline-flex prose-a:items-center prose-a:gap-2 prose-a:px-4 prose-a:py-2 prose-a:my-2 prose-a:rounded-lg prose-a:bg-white/5 prose-a:border prose-a:border-white/10 prose-a:text-emerald-400 prose-a:no-underline prose-a:font-medium prose-a:transition-all hover:prose-a:bg-emerald-500/10 hover:prose-a:border-emerald-500/30 hover:prose-a:scale-[1.02] hover:prose-a:shadow-lg hover:prose-a:shadow-emerald-500/10">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                  {msg.content}
                                </ReactMarkdown>
                              </div>
                            )}
                          </>
                        ) : (
                          <span className="inline-flex gap-1 h-5 items-center">
                            <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-500/50" />
                            <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-500/50" style={{ animationDelay: "0.1s" }} />
                            <span className="h-2 w-2 animate-bounce rounded-full bg-emerald-500/50" style={{ animationDelay: "0.2s" }} />
                          </span>
                        )}
                      </div>
                      {msg.role === "user" && (
                        <div className="ml-2 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-blue-400/30 bg-blue-400/10 text-sm mt-1">
                          👤
                        </div>
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} className="h-1" />
                </div>
              )}
            </div>

            {/* Rate Limit Warning */}
            {limitReached && (
              <div className="mt-3 rounded-lg bg-orange-500/10 border border-orange-500/30 p-3 text-center">
                <p className="text-orange-300 font-medium text-sm mb-2">
                  ⚠️ Limite de messages gratuits atteinte
                </p>
                <div className="flex flex-wrap justify-center gap-2">
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

            {/* Input Area */}
            <div className="mt-4 flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    onSend();
                  }
                }}
                placeholder={limitReached ? "Limite atteinte..." : "Ex: Je veux automatiser mes emails..."}
                className={`flex-1 rounded-2xl border bg-zinc-950/50 px-4 py-3 text-sm outline-none transition placeholder:text-zinc-500 ${limitReached
                  ? "border-orange-500/30 cursor-not-allowed opacity-50"
                  : "border-white/10 focus:border-emerald-400/50 focus:bg-white/5"
                  }`}
                disabled={isStreaming || limitReached}
              />
              <button
                onClick={() => onSend()}
                className="rounded-2xl bg-emerald-500/20 border border-emerald-500/40 px-5 py-3 text-sm font-medium text-emerald-300 transition hover:bg-emerald-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isStreaming || !input.trim() || limitReached}
              >
                {isStreaming ? (
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-emerald-300 border-t-transparent inline-block" />
                ) : (
                  "Envoyer"
                )}
              </button>
            </div>

            {/* New Conversation Button */}
            {messages.length > 0 && (
              <button
                onClick={handleNewConversation}
                className="mt-3 w-full rounded-xl border border-white/10 bg-white/5 py-2 text-xs text-zinc-400 transition hover:bg-white/10 hover:text-white"
              >
                🔄 Nouvelle conversation
              </button>
            )}
          </div>
        </section>

        {/* Cards Section */}
        <aside className="lg:col-span-4 flex flex-col h-full justify-between">
          <div>
            <div className="mb-4">
              <p className="text-xs uppercase tracking-[0.3em] text-zinc-500 mb-2">
                Ce que je fais
              </p>
              <h2 className="text-xl font-semibold text-white">
                Services & Expertise
              </h2>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              {CARDS.map((c) => (
                <Link
                  key={c.key}
                  href={c.href}
                  className={`group rounded-2xl border bg-white/5 p-3 shadow-lg transition-all hover:bg-white/10 hover:shadow-xl ${getCardColorClasses(c.color)}`}
                >
                  <div className="overflow-hidden rounded-xl border border-white/10 bg-zinc-950/50 aspect-[4/3]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.imgSrc}
                      alt={c.title}
                      className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback if image doesn't exist
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  </div>
                  <div className="mt-3">
                    <div className="text-sm font-semibold text-white group-hover:text-emerald-200 transition-colors">
                      {c.title}
                    </div>
                    <div className="mt-1 text-xs text-zinc-400">
                      {c.subtitle}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            {/* Additional Info Card */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-3 mb-3">
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-sm font-medium text-white">Disponible bientôt</span>
              </div>
              <p className="text-sm text-zinc-400">
                Freelance Data Engineer & AI Product Builder. Disponible pour missions courtes ou longues.
              </p>
              <div className="mt-3 flex gap-2">
                <Link
                  href="/projets"
                  className="text-xs text-zinc-400 hover:text-white transition"
                >
                  Voir mes projets →
                </Link>
                <span className="text-zinc-600">•</span>
                <Link
                  href="/contact"
                  className="text-xs text-emerald-400 hover:text-emerald-300 transition"
                >
                  Me contacter
                </Link>
              </div>
            </div>

            {/* Projets du moment */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 flex-1">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-3">
                Projets du moment
              </p>
              <div className="flex flex-col gap-3">
                <a href="https://budget.kenshu.dev/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-xl bg-white/5 p-4 transition hover:bg-white/10 hover:shadow-lg border border-transparent hover:border-emerald-500/30">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-500/20 text-2xl group-hover:scale-110 transition-transform">
                    💰
                  </div>
                  <div>
                    <div className="text-base font-semibold text-white group-hover:text-emerald-300">Budget AI</div>
                    <div className="text-sm text-zinc-400">Assistant financier personnel</div>
                  </div>
                </a>

                <a href="https://aiact.kenshu.dev/" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 rounded-xl bg-white/5 p-4 transition hover:bg-white/10 hover:shadow-lg border border-transparent hover:border-blue-500/30">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-500/20 text-2xl group-hover:scale-110 transition-transform">
                    🛡️
                  </div>
                  <div>
                    <div className="text-base font-semibold text-white group-hover:text-blue-300">AI Compliance</div>
                    <div className="text-sm text-zinc-400">Audit RGPD & AI Act</div>
                  </div>
                </a>
              </div>
            </div>

            {/* Clients */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-3">
                Environnements critiques
              </p>
              <div className="flex flex-wrap gap-3 text-sm text-zinc-400">
                <span className="hover:text-white transition">BNP Paribas</span>
                <span className="hover:text-white transition">Orange</span>
                <span className="hover:text-white transition">Safran</span>
                <span className="hover:text-white transition">ACC</span>
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Footer Note */}
      <div className="text-center pb-6 px-4">
        <p className="text-xs text-zinc-500">
          IA expérimentale (peut faire des erreurs).
        </p>
      </div>
    </div >
  );
}
