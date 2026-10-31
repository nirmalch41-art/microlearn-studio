import React, { useState } from 'react';
import { useLearning } from './context/LearningContext';
import { Navbar } from './components/layout/Navbar';
import { Sidebar } from './components/layout/Sidebar';
import { Footer } from './components/layout/Footer';
import { SearchModal } from './components/layout/SearchModal';

// Views
import { DashboardView } from './components/views/DashboardView';
import { MicrocontrollersView } from './components/views/MicrocontrollersView';
import { PinConfigurationView } from './components/views/PinConfigurationView';
import { SensorLibraryView } from './components/views/SensorLibraryView';
import { VirtualLabView } from './components/views/VirtualLabView';
import { ProjectLibraryView } from './components/views/ProjectLibraryView';
import { DatasetExplorerView } from './components/views/DatasetExplorerView';
import { CommunicationProtocolsView } from './components/views/CommunicationProtocolsView';
import { ProgrammingTutorialsView } from './components/views/ProgrammingTutorialsView';
import { QuizzesView } from './components/views/QuizzesView';
import { LearningProgressView } from './components/views/LearningProgressView';

export const App: React.FC = () => {
  const { activeTab } = useLearning();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardView />;
      case 'microcontrollers':
        return <MicrocontrollersView />;
      case 'pin-configuration':
        return <PinConfigurationView />;
      case 'sensors':
        return <SensorLibraryView />;
      case 'virtual-lab':
        return <VirtualLabView />;
      case 'projects':
        return <ProjectLibraryView />;
      case 'datasets':
        return <DatasetExplorerView />;
      case 'protocols':
        return <CommunicationProtocolsView />;
      case 'tutorials':
        return <ProgrammingTutorialsView />;
      case 'quizzes':
        return <QuizzesView />;
      case 'progress':
        return <LearningProgressView />;
      default:
        return <DashboardView />;
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* Global Navbar */}
      <Navbar 
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} 
        isSidebarOpen={isSidebarOpen} 
      />

      {/* Main Layout Area */}
      <div className="flex-1 flex">
        
        {/* Navigation Sidebar */}
        <Sidebar 
          isOpen={isSidebarOpen} 
          onClose={() => setIsSidebarOpen(false)} 
        />

        {/* Content Container (Offset by Sidebar on Desktop) */}
        <main className="flex-1 lg:pl-72 flex flex-col min-w-0">
          <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
            {renderActiveView()}
          </div>
          
          {/* Global Footer */}
          <Footer />
        </main>
      </div>

      {/* Global Command / Search Modal */}
      <SearchModal />

    </div>
  );
};
