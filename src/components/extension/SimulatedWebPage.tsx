"use client";

import React from "react";
import { BookOpen, Star, GitFork, Eye, Clock, User, Share2 } from "lucide-react";

export function SimulatedWebPage() {
  return (
    <div className="flex-1 bg-white dark:bg-[#0d0d12] text-zinc-900 dark:text-zinc-100 overflow-y-auto p-6 sm:p-10 select-none">
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Repo / Article Header */}
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 dark:text-zinc-400">
          <span>anthropics</span>
          <span>/</span>
          <span className="font-bold text-zinc-900 dark:text-white">anthropic-quickstarts</span>
          <span className="ml-2 px-2 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[10px]">
            Public
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">
          Building Autonomous Multi-Model Routing Agents with TypeScript
        </h1>

        <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-1">
            <User className="w-3.5 h-3.5" />
            <span>Mahmudul Hasan</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>6 min read</span>
          </div>
          <div className="flex items-center gap-1 ml-auto">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
            <span>4.2k stars</span>
          </div>
        </div>

        {/* Article Body */}
        <div className="prose dark:prose-invert text-sm text-zinc-700 dark:text-zinc-300 space-y-4 leading-relaxed">
          <p>
            Modern AI workflows increasingly require orchestrating multiple frontier LLMs rather than relying on a single provider. In this deep dive, we explore how to construct a resilient, low-latency multi-model router that simultaneously balances cost, reasoning capability, and availability.
          </p>

          <h2 className="text-lg font-bold text-zinc-900 dark:text-white pt-2">
            Why Multi-Model Routing Matters
          </h2>
          <p>
            While OpenAI’s GPT-4o delivers extraordinary conversational agility and multimodal capabilities, Anthropic’s Claude 3.5 Sonnet remains the industry leader for intricate code architecture and refactoring. Simultaneously, DeepSeek R1 offers unmatched competitive math reasoning at roughly one-tenth the compute overhead.
          </p>

          <div className="p-4 rounded-xl bg-zinc-100 dark:bg-zinc-900 border-l-4 border-violet-500 text-xs text-zinc-800 dark:text-zinc-200 italic font-mono">
            &ldquo;Tying your software stack to a single model provider introduces single-point-of-failure vulnerability and limits optimal task specialization.&rdquo;
          </div>

          <h2 className="text-lg font-bold text-zinc-900 dark:text-white pt-2">
            Dynamic Latency Optimization
          </h2>
          <p>
            By implementing a dual-stream multiplexer in the browser client, frontend applications can dispatch prompts concurrently to two providers. The user can either inspect responses side-by-side or have an automated lightweight classifier select the higher-quality output.
          </p>
        </div>
      </div>
    </div>
  );
}
