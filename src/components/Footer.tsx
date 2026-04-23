import { Mail, Phone, MapPin, FileBadge } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const hideQuickLinks = location.pathname === '/projects';

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <footer className="bg-primary-dark text-white py-12 sm:py-16">
      <div className="max-w-container mx-auto px-4 sm:px-6">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-12 pb-8 sm:pb-12 border-b border-primary-light">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              <img src="/images/logo.jpg" alt="Urbanworks Logo" className="h-10 sm:h-12 w-auto rounded" />
              <div>
                <span className="block text-base sm:text-xl text-accent font-extrabold uppercase tracking-wide">
                  Urbanworks
                </span>
                <span className="block text-[10px] sm:text-sm uppercase tracking-widest">
                  Construction Sevices
                </span>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-light leading-relaxed">
              Building dreams since 2019. PCAB Licensed construction company
              committed to excellence across the Philippines.
            </p>
          </div>

          {/* Quick Links */}
          {!hideQuickLinks && (
          <div>
            <h4 className="text-sm sm:text-base font-bold uppercase tracking-wide mb-3 sm:mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-light hover:text-accent transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          )}

          {/* Contact Info */}
          <div>
            <h4 className="text-sm sm:text-base font-bold uppercase tracking-wide mb-3 sm:mb-4">
              Contact
            </h4>
            <div className="space-y-2 sm:space-y-3">
              <p className="text-sm text-gray-light flex items-center gap-2">
                <Mail size={16} className="text-accent flex-shrink-0" />
                urban.worksservice@gmail.com
              </p>
              <p className="text-sm text-gray-light flex items-center gap-2">
                <Phone size={16} className="text-accent flex-shrink-0" />
                +63 912 345 6789
              </p>
              <a 
                href="https://www.facebook.com/urbanworksservice"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-light flex items-center gap-2 hover:text-accent transition-colors duration-200"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="currentColor" 
                  className="w-4 h-4 text-accent flex-shrink-0"
                >
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Urbanworks Construction and Development
              </a>
              {/* <p className="text-sm text-gray-light flex items-center gap-2">
                <MapPin size={16} className="text-accent flex-shrink-0" />
                Philippines
              </p> */}
              <p className="text-sm text-gray-light flex items-center gap-2">
                <FileBadge size={16} className="text-accent flex-shrink-0" />
                <span>
                  PCAB Licensed<br />
                  License No. 56616, Category D
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 pt-6 sm:pt-8 text-center sm:text-left">
          <p className="text-xs sm:text-sm text-gray">
            © {new Date().getFullYear()} Urbanworks Construction & Development.
            All rights reserved.
          </p>
          <p className="text-xs sm:text-sm text-gray">
            PCAB Licensed | Category D
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
