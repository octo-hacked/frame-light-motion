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
import { Navigation } from "@/components/Navigation";
import { useScrollManager } from "@/hooks/useScrollManager";

const Index = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { refreshScrollTrigger } = useScrollManager();

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
        delay: 0.3,
        onComplete: () => {
          // Refresh scroll triggers after entrance animation
          refreshScrollTrigger();
        }
      }
    );
  }, [refreshScrollTrigger]);

  return (
    <div ref={containerRef} className="opacity-0">
      <Navigation />
      <ScrollContainer className="min-h-screen">
        <div id="hero">
          <HeroSection />
        </div>
        <div id="about">
          <AboutSection />
        </div>
        <div id="showreel">
          <ShowreelSection />
        </div>
        <div id="projects">
          <ProjectsSection />
        </div>
        <div id="services">
          <ServicesSection />
        </div>
        <div id="tools">
          <ToolsSection />
        </div>
        <div id="journey">
          <JourneySection />
        </div>
        <div id="contact">
          <ContactSection />
        </div>
        <div id="testimonials">
          <ClientsTestimonialsSection />
        </div>
      </ScrollContainer>
    </div>
  );
};

export default Index;
