import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import { Section } from '../types';
import { SectionRenderer } from './SectionRenderer';

interface SortableSectionProps {
  section: Section;
  isSelected: boolean;
  onSelect: () => void;
}

export const SortableSection = ({ section, isSelected, onSelect }: SortableSectionProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative bg-white dark:bg-gray-900 rounded-lg shadow-sm"
    >
      <div
        {...attributes}
        {...listeners}
        className="absolute left-2 top-2 p-1.5 cursor-grab active:cursor-grabbing hover:bg-gray-100 dark:hover:bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity"
        title="Drag to reorder"
      >
        <GripVertical className="w-5 h-5 text-gray-400" />
      </div>
      <SectionRenderer
        section={section}
        isSelected={isSelected}
        onClick={onSelect}
        isDragging={isDragging}
      />
    </div>
  );
};
