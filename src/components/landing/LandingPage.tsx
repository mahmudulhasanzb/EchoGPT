"use client";

import React from "react";
import { HeroSection } from "./HeroSection";
import { ModelMatrix } from "./ModelMatrix";
import { ProductPreview } from "./ProductPreview";
import { FeaturesSection } from "./FeaturesSection";
import { WhyEchoGPT } from "./WhyEchoGPT";
import { PricingSection } from "./PricingSection";
import { FaqSection } from "./FaqSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { CtaFooter } from "./CtaFooter";
import { ActiveView } from "../ViewSwitcher";

interface LandingPageProps {
  onNavigate: (view: ActiveView) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  return (
    <div className="flex flex-col w-full">
      <HeroSection onNavigate={onNavigate} />
      <ModelMatrix />
      <ProductPreview />
      <FeaturesSection />
      <WhyEchoGPT />
      <PricingSection onNavigate={onNavigate} />
      <TestimonialsSection />
      <FaqSection />
      <CtaFooter onNavigate={onNavigate} />
    </div>
  );
}
