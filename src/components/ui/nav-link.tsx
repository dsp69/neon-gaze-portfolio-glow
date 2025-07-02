import { useState } from 'react';

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function NavLink({ href, children, className = '', onClick }: NavLinkProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    onClick?.();
  };

  return (
    <a
      href={href}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        relative px-4 py-2 text-sm font-medium transition-all duration-300
        ${isHovered ? 'text-primary' : 'text-foreground/80'}
        hover:text-primary
        ${className}
      `}
    >
      {children}
      
      {/* Animated underline */}
      <span 
        className={`
          absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-primary to-secondary
          transition-all duration-300 ease-out
          ${isHovered ? 'w-full' : 'w-0'}
        `}
      />
      
      {/* Glow effect on hover */}
      {isHovered && (
        <span 
          className="absolute inset-0 -z-10 bg-primary/10 blur-sm rounded"
          style={{
            boxShadow: '0 0 20px hsl(var(--primary) / 0.3)'
          }}
        />
      )}
    </a>
  );
}