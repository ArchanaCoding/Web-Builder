import { Save, Sun, Moon, Eye } from 'lucide-react';
import { useBuilderStore } from '../store/useBuilderStore'; 
import { useNavigate } from 'react-router-dom';

export const Header = () => {
  const { project, setProjectName, setTheme, saveToLocalStorage } = useBuilderStore(); //Store values extracted:  contains pages array
  const navigate = useNavigate();

  const handleSave = () => {
    saveToLocalStorage();
    alert('Project saved successfully!');
  };

  const toggleTheme = () => {
    setTheme(project.theme === 'light' ? 'dark' : 'light');
  };

  

  return (
   <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 px-4 sm:px-6 py-3 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">

  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 w-full sm:w-auto">
    <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white text-center sm:text-left">
      Website Builder
    </h1>
    <input
      type="text"
      value={project.name}
      onChange={(e) => setProjectName(e.target.value)}
      className="w-full sm:w-auto px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Project name"
    />
  </div>

  {/* Right  */}
  <div className="flex flex-wrap justify-center sm:justify-end items-center gap-2 sm:gap-3 w-full sm:w-auto">
    <button
      onClick={toggleTheme}
      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
      title={`Switch to ${project.theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {project.theme === 'light' ? (
        <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      ) : (
        <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
      )}
    </button>

    <button
      onClick={() => navigate('/preview')}
      className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg transition-colors"
    >
      <Eye className="w-4 h-4" />
      <span className="text-sm font-medium">Preview</span>
    </button>

    <button
      onClick={handleSave}
      className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-sm"
    >
      <Save className="w-4 h-4" />
      <span className="text-sm font-medium">Save</span>
    </button>
  </div>
</header>

  );
};
