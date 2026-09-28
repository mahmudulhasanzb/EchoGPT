"use client";

import React, { useState } from "react";
import { X, Key, ShieldCheck, Sliders, Check, Save } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
  const [openaiKey, setOpenaiKey] = useState("sk-proj-••••••••••••••••");
  const [anthropicKey, setAnthropicKey] = useState("sk-ant-••••••••••••••••");
  const [temperature, setTemperature] = useState(0.7);
  const [streamSpeed, setStreamSpeed] = useState("Fast (100 t/s)");
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="w-full max-w-xl rounded-3xl bg-white dark:bg-[#121218] border border-zinc-200 dark:border-zinc-800 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-violet-600/10 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                Workspace Settings & BYOK
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                Configure direct API keys and inference parameters
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Privacy badge */}
          <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center gap-2.5 text-xs">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span>Zero-Retention Policy: API keys and prompt history remain encrypted locally in browser storage.</span>
          </div>

          {/* BYOK Section */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono uppercase font-bold text-zinc-400 tracking-wider">
              Bring Your Own Keys (BYOK)
            </h4>

            <div>
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1.5">
                OpenAI API Key
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={openaiKey}
                  onChange={(e) => setOpenaiKey(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-900 dark:text-zinc-100 outline-none focus:border-violet-500"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300 block mb-1.5">
                Anthropic API Key
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  value={anthropicKey}
                  onChange={(e) => setAnthropicKey(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-900 dark:text-zinc-100 outline-none focus:border-violet-500"
                />
              </div>
            </div>
          </div>

          {/* Model Parameters */}
          <div className="space-y-4 pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
            <h4 className="text-xs font-mono uppercase font-bold text-zinc-400 tracking-wider">
              Inference Parameters
            </h4>

            <div>
              <div className="flex items-center justify-between text-xs text-zinc-700 dark:text-zinc-300 mb-2 font-medium">
                <span>Creativity Temperature</span>
                <span className="font-mono text-violet-600 dark:text-violet-400 font-bold">
                  {temperature}
                </span>
              </div>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full accent-violet-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-zinc-400 font-mono mt-1">
                <span>Deterministic (0.1)</span>
                <span>Balanced (0.7)</span>
                <span>Creative (1.0)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 cursor-pointer"
          >
            Cancel
          </button>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-xs shadow-md shadow-violet-600/20 transition-all cursor-pointer"
          >
            {saved ? (
              <>
                <Check className="w-3.5 h-3.5 text-white" />
                <span>Saved Changes!</span>
              </>
            ) : (
              <>
                <Save className="w-3.5 h-3.5" />
                <span>Save Configuration</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
