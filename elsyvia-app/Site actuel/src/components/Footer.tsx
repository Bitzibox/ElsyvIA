// Remplacez le contenu de : src/components/Footer.tsx

import React from 'react';
import { Mail, Linkedin } from 'lucide-react';
// 1. On importe votre nouveau logo
import logoImage from './Logo-Elsyvia.png';
import { Link } from 'react-router-dom';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const currentYear = new Date().getFullYear();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    onNavigate(sectionId);
  };

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="lg:col-span-2">
            
            {/* 2. L'ancien logo est remplacé par la nouvelle image, plus grande */}
            <a href="#home" onClick={(e) => handleNavClick(e, '#home')} className="mb-4 inline-block">
              <img src={logoImage} alt="Logo Elsyvia" className="h-16 w-auto" />
            </a>
            
            <p className="text-gray-300 mb-6 max-w-md">
              Votre partenaire de confiance pour démocratiser l'intelligence artificielle
              et transformer votre organisation avec des solutions sur-mesure.
            </p>
            <div className="flex space-x-4">
              <a
                href="mailto:contact@elsyvia.com"
                aria-label="Contact par email"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/elsyvia"
                aria-label="Page LinkedIn ElsyvIA"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-gray-700 transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-white transition-colors">Conseil en stratégie IA</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-white transition-colors">Intégration sur-mesure</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-white transition-colors">Formation & Acculturation</a></li>
              <li><a href="#services" onClick={(e) => handleNavClick(e, '#services')} className="hover:text-white transition-colors">Secteur public</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Entreprise</h3>
            <ul className="space-y-2 text-gray-300">
              <li><a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="hover:text-white transition-colors">À propos</a></li>
              <li><a href="#blog" onClick={(e) => handleNavClick(e, '#blog')} className="hover:text-white transition-colors">Blog</a></li>
              <li><a href="#contact" onClick={(e) => handleNavClick(e, '#contact')} className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {currentYear} ElsyvIA. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="/mentions-legales" className="text-gray-400 hover:text-white text-sm transition-colors">
                Mentions légales
              </a>
              <a href="/politique-confidentialite" className="text-gray-400 hover:text-white text-sm transition-colors">
                Politique de confidentialité
              </a>
              <a href="/cgv" className="text-gray-400 hover:text-white text-sm transition-colors">
                CGV
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
