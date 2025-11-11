import { useEffect } from 'react';
import { Header } from '../components/Header';
import { PagesSidebar } from '../components/PagesSidebar';
import { Toolbar } from '../components/Toolbar';
import { Canvas } from '../components/Canvas';
import { PropertiesPanel } from '../components/PropertiesPanel';
import { useBuilderStore } from '../store/useBuilderStore';
import { useAutosave } from '../hooks/useAutosave';

export const Builder = () => {
  const { initializeProject, project } = useBuilderStore();  //edit etc the store update ui auto refresh

  useEffect(() => {
    initializeProject();
  }, [initializeProject]);

  useAutosave(2000);

  return (
    <div className={project.theme === 'dark' ? 'dark' : ''}>
      <div className="h-screen flex flex-col bg-gray-50 dark:bg-gray-800">
        <Header />
        <div className="flex-1 flex overflow-hidden">
          <PagesSidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <Toolbar />
            <Canvas />
          </div>
          <PropertiesPanel />
        </div>
      </div>
    </div>
  );
};
