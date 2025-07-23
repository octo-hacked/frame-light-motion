import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Mail, 
  Phone, 
  Coffee, 
  Camera, 
  Send, 
  Monitor,
  Keyboard,
  Mouse,
  Headphones,
  X,
  Check,
  Sparkles
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// Studio objects data
const studioObjects = [
  {
    id: 'camera',
    name: 'Camera',
    icon: Camera,
    position: { x: '15%', y: '25%', z: 20 },
    action: 'Take a shot!',
    sound: 'camera-shutter',
    color: '#FF6B6B'
  },
  {
    id: 'coffee',
    name: 'Coffee',
    icon: Coffee,
    position: { x: '75%', y: '40%', z: 15 },
    action: 'Fuel for creativity!',
    sound: 'coffee-sip',
    color: '#8B4513'
  },
  {
    id: 'phone',
    name: 'Phone',
    icon: Phone,
    position: { x: '60%', y: '20%', z: 10 },
    action: 'Let\'s talk!',
    sound: 'phone-ring',
    color: '#4ECDC4'
  },
  {
    id: 'email',
    name: 'Email',
    icon: Mail,
    position: { x: '25%', y: '60%', z: 25 },
    action: 'Open contact form',
    sound: 'email-send',
    color: '#FFD93D'
  },
  {
    id: 'monitor',
    name: 'Monitor',
    icon: Monitor,
    position: { x: '45%', y: '35%', z: 30 },
    action: 'View my work!',
    sound: 'screen-on',
    color: '#9999FF'
  }
];

// Typewriter Hook
const useTypewriter = (text: string, speed: number = 100) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!text) return;
    
    setIsTyping(true);
    setDisplayText('');
    let index = 0;
    
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, speed);

    return () => clearInterval(timer);
  }, [text, speed]);

  return { displayText, isTyping };
};

