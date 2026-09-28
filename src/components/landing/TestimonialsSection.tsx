"use client";

import React from "react";
import { Star, Quote } from "lucide-react";

export function TestimonialsSection() {
  const testimonials = [
    {
      name: "Alex Rivera",
      role: "Staff Software Engineer",
      avatar: "AR",
      quote:
        "The side-by-side comparison between Claude 3.5 Sonnet and GPT-4o has cut my code refactoring reviews in half. I will never go back to single-chat tabs.",
      rating: 5,
    },
    {
      name: "Sophia Chen",
      role: "AI Product Researcher",
      avatar: "SC",
      quote:
        "Having Gemini 1.5 Pro's 2M context and DeepSeek's math reasoning inside the exact same Chrome sidebar is pure magic while reading arXiv papers.",
      rating: 5,
    },
    {
      name: "Marcus Vance",
      role: "Content Director",
      avatar: "MV",
      quote:
        "The Write tab in the extension generates drafts with tailored tone and format in seconds. It has replaced our entire grammar & copy stack.",
      rating: 5,
    },
  ];

  return (
    <section className="py-24 bg-zinc-50 dark:bg-[#0c0c12]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
            Loved By Developers & Creators
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base">
            See how professionals are speeding up their workflow with EchoGPT.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="p-7 rounded-3xl bg-white dark:bg-[#111118] border border-zinc-200 dark:border-zinc-800 shadow-md flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-1 text-amber-400 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-zinc-700 dark:text-zinc-300 italic mb-6 leading-relaxed">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
                <div className="w-9 h-9 rounded-full bg-violet-600 text-white font-bold text-xs flex items-center justify-center">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
                    {t.name}
                  </h4>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
