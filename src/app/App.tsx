import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from './components/ui/sonner';
import { DocumentProvider } from './contexts/DocumentContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { LandingPage } from './pages/LandingPage';
import { BrowsePage } from './pages/BrowsePage';
import { DocumentDetailPage } from './pages/DocumentDetailPage';
import { UploadPage } from './pages/UploadPage';
import { FeedbackPage } from './pages/FeedbackPage';

export default function App() {
  return (
    <BrowserRouter>
      <DocumentProvider>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/browse" element={<BrowsePage />} />
              <Route path="/document/:id" element={<DocumentDetailPage />} />
              <Route path="/upload" element={<UploadPage />} />
              <Route path="/feedback" element={<FeedbackPage />} />
            </Routes>
          </main>
          <Footer />
          <Toaster />
        </div>
      </DocumentProvider>
    </BrowserRouter>
  );
}