"use client";

import React, { useState } from "react";
import { Cpu, Zap, Shield, Sparkles, Check, ArrowUpRight } from "lucide-react";

interface ModelInfo {
  id: string;
  name: string;
  provider: string;
  badge: string;
  contextWindow: string;
  speed: string;
  bestFor: string;
  benchmarkScore: string;
  description: string;
  color: string;
  accentBg: string;
}

export const AI_MODELS: ModelInfo[] = [
  {
    id: "gpt-4o",
    name: "GPT-4o Omni",
    provider: "OpenAI",
    badge: "Multimodal Leader",
    contextWindow: "128k Tokens",
    speed: "Instant (120 t/s)",
    bestFor: "Real-time reasoning, vision tasks & conversational fluidity",
    benchmarkScore: "92.4% MMLU",
    description: "Flagship intelligence integrating audio, vision, and ultra-low latency response times.",
    color: "text-emerald-500 dark:text-emerald-400",
    accentBg: "from-emerald-500/10 to-teal-500/10 border-emerald-500/30",
  },
  {
    id: "claude-3-5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    badge: "Coding Benchmark Champ",
    contextWindow: "200k Tokens",
    speed: "High Speed (95 t/s)",
    bestFor: "Complex software engineering, nuanced writing & deep logic",
    benchmarkScore: "93.7% HumanEval",
    description: "The gold standard for code architecture, refactoring, and natural human-like prose.",
    color: "text-amber-500 dark:text-amber-400",
    accentBg: "from-amber-500/10 to-orange-500/10 border-amber-500/30",
  },
  {
    id: "gemini-1-5-pro",
    name: "Gemini 1.5 Pro",
    provider: "Google DeepMind",
    badge: "2M Context Giant",
    contextWindow: "2,000k Tokens",
    speed: "Fast (85 t/s)",
    bestFor: "Book-length document analysis, video ingestion & large repos",
    benchmarkScore: "90.8% Needle-in-Haystack",
    description: "Breakthrough ultra-long context window allowing entire codebases or 500-page PDFs in single prompt.",
    color: "text-blue-500 dark:text-blue-400",
    accentBg: "from-blue-500/10 to-indigo-500/10 border-blue-500/30",
  },
  {
    id: "deepseek-r1",
    name: "DeepSeek R1",
    provider: "DeepSeek AI",
    badge: "Open Reasoning",
    contextWindow: "64k Tokens",
    speed: "High (75 t/s)",
    bestFor: "Formal mathematics, competitive algorithmic puzzles & raw logic",
    benchmarkScore: "97.3% MATH-500",
    description: "Reinforcement learning driven reasoning model offering chain-of-thought introspection at fraction of cost.",
    color: "text-violet-500 dark:text-violet-400",
    accentBg: "from-violet-500/10 to-purple-500/10 border-violet-500/30",
  },
  {
    id: "llama-3-3",
    name: "Llama 3.3 70B",
    provider: "Meta AI",
    badge: "Open Source Power",
    contextWindow: "128k Tokens",
    speed: "Ultra-Fast (140 t/s)",
    bestFor: "Cost-effective summarization, privacy-first offline workflows",
    benchmarkScore: "88.6% MMLU",
    description: "State-of-the-art open weights model rivaling commercial proprietary giants.",
    color: "text-rose-500 dark:text-rose-400",
    accentBg: "from-rose-500/10 to-pink-500/10 border-rose-500/30",
  },
];

export function ModelMatrix() {
  const [selectedId, setSelectedId] = useState<string>("claude-3-5-sonnet");
  const activeModel = AI_MODELS.find((m) => m.id === selectedId) || AI_MODELS[0];

  return (
    <section className="py-20 bg-zinc-100/50 dark:bg-[#0c0c12] border-y border-zinc-200/80 dark:border-zinc-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 text-xs font-semibold mb-3">
            <Cpu className="w-3.5 h-3.5" />
            <span>Unified Model Hub</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
            Select, Switch & Compare Any Leading AI Model
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base">
            No need to maintain 5 different accounts. EchoGPT pipes every top model into one consistent interface.
          </p>
        </div>

        {/* Model Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {AI_MODELS.map((model) => {
            const isSelected = selectedId === model.id;
            return (
              <button
                key={model.id}
                onClick={() => setSelectedId(model.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all duration-200 border cursor-pointer ${
                  isSelected
                    ? "bg-white dark:bg-zinc-800 text-zinc-950 dark:text-white border-violet-500 shadow-md shadow-violet-500/10"
                    : "bg-white/60 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:bg-white dark:hover:bg-zinc-800"
                }`}
              >
                <span className={`w-2 h-2 rounded-full ${isSelected ? "bg-violet-500 animate-pulse" : "bg-zinc-400"}`} />
                <span className="font-semibold">{model.name}</span>
                <span className="text-[10px] opacity-70">({model.provider})</span>
              </button>
            );
          })}
        </div>

        {/* Active Model Spotlight Card */}
        <div className="max-w-4xl mx-auto rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#111118] border border-zinc-200 dark:border-zinc-800 shadow-xl relative overflow-hidden transition-all">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-zinc-200 dark:border-zinc-800">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold text-zinc-900 dark:text-white">
                  {activeModel.name}
                </h3>
                <span className="text-xs font-mono font-semibold px-2.5 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800">
                  {activeModel.badge}
                </span>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Provided by {activeModel.provider} • Verified in EchoGPT Multi-Router
              </p>
            </div>

            <div className="flex items-center gap-4 text-right">
              <div>
                <span className="text-xs uppercase font-mono text-zinc-400 block">Benchmark</span>
                <span className="text-xl font-bold text-zinc-900 dark:text-white">
                  {activeModel.benchmarkScore}
                </span>
              </div>
              <div className="h-8 w-px bg-zinc-200 dark:bg-zinc-800" />
              <div>
                <span className="text-xs uppercase font-mono text-zinc-400 block">Context</span>
                <span className="text-xl font-bold text-violet-600 dark:text-violet-400">
                  {activeModel.contextWindow}
                </span>
              </div>
            </div>
          </div>

          <p className="py-6 text-zinc-700 dark:text-zinc-300 text-base leading-relaxed">
            {activeModel.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800/80">
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/60">
              <span className="text-xs font-mono text-zinc-500 uppercase block mb-1">
                Optimized For
              </span>
              <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {activeModel.bestFor}
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/60">
              <span className="text-xs font-mono text-zinc-500 uppercase block mb-1">
                Generation Velocity
              </span>
              <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                {activeModel.speed}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
