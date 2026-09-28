"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "How does EchoGPT work?",
      a: "EchoGPT integrates multiple frontier AI providers into one unified interface, allowing you to prompt single models or compare outputs side-by-side in real time.",
    },
    {
      q: "Can I use my own API keys?",
      a: "Yes. In the Settings tab, you can enter your own OpenAI, Anthropic, or other API keys. They are stored locally in your browser and used directly.",
    },
    {
      q: "How does the Chrome Extension work?",
      a: "The Chrome Extension provides a sidebar and popup on any webpage. You can ask questions, summarize articles, draft content, or translate text with full page awareness.",
    },
    {
      q: "Is my data private?",
      a: "Yes. Your prompts and conversations remain stored in your local browser and are not shared or used to train public models.",
    },
  ];

  return (
    <section className="py-16 bg-white dark:bg-[#0a0a0f] border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            Answers to common questions about EchoGPT and the extension.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-[#111116] overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full p-4 text-left flex items-center justify-between gap-4 cursor-pointer"
                >
                  <span className="font-medium text-zinc-900 dark:text-zinc-100 text-sm">
                    {faq.q}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform ${
                      isOpen ? "rotate-180 text-violet-500" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed border-t border-zinc-200/50 dark:border-zinc-800/50 pt-3">
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
