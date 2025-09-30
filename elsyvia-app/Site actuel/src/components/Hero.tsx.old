import React from 'react';
import { ArrowRight, Zap, Users, TrendingUp } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-slide-up">
            L'IA accessible,{' '}
            <span className="gradient-text">pragmatique</span> et{' '}
            <span className="gradient-text">humaine</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed animate-fade-in">
            ElsyvIA transforme votre quotidien professionnel grâce à l'intelligence artificielle.
            Conseil, intégration et formation pour rendre l'IA accessible à tous.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16 animate-slide-up">
            <a
              href="#services"
              className="bg-gradient-to-r from-teal-600 to-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
            >
              <span>Découvrez nos offres</span>
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href="#contact"
              className="border-2 border-teal-600 text-teal-600 px-8 py-4 rounded-lg font-semibold hover:bg-teal-600 hover:text-white transition-all duration-300"
            >
              Prenez RDV gratuitement
            </a>
          </div>

          {/* Benefits Cards */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-white p-6 rounded-xl shadow-lg card-hover">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Gain de temps</h3>
              <p className="text-gray-600">
                Automatisez vos tâches répétitives et concentrez-vous sur l'essentiel
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg card-hover">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Simplification</h3>
              <p className="text-gray-600">
                Des solutions sur-mesure adaptées à vos besoins et votre niveau
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg card-hover">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Montée en compétence</h3>
              <p className="text-gray-600">
                Formations pratiques pour rendre vos équipes autonomes
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;