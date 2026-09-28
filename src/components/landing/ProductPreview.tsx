"use client";

import React, { useState } from "react";
import { Sparkles, Terminal, Copy, Check, Play, RefreshCw } from "lucide-react";

export function ProductPreview() {
  const [selectedPrompt, setSelectedPrompt] = useState<string>("code");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const prompts = [
    {
      id: "code",
      label: "Code Refactoring",
      prompt: "Refactor this TypeScript async function to handle exponential backoff retry.",
      responseLeft: {
        model: "Claude 3.5 Sonnet",
        badge: "Clean Architecture",
        output: `async function fetchWithRetry<T>(
  fn: () => Promise<T>,
  retries = 3,
  delayMs = 1000
): Promise<T> {
  try {
    return await fn();
  } catch (error) {
    if (retries <= 0) throw error;
    await new Promise(r => setTimeout(r, delayMs));
    return fetchWithRetry(fn, retries - 1, delayMs * 2);
  }
}`,
      },
      responseRight: {
        model: "GPT-4o",
        badge: "Edge Case Resilient",
        output: `export async function withExponentialBackoff<T>(
  operation: () => Promise<T>,
  maxAttempts: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (err) {
      if (attempt === maxAttempts) throw err;
      const jitter = Math.random() * 200;
      await new Promise(res => setTimeout(res, (baseDelay * 2 ** attempt) + jitter));
    }
  }
  throw new Error("Unreachable");
}`,
      },
    },
    {
      id: "copy",
      label: "Copywriting Pitch",
      prompt: "Write a high-converting hook for an AI productivity browser extension.",
      responseLeft: {
        model: "Claude 3.5 Sonnet",
        badge: "Compelling & Sharp",
        output: `Stop copy-pasting between 4 different AI tabs. 

EchoGPT drops Claude 3.5, GPT-4o, and DeepSeek straight into your browser sidebar with one Cmd+K hotkey. 

Compare answers side-by-side in real-time. Zero context lost.`,
      },
      responseRight: {
        model: "GPT-4o",
        badge: "Punchy & Direct",
        output: `Why pay for 4 AI subscriptions when you only need one sidebar? 

⚡ Instant page summaries
⚡ Dual-model answer comparison
⚡ One-click email drafting

Try EchoGPT free today.`,
      },
    },
    {
      id: "analysis",
      label: "Research Synthesis",
      prompt: "Synthesize the trade-offs between dense LLMs and Mixture-of-Experts (MoE).",
      responseLeft: {
        model: "Claude 3.5 Sonnet",
        badge: "In-depth Nuance",
        output: `Key architectural trade-offs:
1. Compute vs VRAM: MoE activates ~10-20% parameters per token, reducing FLOPs drastically while requiring full VRAM footprint.
2. Inference Throughput: MoE yields superior tokens/sec at batch size = 1, but routing overhead scales at massive batch concurrency.`,
      },
      responseRight: {
        model: "Gemini 1.5 Pro",
        badge: "Direct Breakdown",
        output: `MoE vs Dense Overview:
• MoE: High capacity + Fast training + Sparsely gated computation. Downside: Higher memory bandwidth demand.
• Dense: Simpler serving infra + Deterministic hardware cache utilization. Downside: Prohibitive training FLOP cost at frontier scale.`,
      },
    },
  ];

  const current = prompts.find((p) => p.id === selectedPrompt) || prompts[0];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Product Sandbox</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
            See Dual-Stream Comparison in Action
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base">
            Select a sample prompt below to observe how EchoGPT pits two frontier models against each other simultaneously.
          </p>
        </div>

        {/* Prompt Selector Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {prompts.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPrompt(p.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                selectedPrompt === p.id
                  ? "bg-violet-600 text-white shadow-md shadow-violet-600/25"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Mock Interface Shell */}
        <div className="max-w-5xl mx-auto rounded-2xl bg-white dark:bg-[#0f0f16] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden">
          {/* Top Window Bar */}
          <div className="px-4 py-3 bg-zinc-100/80 dark:bg-zinc-900/90 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-xs font-mono text-zinc-500 dark:text-zinc-400 hidden sm:inline">
                echogpt.live/workspace/compare
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300 font-semibold">
                DUAL STREAM • LATENCY: 240ms
              </span>
            </div>
          </div>

          {/* User Prompt Bar */}
          <div className="p-4 sm:p-5 bg-zinc-50/70 dark:bg-[#12121c]/70 border-b border-zinc-200 dark:border-zinc-800 flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-zinc-800 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              U
            </div>
            <div className="flex-1">
              <span className="text-xs font-mono uppercase text-zinc-400 block mb-1">
                Synchronous Input Prompt
              </span>
              <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                &ldquo;{current.prompt}&rdquo;
              </p>
            </div>
          </div>

          {/* Side by Side Split Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-800 bg-white dark:bg-[#0c0c12]">
            {/* Left Model */}
            <div className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                    <span className="font-semibold text-sm text-zinc-900 dark:text-white">
                      {current.responseLeft.model}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400">
                      {current.responseLeft.badge}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(current.responseLeft.output, 1)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    title="Copy code"
                  >
                    {copiedIndex === 1 ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <pre className="p-4 rounded-xl bg-zinc-900 text-zinc-100 font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed border border-zinc-800">
                  {current.responseLeft.output}
                </pre>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span>Tokens: 184</span>
                <span className="text-emerald-500">Speed: 96 t/s</span>
              </div>
            </div>

            {/* Right Model */}
            <div className="p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                    <span className="font-semibold text-sm text-zinc-900 dark:text-white">
                      {current.responseRight.model}
                    </span>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                      {current.responseRight.badge}
                    </span>
                  </div>
                  <button
                    onClick={() => handleCopy(current.responseRight.output, 2)}
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                    title="Copy code"
                  >
                    {copiedIndex === 2 ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>

                <pre className="p-4 rounded-xl bg-zinc-900 text-zinc-100 font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed border border-zinc-800">
                  {current.responseRight.output}
                </pre>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-200 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400 font-mono">
                <span>Tokens: 210</span>
                <span className="text-emerald-500">Speed: 118 t/s</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
