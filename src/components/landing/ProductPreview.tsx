"use client";

import React, { useState } from "react";
import { Copy, Check } from "lucide-react";

export function ProductPreview() {
  const [selectedPrompt, setSelectedPrompt] = useState<string>("code");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const prompts = [
    {
      id: "code",
      label: "Code Refactoring",
      prompt: "Refactor this TypeScript async function with retry logic.",
      responseLeft: {
        model: "Claude 3.5 Sonnet",
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
        output: `export async function withBackoff<T>(
  operation: () => Promise<T>,
  maxAttempts: number = 3,
  baseDelay: number = 1000
): Promise<T> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await operation();
    } catch (err) {
      if (attempt === maxAttempts) throw err;
      await new Promise(res => setTimeout(res, baseDelay * 2 ** attempt));
    }
  }
  throw new Error("Operation failed");
}`,
      },
    },
    {
      id: "copy",
      label: "Writing Draft",
      prompt: "Draft a clear intro for an AI browser extension announcement.",
      responseLeft: {
        model: "Claude 3.5 Sonnet",
        output: `Introducing EchoGPT: One sidebar for Claude, ChatGPT, and Gemini. 

No more switching tabs or copying text back and forth. Compare answers side-by-side, summarize pages instantly, and write emails with full context.`,
      },
      responseRight: {
        model: "GPT-4o",
        output: `Say hello to EchoGPT — your all-in-one AI browser copilot.

Bring the power of leading AI models straight to your browser tabs. Summarize articles, compare answers in real-time, and get things done faster.`,
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
    <section className="py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-3">
            Compare Models Side-by-Side
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400">
            Send one prompt and see how different models answer at the same time.
          </p>
        </div>

        {/* Prompt Selector */}
        <div className="flex items-center justify-center gap-2 mb-6">
          {prompts.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPrompt(p.id)}
              className={`px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                selectedPrompt === p.id
                  ? "bg-violet-600 text-white shadow-xs font-semibold"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100"
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Preview Container */}
        <div className="max-w-4xl mx-auto rounded-2xl bg-white dark:bg-[#101016] border border-zinc-200 dark:border-zinc-800 shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-4 py-3 bg-zinc-50 dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-400 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 inline-block" />
              <span className="ml-2 font-mono text-[11px] hidden sm:inline text-zinc-400">
                Prompt: &ldquo;{current.prompt}&rdquo;
              </span>
            </div>
            <span className="text-[11px] font-medium text-violet-600 dark:text-violet-400">
              Side-by-Side View
            </span>
          </div>

          {/* Split Output */}
          <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-zinc-200 dark:divide-zinc-800">
            {/* Left */}
            <div className="p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-white">
                    {current.responseLeft.model}
                  </span>
                  <button
                    onClick={() => handleCopy(current.responseLeft.output, 1)}
                    className="p-1 rounded text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                    title="Copy"
                  >
                    {copiedIndex === 1 ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/80 text-zinc-800 dark:text-zinc-200 font-mono text-xs whitespace-pre-wrap leading-relaxed border border-zinc-200 dark:border-zinc-800 overflow-x-auto">
                  {current.responseLeft.output}
                </pre>
              </div>
            </div>

            {/* Right */}
            <div className="p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-white">
                    {current.responseRight.model}
                  </span>
                  <button
                    onClick={() => handleCopy(current.responseRight.output, 2)}
                    className="p-1 rounded text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors cursor-pointer"
                    title="Copy"
                  >
                    {copiedIndex === 2 ? (
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
                <pre className="p-3.5 rounded-xl bg-zinc-50 dark:bg-zinc-900/80 text-zinc-800 dark:text-zinc-200 font-mono text-xs whitespace-pre-wrap leading-relaxed border border-zinc-200 dark:border-zinc-800 overflow-x-auto">
                  {current.responseRight.output}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
