"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  PenTool,
  BookOpen,
  Languages,
  Settings,
  X,
  Sparkles,
  ChevronDown,
  Send,
  Copy,
  Check,
  Pin,
  RefreshCw,
  ExternalLink,
  Sliders,
  FileText,
  CornerDownLeft,
} from "lucide-react";
import { AI_MODELS } from "../landing/ModelMatrix";

type ExtensionTab = "chat" | "write" | "read" | "translate" | "settings";

interface ExtensionSidebarProps {
  onClose?: () => void;
  isPinned: boolean;
  onTogglePin: () => void;
}

export function ExtensionSidebar({ onClose, isPinned, onTogglePin }: ExtensionSidebarProps) {
  const [activeTab, setActiveTab] = useState<ExtensionTab>("chat");
  const [selectedModel, setSelectedModel] = useState("Claude 3.5 Sonnet");
  const [showModelDropdown, setShowModelDropdown] = useState(false);

  // Chat tab state
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; text: string; model?: string }>>([
    {
      role: "assistant",
      model: "Claude 3.5 Sonnet",
      text: "👋 Hi! I am your EchoGPT browser co-pilot. I have scanned this page on 'Building Autonomous Multi-Model Routing Agents'. How can I help you?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Write tab state
  const [writeFormat, setWriteFormat] = useState("Email");
  const [writeTone, setWriteTone] = useState("Professional");
  const [writeLength, setWriteLength] = useState("Medium");
  const [writeTopic, setWriteTopic] = useState("Propose adopting EchoGPT multi-model routing for team development");
  const [generatedDraft, setGeneratedDraft] = useState("");
  const [isDrafting, setIsDrafting] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);

  // Read tab state
  const [readSummary, setReadSummary] = useState<{
    tldr: string;
    keyPoints: string[];
    actionItems: string[];
  } | null>({
    tldr: "The article details why production AI architectures must avoid vendor lock-in by multiplexing prompts across Claude 3.5 (coding), GPT-4o (multimodal), and DeepSeek R1 (reasoning).",
    keyPoints: [
      "Single-model dependencies introduce downtime risk & capability limits.",
      "Dual-stream browser execution allows instant quality comparison.",
      "Client-side routing saves 30-60% API costs by matching task to optimal model.",
    ],
    actionItems: [
      "Benchmark team codebase queries on Claude 3.5 Sonnet vs GPT-4o.",
      "Integrate client-side failover for high availability.",
    ],
  });

  // Translate tab state
  const [sourceLang, setSourceLang] = useState("Auto-Detect (English)");
  const [targetLang, setTargetLang] = useState("Spanish");
  const [translateText, setTranslateText] = useState("Building Autonomous Multi-Model Routing Agents with TypeScript");
  const [translatedResult, setTranslatedResult] = useState("Construyendo Agentes Autónomos de Enrutamiento Multi-Modelo con TypeScript");

  // Chat send handler
  const handleSendChat = () => {
    if (!chatInput.trim() || isTyping) return;
    const userText = chatInput;
    setChatMessages((prev) => [...prev, { role: "user", text: userText }]);
    setChatInput("");
    setIsTyping(true);

    setTimeout(() => {
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          model: selectedModel,
          text: `Based on the active web page:\n\nRegarding "${userText}", the author emphasizes that client-side orchestration ensures zero private token exposure while cutting latency to 240ms across ${selectedModel}.`,
        },
      ]);
      setIsTyping(false);
    }, 800);
  };

  // Generate draft in Write tab
  const handleGenerateDraft = () => {
    setIsDrafting(true);
    setTimeout(() => {
      setGeneratedDraft(
        `Subject: Proposal: Elevating Team Productivity with EchoGPT Multi-AI Integration\n\nHi Team,\n\nI recently analyzed our engineering workflow and noticed we frequently switch between multiple standalone AI tools. \n\nBy unifying under EchoGPT's multi-model architecture, we can:\n1. Run side-by-side code reviews using Claude 3.5 and GPT-4o.\n2. Leverage 2M context windows for full repo analysis.\n3. Cut duplicate subscription costs by 40%.\n\nLet's schedule 10 minutes this Thursday to walk through the browser extension demo.\n\nBest regards,\nMahmudul`
      );
      setIsDrafting(false);
    }, 600);
  };

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(generatedDraft);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  const tabs = [
    { id: "chat" as ExtensionTab, label: "Chat", icon: MessageSquare },
    { id: "write" as ExtensionTab, label: "Write", icon: PenTool },
    { id: "read" as ExtensionTab, label: "Read", icon: BookOpen },
    { id: "translate" as ExtensionTab, label: "Translate", icon: Languages },
    { id: "settings" as ExtensionTab, label: "Settings", icon: Settings },
  ];

  return (
    <div className="w-80 sm:w-96 h-full flex flex-col bg-white dark:bg-[#111118] border-l border-zinc-200 dark:border-zinc-800 shadow-2xl relative select-none">
      {/* Top Extension Header */}
      <div className="p-3.5 border-b border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/70 dark:bg-zinc-900/60 flex items-center justify-between">
        {/* Model dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowModelDropdown(!showModelDropdown)}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 text-xs font-semibold text-zinc-900 dark:text-zinc-100 shadow-sm hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-violet-500" />
            <span className="truncate max-w-[120px]">{selectedModel}</span>
            <ChevronDown className="w-3 h-3 text-zinc-400" />
          </button>

          {showModelDropdown && (
            <div className="absolute top-full left-0 mt-1.5 w-52 rounded-2xl bg-white dark:bg-[#161622] border border-zinc-200 dark:border-zinc-800 shadow-2xl p-1 z-50">
              {AI_MODELS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    setSelectedModel(m.name);
                    setShowModelDropdown(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs flex items-center justify-between cursor-pointer ${
                    selectedModel === m.name
                      ? "bg-violet-50 dark:bg-violet-950/50 text-violet-600 font-bold"
                      : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  <span>{m.name}</span>
                  <span className="text-[10px] opacity-60">{m.provider}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-1">
          <button
            onClick={onTogglePin}
            className={`p-1.5 rounded-lg text-xs transition-colors cursor-pointer ${
              isPinned
                ? "text-violet-600 dark:text-violet-400 bg-violet-100 dark:bg-violet-950"
                : "text-zinc-400 hover:text-zinc-600 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            }`}
            title={isPinned ? "Unpin Sidebar" : "Pin Sidebar"}
          >
            <Pin className="w-3.5 h-3.5" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Tabs Navigation Rail */}
      <div className="grid grid-cols-5 p-1 bg-zinc-100/80 dark:bg-zinc-900/80 border-b border-zinc-200 dark:border-zinc-800/80 text-[11px] font-medium">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1.5 rounded-xl transition-all cursor-pointer ${
                isActive
                  ? "bg-white dark:bg-zinc-800 text-violet-600 dark:text-violet-400 font-bold shadow-xs"
                  : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300"
              }`}
            >
              <Icon className="w-3.5 h-3.5 mb-0.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className="flex-1 overflow-y-auto p-4 flex flex-col justify-between">
        {/* CHAT TAB */}
        {activeTab === "chat" && (
          <div className="flex-1 flex flex-col justify-between h-full">
            <div>
              {/* Page context chip */}
              <div className="p-2 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-900/40 flex items-center justify-between text-[11px] text-violet-700 dark:text-violet-300 mb-3">
                <span className="truncate">📄 Context: Building Autonomous Multi-Model...</span>
                <span className="font-mono text-[9px] uppercase px-1.5 py-0.5 rounded bg-violet-200 dark:bg-violet-900 font-bold">
                  Synced
                </span>
              </div>

              {/* Chat history */}
              <div className="space-y-3">
                {chatMessages.map((m, idx) => (
                  <div
                    key={idx}
                    className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
                  >
                    <div
                      className={`max-w-[85%] p-3 rounded-2xl text-xs leading-relaxed ${
                        m.role === "user"
                          ? "bg-violet-600 text-white"
                          : "bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800"
                      }`}
                    >
                      {m.role === "assistant" && (
                        <div className="text-[10px] font-mono text-violet-600 dark:text-violet-400 font-bold mb-1">
                          {m.model || selectedModel}
                        </div>
                      )}
                      <p className="whitespace-pre-wrap">{m.text}</p>
                    </div>
                  </div>
                ))}

                {isTyping && (
                  <div className="flex items-center gap-1.5 text-xs text-violet-600 dark:text-violet-400 py-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-ping" />
                    <span className="text-[11px]">EchoGPT is analyzing...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Quick chips & Input */}
            <div className="pt-4">
              <div className="flex gap-1.5 overflow-x-auto pb-2 no-scrollbar">
                {["Summarize page", "Explain code snippet", "Compare trade-offs"].map((chip, i) => (
                  <button
                    key={i}
                    onClick={() => setChatInput(chip)}
                    className="shrink-0 text-[10px] px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 cursor-pointer"
                  >
                    {chip}
                  </button>
                ))}
              </div>

              <div className="relative mt-1">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                  placeholder="Ask about this page or prompt AI..."
                  className="w-full pl-3 pr-10 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 outline-none focus:border-violet-500"
                />
                <button
                  onClick={handleSendChat}
                  disabled={!chatInput.trim()}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-violet-600 text-white hover:bg-violet-500 transition-colors disabled:opacity-40 cursor-pointer"
                >
                  <Send className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* WRITE TAB */}
        {activeTab === "write" && (
          <div className="space-y-3.5">
            <div>
              <label className="text-[11px] font-mono uppercase text-zinc-400 block mb-1">
                Topic / Outline
              </label>
              <textarea
                value={writeTopic}
                onChange={(e) => setWriteTopic(e.target.value)}
                rows={2}
                className="w-full p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 outline-none focus:border-violet-500 resize-none"
              />
            </div>

            {/* Format Pills */}
            <div>
              <label className="text-[11px] font-mono uppercase text-zinc-400 block mb-1">
                Format
              </label>
              <div className="flex flex-wrap gap-1.5">
                {["Email", "Message", "Outline", "Tweet", "Article"].map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setWriteFormat(fmt)}
                    className={`px-2.5 py-1 rounded-lg text-xs cursor-pointer ${
                      writeFormat === fmt
                        ? "bg-violet-600 text-white font-semibold"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            {/* Tone Pills */}
            <div>
              <label className="text-[11px] font-mono uppercase text-zinc-400 block mb-1">
                Tone
              </label>
              <div className="flex flex-wrap gap-1.5">
                {["Professional", "Casual", "Friendly", "Direct", "Enthusiastic"].map((tone) => (
                  <button
                    key={tone}
                    onClick={() => setWriteTone(tone)}
                    className={`px-2.5 py-1 rounded-lg text-xs cursor-pointer ${
                      writeTone === tone
                        ? "bg-violet-600 text-white font-semibold"
                        : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                    }`}
                  >
                    {tone}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleGenerateDraft}
              disabled={isDrafting}
              className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {isDrafting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <PenTool className="w-3.5 h-3.5" />}
              <span>Generate {writeFormat} Draft</span>
            </button>

            {/* Result preview */}
            {generatedDraft && (
              <div className="mt-3 p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold">
                    Generated Output
                  </span>
                  <button
                    onClick={handleCopyDraft}
                    className="flex items-center gap-1 text-[11px] text-violet-600 dark:text-violet-400 font-semibold cursor-pointer"
                  >
                    {copiedDraft ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedDraft ? "Copied" : "Copy Draft"}</span>
                  </button>
                </div>
                <p className="text-xs text-zinc-800 dark:text-zinc-200 whitespace-pre-wrap leading-relaxed font-sans max-h-48 overflow-y-auto">
                  {generatedDraft}
                </p>
              </div>
            )}
          </div>
        )}

        {/* READ TAB */}
        {activeTab === "read" && (
          <div className="space-y-4">
            <div className="p-3 rounded-2xl bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-900/40">
              <span className="text-[10px] font-mono uppercase text-violet-600 dark:text-violet-400 font-bold block mb-1">
                Executive TL;DR
              </span>
              <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed">
                {readSummary?.tldr}
              </p>
            </div>

            <div>
              <span className="text-xs font-bold text-zinc-900 dark:text-white block mb-2">
                Key Insights
              </span>
              <ul className="space-y-1.5">
                {readSummary?.keyPoints.map((pt, i) => (
                  <li key={i} className="text-xs text-zinc-600 dark:text-zinc-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0 mt-1.5" />
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <span className="text-xs font-bold text-zinc-900 dark:text-white block mb-2">
                Recommended Action Items
              </span>
              <ul className="space-y-1.5">
                {readSummary?.actionItems.map((ai, i) => (
                  <li key={i} className="text-xs text-zinc-600 dark:text-zinc-300 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                    <span>{ai}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* TRANSLATE TAB */}
        {activeTab === "translate" && (
          <div className="space-y-3.5">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <label className="text-[10px] font-mono text-zinc-400 block mb-1">From</label>
                <select
                  value={sourceLang}
                  onChange={(e) => setSourceLang(e.target.value)}
                  className="w-full p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-800 dark:text-zinc-200"
                >
                  <option>Auto-Detect (English)</option>
                  <option>Spanish</option>
                  <option>French</option>
                  <option>German</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="text-[10px] font-mono text-zinc-400 block mb-1">To</label>
                <select
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  className="w-full p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-medium text-zinc-800 dark:text-zinc-200"
                >
                  <option>Spanish</option>
                  <option>German</option>
                  <option>Japanese</option>
                  <option>French</option>
                  <option>Chinese</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-mono text-zinc-400 block mb-1">Source Text</label>
              <textarea
                value={translateText}
                onChange={(e) => setTranslateText(e.target.value)}
                rows={3}
                className="w-full p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 outline-none focus:border-violet-500 resize-none"
              />
            </div>

            <button
              onClick={() => {
                setTranslatedResult(
                  targetLang === "German"
                    ? "Erstellung autonomer Multi-Modell-Routing-Agenten mit TypeScript"
                    : "Construyendo Agentes Autónomos de Enrutamiento Multi-Modelo con TypeScript"
                );
              }}
              className="w-full py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
            >
              Translate Text
            </button>

            {translatedResult && (
              <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                <span className="text-[10px] font-mono text-zinc-400 uppercase font-bold block mb-1">
                  {targetLang} Translation
                </span>
                <p className="text-xs text-zinc-800 dark:text-zinc-200 leading-relaxed font-medium">
                  {translatedResult}
                </p>
              </div>
            )}
          </div>
        )}

        {/* SETTINGS TAB */}
        {activeTab === "settings" && (
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-zinc-900 dark:text-white">
              Chrome Extension Preferences
            </h4>

            <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-700 dark:text-zinc-300 font-medium">Global Hotkey</span>
                <kbd className="px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 font-mono text-[10px] font-bold">
                  ⌘K / Alt+S
                </kbd>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-700 dark:text-zinc-300 font-medium">Auto-read Page</span>
                <input type="checkbox" defaultChecked className="accent-violet-600 cursor-pointer" />
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-700 dark:text-zinc-300 font-medium">Selection Popup</span>
                <input type="checkbox" defaultChecked className="accent-violet-600 cursor-pointer" />
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2">
              <span className="text-xs font-bold text-zinc-900 dark:text-white block">
                Active Provider Route
              </span>
              <p className="text-[11px] text-zinc-500">
                EchoGPT Enterprise Router • 99.98% uptime SLA
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
