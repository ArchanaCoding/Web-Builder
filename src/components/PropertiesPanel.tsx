import { X } from 'lucide-react';
import { useBuilderStore } from '../store/useBuilderStore';
import { TextSectionData, ImageSectionData, ButtonSectionData } from '../types';

export const PropertiesPanel = () => {
  const { selectedSectionId, getActivePage, updateSection, setSelectedSection } = useBuilderStore();

  const activePage = getActivePage();
  const selectedSection = activePage?.sections.find((s) => s.id === selectedSectionId);

  if (!selectedSection) {
    return (
      <aside className="w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 p-6">
        <div className="text-center text-gray-500 dark:text-gray-400 mt-20">
          <p className="text-sm">Select a section to edit its properties</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-80 bg-white dark:bg-gray-900 border-l border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
        <h2 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
          Properties
        </h2>
        <button
          onClick={() => setSelectedSection(null)}
          className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
          title="Close panel"
        >
          <X className="w-4 h-4 text-gray-700 dark:text-gray-300" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="mb-4">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">
            {selectedSection.type.toUpperCase()}
          </span>
        </div>

        {selectedSection.type === 'text' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Heading
              </label>
              <input
                type="text"
                value={(selectedSection.data as TextSectionData).heading}
                onChange={(e) =>
                  updateSection(selectedSection.id, { heading: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Body
              </label>
              <textarea
                value={(selectedSection.data as TextSectionData).body}
                onChange={(e) =>
                  updateSection(selectedSection.id, { body: e.target.value })
                }
                rows={6}
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
          </>
        )}

        {selectedSection.type === 'image' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Image URL
              </label>
              <input
                type="text"
                value={(selectedSection.data as ImageSectionData).src}
                onChange={(e) =>
                  updateSection(selectedSection.id, { src: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Alt Text
              </label>
              <input
                type="text"
                value={(selectedSection.data as ImageSectionData).alt}
                onChange={(e) =>
                  updateSection(selectedSection.id, { alt: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Image description"
              />
            </div>
          </>
        )}

        {selectedSection.type === 'button' && (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Button Label
              </label>
              <input
                type="text"
                value={(selectedSection.data as ButtonSectionData).label}
                onChange={(e) =>
                  updateSection(selectedSection.id, { label: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Link URL
              </label>
              <input
                type="text"
                value={(selectedSection.data as ButtonSectionData).href}
                onChange={(e) =>
                  updateSection(selectedSection.id, { href: e.target.value })
                }
                className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="#section or https://example.com"
              />
            </div>
          </>
        )}
      </div>
    </aside>
  );
};
