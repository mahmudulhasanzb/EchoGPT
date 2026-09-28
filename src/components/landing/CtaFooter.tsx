"use client";

import React from "react";
import { ArrowRight, Sparkles, Heart } from "lucide-react";
import { ActiveView } from "../ViewSwitcher";

interface CtaFooterProps {
  onNavigate: (view: ActiveView) => void;
}

export function CtaFooter({ onNavigate }: CtaFooterProps) {
  return (
    <>
      {/* Call to action */}
      <section className="py-16 bg-zinc-50/50 dark:bg-[#0c0c12] border-t border-zinc-200/80 dark:border-zinc-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-xl flex flex-col items-center">
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Get Started with EchoGPT
            </h2>
            <p className="text-violet-100 text-sm sm:text-base max-w-lg mb-8">
              Experience the power of multi-model AI in your browser today.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={() => onNavigate("webapp")}
                className="px-6 py-3 rounded-xl bg-white text-violet-700 hover:bg-violet-50 font-semibold text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Launch Web App</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigate("extension")}
                className="px-6 py-3 rounded-xl bg-violet-700/60 hover:bg-violet-700/80 text-white font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Try Chrome Extension</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-[#0a0a0f] py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-violet-600 flex items-center justify-center text-white">
              <Sparkles className="w-3 h-3" />
            </div>
            <span className="font-semibold text-zinc-800 dark:text-zinc-200">EchoGPT</span>
            <span>•</span>
            <span>© {new Date().getFullYear()} EchoGPT. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-1">
            <span>Crafted by</span>
            <span className="font-medium text-zinc-800 dark:text-zinc-200">Mahmudul Hasan</span>
          </div>
        </div>
      </footer>
    </>
  );
}
