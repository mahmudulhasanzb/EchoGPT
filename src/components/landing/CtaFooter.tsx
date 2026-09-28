"use client";

import React from "react";
import { Sparkles, ArrowRight, Heart } from "lucide-react";
import { ActiveView } from "../ViewSwitcher";

interface CtaFooterProps {
  onNavigate: (view: ActiveView) => void;
}

export function CtaFooter({ onNavigate }: CtaFooterProps) {
  return (
    <>
      {/* High-impact Call-to-Action banner */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-b from-transparent to-violet-950/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl p-8 sm:p-14 bg-gradient-to-r from-violet-600 via-indigo-600 to-purple-600 text-white shadow-2xl relative overflow-hidden text-center flex flex-col items-center">
            {/* Background elements */}
            <div className="absolute -right-20 -top-20 w-80 h-80 bg-white/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -left-20 -bottom-20 w-80 h-80 bg-black/20 rounded-full blur-2xl pointer-events-none" />

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 text-white text-xs font-mono font-medium mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get Started in Under 30 Seconds</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight max-w-2xl mb-6">
              Supercharge Your Workflow With Multi-AI Today
            </h2>

            <p className="text-violet-100 text-base sm:text-lg max-w-xl mb-8">
              Join thousands of engineers, marketers, and researchers who never settle for a single AI opinion.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button
                onClick={() => onNavigate("webapp")}
                className="px-8 py-4 rounded-xl bg-white text-violet-700 hover:bg-violet-50 font-bold text-sm shadow-xl transition-all hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Open EchoGPT Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate("extension")}
                className="px-8 py-4 rounded-xl bg-violet-900/50 hover:bg-violet-900/70 border border-white/20 text-white font-bold text-sm shadow-sm transition-all hover:scale-105 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Add to Chrome</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Structured Footer */}
      <footer className="border-t border-zinc-200 dark:border-zinc-800/80 bg-white dark:bg-[#08080c] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
            {/* Brand Column */}
            <div className="col-span-2">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-indigo-600 flex items-center justify-center text-white">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-white">
                  EchoGPT
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 max-w-sm mb-4 leading-relaxed">
                The next-generation unified multi-AI workspace and browser sidebar. Chat, compare, write, and summarize anywhere on the web.
              </p>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>All AI Model Providers Operational</span>
              </div>
            </div>

            {/* Product Column */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-900 dark:text-white font-bold mb-4">
                Product
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                <li><button onClick={() => onNavigate("webapp")} className="hover:text-violet-500 cursor-pointer">Web Workspace</button></li>
                <li><button onClick={() => onNavigate("extension")} className="hover:text-violet-500 cursor-pointer">Chrome Extension</button></li>
                <li><span className="text-zinc-400 dark:text-zinc-600">Model Matrix</span></li>
                <li><span className="text-zinc-400 dark:text-zinc-600">Prompt Studio</span></li>
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-900 dark:text-white font-bold mb-4">
                Resources
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                <li><a href="https://echogpt.live/" target="_blank" rel="noopener noreferrer" className="hover:text-violet-500">Live Website</a></li>
                <li><a href="https://chromewebstore.google.com/detail/echogpt-multi-ai-chat-sid/negimdcamohmoheiifgecbjgjepkcfhj" target="_blank" rel="noopener noreferrer" className="hover:text-violet-500">Chrome Web Store</a></li>
                <li><a href="https://github.com/mahmudulhasanzb/EchoGPT" target="_blank" rel="noopener noreferrer" className="hover:text-violet-500">GitHub Repository</a></li>
                <li><span className="text-zinc-400 dark:text-zinc-600">API Documentation</span></li>
              </ul>
            </div>

            {/* Legal Column */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-900 dark:text-white font-bold mb-4">
                Trust & Security
              </h4>
              <ul className="space-y-2.5 text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
                <li><span className="hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer">Privacy Policy</span></li>
                <li><span className="hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer">Terms of Service</span></li>
                <li><span className="hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer">Zero-Retention Policy</span></li>
                <li><span className="hover:text-zinc-700 dark:hover:text-zinc-200 cursor-pointer">Security Whitepaper</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-zinc-200 dark:border-zinc-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
            <p>© {new Date().getFullYear()} EchoGPT Ecosystem. Reimagined & built for AppifyDevs Frontend Assignment.</p>
            <p className="flex items-center gap-1">
              Crafted with <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" /> by Mahmudul Hasan
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
