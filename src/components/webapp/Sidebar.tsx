"use client";

import React from "react";
import {
  Plus,
  MessageSquare,
  Sparkles,
  SplitSquareVertical,
  Settings,
  ChevronLeft,
  BookmarkCheck,
  X,
  Menu,
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
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onToggle}
          className="fixed inset-0 bg-black/40 z-30 md:hidden backdrop-blur-xs"
        />
      )}

      <aside
        className={`fixed md:relative top-0 bottom-0 left-0 z-40 md:z-auto flex flex-col h-full shrink-0 overflow-hidden bg-white dark:bg-[#0d0d12] border-r border-zinc-200 dark:border-zinc-800 transition-all duration-200 select-none ${
          isOpen
            ? "w-64 sm:w-72 translate-x-0"
            : "-translate-x-full md:translate-x-0 md:w-16"
        }`}
      >
        {/* Top Header */}
        <div className="p-3 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
          {isOpen ? (
            <>
              <button
                onClick={() => {
                  onNewChat();
                  if (window.innerWidth < 768) onToggle();
                }}
                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-medium text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>New Chat</span>
                <kbd className="hidden sm:inline-block ml-auto text-[10px] font-mono bg-violet-700 px-1.5 py-0.5 rounded text-violet-100">
                  ⌘N
                </kbd>
              </button>
              <button
                onClick={onToggle}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer ml-2"
                title="Close Sidebar"
              >
                <ChevronLeft className="w-4 h-4 hidden md:block" />
                <X className="w-4 h-4 md:hidden" />
              </button>
            </>
          ) : (
            <div className="w-full flex flex-col items-center gap-2">
              <button
                onClick={onToggle}
                className="w-full flex items-center justify-center p-2 rounded-lg text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                title="Expand Sidebar"
              >
                <Menu className="w-4 h-4" />
              </button>
              <button
                onClick={onNewChat}
                className="w-full flex items-center justify-center py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white shadow-xs cursor-pointer"
                title="New Chat (⌘N)"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* Navigation & Session History */}
        <div className="flex-1 overflow-y-auto px-2 py-3 space-y-4">
          {/* Quick Studio Tools */}
          <div className="space-y-1">
            <button
              onClick={onOpenPromptStudio}
              className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer ${
                !isOpen && "justify-center"
              }`}
              title="Prompt Library"
            >
              <BookmarkCheck className="w-4 h-4 text-violet-500 shrink-0" />
              {isOpen && <span>Prompt Library</span>}
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
                    <div className="px-2 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                      {cat}
                    </div>
                    {catSessions.map((session) => {
                      const isActive = session.id === activeSessionId;
                      return (
                        <button
                          key={session.id}
                          onClick={() => {
                            onSelectSession(session.id);
                            if (window.innerWidth < 768) onToggle();
                          }}
                          className={`w-full text-left px-2.5 py-2 rounded-xl text-xs font-medium transition-colors flex items-center gap-2 truncate cursor-pointer ${
                            isActive
                              ? "bg-violet-50 dark:bg-violet-950/50 text-violet-700 dark:text-violet-300 font-semibold"
                              : "text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-200"
                          }`}
                        >
                          {session.mode === "compare" ? (
                            <SplitSquareVertical className="w-3.5 h-3.5 text-violet-500 shrink-0" />
                          ) : (
                            <MessageSquare className="w-3.5 h-3.5 shrink-0 text-zinc-400" />
                          )}
                          <span className="truncate">{session.title}</span>
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer Settings */}
        <div className="p-3 pb-8 border-t border-zinc-200 dark:border-zinc-800">
          <button
            onClick={onOpenSettings}
            className={`w-full flex items-center gap-2 p-2 rounded-xl text-xs text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer ${
              !isOpen ? "justify-center" : "justify-between"
            }`}
            title="Settings"
          >
            <div className="flex items-center gap-2">
              <Settings className="w-4 h-4 text-zinc-500" />
              {isOpen && <span className="font-medium text-zinc-800 dark:text-zinc-200">Settings</span>}
            </div>
          </button>
        </div>
      </aside>
    </>
  );
}
