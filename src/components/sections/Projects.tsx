
import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';
import { ExternalLink, Github, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import portfolioData from '@/data/portfolio.json';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
  category: string;
}

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div 
      ref={cardRef}
      className="project-card cyber-card p-6 rounded-2xl group hover:scale-[1.02] transition-all duration-500"
    >
      {/* Project Image */}
      <div className="relative overflow-hidden rounded-xl mb-6 bg-gradient-to-r from-primary/10 to-secondary/10 h-48 flex items-center justify-center">
        <img 
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="outline"
              className="border-primary/50 hover:border-primary hover:bg-primary/10"
              onClick={() => window.open(project.liveUrl, '_blank')}
            >
              <ExternalLink className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="border-secondary/50 hover:border-secondary hover:bg-secondary/10"
              onClick={() => window.open(project.githubUrl, '_blank')}
            >
              <Github className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Project Info */}
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-orbitron font-semibold text-gradient-cyber group-hover:text-gradient-neon transition-all duration-300">
            {project.title}
          </h3>
          {project.featured && (
            <Badge className="bg-accent/20 text-accent border-accent/50">
              Featured
            </Badge>
          )}
        </div>

        <p className="text-muted-foreground font-rajdhani leading-relaxed">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <Badge 
              key={tech}
              variant="outline"
              className="border-primary/30 text-primary/80 hover:border-primary hover:text-primary transition-colors duration-300"
            >
              {tech}
            </Badge>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 pt-2">
          <Button
            variant="outline"
            size="sm"
            className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary font-rajdhani"
            onClick={() => window.open(project.liveUrl, '_blank')}
          >
            <Eye className="mr-2 h-4 w-4" />
            Live Demo
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="border-secondary/50 text-secondary hover:bg-secondary/10 hover:border-secondary font-rajdhani"
            onClick={() => window.open(project.githubUrl, '_blank')}
          >
            <Github className="mr-2 h-4 w-4" />
            Code
          </Button>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-6 h-6 border border-primary/20 rotate-45 animate-rotate-slow opacity-50" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border border-secondary/20 rounded-full animate-pulse opacity-50" />
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
          y: 50,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [inView]);

  const projects = portfolioData.projects as Project[];

  return (
    <section 
      id="projects" 
      ref={sectionRef}
      className="py-20 px-4 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute top-32 right-20 w-40 h-40 border border-primary/20 rotate-45 animate-rotate-slow" />
      <div className="absolute bottom-32 left-20 w-32 h-32 border border-secondary/20 rounded-full animate-pulse-neon" />
      <div className="absolute top-1/2 left-1/4 w-20 h-20 border border-accent/20 rotate-12 animate-float" />
      
      <div ref={inViewRef} className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold neon-text mb-4">
            PROJECTS.JSON
          </h2>
          <p className="text-xl text-muted-foreground font-rajdhani max-w-2xl mx-auto">
            A collection of my digital creations, from web applications to interactive experiences
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full mt-6" />
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard 
              key={project.id}
              project={project}
              index={index}
            />
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="cyber-card p-8 rounded-2xl max-w-2xl mx-auto">
            <h3 className="text-2xl font-orbitron font-semibold text-gradient-neon mb-4">
              More Projects Coming Soon
            </h3>
            <p className="text-muted-foreground font-rajdhani mb-6">
              I'm constantly working on new projects and experiments. 
              Check out my GitHub for the latest updates and contributions.
            </p>
            <Button
              size="lg"
              className="border-glow bg-primary/10 hover:bg-primary/20 text-primary font-rajdhani font-semibold"
              onClick={() => window.open('https://github.com/alexcyber', '_blank')}
            >
              <Github className="mr-2 h-5 w-5" />
              View All Projects
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
