"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sidebar } from "./Sidebar";
import { MessageBubble } from "./MessageBubble";
import { InputDock } from "./InputDock";
import { PromptLibraryModal } from "./PromptLibraryModal";
import { SettingsModal } from "./SettingsModal";
import { INITIAL_SESSIONS, ChatSession, ChatMessage } from "./mockData";
import { Sparkles, SplitSquareVertical, ArrowRight, Zap, Code, FileText, BrainCircuit } from "lucide-react";

export function WebApp() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [sessions, setSessions] = useState<ChatSession[]>(INITIAL_SESSIONS);
  const [activeSessionId, setActiveSessionId] = useState<string>("session-1");
  const [isCompareMode, setIsCompareMode] = useState<boolean>(true);
  const [modelA, setModelA] = useState<string>("Claude 3.5 Sonnet");
  const [modelB, setModelB] = useState<string>("GPT-4o Omni");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showPromptLibrary, setShowPromptLibrary] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeSession =
    sessions.find((s) => s.id === activeSessionId) || sessions[0];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeSession?.messages, isGenerating]);

  // Start a new chat session
  const handleNewChat = () => {
    const newId = `session-${Date.now()}`;
    const newSession: ChatSession = {
      id: newId,
      title: "New Conversation",
      timestamp: "Just now",
      category: "Today",
      mode: isCompareMode ? "compare" : "single",
      messages: [],
    };
    setSessions([newSession, ...sessions]);
    setActiveSessionId(newId);
  };

  // Keyboard shortcut Cmd+N / Ctrl+N
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "n") {
        e.preventDefault();
        handleNewChat();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sessions, isCompareMode]);

  // Send message with simulated real-time stream
  const handleSendMessage = (text: string, mA: string, mB?: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedMessages = [...activeSession.messages, userMsg];

    // Update session title if first message
    const isFirstMsg = activeSession.messages.length === 0;
    const newTitle = isFirstMsg ? (text.length > 35 ? text.slice(0, 35) + "..." : text) : activeSession.title;

    setSessions((prev) =>
      prev.map((s) =>
        s.id === activeSessionId
          ? { ...s, title: newTitle, messages: updatedMessages, mode: mB ? "compare" : "single" }
          : s
      )
    );

    setIsGenerating(true);

    // Realistic multi-model streaming simulation
    setTimeout(() => {
      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant",
        modelA: mA,
        content: `Analyzing prompt: "${text}"\n\nHere is the synthesized assessment from **${mA}**:\n\n\`\`\`typescript\n// Generated architecture snippet\nexport async function handleInferencePipeline(query: string) {\n  const startTime = performance.now();\n  const tokens = await router.stream({ model: "${mA}", query });\n  return { ok: true, duration: performance.now() - startTime };\n}\n\`\`\`\n\n**Verdict:** Architecture matches zero-copy memory benchmarks. Optimal for production deployments.`,
        modelB: mB,
        contentB: mB
          ? `Comparative analysis from **${mB}**:\n\n\`\`\`typescript\n// Edge-runtime optimized implementation\nexport const config = { runtime: "edge" };\nexport async function POST(req: Request) {\n  const body = await req.json();\n  return new Response(streamAI(body.prompt, "${mB}"));\n}\n\`\`\`\n\n**Key Difference:** Model B emphasizes edge cold-start latency reduction and lightweight payload transfer.`
          : undefined,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        metrics: {
          latencyA: "180ms",
          tokensA: 265,
          latencyB: mB ? "215ms" : undefined,
          tokensB: mB ? 290 : undefined,
        },
      };

      setSessions((prev) =>
        prev.map((s) =>
          s.id === activeSessionId
            ? { ...s, messages: [...updatedMessages, assistantMsg] }
            : s
        )
      );
      setIsGenerating(false);
    }, 1000);
  };

  const handleSelectPrompt = (prompt: string, model: string) => {
    handleSendMessage(prompt, model, isCompareMode ? modelB : undefined);
  };

  const emptyCards = [
    {
      icon: Code,
      title: "Debug & Optimize Async Functions",
      desc: "Paste code to run latency & race condition benchmarks across models",
      prompt: "Refactor this TypeScript async loop to run with parallel concurrency limiting.",
    },
    {
      icon: FileText,
      title: "Synthesize Multi-Page Reports",
      desc: "Compare how different frontier LLMs summarize dense technical research",
      prompt: "Synthesize the trade-offs between dense LLMs and Mixture-of-Experts (MoE).",
    },
    {
      icon: BrainCircuit,
      title: "Mathematical Proof & Logic",
      desc: "Pit DeepSeek R1 against GPT-4o on complex discrete mathematics",
      prompt: "Prove that any connected graph with n vertices and n-1 edges is a tree.",
    },
    {
      icon: Sparkles,
      title: "High-Converting Launch Copy",
      desc: "Draft persuasive product announcements with tailored brand tone",
      prompt: "Write a high-converting hook for an AI productivity browser extension.",
    },
  ];

  return (
    <div className="flex-1 flex h-[calc(100vh-4rem)] overflow-hidden bg-slate-50 dark:bg-[#09090d]">
      {/* Collapsible Left Rail */}
      <Sidebar
        isOpen={isSidebarOpen}
        onToggle={() => setIsSidebarOpen(!isSidebarOpen)}
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={(id) => setActiveSessionId(id)}
        onNewChat={handleNewChat}
        onOpenPromptStudio={() => setShowPromptLibrary(true)}
        onOpenSettings={() => setShowSettings(true)}
      />

      {/* Main Chat Workspace */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        {/* Top Chat Bar */}
        <div className="px-6 py-3 border-b border-zinc-200 dark:border-zinc-800/80 bg-white/70 dark:bg-[#0c0c12]/70 backdrop-blur-md flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-bold text-zinc-900 dark:text-white truncate max-w-xs sm:max-w-md">
              {activeSession.title}
            </h2>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              {activeSession.messages.length} messages
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsCompareMode(!isCompareMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                isCompareMode
                  ? "bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 border border-violet-300 dark:border-violet-700/60"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900"
              }`}
            >
              <SplitSquareVertical className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Compare Mode</span>
            </button>
          </div>
        </div>

        {/* Message Feed / Empty State */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6">
          {activeSession.messages.length === 0 ? (
            <div className="max-w-3xl mx-auto h-full flex flex-col justify-center items-center text-center py-10">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-violet-500/25 mb-6">
                <Sparkles className="w-7 h-7" />
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mb-2">
                What would you like to solve today?
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md mb-8">
                Your prompt will be processed synchronously by {modelA}{" "}
                {isCompareMode ? `and ${modelB}` : ""}.
              </p>

              {/* Starter Quick Action Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full text-left">
                {emptyCards.map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(card.prompt, modelA, isCompareMode ? modelB : undefined)}
                      className="p-4 rounded-2xl bg-white dark:bg-[#121218] border border-zinc-200 dark:border-zinc-800 hover:border-violet-500/60 dark:hover:border-violet-500/50 shadow-sm hover:shadow-md transition-all group cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-2 mb-1.5">
                        <Icon className="w-4 h-4 text-violet-500" />
                        <h4 className="text-xs sm:text-sm font-bold text-zinc-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                          {card.title}
                        </h4>
                      </div>
                      <p className="text-[11px] sm:text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2">
                        {card.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {activeSession.messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isCompareMode={activeSession.mode === "compare"}
                />
              ))}

              {isGenerating && (
                <div className="flex items-center justify-center gap-2 py-4 text-xs font-mono text-violet-600 dark:text-violet-400">
                  <span className="w-2 h-2 rounded-full bg-violet-500 animate-ping" />
                  <span>Streaming synchronous tokens from frontier cluster...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Floating Input Dock */}
        <InputDock
          onSendMessage={handleSendMessage}
          isGenerating={isGenerating}
          onStop={() => setIsGenerating(false)}
          isCompareMode={isCompareMode}
          onToggleCompareMode={() => setIsCompareMode(!isCompareMode)}
          modelA={modelA}
          setModelA={setModelA}
          modelB={modelB}
          setModelB={setModelB}
        />
      </div>

      {/* Modals */}
      <PromptLibraryModal
        isOpen={showPromptLibrary}
        onClose={() => setShowPromptLibrary(false)}
        onSelectPrompt={handleSelectPrompt}
      />

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </div>
  );
}
