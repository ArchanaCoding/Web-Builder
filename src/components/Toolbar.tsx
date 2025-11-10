// The toolbar component is a top bar where users can add new sections to their webpage—such as text, images, or buttons. Clicking each button adds a new section to the builder. > why user can drag-and-drop simply way to add.
import { Type, Image, MousePointer } from 'lucide-react';
import { useBuilderStore } from '../store/useBuilderStore'; 
import { SectionType } from '../types';

export const Toolbar = () => {
  const { addSection } = useBuilderStore(); //global state (store) fun addS

  const tools = [
    { type: 'text' as SectionType, icon: Type, label: 'Text Section' },
    { type: 'image' as SectionType, icon: Image, label: 'Image' },
    { type: 'button' as SectionType, icon: MousePointer, label: 'Button' },
  ];

  return (
    <div className="h-14 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center px-6 gap-2">
      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
        Add Section:
      </span>
      {tools.map((tool) => (
        <button
          key={tool.type}
          onClick={() => addSection(tool.type)}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white rounded-lg transition-colors"
          title={tool.label}
        >
          <tool.icon className="w-4 h-4" />
          <span className="text-sm font-medium">{tool.label}</span>
        </button>
      ))}
    </div>
  );
};
