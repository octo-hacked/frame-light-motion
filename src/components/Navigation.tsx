import { useState, useEffect } from 'react';
import { Menu, X, Home, User, Briefcase, Wrench, FolderOpen, MessageSquare, Phone } from 'lucide-react';

const navigationItems = [
  { id: 'hero', label: 'Home', icon: Home },
  { id: 'about', label: 'About', icon: User },
  { id: 'services', label: 'Services', icon: Briefcase },
  { id: 'tools', label: 'Tools', icon: Wrench },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'testimonials', label: 'Testimonials', icon: MessageSquare },
  { id: 'contact', label: 'Contact', icon: Phone },
];

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navigationItems.map(item => item.id);
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block fixed top-8 left-1/2 transform -translate-x-1/2 z-40">
        <div className="bg-cinema-black/80 backdrop-blur-md border border-cinema-white/20 rounded-full px-6 py-3">
          <div className="flex items-center space-x-8">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 ${
                    activeSection === item.id
                      ? 'bg-cinema-gold text-cinema-black'
                      : 'text-cinema-white/70 hover:text-cinema-white hover:bg-cinema-white/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <div className="md:hidden">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="fixed top-6 right-6 z-50 w-12 h-12 bg-cinema-black/80 backdrop-blur-md border border-cinema-white/20 rounded-full flex items-center justify-center text-cinema-white"
        >
          {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 z-40 bg-cinema-black/95 backdrop-blur-md">
            <div className="flex flex-col items-center justify-center h-full space-y-6">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`flex items-center space-x-4 px-6 py-4 rounded-full transition-all duration-300 ${
                      activeSection === item.id
                        ? 'bg-cinema-gold text-cinema-black'
                        : 'text-cinema-white/70 hover:text-cinema-white hover:bg-cinema-white/10'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="text-lg font-medium">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Mobile Bottom Navigation (Alternative) */}
        <div className="fixed bottom-0 left-0 right-0 z-40 bg-cinema-black/90 backdrop-blur-md border-t border-cinema-white/20">
          <div className="flex items-center justify-around py-2">
            {navigationItems.slice(0, 5).map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex flex-col items-center space-y-1 px-2 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? 'text-cinema-gold'
                      : 'text-cinema-white/60 hover:text-cinema-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="text-xs font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
