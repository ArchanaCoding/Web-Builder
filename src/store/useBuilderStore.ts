import { create } from 'zustand';
import { Project, Page, Section, Theme, SectionType, SectionData } from '../types';
import { generateUUID } from '../utils/uuid';
import { loadProject, saveProject } from '../utils/storage';

interface BuilderState {
  project: Project;
  activePageId: string | null;
  selectedSectionId: string | null;

  initializeProject: () => void;
  setProjectName: (name: string) => void;
  setTheme: (theme: Theme) => void;

  addPage: () => void;
  deletePage: (pageId: string) => void;
  renamePage: (pageId: string, name: string) => void;
  setActivePage: (pageId: string) => void;

  addSection: (type: SectionType) => void;
  deleteSection: (sectionId: string) => void;
  updateSection: (sectionId: string, data: Partial<SectionData>) => void;
  reorderSections: (sections: Section[]) => void;
  setSelectedSection: (sectionId: string | null) => void;

  saveToLocalStorage: () => void;
  getActivePage: () => Page | undefined;
}

const createDefaultProject = (): Project => ({
  id: generateUUID(),
  name: 'My Website',
  theme: 'light',
  pages: [
    {
      id: generateUUID(),
      name: 'Home',
      path: '/',
      sections: [
        {
          id: generateUUID(),
          type: 'text',
          data: {
            heading: 'Welcome to Your Website',
            body: 'Start building your amazing website!',
          },
        },
      ],
      updatedAt: Date.now(),
    },
  ],
});

export const useBuilderStore = create<BuilderState>((set, get) => ({
  project: createDefaultProject(),
  activePageId: null,
  selectedSectionId: null,

  initializeProject: () => {
    const savedProject = loadProject();
    if (savedProject) {
      set({
        project: savedProject,
        activePageId: savedProject.pages[0]?.id || null,
      });
    } else {
      const defaultProject = createDefaultProject();
      set({
        project: defaultProject,
        activePageId: defaultProject.pages[0]?.id || null,
      });
      saveProject(defaultProject);
    }
  },

  setProjectName: (name) => {
    set((state) => ({
      project: { ...state.project, name },
    }));
  },

  setTheme: (theme) => {
    set((state) => ({
      project: { ...state.project, theme },
    }));
  },

  addPage: () => {
    const newPage: Page = {
      id: generateUUID(),
      name: 'New Page',
      path: '/new-page',
      sections: [],
      updatedAt: Date.now(),
    };
    set((state) => ({
      project: {
        ...state.project,
        pages: [...state.project.pages, newPage],
      },
      activePageId: newPage.id,
    }));
  },

  deletePage: (pageId) => {
    set((state) => {
      const pages = state.project.pages.filter((p) => p.id !== pageId);
      if (pages.length === 0) {
        const defaultPage: Page = {
          id: generateUUID(),
          name: 'Home',
          path: '/',
          sections: [],
          updatedAt: Date.now(),
        };
        pages.push(defaultPage);
      }
      const newActivePageId = state.activePageId === pageId ? pages[0].id : state.activePageId;
      return {
        project: { ...state.project, pages },
        activePageId: newActivePageId,
      };
    });
  },

  renamePage: (pageId, name) => {
    set((state) => ({
      project: {
        ...state.project,
        pages: state.project.pages.map((page) =>
          page.id === pageId ? { ...page, name, updatedAt: Date.now() } : page
        ),
      },
    }));
  },

  setActivePage: (pageId) => {
    set({ activePageId: pageId, selectedSectionId: null });
  },

  addSection: (type) => {
    const { activePageId } = get();
    if (!activePageId) return;

    let data: SectionData;
    switch (type) {
      case 'text':
        data = { heading: 'New Heading', body: 'Your content here' };
        break;
      case 'image':
        data = { src: 'https://images.pexels.com/photos/1054218/pexels-photo-1054218.jpeg?auto=compress&cs=tinysrgb&w=800', alt: 'Sample image' };
        break;
      case 'button':
        data = { label: 'Click Me', href: '#' };
        break;
    }

    const newSection: Section = {
      id: generateUUID(),
      type,
      data,
    };

    set((state) => ({
      project: {
        ...state.project,
        pages: state.project.pages.map((page) =>
          page.id === activePageId
            ? {
                ...page,
                sections: [...page.sections, newSection],
                updatedAt: Date.now(),
              }
            : page
        ),
      },
      selectedSectionId: newSection.id,
    }));
  },

  deleteSection: (sectionId) => {
    const { activePageId } = get();
    if (!activePageId) return;

    set((state) => ({
      project: {
        ...state.project,
        pages: state.project.pages.map((page) =>
          page.id === activePageId
            ? {
                ...page,
                sections: page.sections.filter((s) => s.id !== sectionId),
                updatedAt: Date.now(),
              }
            : page
        ),
      },
      selectedSectionId: state.selectedSectionId === sectionId ? null : state.selectedSectionId,
    }));
  },

  updateSection: (sectionId, data) => {
    const { activePageId } = get();
    if (!activePageId) return;

    set((state) => ({
      project: {
        ...state.project,
        pages: state.project.pages.map((page) =>
          page.id === activePageId
            ? {
                ...page,
                sections: page.sections.map((section) =>
                  section.id === sectionId
                    ? { ...section, data: { ...section.data, ...data } }
                    : section
                ),
                updatedAt: Date.now(),
              }
            : page
        ),
      },
    }));
  },

  reorderSections: (sections) => {
    const { activePageId } = get();
    if (!activePageId) return;

    set((state) => ({
      project: {
        ...state.project,
        pages: state.project.pages.map((page) =>
          page.id === activePageId
            ? { ...page, sections, updatedAt: Date.now() }
            : page
        ),
      },
    }));
  },

  setSelectedSection: (sectionId) => {
    set({ selectedSectionId: sectionId });
  },

  saveToLocalStorage: () => {
    const { project } = get();
    saveProject(project);
  },

  getActivePage: () => {
    const { project, activePageId } = get();
    return project.pages.find((p) => p.id === activePageId);
  },
}));
