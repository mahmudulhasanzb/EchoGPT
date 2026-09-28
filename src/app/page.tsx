"use client";

import React, { useState } from "react";
import { ViewSwitcher, ActiveView } from "@/components/ViewSwitcher";
import { LandingPage } from "@/components/landing/LandingPage";
import { WebApp } from "@/components/webapp/WebApp";

export default function Home() {
  const [activeView, setActiveView] = useState<ActiveView>("landing");

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-[#09090b]">
      <ViewSwitcher activeView={activeView} setActiveView={setActiveView} />

      <main className="flex-1 flex flex-col">
        {activeView === "landing" && <LandingPage onNavigate={setActiveView} />}
        {activeView === "webapp" && <WebApp />}
        {activeView === "extension" && (
          <div className="flex-1 flex items-center justify-center p-12 text-center">
            <h1 className="text-2xl font-bold">Chrome Extension Simulator View (Mounting...)</h1>
          </div>
        )}
      </main>
    </div>
  );
}
