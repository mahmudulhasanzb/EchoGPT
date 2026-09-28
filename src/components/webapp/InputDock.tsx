"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Sparkles,
  Paperclip,
  Globe,
  Mic,
  SplitSquareVertical,
  ChevronDown,
  Layers,
  StopCircle,
} from "lucide-react";
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
  const [webSearch, setWebSearch] = useState(false);
  const [isAttached, setIsAttached] = useState(false);
  const [showModelMenuA, setShowModelMenuA] = useState(false);
  const [showModelMenuB, setShowModelMenuB] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const quickPrompts = [
    "Refactor function for performance & memory",
    "Explain edge cases in this implementation",
    "Compare architectural pros & cons",
    "Summarize key tradeoffs",
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
    e.target.style.height = `${Math.min(e.target.scrollHeight, 180)}px`;
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-6 pt-2">
      {/* Quick Prompts Carousel */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-2 no-scrollbar">
        {quickPrompts.map((p, i) => (
          <button
            key={i}
            onClick={() => setInput(p)}
            className="shrink-0 px-3 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 text-xs font-medium transition-colors border border-zinc-200/60 dark:border-zinc-700/60 cursor-pointer"
          >
            {p}
          </button>
        ))}
      </div>

      {/* Main Input Dock Card */}
      <div className="rounded-3xl p-3 sm:p-4 bg-white dark:bg-[#121218] border border-zinc-200 dark:border-zinc-800 shadow-2xl relative transition-all focus-within:border-violet-500/80 focus-within:ring-2 focus-within:ring-violet-500/20">
        {/* Model Selectors Bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5 pb-2.5 border-b border-zinc-100 dark:border-zinc-800/80">
          <div className="flex items-center gap-2 flex-wrap">
            {/* Model A Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => {
                  setShowModelMenuA(!showModelMenuA);
                  setShowModelMenuB(false);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
              >
                <span className="w-2 h-2 rounded-full bg-violet-500" />
                <span>{modelA}</span>
                <ChevronDown className="w-3 h-3 text-zinc-400" />
              </button>

              {showModelMenuA && (
                <div className="absolute bottom-full left-0 mb-2 w-56 rounded-2xl bg-white dark:bg-[#16161f] border border-zinc-200 dark:border-zinc-800 shadow-2xl p-1 z-50">
                  <div className="px-2 py-1 text-[10px] font-mono text-zinc-400 uppercase font-bold">
                    Select Model A
                  </div>
                  {AI_MODELS.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => {
                        setModelA(m.name);
                        setShowModelMenuA(false);
                      }}
                      className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center justify-between hover:bg-violet-50 dark:hover:bg-violet-950/40 cursor-pointer ${
                        modelA === m.name ? "font-bold text-violet-600 dark:text-violet-400" : "text-zinc-700 dark:text-zinc-300"
                      }`}
                    >
                      <span>{m.name}</span>
                      <span className="text-[10px] opacity-60">{m.provider}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Compare Separator & Model B */}
            {isCompareMode && (
              <>
                <span className="text-xs font-mono text-zinc-400">vs</span>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModelMenuB(!showModelMenuB);
                      setShowModelMenuA(false);
                    }}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 text-xs font-semibold hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors cursor-pointer"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>{modelB}</span>
                    <ChevronDown className="w-3 h-3 text-zinc-400" />
                  </button>

                  {showModelMenuB && (
                    <div className="absolute bottom-full left-0 mb-2 w-56 rounded-2xl bg-white dark:bg-[#16161f] border border-zinc-200 dark:border-zinc-800 shadow-2xl p-1 z-50">
                      <div className="px-2 py-1 text-[10px] font-mono text-zinc-400 uppercase font-bold">
                        Select Model B
                      </div>
                      {AI_MODELS.map((m) => (
                        <button
                          key={m.id}
                          onClick={() => {
                            setModelB(m.name);
                            setShowModelMenuB(false);
                          }}
                          className={`w-full text-left px-2.5 py-2 rounded-xl text-xs flex items-center justify-between hover:bg-violet-50 dark:hover:bg-violet-950/40 cursor-pointer ${
                            modelB === m.name ? "font-bold text-emerald-600 dark:text-emerald-400" : "text-zinc-700 dark:text-zinc-300"
                          }`}
                        >
                          <span>{m.name}</span>
                          <span className="text-[10px] opacity-60">{m.provider}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mode Switch Toggle Button */}
          <button
            type="button"
            onClick={onToggleCompareMode}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              isCompareMode
                ? "bg-violet-100 dark:bg-violet-950/80 text-violet-700 dark:text-violet-300 border border-violet-300 dark:border-violet-700/60"
                : "bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
            }`}
          >
            <SplitSquareVertical className="w-3.5 h-3.5" />
            <span>{isCompareMode ? "Dual Compare ON" : "Enable Compare"}</span>
          </button>
        </div>

        {/* Textarea Input */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={
            isCompareMode
              ? `Ask a question to synchronously stream ${modelA} and ${modelB}...`
              : `Ask ${modelA} anything... (Shift+Enter for newline)`
          }
          rows={2}
          className="w-full bg-transparent resize-none border-none outline-none text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 text-sm leading-relaxed max-h-48"
        />

        {/* Bottom Action Rail */}
        <div className="flex items-center justify-between pt-2 mt-1">
          <div className="flex items-center gap-1.5">
            {/* Attachment Button */}
            <button
              type="button"
              onClick={() => setIsAttached(!isAttached)}
              className={`p-2 rounded-xl text-xs transition-colors cursor-pointer ${
                isAttached
                  ? "bg-violet-100 dark:bg-violet-950 text-violet-600"
                  : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
              title="Attach File or Code"
            >
              <Paperclip className="w-4 h-4" />
            </button>

            {/* Web Search Toggle */}
            <button
              type="button"
              onClick={() => setWebSearch(!webSearch)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                webSearch
                  ? "bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                  : "text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              }`}
              title="Toggle Live Web Search"
            >
              <Globe className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Web Search</span>
            </button>

            {/* Mic Button */}
            <button
              type="button"
              className="p-2 rounded-xl text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
              title="Voice Input (Dictation)"
            >
              <Mic className="w-4 h-4" />
            </button>
          </div>

          {/* Send / Stop Button */}
          {isGenerating ? (
            <button
              onClick={onStop}
              type="button"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
            >
              <StopCircle className="w-4 h-4" />
              <span>Stop</span>
            </button>
          ) : (
            <button
              onClick={handleSend}
              disabled={!input.trim()}
              type="button"
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-semibold text-xs transition-all shadow-md cursor-pointer ${
                input.trim()
                  ? "bg-violet-600 hover:bg-violet-500 text-white shadow-violet-600/30 scale-100"
                  : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed opacity-60"
              }`}
            >
              <span>Send</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
