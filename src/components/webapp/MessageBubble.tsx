"use client";

import React, { useState } from "react";
import { Copy, Check, User, Sparkles } from "lucide-react";
import { ChatMessage } from "./mockData";

interface MessageBubbleProps {
  message: ChatMessage;
  isCompareMode: boolean;
}

export function MessageBubble({ message, isCompareMode }: MessageBubbleProps) {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const renderContent = (content: string) => {
    const parts = content.split(/(```[\s\S]*?```)/g);

    return parts.map((part, index) => {
      if (part.startsWith("```") && part.endsWith("```")) {
        const lines = part.slice(3, -3).trim().split("\n");
        const lang = lines[0].trim();
        const code = lines.slice(1).join("\n");

        return (
          <div key={index} className="my-2.5 rounded-xl overflow-hidden border border-zinc-200 dark:border-zinc-800 bg-zinc-950 text-zinc-100">
            <div className="px-3 py-1.5 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between text-[11px] font-mono text-zinc-400">
              <span className="uppercase text-violet-400 font-medium">{lang || "code"}</span>
              <button
                onClick={() => handleCopy(code, `code-${index}`)}
                className="flex items-center gap-1 hover:text-white cursor-pointer"
              >
                {copiedKey === `code-${index}` ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span className="text-emerald-400">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="p-3 text-xs font-mono overflow-x-auto whitespace-pre-wrap leading-relaxed">
              <code>{code}</code>
            </pre>
          </div>
        );
      }

      return (
        <div key={index} className="whitespace-pre-wrap leading-relaxed text-xs sm:text-sm">
          {part}
        </div>
      );
    });
  };

  if (message.role === "user") {
    return (
      <div className="flex items-start justify-end gap-2.5 max-w-4xl mx-auto w-full my-3">
        <div className="max-w-xl rounded-2xl px-4 py-2.5 bg-violet-600 text-white text-xs sm:text-sm">
          {message.content}
        </div>
        <div className="w-7 h-7 rounded-full bg-violet-700 text-white flex items-center justify-center text-xs shrink-0 mt-0.5">
          <User className="w-3.5 h-3.5" />
        </div>
      </div>
    );
  }

  // Assistant message
  const hasDualStream = isCompareMode && message.contentB && message.modelB;

  if (hasDualStream) {
    return (
      <div className="max-w-5xl mx-auto w-full my-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Model A */}
          <div className="flex flex-col justify-between rounded-xl p-4 bg-white dark:bg-[#111116] border border-zinc-200 dark:border-zinc-800 shadow-xs">
            <div>
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-100 dark:border-zinc-800/80">
                <span className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-white">
                  {message.modelA || "Claude 3.5 Sonnet"}
                </span>
                <button
                  onClick={() => handleCopy(message.content, "stream-a")}
                  className="p-1 rounded text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                  title="Copy"
                >
                  {copiedKey === "stream-a" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="text-zinc-700 dark:text-zinc-300">
                {renderContent(message.content)}
              </div>
            </div>
          </div>

          {/* Model B */}
          <div className="flex flex-col justify-between rounded-xl p-4 bg-white dark:bg-[#111116] border border-zinc-200 dark:border-zinc-800 shadow-xs">
            <div>
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-100 dark:border-zinc-800/80">
                <span className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-white">
                  {message.modelB || "GPT-4o"}
                </span>
                <button
                  onClick={() => handleCopy(message.contentB || "", "stream-b")}
                  className="p-1 rounded text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
                  title="Copy"
                >
                  {copiedKey === "stream-b" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>

              <div className="text-zinc-700 dark:text-zinc-300">
                {renderContent(message.contentB || "")}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Single model view
  return (
    <div className="flex items-start gap-2.5 max-w-4xl mx-auto w-full my-3">
      <div className="w-7 h-7 rounded-lg bg-violet-600 text-white flex items-center justify-center shrink-0 mt-0.5">
        <Sparkles className="w-3.5 h-3.5" />
      </div>

      <div className="flex-1 rounded-xl p-4 bg-white dark:bg-[#111116] border border-zinc-200 dark:border-zinc-800 shadow-xs">
        <div className="flex items-center justify-between pb-2 mb-2 border-b border-zinc-100 dark:border-zinc-800/80">
          <span className="font-semibold text-xs sm:text-sm text-zinc-900 dark:text-white">
            {message.modelA || "EchoGPT"}
          </span>
          <button
            onClick={() => handleCopy(message.content, "single-stream")}
            className="p-1 rounded text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 cursor-pointer"
            title="Copy"
          >
            {copiedKey === "single-stream" ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>

        <div className="text-zinc-700 dark:text-zinc-300">
          {renderContent(message.content)}
        </div>
      </div>
    </div>
  );
}
