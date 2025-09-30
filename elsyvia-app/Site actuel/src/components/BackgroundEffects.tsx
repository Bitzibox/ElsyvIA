import React, { useEffect, useState } from 'react';

const BackgroundEffects = () => {
  const [particles, setParticles] = useState<Array<{ id: number; left: number; delay: number }>>([]);

  useEffect(() => {
    // Generate random particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 15
    }));
    setParticles(newParticles);
  }, []);

  return (
    <>
      {/* Main AI Background */}
      <div className="ai-background" />
      
      {/* Neural Network Dots */}
      <div className="neural-dots">
        <div className="neural-dot" />
        <div className="neural-dot" />
        <div className="neural-dot" />
        <div className="neural-dot" />
        <div className="neural-dot" />
        <div className="neural-dot" />
      </div>
      
      {/* Floating Particles */}
      <div className="ai-particles">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.delay}s`
            }}
          />
        ))}
      </div>
    </>
  );
};

export default BackgroundEffects;