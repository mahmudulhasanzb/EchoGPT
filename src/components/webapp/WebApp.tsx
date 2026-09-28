"use client";

import React, { useState, useEffect, useRef } from "react";
import { Sidebar } from "./Sidebar";
import { MessageBubble } from "./MessageBubble";
import { InputDock } from "./InputDock";
import { PromptLibraryModal } from "./PromptLibraryModal";
import { SettingsModal } from "./SettingsModal";
import { INITIAL_SESSIONS, ChatSession, ChatMessage } from "./mockData";
import { Sparkles, Menu, Code, FileText, BrainCircuit } from "lucide-react";

interface WebAppProps {
  isHeaderVisible?: boolean;
  setIsHeaderVisible?: (visible: boolean) => void;
}

export function WebApp({ isHeaderVisible, setIsHeaderVisible }: WebAppProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sessions, setSessions] = useState<ChatSession[]>(INITIAL_SESSIONS);
  const [activeSessionId, setActiveSessionId] = useState<string>("session-1");
  const [isCompareMode, setIsCompareMode] = useState<boolean>(true);
  const [modelA, setModelA] = useState<string>("Claude 3.5 Sonnet");
  const [modelB, setModelB] = useState<string>("GPT-4o");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [showPromptLibrary, setShowPromptLibrary] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const lastScrollTopRef = useRef<number>(0);

  const activeSession =
    sessions.find((s) => s.id === activeSessionId) || sessions[0];

  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth >= 768) {
      setIsSidebarOpen(true);
    }
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeSession?.messages, isGenerating]);

  // "hide on up-scroll" scroll listener
  const handleFeedScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const currentScrollTop = e.currentTarget.scrollTop;
    const delta = currentScrollTop - lastScrollTopRef.current;

    // When user scrolls up (delta < -6), hide header
    if (delta < -6 && currentScrollTop > 10) {
      setIsHeaderVisible?.(false);
    } else if (delta > 6) {
      // When scrolling down, reveal header
      setIsHeaderVisible?.(true);
    }

    // Always reveal at the very top
    if (currentScrollTop <= 5) {
      setIsHeaderVisible?.(true);
    }

    lastScrollTopRef.current = currentScrollTop;
  };

  // Global wheel listener so up-scroll hides header from anywhere in the workspace
  useEffect(() => {
    const handleGlobalWheel = (e: WheelEvent) => {
      // If cursor is near top of screen (header zone), always reveal
      if (e.clientY <= 60) {
        setIsHeaderVisible?.(true);
        return;
      }

      if (e.deltaY < -4) {
        // Wheeling UP (up-scroll) -> hide header
        setIsHeaderVisible?.(false);
      } else if (e.deltaY > 4) {
        // Wheeling DOWN -> reveal header
        setIsHeaderVisible?.(true);
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };
    const handleTouchMove = (e: TouchEvent) => {
      const currentY = e.touches[0].clientY;
      const diff = currentY - touchStartY;
      if (diff < -15) {
        // Swiping up -> hide
        setIsHeaderVisible?.(false);
      } else if (diff > 15) {
        // Swiping down -> reveal
        setIsHeaderVisible?.(true);
      }
    };

    window.addEventListener("wheel", handleGlobalWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener("wheel", handleGlobalWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [setIsHeaderVisible]);

  // Start new session
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

  // Send message
  const handleSendMessage = (text: string, mA: string, mB?: string) => {
    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updatedMessages = [...activeSession.messages, userMsg];
    const isFirstMsg = activeSession.messages.length === 0;
    const newTitle = isFirstMsg ? (text.length > 30 ? text.slice(0, 30) + "..." : text) : activeSession.title;

    setSessions((prev) =>
      prev.map((s) =>
        s.id === activeSessionId
          ? { ...s, title: newTitle, messages: updatedMessages, mode: mB ? "compare" : "single" }
          : s
      )
    );

    setIsGenerating(true);

    setTimeout(() => {
      const assistantMsg: ChatMessage = {
        id: `msg-${Date.now() + 1}`,
        role: "assistant",
        modelA: mA,
        content: `Here is the response from **${mA}**:\n\n\`\`\`typescript\n// Implementation\nexport async function handleQuery(query: string) {\n  const result = await processInput(query);\n  return { ok: true, data: result };\n}\n\`\`\`\n\nOptimized for high throughput and clean error handling.`,
        modelB: mB,
        contentB: mB
          ? `Alternative approach from **${mB}**:\n\n\`\`\`typescript\n// Alternative pattern\nexport const handleQuery = async (query: string) => {\n  return fetch("/api/process", {\n    method: "POST",\n    body: JSON.stringify({ query }),\n  });\n};\n\`\`\`\n\nDirect approach with standard fetch API.`
          : undefined,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setSessions((prev) =>
        prev.map((s) =>
          s.id === activeSessionId
            ? { ...s, messages: [...updatedMessages, assistantMsg] }
            : s
        )
      );
      setIsGenerating(false);
    }, 700);
  };

  const handleSelectPrompt = (prompt: string, model: string) => {
    handleSendMessage(prompt, model, isCompareMode ? modelB : undefined);
  };

  const emptyCards = [
    {
      icon: Code,
      title: "Code Optimization",
      desc: "Refactor async functions and improve error handling",
      prompt: "Refactor this TypeScript function to handle exponential backoff retry.",
    },
    {
      icon: FileText,
      title: "Content Drafting",
      desc: "Draft clear announcements and documentation",
      prompt: "Draft a clear intro for an AI browser extension release.",
    },
    {
      icon: BrainCircuit,
      title: "Technical Trade-offs",
      desc: "Compare architectural options and performance",
      prompt: "Synthesize the trade-offs between dense LLMs and Mixture-of-Experts (MoE).",
    },
    {
      icon: Sparkles,
      title: "Algorithm Explanation",
      desc: "Step-by-step breakdown with code examples",
      prompt: "Explain how topological sorting works with a practical dependency graph example.",
    },
  ];

  return (
    <div className="flex-1 flex h-full min-h-0 overflow-hidden bg-zinc-50 dark:bg-[#09090d]">
      {/* Sidebar (Fixed in place) */}
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
      <div className="flex-1 flex flex-col h-full min-h-0 overflow-hidden relative">
        {/* Mobile floating sidebar toggle */}
        {!isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden absolute top-3 left-3 z-20 p-2 rounded-xl bg-white/90 dark:bg-[#0c0c12]/90 border border-zinc-200 dark:border-zinc-800 shadow-md text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Open Sidebar"
          >
            <Menu className="w-4 h-4" />
          </button>
        )}

        {/* Message Feed (The ONLY scrollable container) */}
        <div
          onScroll={handleFeedScroll}
          className="flex-1 min-h-0 overflow-y-auto px-3 sm:px-6 py-4 space-y-4"
        >
          {activeSession.messages.length === 0 ? (
            <div className="max-w-2xl mx-auto h-full flex flex-col justify-center items-center text-center py-8">
              <div className="w-10 h-10 rounded-xl bg-violet-600 text-white flex items-center justify-center shadow-sm mb-4">
                <Sparkles className="w-5 h-5" />
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-white mb-2">
                How can EchoGPT help you today?
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mb-6">
                Pick a prompt below or ask your own question.
              </p>

              {/* Starter Prompt Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 w-full text-left">
                {emptyCards.map((card, idx) => {
                  const Icon = card.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSendMessage(card.prompt, modelA, isCompareMode ? modelB : undefined)}
                      className="p-3.5 rounded-xl bg-white dark:bg-[#111116] border border-zinc-200 dark:border-zinc-800 hover:border-violet-500/50 shadow-xs transition-colors cursor-pointer text-left"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Icon className="w-3.5 h-3.5 text-violet-500" />
                        <h4 className="text-xs font-semibold text-zinc-900 dark:text-white">
                          {card.title}
                        </h4>
                      </div>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 line-clamp-2">
                        {card.desc}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {activeSession.messages.map((msg) => (
                <MessageBubble
                  key={msg.id}
                  message={msg}
                  isCompareMode={activeSession.mode === "compare"}
                />
              ))}

              {isGenerating && (
                <div className="flex items-center justify-center gap-2 py-3 text-xs text-violet-600 dark:text-violet-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-ping" />
                  <span>Generating responses...</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input Dock (Fixed at bottom) */}
        <div className="shrink-0 w-full z-10">
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
