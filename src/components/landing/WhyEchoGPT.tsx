"use client";

import React from "react";
import { Check, X, ShieldAlert, Award } from "lucide-react";

export function WhyEchoGPT() {
  const comparison = [
    {
      feature: "Frontier AI Access",
      traditional: "Only 1 model per $20/mo subscription",
      echogpt: "All frontier models in 1 unified workspace",
    },
    {
      feature: "Real-time Model Comparison",
      traditional: "Manually open 3 browser tabs & paste prompt",
      echogpt: "Synchronous side-by-side stream with 1 click",
    },
    {
      feature: "Browser Integration",
      traditional: "Clunky copy-pasting back and forth",
      echogpt: "Full sidebar extension with page reading (Cmd+K)",
    },
    {
      feature: "Pricing Flexibility",
      traditional: "Locked into rigid $20-$200/mo tiers",
      echogpt: "Free tier + BYOK direct token billing",
    },
    {
      feature: "Model Redundancy",
      traditional: "Work halts during vendor API downtime",
      echogpt: "Automatic smart routing & instant model switch",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#0c0c12] border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 text-xs font-semibold mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Clear Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
            Why Choose EchoGPT Over Single-Vendor AI?
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base">
            No single AI model wins at everything. EchoGPT gives you the superpower to always pick the sharpest tool for the job.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800 shadow-xl bg-zinc-50 dark:bg-[#111118]">
          <div className="grid grid-cols-12 p-4 sm:p-5 bg-zinc-100/90 dark:bg-zinc-900/90 border-b border-zinc-200 dark:border-zinc-800 text-xs font-mono uppercase font-bold text-zinc-500">
            <div className="col-span-5 sm:col-span-4">Capability</div>
            <div className="col-span-3 sm:col-span-4 text-zinc-400">Single Subscriptions</div>
            <div className="col-span-4 text-violet-600 dark:text-violet-400">EchoGPT Multi-AI</div>
          </div>

          <div className="divide-y divide-zinc-200 dark:divide-zinc-800/80">
            {comparison.map((item, idx) => (
              <div
                key={idx}
                className="grid grid-cols-12 p-4 sm:p-5 items-center text-xs sm:text-sm hover:bg-zinc-100/40 dark:hover:bg-zinc-800/30 transition-colors"
              >
                <div className="col-span-5 sm:col-span-4 font-semibold text-zinc-900 dark:text-white">
                  {item.feature}
                </div>
                <div className="col-span-3 sm:col-span-4 text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5 pr-2">
                  <X className="w-4 h-4 text-rose-500 shrink-0 hidden sm:inline" />
                  <span>{item.traditional}</span>
                </div>
                <div className="col-span-4 text-violet-700 dark:text-violet-300 font-medium flex items-center gap-1.5">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 hidden sm:inline" />
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
