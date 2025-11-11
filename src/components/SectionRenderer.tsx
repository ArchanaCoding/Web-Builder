// SectionRenderer is a reusable component that determines the type of a section (text, image, or button) and renders the correct UI based on that type. - why > multiple section types
// Note:A conditional React component that renders different UIs based on section type.

import { Section, TextSectionData, ImageSectionData, ButtonSectionData } from '../types';

// type safety blueprint
interface SectionRendererProps {
  section: Section;
  isSelected?: boolean; 
  onClick?: () => void;
  isDragging?: boolean;
}

export const SectionRenderer = ({ section, isSelected, onClick, isDragging }: SectionRendererProps) => {
  const baseClasses = `transition-all rounded-lg ${
    isSelected ? 'ring-2 ring-blue-500' : ''
  } ${isDragging ? 'opacity-50' : ''}`;

  if (section.type === 'text') {
    const data = section.data as TextSectionData;
    return (
      <div
        className={`${baseClasses} p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800`}
        onClick={onClick}
      >
        <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
          {data.heading || 'Untitled'}
        </h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {data.body || 'No content'}
        </p>
      </div>
    );
  }

  if (section.type === 'image') {
    const data = section.data as ImageSectionData;
    return (
      <div
        className={`${baseClasses} cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-4`}
        onClick={onClick}
      >
        <img
          src={data.src || 'https://picsum.photos/800/300'}
          alt={data.alt || 'Image'}
          className="w-full h-auto max-h-96 object-cover rounded-lg"
        />
      </div>
    );
  }

  if (section.type === 'button') {
    const data = section.data as ButtonSectionData;
    return (
      <div
        className={`${baseClasses} p-6 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 flex justify-center`}
        onClick={onClick}
      >
        <button
          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-md"
          onClick={(e) => e.preventDefault()}
        >
          {data.label || 'Button'}
        </button>
      </div>
    );
  }

  return null;
};
