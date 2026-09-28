"use client";

import React, { useState, useEffect } from "react";
import { SimulatedWebPage } from "./SimulatedWebPage";
import { ExtensionSidebar } from "./ExtensionSidebar";
import { ExtensionPopup } from "./ExtensionPopup";
import {
  Lock,
  RotateCw,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  Puzzle,
  Menu,
} from "lucide-react";

export function ExtensionSimulator() {
  const [extensionMode, setExtensionMode] = useState<"sidebar" | "popup">("sidebar");
  const [isOpen, setIsOpen] = useState(true);
  const [isPinned, setIsPinned] = useState(true);

  // Keyboard shortcut Cmd+K or Alt+S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] overflow-hidden bg-zinc-950 p-2 sm:p-4">
      {/* Outer Browser Chrome Shell */}
      <div className="flex-1 flex flex-col rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl relative">
        {/* Browser Top Tabs & URL Bar */}
        <div className="bg-[#181822] border-b border-zinc-800 px-4 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
            <div className="ml-4 flex items-center gap-1.5 text-zinc-500">
              <ArrowLeft className="w-3.5 h-3.5" />
              <ArrowRight className="w-3.5 h-3.5" />
              <RotateCw className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Browser Address Bar */}
          <div className="flex-1 max-w-xl mx-auto flex items-center gap-2 px-3 py-1.5 rounded-xl bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-300 font-mono">
            <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate">https://github.com/anthropics/anthropic-quickstarts/routing-agent</span>
          </div>

          {/* Extension Toolbar Controls */}
          <div className="flex items-center gap-2">
            {/* Simulator Mode Switcher */}
            <div className="hidden sm:flex items-center p-0.5 rounded-xl bg-zinc-800/80 border border-zinc-700/60 text-xs">
              <button
                onClick={() => {
                  setExtensionMode("sidebar");
                  setIsOpen(true);
                }}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  extensionMode === "sidebar"
                    ? "bg-violet-600 text-white font-semibold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Sidebar View
              </button>
              <button
                onClick={() => {
                  setExtensionMode("popup");
                  setIsOpen(true);
                }}
                className={`px-2.5 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  extensionMode === "popup"
                    ? "bg-violet-600 text-white font-semibold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Popup View
              </button>
            </div>

            {/* EchoGPT Extension Icon in Browser Toolbar */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-1.5 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer ${
                isOpen
                  ? "bg-violet-600 border-violet-500 text-white shadow-md shadow-violet-600/30"
                  : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-white"
              }`}
              title="Click to toggle EchoGPT Extension (Cmd+K)"
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-[11px] font-bold font-mono pr-1">EchoGPT</span>
            </button>
          </div>
        </div>

        {/* Viewport: Simulated Page + Extension Mount */}
        <div className="flex-1 flex overflow-hidden relative">
          <SimulatedWebPage />

          {/* Sidebar Mode Mounted */}
          {extensionMode === "sidebar" && isOpen && (
            <ExtensionSidebar
              onClose={() => setIsOpen(false)}
              isPinned={isPinned}
              onTogglePin={() => setIsPinned(!isPinned)}
            />
          )}

          {/* Popup Mode Mounted Floating */}
          {extensionMode === "popup" && isOpen && (
            <div className="absolute top-3 right-4 z-50">
              <ExtensionPopup
                onOpenFullSidebar={() => setExtensionMode("sidebar")}
                onClose={() => setIsOpen(false)}
              />
            </div>
          )}
        </div>

        {/* Simulator Bottom Helper Bar */}
        <div className="px-4 py-2 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-xs text-zinc-500 font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-500" />
            <span>EchoGPT Chrome Extension Interactive Simulator</span>
          </div>
          <div>
            <span>Press <kbd className="px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">⌘K</kbd> to toggle</span>
          </div>
        </div>
      </div>
    </div>
  );
}
