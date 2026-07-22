import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ProjectProvider, useProject } from './context/ProjectContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DashboardPage } from './components/pages/DashboardPage';
import { OrchestratorPage } from './components/pages/OrchestratorPage';
import { PostStudioPage } from './components/pages/PostStudioPage';
import { ProjectsPage } from './components/pages/ProjectsPage';
import { RagMemoryPage } from './components/pages/RagMemoryPage';
import { AnalyticsPage } from './components/pages/AnalyticsPage';
import { SettingsPage } from './components/pages/SettingsPage';

const AppContent: React.FC = () => {
  const { activePage } = useProject();

  const renderActivePage = () => {
    switch (activePage) {
      case 'dashboard':
        return <DashboardPage />;
      case 'orchestrator':
        return <OrchestratorPage />;
      case 'studio':
        return <PostStudioPage />;
      case 'projects':
        return <ProjectsPage />;
      case 'rag':
        return <RagMemoryPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <DashboardPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-200 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
      <Navbar />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {renderActivePage()}
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <ProjectProvider>
        <AppContent />
      </ProjectProvider>
    </ThemeProvider>
  );
}

