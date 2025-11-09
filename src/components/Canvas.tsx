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
import { SortableSection } from './SortableSection';
import { useBuilderStore } from '../store/useBuilderStore';
import { Trash2 } from 'lucide-react';

export const Canvas = () => {
  const {
    getActivePage,
    selectedSectionId,
    setSelectedSection,
    deleteSection,
    reorderSections,
  } = useBuilderStore();

  const activePage = getActivePage();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!activePage || !over || active.id === over.id) return;

    const oldIndex = activePage.sections.findIndex((s) => s.id === active.id);
    const newIndex = activePage.sections.findIndex((s) => s.id === over.id);

    const newSections = arrayMove(activePage.sections, oldIndex, newIndex);
    reorderSections(newSections);
  };

  if (!activePage) {
    return (
      <main className="flex-1 bg-gray-50 dark:bg-gray-800 flex items-center justify-center">
        <p className="text-gray-500 dark:text-gray-400">No page selected</p>
      </main>
    );
  }

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
      <div className="max-w-4xl mx-auto py-8 px-6">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={activePage.sections.map((s) => s.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {activePage.sections.map((section) => (
                <div key={section.id} className="relative group">
                  <SortableSection
                    section={section}
                    isSelected={selectedSectionId === section.id}
                    onSelect={() => setSelectedSection(section.id)}
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
          </SortableContext>
        </DndContext>
      </div>
    </main>
  );
};
