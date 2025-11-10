import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Create and render the app inside the HTML element with id "root"
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* safe coding checks. */}
    <App />
  </StrictMode>
);
