"use client";

import React from "react";
import { Star } from "lucide-react";

export function TestimonialsSection() {
  const reviews = [
    {
      name: "Alex Rivera",
      role: "Software Engineer",
      quote:
        "The side-by-side comparison between Claude 3.5 Sonnet and GPT-4o has cut my debugging and refactoring time dramatically.",
    },
    {
      name: "Sophia Chen",
      role: "Product Researcher",
      quote:
        "Having Gemini's long context and DeepSeek's logic inside one clean sidebar extension makes reading technical papers effortless.",
    },
  ];

  return (
    <section className="py-16 bg-zinc-50/50 dark:bg-[#0c0c12]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-2">
            User Feedback
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            What builders and researchers say about EchoGPT.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reviews.map((r, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white dark:bg-[#111116] border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between"
            >
              <div className="flex items-center gap-1 text-amber-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed mb-4">
                &ldquo;{r.quote}&rdquo;
              </p>
              <div className="pt-3 border-t border-zinc-100 dark:border-zinc-800/80">
                <span className="font-semibold text-xs text-zinc-900 dark:text-white block">
                  {r.name}
                </span>
                <span className="text-[11px] text-zinc-400">{r.role}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
