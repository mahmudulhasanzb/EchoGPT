"use client";

import React from "react";
import { Check, X } from "lucide-react";

export function WhyEchoGPT() {
  const comparison = [
    {
      feature: "Access to multiple AI models",
      traditional: "Requires multiple subscriptions ($20 each)",
      echogpt: "All models accessible in one platform",
    },
    {
      feature: "Side-by-side comparison",
      traditional: "Manually copy-paste across separate tabs",
      echogpt: "Synchronous comparison with a single click",
    },
    {
      feature: "Browser integration",
      traditional: "Switching back and forth to chat tab",
      echogpt: "Sidebar extension across any webpage",
    },
    {
      feature: "Custom API Keys (BYOK)",
      traditional: "Locked to provider subscriptions",
      echogpt: "Bring your own keys with zero markup",
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-[#0a0a0f] border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-3">
            Why Choose EchoGPT?
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Compare EchoGPT with traditional single-provider setups.
          </p>
        </div>

        {/* Table */}
        <div className="rounded-2xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#111116] shadow-xs">
          <div className="grid grid-cols-12 p-3.5 sm:p-4 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 text-xs font-semibold text-zinc-500 uppercase">
            <div className="col-span-5 sm:col-span-4">Feature</div>
            <div className="col-span-3 sm:col-span-4 text-zinc-400">Single Provider</div>
            <div className="col-span-4 text-violet-600 dark:text-violet-400">EchoGPT</div>
          </div>

          <div className="divide-y divide-zinc-100 dark:divide-zinc-800/80">
            {comparison.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 p-3.5 sm:p-4 items-center text-xs sm:text-sm hover:bg-zinc-50/60 dark:hover:bg-zinc-800/20 transition-colors"
              >
                <div className="col-span-5 sm:col-span-4 font-medium text-zinc-900 dark:text-white">
                  {item.feature}
                </div>
                <div className="col-span-3 sm:col-span-4 text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 pr-2">
                  <X className="w-3.5 h-3.5 text-rose-500 shrink-0 hidden sm:inline" />
                  <span>{item.traditional}</span>
                </div>
                <div className="col-span-4 text-violet-600 dark:text-violet-400 font-medium flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 hidden sm:inline" />
                  <span>{item.echogpt}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
