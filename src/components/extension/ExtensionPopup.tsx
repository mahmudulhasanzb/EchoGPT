"use client";

import React, { useState } from "react";
import { Sparkles, MessageSquare, PenTool, BookOpen, ExternalLink, Zap, ChevronRight, X } from "lucide-react";
import { AI_MODELS } from "../landing/ModelMatrix";

interface ExtensionPopupProps {
  onOpenFullSidebar: () => void;
  onClose?: () => void;
}

export function ExtensionPopup({ onOpenFullSidebar, onClose }: ExtensionPopupProps) {
  const [quickInput, setQuickInput] = useState("");
  const [selectedModel, setSelectedModel] = useState("GPT-4o Omni");

  return (
    <div className="w-80 rounded-3xl bg-white dark:bg-[#12121a] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden p-4 space-y-4 select-none">
      {/* Top Header */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-zinc-900 dark:text-white">EchoGPT Mini</h4>
            <span className="text-[10px] text-emerald-500 font-mono flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Connected
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={onOpenFullSidebar}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Expand to Full Sidebar"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Quick Launch Actions */}
      <div className="grid grid-cols-3 gap-2">
        <button
          onClick={onOpenFullSidebar}
          className="p-2.5 rounded-xl bg-violet-50 dark:bg-violet-950/40 hover:bg-violet-100 border border-violet-100 dark:border-violet-900/40 flex flex-col items-center justify-center text-center text-violet-700 dark:text-violet-300 transition-all cursor-pointer"
        >
          <BookOpen className="w-4 h-4 mb-1" />
          <span className="text-[11px] font-semibold">Read Page</span>
        </button>

        <button
          onClick={onOpenFullSidebar}
          className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 border border-indigo-100 dark:border-indigo-900/40 flex flex-col items-center justify-center text-center text-indigo-700 dark:text-indigo-300 transition-all cursor-pointer"
        >
          <PenTool className="w-4 h-4 mb-1" />
          <span className="text-[11px] font-semibold">Write Draft</span>
        </button>

        <button
          onClick={onOpenFullSidebar}
          className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 hover:bg-purple-100 border border-purple-100 dark:border-purple-900/40 flex flex-col items-center justify-center text-center text-purple-700 dark:text-purple-300 transition-all cursor-pointer"
        >
          <Zap className="w-4 h-4 mb-1" />
          <span className="text-[11px] font-semibold">Translate</span>
        </button>
      </div>

      {/* Quick input prompt */}
      <div>
        <div className="relative">
          <input
            type="text"
            value={quickInput}
            onChange={(e) => setQuickInput(e.target.value)}
            placeholder="Ask quick question..."
            className="w-full pl-3 pr-8 py-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs text-zinc-900 dark:text-zinc-100 outline-none focus:border-violet-500"
          />
          <button
            onClick={onOpenFullSidebar}
            className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1 rounded-lg bg-violet-600 text-white cursor-pointer"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="pt-2 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between text-[11px] text-zinc-400">
        <span>Hotkey: <kbd className="px-1.5 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 font-mono">⌘K</kbd></span>
        <button onClick={onOpenFullSidebar} className="text-violet-600 dark:text-violet-400 font-semibold hover:underline cursor-pointer">
          Open Sidebar →
        </button>
      </div>
    </div>
  );
}
