"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does EchoGPT connect to multiple AI models?",
      a: "EchoGPT uses unified API router technology. When you submit a prompt, it securely communicates with official enterprise endpoints for OpenAI, Anthropic, Google Gemini, and DeepSeek with sub-second orchestration and real-time streaming.",
    },
    {
      q: "Can I bring my own API keys (BYOK)?",
      a: "Yes! Pro users can supply personal OpenAI, Anthropic, or OpenRouter API keys. Your keys remain stored locally in your browser storage and are never uploaded to any remote analytics database.",
    },
    {
      q: "How does the Chrome Extension interact with my open tabs?",
      a: "The EchoGPT Chrome Extension runs as an overlay sidebar (triggered by Cmd+K or clicking the extension icon). When you click 'Read Page' or 'Summarize', it reads the text in the active tab locally and feeds it into the conversation without exposing passwords or sensitive fields.",
    },
    {
      q: "Is my code and conversation data used to train AI models?",
      a: "Never. We use enterprise zero-data-retention endpoints from our model providers. Your queries, codebases, and generated outputs are strictly private.",
    },
    {
      q: "Can I run side-by-side comparison on the Chrome extension?",
      a: "Yes! You can toggle between Single-Chat mode and Dual-Compare mode directly inside the extension popup or docked sidebar.",
    },
  ];

  return (
    <section className="py-24 bg-white dark:bg-[#09090e] border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 text-xs font-semibold mb-3">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Got Questions?</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base">
            Everything you need to know about the EchoGPT platform and browser copilot.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-[#111118] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-semibold text-zinc-900 dark:text-zinc-100 text-base">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-zinc-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-violet-500" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-200/50 dark:border-zinc-800/50 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
