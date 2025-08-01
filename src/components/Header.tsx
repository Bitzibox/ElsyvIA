// Remplacez le contenu de : src/components/Header.tsx

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logoImage from './logo-elsyvia.png'; 
import { Link, useLocation } from 'react-router-dom';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const menuItems = [
    { name: 'Accueil', href: '/' },
    { name: 'À propos', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Notre Assistant Elsy', href: '/assistant-ia' },
    { name: 'Cas d\'usage', href: '#usecases' },
    { name: 'Contact', href: '#contact' },
    { name: 'Blog', href: '/blog' },
  ];

  const handleNavClick = (href: string) => {
    setIsMenuOpen(false);
    onNavigate(href);
  };

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" onClick={() => handleNavClick('/')}>
            <img src={logoImage} alt="Logo Elsyvia" className="h-24 w-auto" />
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                className={`text-lg font-medium transition-colors duration-300 relative pb-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-teal-600 after:scale-x-0 after:origin-left after:transition-transform after:duration-300 hover:after:scale-x-100 ${location.pathname === item.href ? 'text-teal-600 after:scale-x-100' : 'text-gray-700'}`}
              >
                {item.name}
              </a>
            ))}
          </nav>
          <div className="hidden md:block">
            <a
              href="https://calendly.com/contact-elsyvia/30min"
              target="_blank" 
              rel="noopener noreferrer"
              className="text-lg bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Prenez un rdv GRATUITEMENT
            </a>
          </div>
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100 py-4">
            <nav className="flex flex-col items-center space-y-4">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(item.href); }}
                  className="text-lg text-gray-700 hover:text-teal-600 font-medium px-4 py-2 transition-colors duration-200"
                >
                  {item.name}
                </a>
              ))}
              <a
                href="https://calendly.com/contact-elsyvia/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg bg-gradient-to-r from-teal-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium mt-4 text-center w-full"
              >
                Prenez un rdv GRATUITEMENT
              </a>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
