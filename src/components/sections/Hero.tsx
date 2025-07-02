import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '@/components/ui/button';
import { Github, Mail, Download } from 'lucide-react';
import profileImage from '@/assets/profile-cyber.jpg';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial state
      gsap.set([nameRef.current, titleRef.current, taglineRef.current, buttonsRef.current], {
        opacity: 0,
        y: 50
      });
      gsap.set(imageRef.current, {
        opacity: 0,
        scale: 0.8,
        rotationY: 180
      });

      // Animation timeline
      const tl = gsap.timeline({ delay: 0.5 });
      
      tl.to(nameRef.current, {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out"
      })
      .to(titleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6")
      .to(taglineRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4")
      .to(imageRef.current, {
        opacity: 1,
        scale: 1,
        rotationY: 0,
        duration: 1,
        ease: "back.out(1.7)"
      }, "-=0.8")
      .to(buttonsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.4");

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      ref={heroRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden px-4"
    >
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,black_40%,transparent_100%)]" />
      
      <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center z-10">
        {/* Text Content */}
        <div className="text-center lg:text-left space-y-6">
          <h1 
            ref={nameRef}
            className="text-5xl md:text-7xl font-orbitron font-bold neon-text"
          >
            ALEX CYBER
          </h1>
          
          <p 
            ref={titleRef}
            className="text-2xl md:text-3xl font-rajdhani text-gradient-cyber font-semibold"
          >
            Full-Stack Developer
          </p>
          
          <p 
            ref={taglineRef}
            className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 leading-relaxed"
          >
            Crafting digital experiences in the cyber realm. 
            Building the future, one line of code at a time.
          </p>
          
          <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <Button 
              size="lg" 
              className="border-glow bg-transparent hover:bg-primary/20 text-primary font-rajdhani font-semibold"
              onClick={() => scrollToSection('projects')}
            >
              View Projects
            </Button>
            
            <Button 
              size="lg" 
              variant="outline" 
              className="border-secondary/50 text-secondary hover:bg-secondary/20 hover:border-secondary font-rajdhani font-semibold"
              onClick={() => scrollToSection('contact')}
            >
              <Mail className="mr-2 h-4 w-4" />
              Get In Touch
            </Button>
          </div>
          
          {/* Quick action buttons */}
          <div className="flex gap-4 justify-center lg:justify-start pt-4">
            <Button
              size="icon"
              variant="ghost"
              className="border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300"
              onClick={() => window.open('https://github.com/alexcyber', '_blank')}
            >
              <Github className="h-5 w-5" />
            </Button>
            
            <Button
              size="icon"
              variant="ghost"
              className="border border-accent/30 hover:border-accent hover:bg-accent/10 transition-all duration-300"
            >
              <Download className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Profile Image */}
        <div className="flex justify-center lg:justify-end">
          <div 
            ref={imageRef}
            className="relative group"
          >
            {/* Floating geometric decorations */}
            <div className="absolute -top-4 -left-4 w-20 h-20 border border-primary/30 rotate-45 animate-rotate-slow" />
            <div className="absolute -bottom-6 -right-6 w-16 h-16 border border-secondary/30 rotate-12 animate-pulse-neon" />
            <div className="absolute top-1/2 -right-8 w-12 h-12 border border-accent/30 rounded-full animate-float" />
            
            {/* Main image container */}
            <div className="relative cyber-card p-4 rounded-2xl overflow-hidden group-hover:scale-105 transition-all duration-500">
              {/* Glowing border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-500" />
              
              <div className="relative z-10">
                <img 
                  src={profileImage}
                  alt="Alex Cyber - Cyberpunk Developer"
                  className="w-80 h-80 object-cover rounded-xl border border-primary/50"
                />
                
                {/* Holographic overlay effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-transparent via-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
              </div>
            </div>
            
            {/* Data streams effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-1/4 left-0 w-1 h-8 bg-primary/60 animate-pulse" />
              <div className="absolute top-3/4 right-0 w-1 h-12 bg-secondary/60 animate-pulse" style={{ animationDelay: '1s' }} />
              <div className="absolute top-1/2 left-1/4 w-8 h-1 bg-accent/60 animate-pulse" style={{ animationDelay: '2s' }} />
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-2 bg-primary rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  );
}