// Sound Effect Hook
const useSoundEffect = () => {
  const playSound = (type: string) => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    
    const sounds: Record<string, () => void> = {
      'camera-shutter': () => {
        // Camera shutter sound
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
      },
      'coffee-sip': () => {
        // Coffee sip sound
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(300, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
      },
      'phone-ring': () => {
        // Phone ring sound
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(520, audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(440, audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
      }
    };

    if (sounds[type]) {
      sounds[type]();
    }
  };

  return { playSound };
};

// Interactive Studio Object
const StudioObject = ({ 
  object, 
  onInteract, 
  index 
}: { 
  object: any; 
  onInteract: (object: any) => void; 
  index: number; 
}) => {
  const objectRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const { playSound } = useSoundEffect();
  const IconComponent = object.icon;

  useEffect(() => {
    const element = objectRef.current;
    if (!element) return;

    // Entrance animation
    gsap.fromTo(element,
      { 
        opacity: 0, 
        scale: 0.5,
        y: 50,
        rotationY: -180
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        rotationY: 0,
        duration: 1,
        delay: index * 0.2,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          once: true
        }
      }
    );

    // Floating animation
    gsap.to(element, {
      y: "+=10",
      duration: 2 + Math.random() * 2,
      repeat: -1,
      yoyo: true,
      ease: "power2.inOut",
      delay: Math.random() * 2
    });
  }, [index]);

  const handleClick = () => {
    if (object.sound) {
      playSound(object.sound);
    }
    
    // Click animation
    gsap.to(objectRef.current, {
      scale: 0.9,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
      ease: "power2.inOut"
    });

    // Vibration effect for phone
    if (object.id === 'phone' && 'vibrate' in navigator) {
      navigator.vibrate([100, 50, 100]);
    }

    onInteract(object);
  };

  return (
    <div
      ref={objectRef}
      className="absolute cursor-pointer transform-gpu"
      style={{
        left: object.position.x,
        top: object.position.y,
        zIndex: object.position.z
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Object Shadow */}
      <div 
        className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-12 h-3 bg-black/30 rounded-full blur-sm"
        style={{ transform: `translateX(-50%) scale(${isHovered ? 1.2 : 1})` }}
      />
      
      {/* Object */}
      <div 
        className="relative p-4 rounded-xl backdrop-blur-sm border transition-all duration-300"
        style={{
          background: `${object.color}20`,
          borderColor: isHovered ? object.color : `${object.color}40`,
          boxShadow: isHovered ? `0 0 30px ${object.color}50` : `0 0 10px ${object.color}20`,
          transform: isHovered ? 'scale(1.1) rotateY(10deg)' : 'scale(1) rotateY(0deg)'
        }}
      >
        <IconComponent 
          className="w-8 h-8 transition-colors" 
          style={{ color: object.color }} 
        />
        
        {/* Tooltip */}
        {isHovered && (
          <div 
            className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-2 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap"
            style={{ borderColor: object.color }}
          >
            {object.action}
            <div 
              className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-black/80 rotate-45"
            />
          </div>
        )}
      </div>
      
      {/* Floating particles */}
      {isHovered && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full animate-ping"
              style={{
                background: object.color,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// Contact Form Component
const ContactForm = ({ 
  isOpen, 
  onClose, 
  onSubmit 
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  onSubmit: (data: any) => void; 
}) => {
  const formRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { displayText: nameLabel } = useTypewriter(isOpen ? 'Your Name' : '', 50);
  const { displayText: emailLabel } = useTypewriter(isOpen ? 'Email Address' : '', 50);
  const { displayText: subjectLabel } = useTypewriter(isOpen ? 'Project Subject' : '', 50);
  const { displayText: messageLabel } = useTypewriter(isOpen ? 'Tell me about your vision...' : '', 30);

  useEffect(() => {
    if (isOpen && formRef.current) {
      gsap.fromTo(formRef.current,
        { opacity: 0, scale: 0.9, y: 50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
      );
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onSubmit(formData);
    setIsSubmitting(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div 
        ref={formRef}
        className="relative max-w-2xl w-full bg-cinema-black/95 backdrop-blur-md border border-cinema-gold/30 rounded-xl p-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Let's Create Together</h2>
            <p className="text-cinema-white/70">Ready to bring your vision to life?</p>
          </div>
          <button 
            onClick={onClose}
            className="text-cinema-white/60 hover:text-white transition-colors p-2"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="block text-cinema-gold font-medium">
              {nameLabel}
              <span className="animate-pulse">|</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-cinema-black/50 border border-cinema-white/20 rounded-lg text-white placeholder-white/40 focus:border-cinema-gold focus:outline-none transition-all duration-300"
              placeholder="Your creative name..."
              required
            />
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-cinema-gold font-medium">
              {emailLabel}
              <span className="animate-pulse">|</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-4 py-3 bg-cinema-black/50 border border-cinema-white/20 rounded-lg text-white placeholder-white/40 focus:border-cinema-gold focus:outline-none transition-all duration-300"
              placeholder="your.email@example.com"
              required
            />
          </div>

          {/* Subject Field */}
          <div className="space-y-2">
            <label className="block text-cinema-gold font-medium">
              {subjectLabel}
              <span className="animate-pulse">|</span>
            </label>
            <input
              type="text"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              className="w-full px-4 py-3 bg-cinema-black/50 border border-cinema-white/20 rounded-lg text-white placeholder-white/40 focus:border-cinema-gold focus:outline-none transition-all duration-300"
              placeholder="What's your project about?"
              required
            />
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <label className="block text-cinema-gold font-medium">
              {messageLabel}
              <span className="animate-pulse">|</span>
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              rows={5}
              className="w-full px-4 py-3 bg-cinema-black/50 border border-cinema-white/20 rounded-lg text-white placeholder-white/40 focus:border-cinema-gold focus:outline-none transition-all duration-300 resize-none"
              placeholder="Describe your vision, goals, timeline, and any specific requirements..."
              required
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 px-8 bg-gradient-to-r from-cinema-gold to-cinema-orange text-cinema-black font-bold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_#FFD93D50] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            style={{
              boxShadow: '0 0 20px rgba(255, 217, 61, 0.3)',
              animation: isSubmitting ? 'pulse 2s infinite' : 'none'
            }}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-cinema-black border-t-transparent" />
                <span>Sending...</span>
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

// Confetti Animation
const ConfettiAnimation = ({ isActive }: { isActive: boolean }) => {
  const confettiRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isActive && confettiRef.current) {
      // Create confetti particles
      const colors = ['#FFD93D', '#FF6B6B', '#4ECDC4', '#9999FF', '#FF9F43'];
      const container = confettiRef.current;
      
      for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'absolute w-2 h-2 pointer-events-none';
        confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        
        container.appendChild(confetti);
        
        gsap.to(confetti, {
          x: (Math.random() - 0.5) * 800,
          y: (Math.random() - 0.5) * 600,
          rotation: Math.random() * 360,
          scale: Math.random() * 2,
          opacity: 0,
          duration: 2 + Math.random() * 2,
          ease: "power2.out",
          onComplete: () => confetti.remove()
        });
      }
    }
  }, [isActive]);

  return (
    <div 
      ref={confettiRef} 
      className="fixed inset-0 pointer-events-none z-50" 
    />
  );
};

export const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const deskRef = useRef<HTMLDivElement>(null);
  const [selectedObject, setSelectedObject] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [notification, setNotification] = useState('');

  useEffect(() => {
    const section = sectionRef.current;
    const desk = deskRef.current;
    if (!section || !desk) return;

    // Parallax desk effect
    gsap.to(desk, {
      rotationX: -5,
      transformPerspective: 1000,
      ease: "none",
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1
      }
    });
  }, []);

  const handleObjectInteract = (object: any) => {
    setSelectedObject(object);
    
    if (object.id === 'email') {
      setShowForm(true);
    } else {
      setNotification(object.action);
      setTimeout(() => setNotification(''), 3000);
    }
  };

  const handleFormSubmit = (data: any) => {
    setShowForm(false);
    setShowConfetti(true);
    setNotification('Message sent! I\'ll get back to you soon.');
    
    setTimeout(() => {
      setShowConfetti(false);
      setNotification('');
    }, 5000);
  };

  return (
    <>
      <section
        ref={sectionRef}
        className="relative min-h-screen bg-gradient-to-b from-cinema-black via-gray-900 to-cinema-black py-20 overflow-hidden"
      >
        {/* Header */}
        <div className="text-center mb-16 px-6 relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-cinema-gold to-cinema-orange bg-clip-text text-transparent">Contact</span>
          </h2>
          <h3 className="text-2xl text-cinema-gold mb-4">Let's Create Together</h3>
          <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
            Ready to bring your vision to life? Click around my studio and let's start a conversation.
          </p>
        </div>

        {/* 3D Studio Desk Scene */}
        <div className="relative max-w-6xl mx-auto px-6 h-96">
          <div 
            ref={deskRef}
            className="relative w-full h-full bg-gradient-to-b from-amber-900/20 to-amber-800/30 rounded-xl border border-amber-600/30 shadow-2xl"
            style={{
              background: 'linear-gradient(45deg, #8B4513 0%, #A0522D 50%, #8B4513 100%)',
              transform: 'perspective(1000px) rotateX(-10deg)',
              boxShadow: '0 30px 60px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)'
            }}
          >
            {/* Desk Surface Texture */}
            <div 
              className="absolute inset-0 rounded-xl opacity-50"
              style={{
                background: `
                  repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 2px,
                    rgba(0,0,0,0.1) 2px,
                    rgba(0,0,0,0.1) 4px
                  ),
                  repeating-linear-gradient(
                    0deg,
                    transparent,
                    transparent 2px,
                    rgba(0,0,0,0.1) 2px,
                    rgba(0,0,0,0.1) 4px
                  )
                `
              }}
            />

            {/* Studio Objects */}
            {studioObjects.map((object, index) => (
              <StudioObject
                key={object.id}
                object={object}
                onInteract={handleObjectInteract}
                index={index}
              />
            ))}

            {/* Ambient Lighting */}
            <div className="absolute top-4 left-4 w-32 h-32 bg-cinema-gold/10 rounded-full blur-xl" />
            <div className="absolute bottom-4 right-4 w-24 h-24 bg-cinema-orange/10 rounded-full blur-xl" />
          </div>
        </div>

        {/* Quick Contact Info */}
        <div className="max-w-4xl mx-auto px-6 mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
              <Mail className="w-8 h-8 text-cinema-gold mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2">Email</h4>
              <p className="text-white/70">hello@webarts.com</p>
            </div>
            <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
              <Phone className="w-8 h-8 text-cinema-gold mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2">Phone</h4>
              <p className="text-white/70">+1 (555) 123-4567</p>
            </div>
            <div className="text-center p-6 bg-white/5 rounded-xl border border-white/10">
              <Coffee className="w-8 h-8 text-cinema-gold mx-auto mb-4" />
              <h4 className="text-white font-semibold mb-2">Coffee Chat</h4>
              <p className="text-white/70">Always open for creative discussions</p>
            </div>
          </div>
        </div>

        {/* Notification */}
        {notification && (
          <div className="fixed top-8 right-8 z-40 bg-cinema-gold text-cinema-black px-6 py-3 rounded-lg font-semibold shadow-lg animate-bounce">
            <div className="flex items-center space-x-2">
              <Check className="w-5 h-5" />
              <span>{notification}</span>
            </div>
          </div>
        )}

        {/* Background Effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cinema-gold/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-cinema-orange/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </section>

      {/* Contact Form Modal */}
      <ContactForm 
        isOpen={showForm}
        onClose={() => setShowForm(false)}
        onSubmit={handleFormSubmit}
      />

      {/* Confetti Animation */}
      <ConfettiAnimation isActive={showConfetti} />
    </>
  );
};
