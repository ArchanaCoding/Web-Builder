import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import { Builder } from './pages/Builder'; // Import Builder component (used for creating or editing something)
import { Preview } from './pages/Preview'; // Preview component (used for viewing the final result)

function App() {
  return (
    <BrowserRouter> {/* Enables navigation between different pages in the app */}
      <Routes> {/* Contains all the defined routes of the app */}
        <Route path="/" element={<Builder />} /> 
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 
