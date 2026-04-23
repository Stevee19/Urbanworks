import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Hero = () => {
  const { ref, isVisible } = useScrollAnimation(0.2);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-[url('/images/bg1.png')] bg-center bg-cover overflow-hidden"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/95 to-primary/85"></div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cdefs%3E%3Cpattern id='grid' width='10' height='10' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 10 0 L 0 0 0 10' fill='none' stroke='rgba(255,255,255,0.03)' stroke-width='0.5'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100' height='100' fill='url(%23grid)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      {/* Content */}
      <div ref={ref} className={`hero-content relative z-10 w-full max-w-full px-4 sm:px-6 md:px-12 lg:px-20 xl:px-28 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-12 text-left transition-all duration-1000 overflow-x-hidden ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
        {/* Left: Text Content */}
        <div className="hero-text flex-1 min-w-0 max-w-full text-center md:text-left">
          <span className="inline-block text-xs sm:text-sm font-semibold uppercase tracking-[0.20em] sm:tracking-[0.25em] text-accent mb-4 sm:mb-6 px-4 sm:px-6 py-2 border border-accent/30 rounded-full">
            Engineers | Builders
          </span>

          <h1 className="leading-tight mb-4 sm:mb-6 uppercase" style={{ lineHeight: '1.2' }}>
            <span className="block text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl" style={{ fontWeight: 800 }}>
              <span className="text-gray">Urban</span>
              <span className="text-accent">works</span>
            </span>
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white" style={{ fontWeight: 800, marginTop: '12px' }}>Construction</span>
            <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-white" style={{ fontWeight: 800, marginTop: '8px' }}>& Development</span>
          </h1>

          <p className="text-xs sm:text-sm md:text-base font-light mb-6 sm:mb-8 tracking-[0.30em] sm:tracking-[0.40em] uppercase">
            <span className="text-white">Architectural</span>{' '}
            <span className="text-gray">And</span>{' '}
            <span className="text-white">Engineering</span>{' '}
            <span className="text-gray">Services</span>
          </p>

          <div className="hero-buttons flex flex-wrap gap-4 sm:gap-6 justify-center md:justify-start">
            <a href="#contact" className="btn-primary text-sm sm:text-base px-4 sm:px-6 py-2.5 sm:py-3">
              Get a Quote
            </a>
            <Link to="/projects" className="btn-outline text-sm sm:text-base px-4 sm:px-6 py-2.5 sm:py-3">
              View Our Projects
            </Link>
          </div>

          {/* Logo - Below buttons on mobile, hidden on desktop */}
          <div className="mt-8 md:hidden">
            <img
              src="/images/logo.jpg"
              alt="Urbanworks Logo"
              className="w-48 sm:w-56 h-auto mx-auto shadow-2xl"
            />
          </div>
        </div>

        {/* Right: Logo - Only visible on desktop */}
        <div className="hidden md:flex flex-shrink-0">
          <img
            src="/images/logo.jpg"
            alt="Urbanworks Logo"
            className="w-64 lg:w-72 xl:w-80 h-auto shadow-2xl"
          />
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 left-1/2 -translate-x-1/2 z-10 animate-fade-in-up">
        <a
          href="#about"
          className="flex flex-col items-center gap-1 sm:gap-2 text-gray-light text-[10px] sm:text-xs uppercase tracking-wider animate-bounce-slow hover:text-accent transition-colors duration-300"
          aria-label="Scroll to about section"
        >
          <span className="font-medium">Scroll Down</span>
          <ChevronDown className="w-5 h-5 sm:w-6 sm:h-6" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
