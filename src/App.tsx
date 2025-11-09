import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Builder } from './pages/Builder';
import { Preview } from './pages/Preview';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Builder />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
