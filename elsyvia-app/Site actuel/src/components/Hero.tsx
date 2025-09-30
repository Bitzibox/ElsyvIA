// Remplacez le contenu de : src/components/Hero.tsx

import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center text-center">
      <div className="relative z-10 container mx-auto px-4 text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-up">
            L'IA accessible,{' '}
            <span className="gradient-text">pragmatique</span> et{' '}
            <span className="gradient-text">humaine</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-8 leading-relaxed animate-fade-in">
            ElsyvIA transforme votre quotidien professionnel grâce à l'intelligence artificielle. Conseil, intégration et formation pour rendre l'IA accessible à tous.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <a
              href="#services"
              className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Découvrez nos offres</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="https://calendly.com/contact-elsyvia/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-all duration-300"
            >
              Prenez RDV gratuitement
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
