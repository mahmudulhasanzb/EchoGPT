"use client";

import React from "react";
import { Sparkles, ArrowRight, Zap, CheckCircle2, ShieldCheck, Cpu } from "lucide-react";
import { ActiveView } from "../ViewSwitcher";

interface HeroSectionProps {
  onNavigate: (view: ActiveView) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-violet-600/15 via-purple-600/10 to-indigo-600/15 blur-[120px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Top telemetry badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-600 dark:text-violet-400 text-xs font-mono uppercase tracking-wider mb-8 hover:bg-violet-500/15 transition-colors cursor-pointer">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500"></span>
          </span>
          <span>EchoGPT 2.0 • Multi-AI Unified Engine</span>
        </div>

        {/* Hero Headline */}
        <h1 className="max-w-4xl text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-white leading-[1.15] mb-6">
          One Workspace.{" "}
          <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-indigo-500 dark:from-violet-400 dark:via-purple-300 dark:to-indigo-300 bg-clip-text text-transparent">
            Every Frontier AI Model
          </span>{" "}
          at Your Fingertips.
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-lg sm:text-xl text-zinc-600 dark:text-zinc-300 mb-10 leading-relaxed font-normal">
          Stop juggling tabs between ChatGPT, Claude, Gemini, and DeepSeek. Chat, compare responses side-by-side, and summon full-page assistance anywhere in Chrome.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-14">
          <button
            onClick={() => onNavigate("webapp")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold text-sm shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-violet-200" />
            <span>Launch Web Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate("extension")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-white dark:bg-zinc-900/90 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 font-semibold text-sm shadow-sm transition-all hover:scale-[1.02] cursor-pointer"
          >
            <Cpu className="w-4 h-4 text-violet-500" />
            <span>Test Chrome Extension</span>
          </button>
        </div>

        {/* Trust Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-zinc-200/80 dark:border-zinc-800/80 max-w-4xl w-full text-left">
          <div className="flex items-center gap-2.5 text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm">
            <CheckCircle2 className="w-4 h-4 text-violet-500 shrink-0" />
            <span>Zero Subscription Lock-in</span>
          </div>
          <div className="flex items-center gap-2.5 text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm">
            <Zap className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Dual-Stream Comparison</span>
          </div>
          <div className="flex items-center gap-2.5 text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Direct Client Privacy</span>
          </div>
          <div className="flex items-center gap-2.5 text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm">
            <Sparkles className="w-4 h-4 text-purple-500 shrink-0" />
            <span>Browser-Wide Hotkey (Cmd+K)</span>
          </div>
        </div>
      </div>
    </section>
  );
}
