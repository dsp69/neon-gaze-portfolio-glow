import { Terminal, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative py-12 px-4 border-t border-primary/20 bg-card/50 backdrop-blur-sm">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
      
      <div className="container mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left side - Logo and tagline */}
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border border-primary rounded bg-primary/10 flex items-center justify-center">
              <Terminal className="h-5 w-5 text-primary" />
            </div>
            <div>
              <div className="font-orbitron font-bold text-xl text-gradient-cyber">
                CYBER PORTFOLIO
              </div>
              <div className="text-sm text-muted-foreground font-rajdhani">
                Crafting digital experiences
              </div>
            </div>
          </div>

          {/* Center - Copyright */}
          <div className="flex items-center gap-2 text-muted-foreground font-rajdhani">
            <span>© 2024 Alex Cyber. Made with</span>
            <Heart className="h-4 w-4 text-accent animate-pulse" />
            <span>and lots of caffeine</span>
          </div>

          {/* Right side - Tech stack badges */}
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <div className="text-xs text-muted-foreground font-mono bg-muted/30 px-2 py-1 rounded border border-primary/20">
              React
            </div>
            <div className="text-xs text-muted-foreground font-mono bg-muted/30 px-2 py-1 rounded border border-secondary/20">
              Three.js
            </div>
            <div className="text-xs text-muted-foreground font-mono bg-muted/30 px-2 py-1 rounded border border-accent/20">
              GSAP
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="mt-8 pt-6 border-t border-primary/10 text-center">
          <p className="text-xs text-muted-foreground/60 font-rajdhani">
            "The future belongs to those who code it" - Alex Cyber
          </p>
        </div>
      </div>
    </footer>
  );
}