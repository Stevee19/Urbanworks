import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header = ({ solid = false, noNav = false }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Vision & Mission', href: '#vision-mission' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Team', href: '#team' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          solid || isScrolled ? 'bg-primary shadow-lg' : 'bg-primary/95 backdrop-blur-sm'
        }`}
      >
        <nav className="max-w-container mx-auto flex items-center justify-between h-16 sm:h-18 md:h-20 px-4 sm:px-6" style={{ maxWidth: 'min(1200px, 100vw - 2rem)' }}>
          {/* Logo */}
          {location.pathname === '/' ? (
            <a href="#home" className="flex items-center gap-2 sm:gap-3 leading-tight">
              <img src="/images/logo.jpg" alt="Urbanworks Logo" className="h-8 sm:h-9 md:h-10 w-auto" />
              <div className="flex flex-col">
                <span className="text-sm sm:text-base md:text-lg text-accent uppercase tracking-wide" style={{ fontWeight: 800 }}>
                  Urbanworks
                </span>
                <span className="text-[10px] sm:text-xs font-medium text-white uppercase tracking-widest">
                  Construction Services
                </span>
              </div>
            </a>
          ) : (
            <Link to="/" className="flex items-center gap-2 sm:gap-3 leading-tight">
              <img src="/images/logo.jpg" alt="Urbanworks Logo" className="h-8 sm:h-9 md:h-10 w-auto" />
              <div className="flex flex-col">
                <span className="text-sm sm:text-base md:text-lg text-accent uppercase tracking-wide" style={{ fontWeight: 800 }}>
                  Urbanworks
                </span>
                <span className="text-[10px] sm:text-xs font-medium text-white uppercase tracking-widest">
                  Construction Services
                </span>
              </div>
            </Link>
          )}

          {/* Desktop Navigation - Shows at 940px and above */}
          {noNav ? (
            <Link to="/" className="desktop-back-link text-xs sm:text-sm font-medium text-accent hover:underline flex items-center gap-1">
              ← Back to Home
            </Link>
          ) : (
            <ul className="desktop-nav items-center gap-6 lg:gap-8">
              {navLinks.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('#') ? (
                    <a
                      href={link.href}
                      className="text-xs sm:text-sm font-medium text-white tracking-wide py-1 relative group"
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className="text-xs sm:text-sm font-medium text-white tracking-wide py-1 relative group"
                    >
                      {link.name}
                      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent transition-all duration-300 group-hover:w-full"></span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          )}

          {/* Mobile Menu Toggle - Shows below 940px */}
          {noNav ? (
            <Link to="/" className="mobile-back-link text-xs sm:text-sm font-medium text-accent hover:underline flex items-center gap-1">
              ← Back to Home
            </Link>
          ) : (
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="mobile-menu-toggle text-white p-2 min-w-[44px] min-h-[44px] items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200 backdrop-blur-sm"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              <Menu size={20} className="w-5 h-5 text-white" strokeWidth={2.5} />
            </button>
          )}
        </nav>
      </header>

      {/* Mobile Menu - Rendered outside header to avoid backdrop-filter issues */}
      {!noNav && (
        <>
          {/* Overlay */}
          <div
            className={`fixed inset-0 bg-black/50 z-[55] transition-opacity duration-300 md:hidden ${
              isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
            }`}
            onClick={() => setIsMenuOpen(false)}
            aria-hidden="true"
          />
          {/* Sidebar */}
          <div
            className={`fixed top-0 right-0 w-4/5 max-w-sm h-full bg-primary p-6 sm:p-8 transition-transform duration-300 shadow-2xl z-[60] mobile-sidebar hidden ${
              isMenuOpen ? 'translate-x-0 pointer-events-auto' : 'translate-x-full pointer-events-none'
            }`}
          >
            <button
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-4 sm:top-6 right-4 sm:right-6 text-white p-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg hover:bg-white/10 transition-colors duration-200"
              aria-label="Close menu"
            >
              <X size={24} className="w-6 h-6" strokeWidth={2.5} />
            </button>
            <ul className="flex flex-col gap-1 mt-14 sm:mt-16">
              {navLinks.map((link) => (
                <li key={link.name}>
                  {link.href.startsWith('#') ? (
                    <a
                      href={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-base font-medium text-white tracking-wide leading-tight py-2 block hover:text-accent transition-colors duration-200 min-h-[44px] flex items-center"
                    >
                      {link.name}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-base font-medium text-white tracking-wide leading-tight py-2 block hover:text-accent transition-colors duration-200 min-h-[44px] flex items-center"
                    >
                      {link.name}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default Header;
