import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, Code, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import portfolioData from '@/data/portfolio.json';

interface Project {
  id: number;
  title: string;
  description: string;
  tech: string[];
  image: string;
  github: string;
  demo: string;
  featured: boolean;
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={cardRef}
      className={`project-card group relative ${project.featured ? 'md:col-span-2' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background card with cyber styling */}
      <div className="cyber-card h-full p-6 rounded-2xl relative overflow-hidden transition-all duration-500 group-hover:scale-[1.02]">
        
        {/* Animated border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-secondary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
        
        {/* Project image/preview area */}
        <div className="relative mb-6 rounded-xl overflow-hidden bg-muted/50 h-48 group-hover:h-52 transition-all duration-500">
          {/* Placeholder for project image */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 flex items-center justify-center">
            <div className="text-center space-y-2">
              <Code className="h-12 w-12 mx-auto text-primary/60" />
              <p className="text-sm text-muted-foreground font-rajdhani">
                {project.title}
              </p>
            </div>
          </div>
          
          {/* Holographic overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          
          {/* Animated scan lines */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500">
            <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,255,255,0.1)_50%)] bg-[length:100%_4px] animate-pulse" />
          </div>
          
          {/* Project actions overlay */}
          <div className={`
            absolute inset-0 bg-background/90 flex items-center justify-center gap-4
            transition-all duration-300
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}>
            <Button
              size="sm"
              variant="outline"
              className="border-primary/50 text-primary hover:bg-primary/20"
              onClick={() => window.open(project.github, '_blank')}
            >
              <Github className="h-4 w-4 mr-2" />
              Code
            </Button>
            <Button
              size="sm"
              className="bg-secondary/20 border-secondary/50 text-secondary hover:bg-secondary/30"
              onClick={() => window.open(project.demo, '_blank')}
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Demo
            </Button>
          </div>
        </div>
        
        {/* Project content */}
        <div className="relative z-10 space-y-4">
          {/* Title and featured badge */}
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-orbitron font-semibold text-gradient-cyber group-hover:text-gradient-neon transition-all duration-300">
              {project.title}
            </h3>
            {project.featured && (
              <Badge className="bg-accent/20 text-accent border-accent/50">
                <Zap className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
          </div>
          
          {/* Description */}
          <p className="text-muted-foreground leading-relaxed font-rajdhani">
            {project.description}
          </p>
          
          {/* Tech stack */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech) => (
              <Badge 
                key={tech}
                variant="outline"
                className="border-primary/30 text-primary/80 hover:border-primary hover:text-primary transition-colors duration-300"
              >
                {tech}
              </Badge>
            ))}
          </div>
          
          {/* Quick actions */}
          <div className="flex gap-3 pt-2">
            <Button
              size="sm"
              variant="ghost"
              className="text-primary/60 hover:text-primary hover:bg-primary/10"
              onClick={() => window.open(project.github, '_blank')}
            >
              <Github className="h-4 w-4" />
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-secondary/60 hover:text-secondary hover:bg-secondary/10"
              onClick={() => window.open(project.demo, '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Floating geometric elements */}
        <div className="absolute top-4 right-4 w-6 h-6 border border-primary/30 rotate-45 animate-rotate-slow opacity-50" />
        <div className="absolute bottom-4 left-4 w-4 h-4 border border-secondary/30 rounded-full animate-pulse opacity-50" />
      </div>
    </div>
  );
};

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (!inView) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.project-card',
        { 
          opacity: 0,
          y: 60,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          stagger: 0.15
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [inView]);

  const projects = portfolioData.projects as Project[];
  const featuredProjects = projects.filter(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 px-4 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute top-32 right-20 w-40 h-40 border border-accent/20 rotate-12 animate-float" />
      <div className="absolute bottom-32 left-20 w-28 h-28 border border-secondary/20 rounded-full animate-pulse-neon" />
      
      <div ref={inViewRef} className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold neon-text mb-4">
            PROJECTS.JSON
          </h2>
          <p className="text-xl text-muted-foreground font-rajdhani max-w-2xl mx-auto">
            A collection of digital experiences crafted with passion and cutting-edge technology
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-6" />
        </div>

        {/* Featured Projects */}
        <div className="mb-16">
          <h3 className="text-2xl font-orbitron font-semibold text-gradient-cyber mb-8 text-center">
            Featured Projects
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>

        {/* Other Projects */}
        {otherProjects.length > 0 && (
          <div>
            <h3 className="text-2xl font-orbitron font-semibold text-gradient-neon mb-8 text-center">
              More Projects
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {otherProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index + featuredProjects.length} />
              ))}
            </div>
          </div>
        )}

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="cyber-card p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-orbitron font-semibold text-gradient-cyber mb-4">
              Want to collaborate?
            </h3>
            <p className="text-muted-foreground font-rajdhani mb-6">
              I'm always interested in working on exciting projects. Let's build something amazing together!
            </p>
            <Button 
              size="lg"
              className="border-glow bg-transparent hover:bg-primary/20 text-primary font-rajdhani font-semibold"
              onClick={() => {
                const contact = document.getElementById('contact');
                contact?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
