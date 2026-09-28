"use client";

import React from "react";
import { ArrowRight, Sparkles, CheckCircle2, Zap, Shield, Laptop } from "lucide-react";
import { ActiveView } from "../ViewSwitcher";

interface HeroSectionProps {
  onNavigate: (view: ActiveView) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-16 md:pt-20 md:pb-24">
      {/* Background soft glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-violet-600/10 dark:bg-violet-600/15 blur-[100px] pointer-events-none -z-10 rounded-full" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center">
        {/* Subtle Pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 dark:bg-violet-950/60 border border-violet-200 dark:border-violet-900/60 text-violet-700 dark:text-violet-300 text-xs font-medium mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Unified Multi-Model AI Interface</span>
        </div>

        {/* Responsive Headline */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-[1.2] mb-6 max-w-4xl">
          Supercharge your workflow with{" "}
          <span className="bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 dark:from-violet-400 dark:via-purple-300 dark:to-indigo-300 bg-clip-text text-transparent">
            EchoGPT
          </span>
        </h1>

        {/* Clear Subtitle */}
        <p className="max-w-2xl text-base sm:text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
          Switch seamlessly between leading AI models, compare responses side-by-side, and get instant assistance across any webpage with our Chrome extension.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto mb-12">
          <button
            onClick={() => onNavigate("webapp")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm shadow-md shadow-violet-600/20 transition-all hover:scale-[1.02] cursor-pointer"
          >
            <span>Open Web App</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate("extension")}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-900 dark:hover:bg-zinc-800 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 font-semibold text-sm transition-all cursor-pointer"
          >
            <Laptop className="w-4 h-4 text-violet-500" />
            <span>Chrome Extension</span>
          </button>
        </div>

        {/* Highlights Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-zinc-200 dark:border-zinc-800/80 w-full max-w-3xl text-left text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-violet-500 shrink-0" />
            <span>Multi-Model Chat</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Side-by-Side Compare</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Private & Secure</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-purple-500 shrink-0" />
            <span>Browser Sidebar</span>
          </div>
        </div>
      </div>
    </section>
  );
}
