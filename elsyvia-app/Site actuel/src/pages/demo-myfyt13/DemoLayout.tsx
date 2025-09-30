// src/pages/demo-myfyt13/DemoLayout.tsx
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { 
  BarChartBig, 
  BrainCircuit, 
  TrendingUp, 
  CalendarCheck, 
  SmilePlus,
  Home,
  Menu
} from 'lucide-react';

const modules = [
  { id: 0, title: "Accueil de la Démo", href: "/demo-myfyt13", icon: <Home /> },
  { id: 1, title: "Analyse Clients", href: "/demo-myfyt13/1-analyse-clients", icon: <BarChartBig /> },
  { id: 2, title: "Prédiction & Stock", href: "/demo-myfyt13/2-prediction-ventes", icon: <TrendingUp /> },
  { id: 3, title: "Marketing IA", href: "/demo-myfyt13/3-marketing-automation", icon: <BrainCircuit /> },
  { id: 4, title: "Besoins Saisonniers", href: "/demo-myfyt13/4-besoins-saisonniers", icon: <CalendarCheck /> },
  { id: 5, title: "Satisfaction Client", href: "/demo-myfyt13/5-satisfaction-client", icon: <SmilePlus /> }
];

interface DemoLayoutProps {
  children: React.ReactNode;
  pageTitle: string;
}

const SidebarContent = ({ setIsSidebarOpen }) => {
  const location = useLocation();
  return (
    <nav className="flex flex-col p-4 space-y-2">
      <h2 className="px-4 text-lg font-semibold tracking-tight text-white mb-4">Modules de la Démo</h2>
      {modules.map((module) => {
        const isActive = location.pathname === module.href;
        return (
          <Link
            key={module.id}
            to={module.href}
            onClick={() => setIsSidebarOpen(false)}
            className={`flex items-center p-3 rounded-lg transition-colors ${
              isActive 
                ? 'bg-blue-600/30 text-white font-semibold' 
                : 'text-gray-400 hover:bg-gray-700 hover:text-white'
            }`}
          >
            <div className="mr-3 w-6 h-6">{module.icon}</div>
            <span>{module.title}</span>
          </Link>
        );
      })}
    </nav>
  );
};

const DemoLayout: React.FC<DemoLayoutProps> = ({ children, pageTitle }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={`Démonstration Elsyvia pour myfyt13.com: ${pageTitle}`} />
      </Helmet>
      
      <div className="min-h-screen bg-gray-900 text-gray-100 font-sans">
        <div className="flex h-screen">
          <aside className="hidden lg:block w-80 bg-gray-800/50 border-r border-gray-700 h-full">
             <div className="p-6">
                <Link to="/demo-myfyt13">
                    <h1 className="text-2xl font-bold text-white">Elsyv<span className="text-blue-400">IA</span></h1>
                    <p className="text-sm text-gray-400">pour myfyt13.com</p>
                </Link>
            </div>
            <SidebarContent setIsSidebarOpen={setIsSidebarOpen} />
          </aside>

          <main className="flex-1 p-6 md:p-10 min-w-0 overflow-y-auto">
            <div className="lg:hidden flex justify-between items-center mb-6">
                <Link to="/demo-myfyt13">
                    <h1 className="text-2xl font-bold text-white">Elsyv<span className="text-blue-400">IA</span> Démo</h1>
                </Link>
                <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 rounded-md hover:bg-gray-700">
                    <Menu className="w-6 h-6"/>
                </button>
            </div>
            
            {isSidebarOpen && (
                <div className="lg:hidden mb-8 bg-gray-800 rounded-lg">
                    <SidebarContent setIsSidebarOpen={setIsSidebarOpen} />
                </div>
            )}
            
            {children}
          </main>
        </div>
      </div>
    </>
  );
};

export default DemoLayout;
