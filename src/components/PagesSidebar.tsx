import { Plus, Trash2, Edit2, Check, X } from 'lucide-react';
import { useBuilderStore } from '../store/useBuilderStore';
import { useState } from 'react';

export const PagesSidebar = () => {
  const { project, activePageId, setActivePage, addPage, deletePage, renamePage } =
    useBuilderStore();
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const startEditing = (pageId: string, currentName: string) => {
    setEditingPageId(pageId);
    setEditName(currentName);
  };

  const saveEdit = (pageId: string) => {
    if (editName.trim()) {
      renamePage(pageId, editName.trim());
    }
    setEditingPageId(null);
  };

  const cancelEdit = () => {
    setEditingPageId(null);
    setEditName('');
  };

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
            Pages
          </h2>
          <button
            onClick={addPage}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
            title="Add new page"
          >
            <Plus className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
        {project.pages.map((page) => (
          <div
            key={page.id}
            className={`group mb-1 rounded-lg transition-colors ${
              activePageId === page.id
                ? 'bg-blue-50 dark:bg-blue-900/20'
                : 'hover:bg-gray-100 dark:hover:bg-gray-800'
            }`}
          >
            {editingPageId === page.id ? (
              <div className="flex items-center gap-1 p-2">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') saveEdit(page.id);
                    if (e.key === 'Escape') cancelEdit();
                  }}
                  className="flex-1 px-2 py-1 text-sm bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  autoFocus
                />
                <button
                  onClick={() => saveEdit(page.id)}
                  className="p-1 hover:bg-green-100 dark:hover:bg-green-900/20 rounded"
                  title="Save"
                >
                  <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
                </button>
                <button
                  onClick={cancelEdit}
                  className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
                  title="Cancel"
                >
                  <X className="w-4 h-4 text-red-600 dark:text-red-400" />
                </button>
              </div>
            ) : (
              <div
                className="flex items-center justify-between p-2 cursor-pointer"
                onClick={() => setActivePage(page.id)}
              >
                <span
                  className={`text-sm font-medium ${
                    activePageId === page.id
                      ? 'text-blue-700 dark:text-blue-300'
                      : 'text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {page.name}
                </span>
                <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      startEditing(page.id, page.name);
                    }}
                    className="p-1 hover:bg-gray-200 dark:hover:bg-gray-700 rounded"
                    title="Rename page"
                  >
                    <Edit2 className="w-3.5 h-3.5 text-gray-600 dark:text-gray-400" />
                  </button>
                  {project.pages.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (confirm(`Delete page "${page.name}"?`)) {
                          deletePage(page.id);
                        }
                      }}
                      className="p-1 hover:bg-red-100 dark:hover:bg-red-900/20 rounded"
                      title="Delete page"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-600 dark:text-red-400" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
};
