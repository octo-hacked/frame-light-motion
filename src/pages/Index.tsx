import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ShowreelSection } from "@/components/ShowreelSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ClientsTestimonialsSection } from "@/components/ClientsTestimonialsSection";
import { ScrollContainer } from "@/components/ScrollContainer";

const Index = () => {
  return (
    <ScrollContainer className="min-h-screen">
      <HeroSection />
      <AboutSection />
      
                              <ShowreelSection />
      <ProjectsSection />
      <ServicesSection />
      <ClientsTestimonialsSection />
    </ScrollContainer>
  );
};

export default Index;
