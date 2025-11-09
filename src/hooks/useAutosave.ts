import { useEffect, useRef } from 'react';
import { useBuilderStore } from '../store/useBuilderStore';
import { debounce } from '../utils/debounce';

export const useAutosave = (delay: number = 2000) => {
  const { project, saveToLocalStorage } = useBuilderStore();
  const debouncedSave = useRef(debounce(saveToLocalStorage, delay));

  useEffect(() => {
    debouncedSave.current();
  }, [project]);
};
