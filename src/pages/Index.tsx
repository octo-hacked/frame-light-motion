import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ShowreelSection } from "@/components/ShowreelSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ToolsSection } from "@/components/ToolsSection";
import { JourneySection } from "@/components/JourneySection";
import { ContactSection } from "@/components/ContactSection";
import { ClientsTestimonialsSection } from "@/components/ClientsTestimonialsSection";
import { ScrollContainer } from "@/components/ScrollContainer";
import { useScrollManager } from "@/hooks/useScrollManager";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Entrance animation after loading
    gsap.fromTo(container, 
      { opacity: 0 },
      { 
        opacity: 1, 
        duration: 1.2, 
        ease: "power2.out",
        delay: 0.3
      }
    );
  }, []);

  return (
    <div ref={containerRef} className="opacity-0">
      <ScrollContainer className="min-h-screen">
        <HeroSection />
        <AboutSection />
        <ShowreelSection />
        <ProjectsSection />
        <ServicesSection />
        <ToolsSection />
        <JourneySection />
        <ContactSection />
        <ClientsTestimonialsSection />
      </ScrollContainer>
    </div>
  );
};

export default Index;
