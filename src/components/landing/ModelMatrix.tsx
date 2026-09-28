"use client";

import React, { useState } from "react";
import { Cpu, Zap } from "lucide-react";

interface ModelInfo {
  id: string;
  name: string;
  provider: string;
  badge: string;
  contextWindow: string;
  speed: string;
  bestFor: string;
  description: string;
}

export const AI_MODELS: ModelInfo[] = [
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    badge: "Multimodal",
    contextWindow: "128k Tokens",
    speed: "Fast (120 t/s)",
    bestFor: "General intelligence, creative writing, and conversational speed",
    description: "OpenAI's flagship model designed for fast reasoning, multimodal input, and conversational accuracy.",
  },
  {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    badge: "Coding Leader",
    contextWindow: "200k Tokens",
    speed: "Fast (95 t/s)",
    bestFor: "Software engineering, detailed code refactoring, and logical analysis",
    description: "Anthropic's premier model widely recognized for code generation and nuanced written explanations.",
  },
  {
    id: "gemini-1-5-pro",
    name: "Gemini 1.5 Pro",
    provider: "Google",
    badge: "Long Context",
    contextWindow: "2M Tokens",
    speed: "Fast (85 t/s)",
    bestFor: "Analyzing large documents, full codebases, and long PDFs",
    description: "Google's breakthrough long-context model capable of processing massive documents in a single prompt.",
  },
  {
    id: "deepseek-r1",
    name: "DeepSeek R1",
    provider: "DeepSeek",
    badge: "Reasoning",
    contextWindow: "64k Tokens",
    speed: "High (75 t/s)",
    bestFor: "Complex mathematics, algorithmic problems, and structured logic",
    description: "Open-weight reasoning model specialized in stepwise deductive logic and math problem solving.",
  },
  {
    id: "llama-3-3",
    name: "Llama 3.3 70B",
    provider: "Meta",
    badge: "Open Source",
    contextWindow: "128k Tokens",
    speed: "Ultra-Fast (140 t/s)",
    bestFor: "Fast text summarization, everyday Q&A, and lightweight workflows",
    description: "Meta's highly capable open-source foundation model optimized for low-latency generation.",
  },
];

export function ModelMatrix() {
  const [selectedId, setSelectedId] = useState<string>("claude-3-5-sonnet");
  const activeModel = AI_MODELS.find((m) => m.id === selectedId) || AI_MODELS[0];

  return (
    <section className="py-16 bg-zinc-50/50 dark:bg-[#0c0c12] border-y border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-3">
            Choose the Best Model for the Job
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Switch between frontier models anytime, or compare them side-by-side.
          </p>
        </div>

        {/* Model Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {AI_MODELS.map((model) => {
            const isSelected = selectedId === model.id;
            return (
              <button
                key={model.id}
                onClick={() => setSelectedId(model.id)}
                className={`px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors border cursor-pointer ${
                  isSelected
                    ? "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border-violet-500 shadow-xs font-semibold"
                    : "bg-white/60 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-800"
                }`}
              >
                <span>{model.name}</span>
                <span className="text-[11px] text-zinc-400 dark:text-zinc-500 ml-1.5 hidden sm:inline">
                  {model.provider}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active Model Card */}
        <div className="max-w-3xl mx-auto rounded-2xl p-6 bg-white dark:bg-[#111116] border border-zinc-200 dark:border-zinc-800 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-100 dark:border-zinc-800/80">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white">
                  {activeModel.name}
                </h3>
                <span className="text-[11px] font-medium px-2 py-0.5 rounded-full bg-violet-50 dark:bg-violet-950 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
                  {activeModel.badge}
                </span>
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Provided by {activeModel.provider}
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium text-zinc-500 dark:text-zinc-400">
              <div>
                <span className="block text-[10px] text-zinc-400 uppercase">Context</span>
                <span className="text-sm font-bold text-violet-600 dark:text-violet-400">
                  {activeModel.contextWindow}
                </span>
              </div>
              <div className="h-6 w-px bg-zinc-200 dark:bg-zinc-800" />
              <div>
                <span className="block text-[10px] text-zinc-400 uppercase">Speed</span>
                <span className="text-sm font-bold text-zinc-900 dark:text-white">
                  {activeModel.speed}
                </span>
              </div>
            </div>
          </div>

          <p className="py-4 text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
            {activeModel.description}
          </p>

          <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80 text-xs">
            <span className="text-zinc-400 font-medium">Recommended for: </span>
            <span className="text-zinc-700 dark:text-zinc-300 font-medium">
              {activeModel.bestFor}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
