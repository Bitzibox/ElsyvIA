// Créez ce nouveau fichier : src/components/Testimonials.tsx

import React, { useState, useEffect } from 'react';

const testimonials = [
  {
    quote: "ElsyvIA a transformé notre façon de travailler. L'automatisation de nos processus nous a fait gagner un temps précieux que nous pouvons maintenant consacrer à nos missions à forte valeur ajoutée.",
    author: "Directeur d'une collectivité territoriale"
  },
  {
    quote: "L'atelier sur l'IA générative a été une révélation pour notre équipe marketing. Nous sommes maintenant beaucoup plus créatifs et productifs dans la création de nos contenus.",
    author: "Responsable Marketing, PME"
  },
  {
    quote: "Nous étions sceptiques au début, mais l'approche pragmatique d'ElsyvIA nous a permis de mettre en place un premier chatbot efficace en quelques semaines seulement. Le retour sur investissement est évident.",
    author: "Gérant d'une entreprise de services"
  }
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 7000); // Change de témoignage toutes les 7 secondes

    return () => clearInterval(timer); // Nettoie le timer quand le composant est retiré
  }, []);

  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="bg-gradient-to-r from-teal-600 to-blue-600 rounded-2xl p-8 md:p-12 text-white text-center relative overflow-hidden min-h-[280px] flex items-center">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center p-6 transition-opacity duration-1000"
              style={{ opacity: index === currentIndex ? 1 : 0 }}
            >
              <blockquote className="text-xl md:text-2xl font-medium mb-6 max-w-4xl">
                "{testimonial.quote}"
              </blockquote>
              <cite className="text-blue-100 not-italic">
                {testimonial.author}
              </cite>
            </div>
          ))}
        </div>

        {/* Indicateurs (points) en bas */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-colors ${currentIndex === index ? 'bg-teal-600' : 'bg-gray-300 hover:bg-gray-400'}`}
              aria-label={`Aller au témoignage ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
