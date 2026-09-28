"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { ActiveView } from "../ViewSwitcher";

interface PricingSectionProps {
  onNavigate: (view: ActiveView) => void;
}

export function PricingSection({ onNavigate }: PricingSectionProps) {
  const [isYearly, setIsYearly] = useState(true);

  const tiers = [
    {
      name: "Starter",
      description: "For personal use and quick exploration.",
      price: "$0",
      period: "free forever",
      highlight: false,
      features: [
        "Access to GPT-4o Mini & Claude 3.5 Haiku",
        "Chrome Extension sidebar access",
        "Up to 30 queries daily",
        "Side-by-side comparison (5/day)",
      ],
      cta: "Get Started Free",
      action: () => onNavigate("webapp"),
    },
    {
      name: "Pro",
      description: "For professionals who need unlimited model access.",
      price: isYearly ? "$12" : "$16",
      period: "per user / month",
      highlight: true,
      features: [
        "Unrestricted access to Claude 3.5 Sonnet & GPT-4o",
        "DeepSeek R1 and Gemini 1.5 Pro models",
        "Unlimited side-by-side comparisons",
        "Full Chrome extension page reader & writer",
        "Custom API keys (BYOK) with zero markup",
        "Priority generation speed",
      ],
      cta: "Try Pro",
      action: () => onNavigate("webapp"),
    },
  ];

  return (
    <section className="py-16 bg-zinc-50/50 dark:bg-[#0c0c12] border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-zinc-900 dark:text-white mb-3">
            Simple, Transparent Pricing
          </h2>
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 mb-6">
            Get started for free or upgrade for unlimited access.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-2 p-1 rounded-xl bg-zinc-200/60 dark:bg-zinc-800/80 border border-zinc-300/60 dark:border-zinc-700/60">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-3 py-1 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                !isYearly
                  ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs font-semibold"
                  : "text-zinc-600 dark:text-zinc-400"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`px-3 py-1 rounded-lg text-xs sm:text-sm font-medium transition-colors cursor-pointer ${
                isYearly
                  ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-xs font-semibold"
                  : "text-zinc-600 dark:text-zinc-400"
              }`}
            >
              Yearly (Save 25%)
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {tiers.map((tier, idx) => (
            <div
              key={idx}
              className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all ${
                tier.highlight
                  ? "bg-white dark:bg-[#12121a] border-2 border-violet-500 shadow-md"
                  : "bg-white dark:bg-[#101016] border border-zinc-200 dark:border-zinc-800"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
                    {tier.name}
                  </h3>
                  {tier.highlight && (
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300">
                      Popular
                    </span>
                  )}
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-5">
                  {tier.description}
                </p>

                <div className="flex items-baseline gap-1.5 mb-6">
                  <span className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white">
                    {tier.price}
                  </span>
                  <span className="text-xs text-zinc-400 font-medium">
                    {tier.period}
                  </span>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-zinc-100 dark:border-zinc-800/80 mb-6">
                  {tier.features.map((feat, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                      <Check className="w-3.5 h-3.5 text-violet-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={tier.action}
                className={`w-full py-2.5 rounded-xl font-semibold text-xs sm:text-sm transition-colors cursor-pointer ${
                  tier.highlight
                    ? "bg-violet-600 hover:bg-violet-500 text-white shadow-xs"
                    : "bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-900 dark:text-white"
                }`}
              >
                {tier.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
