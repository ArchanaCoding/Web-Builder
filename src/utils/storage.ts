import { Project } from '../types';

const STORAGE_KEY = 'website-builder-project'; 

//its save browser local storage so that when we realod so data won't get off
export const saveProject = (project: Project): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
  } catch (error) {
    console.error('Failed to save project:', error);
  }
};

//check localStorage whether we have project data if yes load or new create project or else null.
export const loadProject = (): Project | null => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return null;
    return JSON.parse(data);
  } catch (error) {
    console.error('Failed to load project:', error);
    return null;
  }
};

export const clearProject = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
