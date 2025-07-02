import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useInView } from 'react-intersection-observer';
import { Code, Zap, Rocket, Shield } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { name: "React/Next.js", level: 95, color: "from-primary to-neon-blue" },
  { name: "TypeScript", level: 90, color: "from-secondary to-neon-purple" },
  { name: "Three.js/WebGL", level: 85, color: "from-accent to-neon-green" },
  { name: "Node.js", level: 88, color: "from-neon-pink to-primary" },
  { name: "Python", level: 82, color: "from-cyber-yellow to-accent" },
  { name: "Cybersecurity", level: 78, color: "from-neon-purple to-secondary" }
];

const features = [
  {
    icon: Code,
    title: "Clean Code",
    description: "Writing maintainable, scalable code with modern best practices and design patterns."
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Optimizing applications for lightning-fast load times and smooth user experiences."
  },
  {
    icon: Rocket,
    title: "Innovation",
    description: "Pushing boundaries with cutting-edge technologies and creative solutions."
  },
  {
    icon: Shield,
    title: "Security",
    description: "Implementing robust security measures to protect data and user privacy."
  }
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (!inView) return;

    const ctx = gsap.context(() => {
      // Animate skill bars
      gsap.fromTo(
        '.skill-bar',
        { width: '0%' },
        { 
          width: (i, target) => target.dataset.level + '%',
          duration: 1.5,
          ease: 'power2.out',
          stagger: 0.2,
          delay: 0.5
        }
      );

      // Animate feature cards
      gsap.fromTo(
        '.feature-card',
        { 
          opacity: 0,
          y: 50,
          scale: 0.9
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          stagger: 0.1,
          delay: 0.3
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, [inView]);

  return (
    <section 
      id="about" 
      ref={sectionRef}
      className="py-20 px-4 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute top-20 left-10 w-32 h-32 border border-primary/20 rotate-45 animate-rotate-slow" />
      <div className="absolute bottom-20 right-10 w-24 h-24 border border-secondary/20 rounded-full animate-pulse-neon" />
      
      <div ref={inViewRef} className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold neon-text-secondary mb-4">
            ABOUT_ME.EXE
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary to-secondary mx-auto rounded-full" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Bio and Description */}
          <div className="space-y-8">
            <div className="cyber-card p-8 rounded-2xl">
              <h3 className="text-2xl font-orbitron font-semibold text-gradient-cyber mb-6">
                Digital Architect
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                A passionate developer who lives at the intersection of creativity and code. 
                I specialize in building immersive web experiences with cutting-edge technologies, 
                bringing futuristic visions to life through elegant code and innovative design.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                When I'm not coding, you'll find me exploring the latest in AI, cybersecurity, 
                and emerging web technologies. I believe in the power of technology to shape 
                the future and create meaningful digital experiences.
              </p>
            </div>

            {/* Feature Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => (
                <div 
                  key={feature.title}
                  className="feature-card cyber-card p-6 rounded-xl text-center group"
                >
                  <feature.icon className="h-8 w-8 mx-auto mb-3 text-primary group-hover:text-secondary transition-colors duration-300" />
                  <h4 className="font-rajdhani font-semibold text-foreground mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Skills */}
          <div ref={skillsRef} className="space-y-8">
            <div className="cyber-card p-8 rounded-2xl">
              <h3 className="text-2xl font-orbitron font-semibold text-gradient-neon mb-8">
                Tech_Stack.json
              </h3>
              
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <div key={skill.name} className="group">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-rajdhani font-medium text-foreground">
                        {skill.name}
                      </span>
                      <span className="text-sm text-primary font-mono">
                        {skill.level}%
                      </span>
                    </div>
                    
                    <div className="relative h-3 bg-muted rounded-full overflow-hidden">
                      {/* Background track with subtle glow */}
                      <div className="absolute inset-0 bg-gradient-to-r from-muted to-muted-foreground/20 rounded-full" />
                      
                      {/* Skill progress bar */}
                      <div 
                        className={`skill-bar h-full bg-gradient-to-r ${skill.color} rounded-full relative overflow-hidden`}
                        data-level={skill.level}
                      >
                        {/* Animated shine effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
                      </div>
                      
                      {/* Glow effect on hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className={`h-full bg-gradient-to-r ${skill.color} rounded-full blur-sm`} 
                             style={{ width: `${skill.level}%` }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { number: "50+", label: "Projects" },
                { number: "3+", label: "Years" },
                { number: "∞", label: "Coffee" }
              ].map((stat, index) => (
                <div key={stat.label} className="cyber-card p-4 rounded-xl text-center">
                  <div className="text-2xl font-orbitron font-bold text-gradient-cyber mb-1">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground font-rajdhani">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}