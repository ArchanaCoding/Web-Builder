// Autosave is a custom React hook that automatically saves the project to local storage whenever the user makes a change.
// It uses debounce for performance so that it doesn't save multiple times, but only once with a slight delay.
//why- To make sure user’s work is not lost — auto-save runs in background without manual save clicks
import { useEffect, useRef } from 'react';
import { useBuilderStore } from '../store/useBuilderStore';
import { debounce } from '../utils/debounce';

export const useAutosave = (delay: number = 2000) => {
  const { project, saveToLocalStorage } = useBuilderStore(); //Project data from Zustanad Store and Savetolocalstore
  const debouncedSave = useRef(debounce(saveToLocalStorage, delay)); //debounced version

  useEffect(() => {
    debouncedSave.current();  //Will save in localStorage, but with a delay.
  }, [project]); // Run whenever the project state updates
};
