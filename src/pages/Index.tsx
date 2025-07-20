import { HeroSection } from "@/components/HeroSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Placeholder for additional sections */}
      <div className="min-h-screen bg-cinema-black flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-cinema-white mb-4">More Sections Coming Soon</h2>
          <p className="text-xl text-cinema-white/70">This is where your portfolio content will expand</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
