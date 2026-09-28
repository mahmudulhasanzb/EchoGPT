"use client";

import React, { useState } from "react";
import { ViewSwitcher, ActiveView } from "@/components/ViewSwitcher";
import { LandingPage } from "@/components/landing/LandingPage";
import { WebApp } from "@/components/webapp/WebApp";
import { ExtensionSimulator } from "@/components/extension/ExtensionSimulator";

export default function Home() {
  const [activeView, setActiveView] = useState<ActiveView>("landing");

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50 dark:bg-[#09090b]">
      <ViewSwitcher activeView={activeView} setActiveView={setActiveView} />

      <main className="flex-1 flex flex-col">
        {activeView === "landing" && <LandingPage onNavigate={setActiveView} />}
        {activeView === "webapp" && <WebApp />}
        {activeView === "extension" && <ExtensionSimulator />}
      </main>
    </div>
  );
}
