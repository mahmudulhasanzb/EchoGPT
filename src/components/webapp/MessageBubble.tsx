"use client";

import React, { useState } from "react";
import { Copy, Check, Sparkles, User, RefreshCw, ThumbsUp, ThumbsDown, Zap } from "lucide-react";
import { ChatMessage } from "./mockData";

interface MessageBubbleProps {
  message: ChatMessage;
  isCompareMode: boolean;
  onRegenerate?: () => void;
}

export function MessageBubble({ message, isCompareMode, onRegenerate }: MessageBubbleProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Render markdown-like text with code blocks cleanly
  const renderFormattedContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        const lines = part.slice(3, -3).trim().split("\n");
        const lang = lines[0].trim();
        const code = lines.slice(1).join("\n");

        return (
          <div key={index} className="my-3 rounded-xl overflow-hidden border border-zinc-800 bg-[#0d0d12]">
            <div className="px-3.5 py-2 bg-zinc-900/90 border-b border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span className="uppercase text-violet-400 font-semibold">{lang || "code"}</span>
              <button
                onClick={() => handleCopy(code, `code-${index}`)}
                className="flex items-center gap-1 hover:text-white transition-colors cursor-pointer"
              >
                {copiedKey === `code-${index}` ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3.5 text-zinc-100 font-mono text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed">
              <code>{code}</code>
            </pre>
          </div>
        );
      }

      return (
        <div key={index} className="whitespace-pre-wrap leading-relaxed text-sm">
          {part}
        </div>
      );
    });
  };

  if (message.role === "user") {
    return (
      <div className="flex items-start justify-end gap-3 max-w-4xl mx-auto w-full my-4">
        <div className="max-w-2xl rounded-2xl px-5 py-3.5 bg-violet-600 text-white shadow-md shadow-violet-600/10 text-sm font-normal">
          {message.content}
        </div>
        <div className="w-8 h-8 rounded-full bg-violet-700 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm mt-0.5">
          <User className="w-4 h-4" />
        </div>
      </div>
    );
  }

  // Assistant message
  const hasDualStream = isCompareMode && message.contentB && message.modelB;

  if (hasDualStream) {
    return (
      <div className="max-w-6xl mx-auto w-full my-6">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-violet-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-wide uppercase text-zinc-600 dark:text-zinc-400">
              Dual-Model Synchronous Inference
            </span>
          </div>
          {onRegenerate && (
            <button
              onClick={onRegenerate}
              className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Regenerate Both</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Stream Model A */}
          <div className="flex flex-col justify-between rounded-2xl p-5 bg-white dark:bg-[#111118] border border-zinc-200 dark:border-zinc-800 shadow-lg">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-100 dark:border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center text-xs font-bold">
                    A
                  </div>
                  <span className="font-semibold text-sm text-zinc-900 dark:text-white">
                    {message.modelA || "Claude 3.5 Sonnet"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {message.metrics?.latencyA && (
                    <span className="text-[11px] font-mono text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                      {message.metrics.latencyA}
                    </span>
                  )}
                  <button
                    onClick={() => handleCopy(message.content, "stream-a")}
                    className="p-1 rounded text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                    title="Copy response"
                  >
                    {copiedKey === "stream-a" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="text-zinc-800 dark:text-zinc-200">
                {renderFormattedContent(message.content)}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span>Tokens: {message.metrics?.tokensA || 240}</span>
              <div className="flex items-center gap-2">
                <button className="hover:text-emerald-500 cursor-pointer"><ThumbsUp className="w-3.5 h-3.5" /></button>
                <button className="hover:text-rose-500 cursor-pointer"><ThumbsDown className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>

          {/* Stream Model B */}
          <div className="flex flex-col justify-between rounded-2xl p-5 bg-white dark:bg-[#111118] border border-zinc-200 dark:border-zinc-800 shadow-lg">
            <div>
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-100 dark:border-zinc-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-xs font-bold">
                    B
                  </div>
                  <span className="font-semibold text-sm text-zinc-900 dark:text-white">
                    {message.modelB || "GPT-4o"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  {message.metrics?.latencyB && (
                    <span className="text-[11px] font-mono text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                      {message.metrics.latencyB}
                    </span>
                  )}
                  <button
                    onClick={() => handleCopy(message.contentB || "", "stream-b")}
                    className="p-1 rounded text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                    title="Copy response"
                  >
                    {copiedKey === "stream-b" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              <div className="text-zinc-800 dark:text-zinc-200">
                {renderFormattedContent(message.contentB || "")}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-xs text-zinc-400 font-mono">
              <span>Tokens: {message.metrics?.tokensB || 215}</span>
              <div className="flex items-center gap-2">
                <button className="hover:text-emerald-500 cursor-pointer"><ThumbsUp className="w-3.5 h-3.5" /></button>
                <button className="hover:text-rose-500 cursor-pointer"><ThumbsDown className="w-3.5 h-3.5" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Single model view
  return (
    <div className="flex items-start gap-3 max-w-4xl mx-auto w-full my-6">
      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-violet-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shrink-0 shadow-sm mt-0.5">
        <Sparkles className="w-4 h-4" />
      </div>

      <div className="flex-1 rounded-2xl p-5 bg-white dark:bg-[#111118] border border-zinc-200 dark:border-zinc-800 shadow-md">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-100 dark:border-zinc-800/80">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-zinc-900 dark:text-white">
              {message.modelA || "EchoGPT"}
            </span>
            <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-violet-100 dark:bg-violet-950 text-violet-700 dark:text-violet-300">
              Verified Stream
            </span>
          </div>

          <div className="flex items-center gap-2">
            {message.metrics?.latencyA && (
              <span className="text-[11px] font-mono text-zinc-400 bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded">
                {message.metrics.latencyA}
              </span>
            )}
            <button
              onClick={() => handleCopy(message.content, "single-stream")}
              className="p-1 rounded text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
              title="Copy"
            >
              {copiedKey === "single-stream" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        <div className="text-zinc-800 dark:text-zinc-200">
          {renderFormattedContent(message.content)}
        </div>
      </div>
    </div>
  );
}
