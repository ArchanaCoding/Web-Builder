/**
 * - It gets the active page and section data from the global store.
 * - Uses DndContext and SortableContext from @dnd-kit to handle drag-and-drop.
 * - When a section is moved, it updates the order in the store.
 */

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'; 
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';  
import { SortableSection } from './SortableSection';  // Draggable individual section
import { useBuilderStore } from '../store/useBuilderStore'; 
import { Trash2 } from 'lucide-react'; 

export const Canvas = () => {
  // Get data and functions from the store (state or methods access)
  const {
    getActivePage,
    selectedSectionId,
    setSelectedSection,
    deleteSection,
    reorderSections,
  } = useBuilderStore();

  const activePage = getActivePage(); 

  // Set up sensors for drag-and-drop (mouse + keyboard support)
  const sensors = useSensors(
    useSensor(PointerSensor), 
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

   // Function to handle what happens when drag ends
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event; // active = dragged item, over = target position

    if (!activePage || !over || active.id === over.id) return; //If invalid do nothing

    const oldIndex = activePage.sections.findIndex((s) => s.id === active.id); //Find dragged section index
    const newIndex = activePage.sections.findIndex((s) => s.id === over.id); //Find new position index

    const newSections = arrayMove(activePage.sections, oldIndex, newIndex);  //Reorder the sections
    reorderSections(newSections); // Update order in store
  };

  // If no page selected, show a message
  if (!activePage) {
    return (
      <main className="flex-1 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">No page selected</p>
      </main>
    );
  }

  // If no page selected, show a message
  if (activePage.sections.length === 0) {
    return (
      <main className="flex-1 bg-gray-50 dark:bg-gray-800 overflow-y-auto">
        <div className="max-w-4xl mx-auto py-12 px-6">
          <div className="text-center text-gray-500 dark:text-gray-400 py-20">
            <p className="text-lg mb-2">No sections yet</p>
            <p className="text-sm">Add a section using the toolbar above</p>
          </div>
        </div>
      </main>
    );
  }
 
  return (
    <main className="flex-1 bg-gray-50 dark:bg-gray-800 overflow-y-auto">
      <div className="max-w-4xl mx-auto py-8 px-1">
        <DndContext
          sensors={sensors} //Enable sensors for drag/drop
          collisionDetection={closestCenter} //Detect closest drop area
          onDragEnd={handleDragEnd} // handle drag end logic
        >
          <SortableContext
            items={activePage.sections.map((s) => s.id)} //List of section IDs
            strategy={verticalListSortingStrategy} //Arrange vertically
          >
            <div className="space-y-4">
              {activePage.sections.map((section) => (
                <div key={section.id} className="relative group">
                  <SortableSection
                    section={section}
                    isSelected={selectedSectionId === section.id} //Highlight selected section
                    onSelect={() => setSelectedSection(section.id)} //Select section on click
                  />
                  <button
                    onClick={() => {
                      if (confirm('Delete this section?')) {
                        deleteSection(section.id);
                      }
                    }}
                    className="absolute top-2 right-2 p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    title="Delete section"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
            {/* When we drag , the library should know that:  Which items are in the list?
What is their current order? What strategy should we use to sort (vertical, grid)*/}
          </SortableContext> 
        </DndContext>
        {/*dnd engine of drag-and-drop
        - activate the system*/}
      </div>
    </main>
  );
};
