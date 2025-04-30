import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { FileProvider } from './context/FileContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import MergePDF from './pages/tools/MergePDF';
import SplitPDF from './pages/tools/SplitPDF';
import CompressPDF from './pages/tools/CompressPDF';
import ConvertPDF from './pages/tools/ConvertPDF';

function App() {
  return (
    <FileProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="merge-pdf" element={<MergePDF />} />
            <Route path="split-pdf" element={<SplitPDF />} />
            <Route path="compress-pdf" element={<CompressPDF />} />
            <Route path="convert-pdf" element={<ConvertPDF />} />
          </Route>
        </Routes>
      </Router>
    </FileProvider>
  );
}

export default App;