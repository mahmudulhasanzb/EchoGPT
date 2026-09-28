"use client";

import React, { useState, useRef } from "react";
import { Send, ChevronDown, SplitSquareVertical, StopCircle } from "lucide-react";
import { AI_MODELS } from "../landing/ModelMatrix";

interface InputDockProps {
  onSendMessage: (text: string, modelA: string, modelB?: string) => void;
  isGenerating: boolean;
  onStop: () => void;
  isCompareMode: boolean;
  onToggleCompareMode: () => void;
  modelA: string;
  setModelA: (m: string) => void;
  modelB: string;
  setModelB: (m: string) => void;
}

export function InputDock({
  onSendMessage,
  isGenerating,
  onStop,
  isCompareMode,
  onToggleCompareMode,
  modelA,
  setModelA,
  modelB,
  setModelB,
}: InputDockProps) {
  const [input, setInput] = useState("");
  const [showModelMenuA, setShowModelMenuA] = useState(false);
  const [showModelMenuB, setShowModelMenuB] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const quickPrompts = [
    "Refactor function with TypeScript",
    "Explain key trade-offs",
    "Draft concise summary",
  ];

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleSend = () => {
    if (!input.trim() || isGenerating) return;
    onSendMessage(input, modelA, isCompareMode ? modelB : undefined);
    setInput("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${Math.min(e.target.scrollHeight, 140)}px`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-3 sm:px-4 pb-4 pt-1">
      {/* Quick Prompts */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-1.5 no-scrollbar">
        {quickPrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => setInput(p)}
            className="shrink-0 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 text-xs transition-colors cursor-pointer"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Input Shell */}
      <div className="rounded-2xl p-2.5 sm:p-3.5 bg-white dark:bg-[#121218] border border-zinc-200 dark:border-zinc-800 shadow-lg">
        {/* Model Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2 pb-2 border-b border-zinc-100 dark:border-zinc-800">
          <div className="flex items-center gap-1.5 flex-wrap">
            {/* Model A */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowModelMenuA(!showModelMenuA);
                  setShowModelMenuB(false);
                }}
                className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-800 dark:text-zinc-200 cursor-pointer"
              >
                <span>{modelA}</span>
                <ChevronDown className="w-3 h-3 text-zinc-400" />
              </button>

              {showModelMenuA && (
                <div className="absolute bottom-full left-0 mb-1.5 w-48 rounded-xl bg-white dark:bg-[#161620] border border-zinc-200 dark:border-zinc-800 shadow-xl p-1 z-50">
                  {AI_MODELS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setModelA(m.name);
                        setShowModelMenuA(false);
                      }}
                      className={`w-full text-left px-2 py-1.5 rounded-lg text-xs cursor-pointer ${
                        modelA === m.name ? "font-bold text-violet-600 dark:text-violet-400" : "text-zinc-700 dark:text-zinc-300"
                      }`}
                    >
                      {m.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Compare Model B */}
            {isCompareMode && (
              <>
                <span className="text-xs text-zinc-400">vs</span>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModelMenuB(!showModelMenuB);
                      setShowModelMenuA(false);
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-xs font-medium text-zinc-800 dark:text-zinc-200 cursor-pointer"
                  >
                    <span>{modelB}</span>
                    <ChevronDown className="w-3 h-3 text-zinc-400" />
                  </button>

                  {showModelMenuB && (
                    <div className="absolute bottom-full left-0 mb-1.5 w-48 rounded-xl bg-white dark:bg-[#161620] border border-zinc-200 dark:border-zinc-800 shadow-xl p-1 z-50">
                      {AI_MODELS.map((m) => (
                        <button
                          key={m.id}
                          onClick={() => {
                            setModelB(m.name);
                            setShowModelMenuB(false);
                          }}
                          className={`w-full text-left px-2 py-1.5 rounded-lg text-xs cursor-pointer ${
                            modelB === m.name ? "font-bold text-violet-600 dark:text-violet-400" : "text-zinc-700 dark:text-zinc-300"
                          }`}
                        >
                          {m.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Toggle Compare */}
          <button
            type="button"
            onClick={onToggleCompareMode}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer ${
              isCompareMode
                ? "bg-violet-50 dark:bg-violet-950 text-violet-700 dark:text-violet-300 border border-violet-200 dark:border-violet-800"
                : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200"
            }`}
          >
            <SplitSquareVertical className="w-3.5 h-3.5" />
            <span>Compare</span>
          </button>
        </div>

        {/* Text Area */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question or type a prompt..."
          rows={2}
          className="w-full bg-transparent resize-none border-none outline-none text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-xs sm:text-sm leading-relaxed max-h-36"
        />

        {/* Bottom Bar */}
        <div className="flex items-center justify-end pt-1">
          {isGenerating ? (
            <button
              onClick={onStop}
              type="button"
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium cursor-pointer"
            >
              <StopCircle className="w-3.5 h-3.5" />
              <span>Stop</span>
            </button>
          ) : (
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              type="button"
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg font-medium text-xs transition-colors cursor-pointer ${
                input.trim()
                  ? "bg-violet-600 hover:bg-violet-500 text-white"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed opacity-60"
              }`}
            >
              <span>Send</span>
              <Send className="w-3 h-3" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
