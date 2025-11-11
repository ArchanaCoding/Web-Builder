// This is a wrapper component that makes each section draggable—so(reorder) the user can move sections up and down. 

import { useSortable } from '@dnd-kit/sortable'; //Hooks for drag-and-drop behaviour.
import { CSS } from '@dnd-kit/utilities'; //Converts the style for the drag animation.
import { GripVertical } from 'lucide-react'; //Drag handle icon.
import { Section } from '../types'; 
import { SectionRenderer } from './SectionRenderer'; //Which shows the actual UI of the section.

interface SortableSectionProps {
  section: Section; //current section ka data (type, id, etc).
  isSelected: boolean; //Has the user selected this section?
  onSelect: () => void; //Section selection function (click event).
}

export const SortableSection = ({ section, isSelected, onSelect }: SortableSectionProps) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: section.id,
  }); //transform & transition: For animation and position change of the element.
  

  // Dynamic Style for Drag Animation -- Create a style object with a transform string generated from a transform object, and a transition property
  const style = {
    transform: CSS.Transform.toString(transform), // position set x, y
    transition, //Will give animation to that movement.
  };

  return (
    // setNodeRef: Drag tells the system which DOM element to control. so this section becomes Draggabale.
    <div
      ref={setNodeRef}
      style={style}
      className="relative bg-white dark:bg-gray-900 rounded-lg shadow-sm"
    >
       {/* attributes & listeners: Attach drag events to the handle. */}
      <div 
        {...attributes} 
        {...listeners}
        className="absolute left-2 top-2 p-1.5 cursor-grab active:cursor-grabbing hover:bg-gray-100 dark:hover:bg-gray-800 rounded opacity-0 group-hover:opacity-100 transition-opacity"
        title="Drag to reorder"
      >
        <GripVertical className="w-5 h-5 text-gray-400" />
      </div>
      {/* Passing props to a component */}
      <SectionRenderer
        section={section} //SR passed the section parameter, which holds the value of the section variable.
        isSelected={isSelected}
        onClick={onSelect}
        isDragging={isDragging} //gives a fade effect when dragged.
      />
    </div>
  );
};


//Each section is wrapped in this SortableSection component which uses the @dnd-kit library to enable drag-and-drop reordering.
// It handles the dragging part, and lets SectionRenderer show the content.