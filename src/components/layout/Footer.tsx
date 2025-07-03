
import { Github, Mail, MessageSquare, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import portfolioData from '@/data/portfolio.json';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-16 px-4 border-t border-primary/20">
      {/* Background effects */}
      <div className="absolute top-10 left-20 w-24 h-24 border border-primary/20 rotate-45 animate-rotate-slow" />
      <div className="absolute bottom-10 right-20 w-20 h-20 border border-secondary/20 rounded-full animate-pulse-neon" />
      
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-12 items-center">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-orbitron font-bold text-gradient-cyber mb-2">
              ALEX CYBER
            </h3>
            <p className="text-muted-foreground font-rajdhani">
              Building the future, one line of code at a time.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-4">
            <Button
              size="icon"
              variant="ghost"
              className="border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300"
              onClick={() => window.open(portfolioData.social.github, '_blank')}
            >
              <Github className="h-5 w-5" />
            </Button>
            
            <Button
              size="icon"
              variant="ghost"
              className="border border-secondary/30 hover:border-secondary hover:bg-secondary/10 transition-all duration-300"
              onClick={() => window.open(`mailto:${portfolioData.social.email}`, '_blank')}
            >
              <Mail className="h-5 w-5" />
            </Button>
            
            <Button
              size="icon"
              variant="ghost"
              className="border border-accent/30 hover:border-accent hover:bg-accent/10 transition-all duration-300"
              onClick={() => window.open(portfolioData.social.whatsapp, '_blank')}
            >
              <MessageSquare className="h-5 w-5" />
            </Button>
          </div>

          {/* Copyright */}
          <div className="text-center md:text-right">
            <p className="text-muted-foreground font-rajdhani flex items-center justify-center md:justify-end gap-2">
              Made with <Heart className="h-4 w-4 text-primary animate-pulse" /> by Alex Cyber
            </p>
            <p className="text-sm text-muted-foreground/70 font-rajdhani mt-1">
              © {currentYear} All rights reserved.
            </p>
          </div>
        </div>

        {/* Bottom border with glow effect */}
        <div className="mt-12 pt-8 border-t border-primary/10">
          <div className="text-center">
            <div className="inline-block px-6 py-2 border border-primary/20 rounded-full bg-primary/5 backdrop-blur-sm">
              <span className="text-sm font-rajdhani text-primary">
                Portfolio v2.0 • Built with React + Three.js
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
