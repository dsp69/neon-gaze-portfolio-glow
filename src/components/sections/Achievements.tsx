import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';
import { 
  Shield, 
  Code, 
  Brain, 
  Trophy, 
  GitBranch,
  Award,
  Calendar,
  Star
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import portfolioData from '@/data/portfolio.json';

const iconMap = {
  shield: Shield,
  code: Code,
  brain: Brain,
  trophy: Trophy,
  'git-branch': GitBranch,
  award: Award
};

interface Achievement {
  id: number;
  title: string;
  organization: string;
  date: string;
  description: string;
  score: string;
  icon: keyof typeof iconMap;
}

const AchievementCard = ({ achievement, index, isLast }: { 
  achievement: Achievement; 
  index: number; 
  isLast: boolean;
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const IconComponent = iconMap[achievement.icon] || Award;

  return (
    <div ref={cardRef} className="achievement-card relative flex items-start gap-6 group">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-primary/50 to-transparent" />
      )}
      
      {/* Icon bubble */}
      <div className="relative z-10 flex-shrink-0">
        <div className="w-12 h-12 rounded-full border-2 border-primary/50 bg-background flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-500">
          <IconComponent className="h-6 w-6 text-primary group-hover:text-primary transition-colors duration-300" />
        </div>
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>
      
      {/* Content card */}
      <div className="flex-1 cyber-card p-6 rounded-xl ml-2 group-hover:scale-[1.02] transition-all duration-300">
        {/* Header with title and date */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
          <h3 className="text-lg font-orbitron font-semibold text-gradient-cyber">
            {achievement.title}
          </h3>
          <Badge 
            variant="outline"
            className="border-accent/50 text-accent self-start sm:self-center"
          >
            <Calendar className="h-3 w-3 mr-1" />
            {achievement.date}
          </Badge>
        </div>
        
        {/* Organization */}
        <div className="flex items-center gap-2 mb-3">
          <Star className="h-4 w-4 text-secondary" />
          <span className="font-rajdhani font-medium text-secondary">
            {achievement.organization}
          </span>
        </div>
        
        {/* Description */}
        <p className="text-muted-foreground font-rajdhani leading-relaxed mb-4">
          {achievement.description}
        </p>
        
        {/* Score/Result */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground font-rajdhani">
              Result:
            </span>
            <Badge className="bg-gradient-to-r from-primary/20 to-secondary/20 text-primary border-primary/30">
              {achievement.score}
            </Badge>
          </div>
          
          {/* Achievement number */}
          <div className="text-xs text-muted-foreground/50 font-mono">
            #{achievement.id.toString().padStart(3, '0')}
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-2 right-2 w-4 h-4 border border-primary/20 rotate-45 animate-rotate-slow opacity-50" />
        <div className="absolute bottom-2 left-2 w-3 h-3 border border-secondary/20 rounded-full animate-pulse opacity-50" />
      </div>
    </div>
  );
};

export default function Achievements() {
  const sectionRef = useRef<HTMLElement>(null);
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (!inView) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.achievement-card',
        { 
          opacity: 0,
          x: -50,
          scale: 0.95
        },
        {
          opacity: 1,
          x: 0,
          scale: 1,
          duration: 0.8,
          ease: 'power3.out',
          stagger: 0.2
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [inView]);

  const achievements = portfolioData.achievements as Achievement[];

  return (
    <section 
      id="achievements" 
      ref={sectionRef}
      className="py-20 px-4 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute top-20 right-10 w-32 h-32 border border-primary/20 rotate-45 animate-rotate-slow" />
      <div className="absolute bottom-32 left-10 w-24 h-24 border border-secondary/20 rounded-full animate-pulse-neon" />
      <div className="absolute top-1/2 right-1/4 w-16 h-16 border border-accent/20 rotate-12 animate-float" />
      
      <div ref={inViewRef} className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold neon-text-accent mb-4">
            ACHIEVEMENTS.LOG
          </h2>
          <p className="text-xl text-muted-foreground font-rajdhani max-w-2xl mx-auto">
            Milestones and certifications in my journey through the digital realm
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-primary mx-auto rounded-full mt-6" />
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Stats overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {[
              { label: "Certifications", value: "5+" },
              { label: "Awards", value: "3" },
              { label: "Competitions", value: "12" },
              { label: "Score Average", value: "94%" }
            ].map((stat, index) => (
              <div 
                key={stat.label}
                className="cyber-card p-4 rounded-xl text-center group hover:scale-105 transition-all duration-300"
              >
                <div className="text-2xl font-orbitron font-bold text-gradient-cyber mb-1 group-hover:text-gradient-neon transition-all duration-300">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-rajdhani">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Main timeline background */}
            <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/20 via-secondary/20 to-accent/20" />
            
            {/* Achievement cards */}
            <div className="space-y-8">
              {achievements.map((achievement, index) => (
                <AchievementCard 
                  key={achievement.id}
                  achievement={achievement}
                  index={index}
                  isLast={index === achievements.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Call to action */}
          <div className="text-center mt-16">
            <div className="cyber-card p-8 rounded-2xl">
              <h3 className="text-2xl font-orbitron font-semibold text-gradient-neon mb-4">
                Always Learning
              </h3>
              <p className="text-muted-foreground font-rajdhani mb-6 max-w-2xl mx-auto">
                The tech world never stops evolving, and neither do I. Currently pursuing advanced 
                certifications in AI/ML and quantum computing to stay at the cutting edge.
              </p>
              <div className="flex justify-center gap-4">
                <Badge className="bg-primary/20 text-primary border-primary/50">
                  Next: Quantum Computing
                </Badge>
                <Badge className="bg-secondary/20 text-secondary border-secondary/50">
                  Next: Advanced AI
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}