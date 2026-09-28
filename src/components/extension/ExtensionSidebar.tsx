"use client";

import React, { useState } from "react";
import {
  MessageSquare,
  PenTool,
  BookOpen,
  Languages,
  Settings,
  X,
  ChevronDown,
  Send,
  Copy,
  Check,
  Pin,
  RefreshCw,
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
      text: "How can I help you with this page?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Write tab state
  const [writeFormat, setWriteFormat] = useState("Email");
  const [writeTone, setWriteTone] = useState("Professional");
  const [writeTopic, setWriteTopic] = useState("Propose adopting multi-model AI routing for the engineering team");
  const [generatedDraft, setGeneratedDraft] = useState("");
  const [isDrafting, setIsDrafting] = useState(false);
  const [copiedDraft, setCopiedDraft] = useState(false);

  // Read tab state
  const [readSummary] = useState<{
    tldr: string;
    keyPoints: string[];
    actionItems: string[];
  }>({
    tldr: "This article explains how to build resilient AI systems by routing prompts across specialized models rather than relying on a single vendor.",
    keyPoints: [
      "Avoid single-vendor downtime and rate limits.",
      "Match tasks to model strengths (Claude for code, GPT for conversation, DeepSeek for math).",
      "Client-side routing reduces latency and protects private tokens.",
    ],
    actionItems: [
      "Benchmark codebase queries on Claude 3.5 vs GPT-4o.",
      "Implement client-side fallback handlers.",
    ],
  });

  // Translate tab state
  const [sourceLang, setSourceLang] = useState("Auto-Detect (English)");
  const [targetLang, setTargetLang] = useState("Spanish");
  const [translateText, setTranslateText] = useState("Building Autonomous Multi-Model Routing Agents with TypeScript");
  const [translatedResult, setTranslatedResult] = useState("Construyendo Agentes Autónomos de Enrutamiento Multi-Modelo con TypeScript");

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
          text: `Based on the active page: Regarding "${userText}", the author highlights that multi-model routing gives better performance while maintaining client privacy.`,
        },
      ]);
      setIsTyping(false);
    }, 600);
  };

  const handleGenerateDraft = () => {
    setIsDrafting(true);
    setTimeout(() => {
      setGeneratedDraft(
        `Subject: Proposal: Multi-Model AI Integration\n\nHi Team,\n\nI wanted to share a proposal to unify our AI workflows under EchoGPT. By combining Claude 3.5 for code refactoring and GPT-4o for speed, we can streamline reviews and reduce duplicate subscriptions.\n\nLet me know if you would like to test the browser extension demo this week.\n\nBest,\nMahmudul`
      );
      setIsDrafting(false);
    }, 500);
  };

  const handleCopyDraft = () => {
    navigator.clipboard.writeText(generatedDraft);
    setCopiedDraft(true);
    setTimeout(() => setCopiedDraft(false), 2000);
  };

  const quickActions = [
    { label: "Write", desc: "Draft an email or post", action: () => setActiveTab("write") },
    { label: "Translate", desc: "Convert languages", action: () => setActiveTab("translate") },
    { label: "Read page", desc: "Summarize this tab", action: () => setActiveTab("read") },
    { label: "Compare", desc: "Compare two models", action: () => setActiveTab("chat") },
  ];

  const rightRailTabs = [
    { id: "chat" as ExtensionTab, label: "Chat", icon: MessageSquare },
    { id: "write" as ExtensionTab, label: "Write", icon: PenTool },
    { id: "read" as ExtensionTab, label: "Read", icon: BookOpen },
    { id: "translate" as ExtensionTab, label: "Translate", icon: Languages },
    { id: "settings" as ExtensionTab, label: "Settings", icon: Settings },
  ];

  return (
    <div className="w-full sm:w-80 md:w-88 h-full flex flex-row bg-white dark:bg-[#111116] border-l border-zinc-200 dark:border-zinc-800 shadow-xl overflow-hidden">
      {/* Main Extension Body */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="p-3 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 flex items-center justify-between">
          <div className="relative">
            <button
              onClick={() => setShowModelDropdown(!showModelDropdown)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-xs font-semibold text-zinc-900 dark:text-zinc-100 cursor-pointer"
            >
              <span className="truncate max-w-[110px]">{selectedModel}</span>
              <ChevronDown className="w-3 h-3 text-zinc-400" />
            </button>

            {showModelDropdown && (
              <div className="absolute top-full left-0 mt-1 w-48 rounded-xl bg-white dark:bg-[#161622] border border-zinc-200 dark:border-zinc-800 shadow-xl p-1 z-50">
                {AI_MODELS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => {
                      setSelectedModel(m.name);
                      setShowModelDropdown(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs cursor-pointer ${
                      selectedModel === m.name
                        ? "bg-violet-50 dark:bg-violet-950/50 text-violet-600 font-bold"
                        : "text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
                    }`}
                  >
                    {m.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onTogglePin}
              className={`p-1 rounded-md text-xs cursor-pointer ${
                isPinned
                  ? "text-violet-600 bg-violet-50 dark:bg-violet-950"
                  : "text-zinc-400 hover:text-zinc-600"
              }`}
              title={isPinned ? "Unpin" : "Pin"}
            >
              <Pin className="w-3.5 h-3.5" />
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="p-1 rounded-md text-zinc-400 hover:text-zinc-600 cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-3 flex flex-col justify-between">
          {/* CHAT */}
          {activeTab === "chat" && (
            <div className="flex-1 flex flex-col justify-between h-full">
              <div>
                {/* Clean Actions Grid (shown when few messages) */}
                {chatMessages.length <= 1 && (
                  <div className="mb-4">
                    <p className="text-xs text-zinc-400 mb-2 font-medium">Quick Actions</p>
                    <div className="grid grid-cols-2 gap-2">
                      {quickActions.map((qa, i) => (
                        <button
                          key={i}
                          onClick={qa.action}
                          className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-violet-500/50 text-left transition-colors cursor-pointer"
                        >
                          <div className="font-semibold text-xs text-zinc-900 dark:text-white">
                            {qa.label}
                          </div>
                          <div className="text-[10px] text-zinc-400 truncate">
                            {qa.desc}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Messages */}
                <div className="space-y-2.5">
                  {chatMessages.map((m, idx) => (
                    <div
                      key={idx}
                      className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
                    >
                      <div
                        className={`max-w-[90%] p-2.5 rounded-xl text-xs leading-relaxed ${
                          m.role === "user"
                            ? "bg-violet-600 text-white"
                            : "bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-200 border border-zinc-200 dark:border-zinc-800"
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{m.text}</p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex items-center gap-1.5 text-xs text-violet-500 py-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-500 animate-ping" />
                      <span className="text-[11px]">Thinking...</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Chat Input */}
              <div className="pt-3">
                <div className="relative">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendChat()}
                    placeholder="Ask about this page..."
                    className="w-full pl-3 pr-8 py-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 outline-none focus:border-violet-500"
                  />
                  <button
                    onClick={handleSendChat}
                    disabled={!chatInput.trim()}
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 rounded-lg bg-violet-600 text-white disabled:opacity-40 cursor-pointer"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* WRITE */}
          {activeTab === "write" && (
            <div className="space-y-3">
              <div>
                <label className="text-[10px] font-semibold text-zinc-400 block mb-1">
                  Topic / Request
                </label>
                <textarea
                  value={writeTopic}
                  onChange={(e) => setWriteTopic(e.target.value)}
                  rows={2}
                  className="w-full p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 outline-none resize-none"
                />
              </div>

              <div>
                <label className="text-[10px] font-semibold text-zinc-400 block mb-1">
                  Format
                </label>
                <div className="flex flex-wrap gap-1">
                  {["Email", "Message", "Outline", "Post"].map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setWriteFormat(fmt)}
                      className={`px-2 py-1 rounded-md text-xs cursor-pointer ${
                        writeFormat === fmt
                          ? "bg-violet-600 text-white font-medium"
                          : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400"
                      }`}
                    >
                      {fmt}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-semibold text-zinc-400 block mb-1">
                  Tone
                </label>
                <div className="flex flex-wrap gap-1">
                  {["Professional", "Casual", "Friendly", "Direct"].map((tone) => (
                    <button
                      key={tone}
                      onClick={() => setWriteTone(tone)}
                      className={`px-2 py-1 rounded-md text-xs cursor-pointer ${
                        writeTone === tone
                          ? "bg-violet-600 text-white font-medium"
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
                className="w-full py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                {isDrafting ? <RefreshCw className="w-3 h-3 animate-spin" /> : <PenTool className="w-3 h-3" />}
                <span>Generate Draft</span>
              </button>

              {generatedDraft && (
                <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] text-zinc-400 font-semibold uppercase">Output</span>
                    <button
                      onClick={handleCopyDraft}
                      className="text-xs text-violet-600 dark:text-violet-400 font-medium flex items-center gap-1 cursor-pointer"
                    >
                      {copiedDraft ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedDraft ? "Copied" : "Copy"}</span>
                    </button>
                  </div>
                  <p className="text-xs text-zinc-700 dark:text-zinc-300 whitespace-pre-wrap leading-relaxed max-h-40 overflow-y-auto">
                    {generatedDraft}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* READ */}
          {activeTab === "read" && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-100 dark:border-violet-900/40">
                <span className="text-[10px] font-semibold text-violet-600 dark:text-violet-400 block mb-1">
                  Summary
                </span>
                <p className="text-xs text-zinc-700 dark:text-zinc-300 leading-relaxed">
                  {readSummary.tldr}
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold text-zinc-900 dark:text-white block mb-1.5">
                  Key Points
                </span>
                <ul className="space-y-1">
                  {readSummary.keyPoints.map((pt, i) => (
                    <li key={i} className="text-xs text-zinc-600 dark:text-zinc-400 flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-violet-500 shrink-0 mt-1" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <span className="text-xs font-semibold text-zinc-900 dark:text-white block mb-1.5">
                  Action Items
                </span>
                <ul className="space-y-1">
                  {readSummary.actionItems.map((ai, i) => (
                    <li key={i} className="text-xs text-zinc-600 dark:text-zinc-400 flex items-start gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1" />
                      <span>{ai}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* TRANSLATE */}
          {activeTab === "translate" && (
            <div className="space-y-3">
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-[10px] text-zinc-400 block mb-1">From</label>
                  <select
                    value={sourceLang}
                    onChange={(e) => setSourceLang(e.target.value)}
                    className="w-full p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs"
                  >
                    <option>Auto-Detect (English)</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="text-[10px] text-zinc-400 block mb-1">To</label>
                  <select
                    value={targetLang}
                    onChange={(e) => setTargetLang(e.target.value)}
                    className="w-full p-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs"
                  >
                    <option>Spanish</option>
                    <option>German</option>
                    <option>French</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-[10px] text-zinc-400 block mb-1">Text</label>
                <textarea
                  value={translateText}
                  onChange={(e) => setTranslateText(e.target.value)}
                  rows={2}
                  className="w-full p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 outline-none resize-none"
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
                className="w-full py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold cursor-pointer"
              >
                Translate
              </button>

              {translatedResult && (
                <div className="p-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
                  <span className="text-[10px] text-zinc-400 font-semibold block mb-1">
                    {targetLang} Output
                  </span>
                  <p className="text-xs text-zinc-800 dark:text-zinc-200">
                    {translatedResult}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* SETTINGS */}
          {activeTab === "settings" && (
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-zinc-900 dark:text-white">Preferences</h4>

              <div className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 space-y-2.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-600 dark:text-zinc-400">Shortcut</span>
                  <kbd className="px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 font-mono text-[10px]">
                    ⌘K
                  </kbd>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-zinc-600 dark:text-zinc-400">Auto-read Page</span>
                  <input type="checkbox" defaultChecked className="accent-violet-600 cursor-pointer" />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Rail Navigation */}
      <div className="w-12 bg-zinc-50 dark:bg-zinc-900/80 border-l border-zinc-200 dark:border-zinc-800 flex flex-col items-center py-2.5 gap-2 select-none">
        {rightRailTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-2 rounded-xl transition-colors cursor-pointer flex flex-col items-center ${
                isActive
                  ? "bg-violet-600 text-white shadow-xs"
                  : "text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200"
              }`}
              title={tab.label}
            >
              <Icon className="w-4 h-4" />
            </button>
          );
        })}
      </div>
    </div>
  );
}
