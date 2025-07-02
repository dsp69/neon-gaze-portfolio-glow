import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useInView } from 'react-intersection-observer';
import { 
  Mail, 
  Github, 
  MessageSquare, 
  Send, 
  User, 
  MapPin,
  Phone,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import portfolioData from '@/data/portfolio.json';

interface ContactInfo {
  icon: any;
  label: string;
  value: string;
  href?: string;
  color: string;
}

const contactInfo: ContactInfo[] = [
  {
    icon: Mail,
    label: "Email",
    value: "alex@cyber.dev",
    href: "mailto:alex@cyber.dev",
    color: "text-primary"
  },
  {
    icon: Github,
    label: "GitHub",
    value: "github.com/alexcyber",
    href: "https://github.com/alexcyber",
    color: "text-secondary"
  },
  {
    icon: MessageSquare,
    label: "WhatsApp",
    value: "+1 (555) 123-4567",
    href: "https://wa.me/15551234567",
    color: "text-accent"
  },
  {
    icon: MapPin,
    label: "Location",
    value: "The Matrix",
    color: "text-neon-purple"
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const { toast } = useToast();
  
  const { ref: inViewRef, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  useEffect(() => {
    if (!inView) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-item',
        { 
          opacity: 0,
          y: 30,
          scale: 0.95
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          stagger: 0.1
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [inView]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));

    toast({
      title: "Message Transmitted!",
      description: "Your message has been sent to the cyber realm. I'll get back to you soon!",
    });

    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  return (
    <section 
      id="contact" 
      ref={sectionRef}
      className="py-20 px-4 relative overflow-hidden"
    >
      {/* Background effects */}
      <div className="absolute top-32 left-20 w-40 h-40 border border-primary/20 rotate-45 animate-rotate-slow" />
      <div className="absolute bottom-20 right-20 w-32 h-32 border border-secondary/20 rounded-full animate-pulse-neon" />
      <div className="absolute top-1/2 left-1/4 w-20 h-20 border border-accent/20 rotate-12 animate-float" />
      
      <div ref={inViewRef} className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold neon-text-secondary mb-4">
            CONTACT.EXE
          </h2>
          <p className="text-xl text-muted-foreground font-rajdhani max-w-2xl mx-auto">
            Ready to collaborate on your next digital adventure? Let's connect in the cyber realm.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-secondary to-accent mx-auto rounded-full mt-6" />
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left side - Contact Info & Social */}
          <div className="space-y-8">
            {/* Contact information */}
            <div className="contact-item cyber-card p-8 rounded-2xl">
              <h3 className="text-2xl font-orbitron font-semibold text-gradient-cyber mb-6">
                Get In Touch
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={info.label} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 rounded-xl border border-primary/30 bg-primary/5 flex items-center justify-center group-hover:border-primary group-hover:bg-primary/10 transition-all duration-300">
                      <info.icon className={`h-5 w-5 ${info.color}`} />
                    </div>
                    
                    <div className="flex-1">
                      <p className="text-sm text-muted-foreground font-rajdhani">
                        {info.label}
                      </p>
                      {info.href ? (
                        <a 
                          href={info.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${info.color} hover:underline font-rajdhani font-medium transition-colors duration-300`}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className={`${info.color} font-rajdhani font-medium`}>
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div className="contact-item grid grid-cols-2 gap-4">
              <div className="cyber-card p-6 rounded-xl text-center">
                <Clock className="h-8 w-8 mx-auto mb-3 text-primary" />
                <p className="font-rajdhani font-medium text-foreground">Response Time</p>
                <p className="text-sm text-muted-foreground">&lt; 24 hours</p>
              </div>
              
              <div className="cyber-card p-6 rounded-xl text-center">
                <Phone className="h-8 w-8 mx-auto mb-3 text-secondary" />
                <p className="font-rajdhani font-medium text-foreground">Availability</p>
                <p className="text-sm text-muted-foreground">24/7 Digital</p>
              </div>
            </div>

            {/* Social links */}
            <div className="contact-item cyber-card p-8 rounded-2xl">
              <h4 className="text-lg font-orbitron font-semibold text-gradient-neon mb-6">
                Connect on Social
              </h4>
              
              <div className="flex gap-4">
                {Object.entries(portfolioData.social).map(([platform, url]) => {
                  if (platform === 'email') return null;
                  
                  const getPlatformIcon = (platform: string) => {
                    switch (platform) {
                      case 'github':
                        return Github;
                      case 'whatsapp':
                        return MessageSquare;
                      default:
                        return Mail;
                    }
                  };
                  
                  const Icon = getPlatformIcon(platform);
                  
                  return (
                    <Button
                      key={platform}
                      size="icon"
                      variant="outline"
                      className="border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300 group"
                      onClick={() => window.open(url, '_blank')}
                    >
                      <Icon className="h-5 w-5 text-primary group-hover:scale-110 transition-transform duration-300" />
                    </Button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right side - Contact Form */}
          <div className="contact-item">
            <div className="cyber-card p-8 rounded-2xl">
              <h3 className="text-2xl font-orbitron font-semibold text-gradient-neon mb-6">
                Send Message
              </h3>
              
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                {/* Name field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground font-rajdhani">
                    Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="pl-10 border-primary/30 focus:border-primary bg-background/50 backdrop-blur-sm"
                      placeholder="Your name"
                      required
                    />
                  </div>
                </div>

                {/* Email field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground font-rajdhani">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="pl-10 border-primary/30 focus:border-primary bg-background/50 backdrop-blur-sm"
                      placeholder="your.email@domain.com"
                      required
                    />
                  </div>
                </div>

                {/* Subject field */}
                <div className="space-y-2">
                  <Label htmlFor="subject" className="text-foreground font-rajdhani">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="border-primary/30 focus:border-primary bg-background/50 backdrop-blur-sm"
                    placeholder="What's this about?"
                    required
                  />
                </div>

                {/* Message field */}
                <div className="space-y-2">
                  <Label htmlFor="message" className="text-foreground font-rajdhani">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="border-primary/30 focus:border-primary bg-background/50 backdrop-blur-sm min-h-[120px] resize-none"
                    placeholder="Tell me about your project or idea..."
                    required
                  />
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full border-glow bg-primary/10 hover:bg-primary/20 text-primary font-rajdhani font-semibold group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent mr-2" />
                      Transmitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4 group-hover:scale-110 transition-transform duration-300" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}