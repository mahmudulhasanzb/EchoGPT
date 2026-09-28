"use client";

import React from "react";
import { SplitSquareVertical, Globe, Key, ShieldCheck, BookmarkCheck, Zap } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: SplitSquareVertical,
      title: "Real-time Split-Screen Compare",
      description:
        "Send one prompt and watch two models stream side-by-side. Choose the best response, merge both, or regenerate with single click.",
      tag: "Signature Feature",
    },
    {
      icon: Globe,
      title: "Chrome Extension Co-Pilot",
      description:
        "Summon EchoGPT across any web page with Cmd+K. Summarize articles, draft Gmail replies, or translate text with full page awareness.",
      tag: "Extension",
    },
    {
      icon: Zap,
      title: "Smart Model Failover",
      description:
        "If OpenAI or Anthropic suffers an outage or rate limit, EchoGPT automatically falls back to secondary frontier models with zero dropped tokens.",
      tag: "High Availability",
    },
    {
      icon: BookmarkCheck,
      title: "Prompt Studio & History",
      description:
        "Save high-performing prompts, inject dynamic placeholders, and categorize conversations by project tag or repository.",
      tag: "Productivity",
    },
    {
      icon: Key,
      title: "Bring Your Own Key (BYOK)",
      description:
        "Plug in your direct OpenAI, Anthropic, or OpenRouter API keys to pay strict raw wholesale token costs with zero markup.",
      tag: "Flexibility",
    },
    {
      icon: ShieldCheck,
      title: "Strict Zero-Training Guarantee",
      description:
        "Your code, documents, and personal queries are piped directly via secure enterprise endpoints and never used for LLM retraining.",
      tag: "Security",
    },
  ];

  return (
    <section className="py-24 bg-zinc-50 dark:bg-[#09090e]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Built For Power Users</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
            Engineered To 10x Your AI Workflow
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base">
            Everything you need to work across frontier LLMs without friction, tab bloat, or redundant subscriptions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={i}
                className="group relative p-7 rounded-2xl bg-white dark:bg-[#111118] border border-zinc-200 dark:border-zinc-800/80 hover:border-violet-500/50 dark:hover:border-violet-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/5 hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-5">
                  <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-950/60 border border-violet-100 dark:border-violet-900/40 flex items-center justify-center text-violet-600 dark:text-violet-400 group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
                    {feat.tag}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
