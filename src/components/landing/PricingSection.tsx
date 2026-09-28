"use client";

import React, { useState } from "react";
import { Check, Sparkles, Zap, Shield } from "lucide-react";
import { ActiveView } from "../ViewSwitcher";

interface PricingSectionProps {
  onNavigate: (view: ActiveView) => void;
}

export function PricingSection({ onNavigate }: PricingSectionProps) {
  const [isYearly, setIsYearly] = useState(true);

  const tiers = [
    {
      name: "Starter",
      description: "Ideal for casual browsing and basic multi-model experimentation.",
      price: "$0",
      period: "forever free",
      badge: "Get Started",
      highlight: false,
      features: [
        "Access to GPT-4o Mini & Claude 3.5 Haiku",
        "Chrome Extension Sidebar (basic)",
        "Up to 30 queries per day",
        "Dual-model compare (5 per day)",
        "Community Discord support",
      ],
      cta: "Start Free",
      action: () => onNavigate("webapp"),
    },
    {
      name: "Pro Creator",
      description: "For engineers, researchers, and creators wanting unrestricted access.",
      price: isYearly ? "$14" : "$19",
      period: "per user / month",
      badge: "Most Popular",
      highlight: true,
      features: [
        "Unrestricted access to Claude 3.5 Sonnet & GPT-4o",
        "DeepSeek R1 reasoning + Gemini 1.5 Pro (2M context)",
        "Unlimited real-time split-screen compare",
        "Chrome Extension full-page reader & inline writer",
        "Custom BYOK (Bring Your Own Key) zero markup",
        "Priority latency & zero rate limiting",
      ],
      cta: "Upgrade to Pro",
      action: () => onNavigate("webapp"),
    },
    {
      name: "Team & Studio",
      description: "Collaborative multi-AI workspace for engineering & content teams.",
      price: isYearly ? "$34" : "$42",
      period: "per user / month",
      badge: "Team Tier",
      highlight: false,
      features: [
        "All Pro Creator features included",
        "Shared team prompt libraries & history",
        "Centralized API usage analytics & audit logs",
        "Custom workspace branding & domain",
        "Dedicated account manager & SLA guarantee",
      ],
      cta: "Contact Sales",
      action: () => onNavigate("webapp"),
    },
  ];

  return (
    <section className="py-24 bg-zinc-100/60 dark:bg-[#0c0c12] border-t border-zinc-200/80 dark:border-zinc-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-100 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 text-xs font-semibold mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Transparent Pricing</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-900 dark:text-white mb-4">
            One Simple Plan. Infinite Intelligence.
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 text-base mb-8">
            Replace 3 separate $20/month AI subscriptions with one cohesive workspace.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center gap-3 p-1.5 rounded-2xl bg-zinc-200/70 dark:bg-zinc-800/80 border border-zinc-300/80 dark:border-zinc-700/80">
            <button
              onClick={() => setIsYearly(false)}
              className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                !isYearly
                  ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isYearly
                  ? "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm"
                  : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              }`}
            >
              <span>Annual Billing</span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-bold uppercase">
                Save 25%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 ${
                tier.highlight
                  ? "bg-white dark:bg-[#12121a] border-2 border-violet-500 shadow-2xl shadow-violet-500/15 scale-105 z-10"
                  : "bg-white dark:bg-[#101016] border border-zinc-200 dark:border-zinc-800 shadow-lg"
              }`}
            >
              {tier.highlight && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white text-xs font-bold uppercase tracking-wider shadow-md">
                  {tier.badge}
                </div>
              )}

              <div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2">
                  {tier.name}
                </h3>
                <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mb-6">
                  {tier.description}
                </p>

                <div className="flex items-baseline gap-2 mb-6">
                  <span className="text-4xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white">
                    {tier.price}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    {tier.period}
                  </span>
                </div>

                <div className="space-y-3 pt-6 border-t border-zinc-100 dark:border-zinc-800/80 mb-8">
                  {tier.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-700 dark:text-zinc-300">
                      <Check className="w-4 h-4 text-violet-500 shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={tier.action}
                className={`w-full py-3.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                  tier.highlight
                    ? "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-600/30 hover:scale-[1.02]"
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
