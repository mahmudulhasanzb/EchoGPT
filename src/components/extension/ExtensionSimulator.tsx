"use client";

import React, { useState, useEffect } from "react";
import { SimulatedWebPage } from "./SimulatedWebPage";
import { ExtensionSidebar } from "./ExtensionSidebar";
import { ExtensionPopup } from "./ExtensionPopup";
import { Lock, RotateCw, ArrowLeft, ArrowRight, Sparkles } from "lucide-react";

export function ExtensionSimulator() {
  const [extensionMode, setExtensionMode] = useState<"sidebar" | "popup">("sidebar");
  const [isOpen, setIsOpen] = useState(true);
  const [isPinned, setIsPinned] = useState(true);

  // Shortcut Cmd+K
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
      {/* Browser Chrome Container */}
      <div className="flex-1 flex flex-col rounded-2xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-xl relative">
        {/* Browser Top Tabs & Address Bar */}
        <div className="bg-[#181822] border-b border-zinc-800 px-3 sm:px-4 py-2 flex items-center justify-between gap-3">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
            <div className="ml-2 hidden sm:flex items-center gap-1 text-zinc-500">
              <ArrowLeft className="w-3 h-3" />
              <ArrowRight className="w-3 h-3" />
              <RotateCw className="w-3 h-3" />
            </div>
          </div>

          {/* URL bar */}
          <div className="flex-1 max-w-lg mx-auto flex items-center gap-2 px-2.5 py-1 rounded-lg bg-zinc-950/80 border border-zinc-800 text-xs text-zinc-300 font-mono">
            <Lock className="w-3 h-3 text-emerald-400 shrink-0" />
            <span className="truncate">https://github.com/anthropics/quickstarts</span>
          </div>

          {/* Extension Controls */}
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center p-0.5 rounded-lg bg-zinc-800 text-xs">
              <button
                onClick={() => {
                  setExtensionMode("sidebar");
                  setIsOpen(true);
                }}
                className={`px-2 py-0.5 rounded-md font-medium cursor-pointer ${
                  extensionMode === "sidebar"
                    ? "bg-violet-600 text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Sidebar
              </button>
              <button
                onClick={() => {
                  setExtensionMode("popup");
                  setIsOpen(true);
                }}
                className={`px-2 py-0.5 rounded-md font-medium cursor-pointer ${
                  extensionMode === "popup"
                    ? "bg-violet-600 text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                Popup
              </button>
            </div>

            {/* Extension Icon Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-1.5 rounded-lg border flex items-center gap-1 cursor-pointer transition-colors ${
                isOpen
                  ? "bg-violet-600 border-violet-500 text-white"
                  : "bg-zinc-800 border-zinc-700 text-zinc-300 hover:text-white"
              }`}
              title="Toggle Extension (⌘K)"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="text-xs font-medium hidden sm:inline">EchoGPT</span>
            </button>
          </div>
        </div>

        {/* Viewport: Simulated Page + Extension */}
        <div className="flex-1 flex overflow-hidden relative">
          <SimulatedWebPage />

          {/* Sidebar Mode */}
          {extensionMode === "sidebar" && isOpen && (
            <div className="absolute inset-y-0 right-0 z-30 max-w-full">
              <ExtensionSidebar
                onClose={() => setIsOpen(false)}
                isPinned={isPinned}
                onTogglePin={() => setIsPinned(!isPinned)}
              />
            </div>
          )}

          {/* Popup Mode */}
          {extensionMode === "popup" && isOpen && (
            <div className="absolute top-2 right-3 z-40 max-w-[calc(100vw-2rem)]">
              <ExtensionPopup
                onOpenFullSidebar={() => setExtensionMode("sidebar")}
                onClose={() => setIsOpen(false)}
              />
            </div>
          )}
        </div>

        {/* Bottom Helper Bar */}
        <div className="px-3 py-1.5 bg-zinc-950 border-t border-zinc-800 flex items-center justify-between text-[11px] text-zinc-500">
          <span>Chrome Extension Interactive Simulator</span>
          <span>Press <kbd className="px-1 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono">⌘K</kbd> to toggle</span>
        </div>
      </div>
    </div>
  );
}
