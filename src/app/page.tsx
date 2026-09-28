"use client";

import React, { useState, useEffect } from "react";
import { ViewSwitcher, ActiveView } from "@/components/ViewSwitcher";
import { LandingPage } from "@/components/landing/LandingPage";
import { WebApp } from "@/components/webapp/WebApp";
import { ExtensionSimulator } from "@/components/extension/ExtensionSimulator";

export default function Home() {
  const [activeView, setActiveView] = useState<ActiveView>("landing");
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  // Auto-reveal header when cursor reaches top of window
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY <= 30) {
        setIsHeaderVisible(true);
      }
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSelectView = (view: ActiveView) => {
    setActiveView(view);
    setIsHeaderVisible(true);
  };

  return (
    <div
      className={`flex flex-col bg-zinc-50 dark:bg-[#09090b] relative ${
        activeView === "landing" ? "min-h-screen" : "h-screen overflow-hidden"
      }`}
    >
      {/* Hover detection strip at the top to smoothly reveal navbar when hidden */}
      {!isHeaderVisible && (
        <div
          onMouseEnter={() => setIsHeaderVisible(true)}
          className="fixed top-0 left-0 right-0 h-4 z-50 pointer-events-auto cursor-pointer"
          title="Move cursor here to reveal navigation"
        />
      )}

      <ViewSwitcher
        activeView={activeView}
        setActiveView={handleSelectView}
        isVisible={isHeaderVisible}
      />

      <main
        className={`flex-1 flex flex-col ${
          activeView === "landing" ? "" : "min-h-0 overflow-hidden"
        }`}
      >
        {activeView === "landing" && <LandingPage onNavigate={handleSelectView} />}
        {activeView === "webapp" && (
          <WebApp
            isHeaderVisible={isHeaderVisible}
            setIsHeaderVisible={setIsHeaderVisible}
          />
        )}
        {activeView === "extension" && <ExtensionSimulator />}
      </main>
    </div>
  );
}
