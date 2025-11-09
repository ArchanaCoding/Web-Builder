import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download } from 'lucide-react';
import { useBuilderStore } from '../store/useBuilderStore';
import { SectionRenderer } from '../components/SectionRenderer';
import { exportProject } from '../utils/export';

export const Preview = () => {
  const navigate = useNavigate();
  const { project, activePageId, setActivePage } = useBuilderStore();

  const activePage = project.pages.find((p) => p.id === activePageId) || project.pages[0];

  const handleExport = async () => {
    try {
      await exportProject(project);
      alert('Project exported successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export project. Please try again.');
    }
  };

  return (
    <div className={project.theme === 'dark' ? 'dark' : ''}>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm font-medium">Back to Editor</span>
            </button>

            <div className="flex items-center gap-4">
              <div className="flex gap-2">
                {project.pages.map((page) => (
                  <button
                    key={page.id}
                    onClick={() => setActivePage(page.id)}
                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                      activePage?.id === page.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {page.name}
                  </button>
                ))}
              </div>

              <button
                onClick={handleExport}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors shadow-sm"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm font-medium">Export</span>
              </button>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-8">
          {activePage && activePage.sections.length > 0 ? (
            <div className="space-y-6">
              {activePage.sections.map((section) => (
                <SectionRenderer key={section.id} section={section} />
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-500 dark:text-gray-400 py-20">
              <p className="text-lg">This page has no content yet</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
