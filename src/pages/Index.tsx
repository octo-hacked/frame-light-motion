import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { ShowreelSection } from "@/components/ShowreelSection";
import { ScrollContainer } from "@/components/ScrollContainer";

const Index = () => {
  return (
    <ScrollContainer className="min-h-screen">
      <HeroSection />
      <AboutSection />
      
            <ShowreelSection />
    </ScrollContainer>
  );
};

export default Index;
