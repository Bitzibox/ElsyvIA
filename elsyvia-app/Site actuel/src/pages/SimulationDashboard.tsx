import React from 'react';
import DashboardSimulation from '../components/DashboardSimulation';

interface SimulationDashboardProps {
  // Props de la page si besoin
}

const SimulationDashboard: React.FC<SimulationDashboardProps> = () => {
  return (
    <div>
      {/* Votre header/nav existant si besoin */}
      <DashboardSimulation />
      {/* Votre footer existant si besoin */}
    </div>
  );
};

export default SimulationDashboard;
