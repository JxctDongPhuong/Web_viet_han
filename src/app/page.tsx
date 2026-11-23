"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import HeroSection from "@/components/home/HeroSection";
import FeatureGrid from "@/components/home/FeatureGrid";
import StatsCounter from "@/components/home/StatsCounter";
import LatestNews from "@/components/home/LatestNews";
import CTABanner from "@/components/home/CTABanner";
import PartnersSection from "@/components/home/PartnersSection";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <HeroSection />
      <FeatureGrid />
      <StatsCounter />
      <LatestNews />
      <CTABanner />
      <PartnersSection />
    </>
  );
}