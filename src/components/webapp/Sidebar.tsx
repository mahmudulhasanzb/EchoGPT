"use client";

import React from "react";
import {
  Plus,
  MessageSquare,
  Sparkles,
  SplitSquareVertical,
  Compass,
  Settings,
  Layers,
  ChevronLeft,
  ChevronRight,
  Trash2,
  BookmarkCheck,
  Zap,
} from "lucide-react";
import { ChatSession } from "./mockData";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  sessions: ChatSession[];
  activeSessionId: string;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
  onOpenPromptStudio: () => void;
  onOpenSettings: () => void;
}

export function Sidebar({
  isOpen,
  onToggle,
  sessions,
  activeSessionId,
  onSelectSession,
  onNewChat,
  onOpenPromptStudio,
  onOpenSettings,
}: SidebarProps) {
  const categories = ["Today", "Yesterday", "Previous"] as const;

  return (
    <aside
      className={`relative flex flex-col h-full bg-white dark:bg-[#0d0d12] border-r border-zinc-200 dark:border-zinc-800/80 transition-all duration-300 z-30 select-none ${
        isOpen ? "w-64 sm:w-72" : "w-16"
      }`}
    >
      {/* Top Header */}
      <div className="p-3.5 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800/80">
        {isOpen ? (
          <button
            onClick={onNewChat}
            className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs sm:text-sm shadow-md shadow-violet-600/20 transition-all cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Chat</span>
            <kbd className="hidden sm:inline-block ml-auto text-[10px] font-mono bg-violet-700/60 px-1.5 py-0.5 rounded text-violet-200">
              ⌘N
            </kbd>
          </button>
        ) : (
          <button
            onClick={onNewChat}
            className="w-full flex items-center justify-center py-2.5 rounded-xl bg-violet-600 hover:bg-violet-500 text-white shadow-md cursor-pointer"
            title="New Chat (⌘N)"
          >
            <Plus className="w-4 h-4" />
          </button>
        )}

        <button
          onClick={onToggle}
          className={`p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer ${
            isOpen ? "ml-2" : "hidden"
          }`}
          title={isOpen ? "Collapse Sidebar" : "Expand Sidebar"}
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
      </div>

      {/* Navigation & Session History */}
      <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
        {/* Quick Studio Tools */}
        <div className="space-y-1">
          {isOpen && (
            <span className="px-2 text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
              Workspaces & Tools
            </span>
          )}
          <button
            onClick={onOpenPromptStudio}
            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer ${
              !isOpen && "justify-center"
            }`}
            title="Prompt Studio"
          >
            <BookmarkCheck className="w-4 h-4 text-violet-500 shrink-0" />
            {isOpen && <span>Prompt Studio</span>}
          </button>

          <button
            onClick={onOpenSettings}
            className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800/60 transition-colors cursor-pointer ${
              !isOpen && "justify-center"
            }`}
            title="Model Connectors (BYOK)"
          >
            <Layers className="w-4 h-4 text-indigo-500 shrink-0" />
            {isOpen && <span>Model Connectors</span>}
          </button>
        </div>

        {/* Sessions list grouped */}
        {isOpen && (
          <div className="pt-2 space-y-4">
            {categories.map((cat) => {
              const catSessions = sessions.filter((s) => s.category === cat);
              if (catSessions.length === 0) return null;

              return (
                <div key={cat} className="space-y-1">
                  <div className="px-2 text-[10px] font-mono uppercase tracking-wider text-zinc-400 font-semibold">
                    {cat}
                  </div>
                  {catSessions.map((session) => {
                    const isActive = session.id === activeSessionId;
                    return (
                      <button
                        key={session.id}
                        onClick={() => onSelectSession(session.id)}
                        className={`w-full text-left px-2.5 py-2 rounded-xl text-xs font-medium transition-all flex items-center justify-between group cursor-pointer ${
                          isActive
                            ? "bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 font-semibold"
                            : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100/70 dark:hover:bg-zinc-800/40 hover:text-zinc-900 dark:hover:text-zinc-200"
                        }`}
                      >
                        <div className="flex items-center gap-2 truncate">
                          {session.mode === "compare" ? (
                            <SplitSquareVertical className="w-3.5 h-3.5 text-violet-500 shrink-0" />
                          ) : (
                            <MessageSquare className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                          )}
                          <span className="truncate">{session.title}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Footer telemetry & settings */}
      <div className="p-3 border-t border-zinc-200 dark:border-zinc-800/80 bg-zinc-50/60 dark:bg-[#09090d]">
        {isOpen ? (
          <div className="space-y-2">
            <div className="p-2.5 rounded-xl bg-white dark:bg-zinc-900/80 border border-zinc-200 dark:border-zinc-800 shadow-sm">
              <div className="flex items-center justify-between text-[11px] font-medium text-zinc-600 dark:text-zinc-300 mb-1">
                <span className="flex items-center gap-1 font-semibold">
                  <Zap className="w-3 h-3 text-amber-500" />
                  <span>Pro Plan Active</span>
                </span>
                <span className="font-mono text-zinc-400">8.4k/50k</span>
              </div>
              <div className="w-full bg-zinc-100 dark:bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-violet-500 to-indigo-500 h-full w-[28%] rounded-full" />
              </div>
            </div>

            <button
              onClick={onOpenSettings}
              className="w-full flex items-center justify-between p-2 rounded-xl text-xs text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-violet-600 text-white text-[10px] font-bold flex items-center justify-center">
                  MH
                </div>
                <span className="font-medium text-zinc-800 dark:text-zinc-200">Mahmudul H.</span>
              </div>
              <Settings className="w-4 h-4 text-zinc-400" />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenSettings}
            className="w-full flex items-center justify-center p-2 rounded-xl text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors cursor-pointer"
            title="Settings & Connectors"
          >
            <Settings className="w-4 h-4" />
          </button>
        )}
      </div>
    </aside>
  );
}
