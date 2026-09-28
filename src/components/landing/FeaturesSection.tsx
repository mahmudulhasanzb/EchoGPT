"use client";

import React from "react";
import { SplitSquareVertical, Globe, Key, Shield, BookmarkCheck, Zap } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      icon: SplitSquareVertical,
      title: "Side-by-Side Comparison",
      description:
        "Submit a prompt and watch two models stream responses simultaneously so you can compare and pick the best answer.",
    },
    {
      icon: Globe,
      title: "Browser Extension",
      description:
        "Access EchoGPT on any webpage with a convenient sidebar to summarize articles, draft replies, or translate text.",
    },
    {
      icon: Zap,
      title: "Fast Model Switching",
      description:
        "Seamlessly switch between GPT-4o, Claude 3.5 Sonnet, Gemini 1.5 Pro, and DeepSeek R1 without changing tools.",
    },
    {
      icon: BookmarkCheck,
      title: "Prompt Templates",
      description:
        "Save and reuse effective prompts for coding, content writing, analysis, and daily productivity tasks.",
    },
    {
      icon: Key,
      title: "Custom API Keys",
      description:
        "Optionally use your own OpenAI or Anthropic API keys directly with client-side storage for complete control.",
    },
    {
      icon: Shield,
      title: "Private & Secure",
      description:
        "Your prompts and conversation history remain stored in your local browser and are never shared or resold.",
    },
  ];

  return (
    <section className="py-16 bg-zinc-50/50 dark:bg-[#0c0c12]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-3">
            Everything You Need in One Place
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            A unified suite built for developers, writers, and researchers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, i) => {
            const Icon = feat.icon;
            return (
              <div
                key={i}
                className="p-6 rounded-2xl bg-white dark:bg-[#111116] border border-zinc-200 dark:border-zinc-800 transition-all hover:border-violet-500/40"
              >
                <div className="w-10 h-10 rounded-xl bg-violet-50 dark:bg-violet-950/60 border border-violet-100 dark:border-violet-900/40 flex items-center justify-center text-violet-600 dark:text-violet-400 mb-4">
                  <Icon className="w-5 h-5" />
                </div>

                <h3 className="text-base font-semibold text-zinc-900 dark:text-white mb-2">
                  {feat.title}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
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
