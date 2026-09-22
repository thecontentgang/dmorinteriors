import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import DesignsPage from './pages/Designs/Designs';
import { EstimationProvider } from './context/EstimationContext';
import { EstimationModal } from './components/estimation/EstimationModal';

// Lazy loading pages for better performance
const HomePage = lazy(() => import('./pages/Home/HomePage'));
const AboutPage = lazy(() => import('./pages/About/About'));
const ProjectsPage = lazy(() => import('./pages/Projects/Projects'));
const ProjectDetailsPage = lazy(() => import('./pages/Projects/ProjectDetails'));
const ServicesPage = lazy(() => import('./pages/Services/Services'));
const ServiceDetailsPage = lazy(() => import('./pages/Services/ServiceDetails'));
const ProcessPage = lazy(() => import('./pages/Process/Process'));
const ContactPage = lazy(() => import('./pages/Contact/Contact'));
const NotFoundPage = lazy(() => import('./pages/NotFound/NotFound'));

// Minimal loading state matching DMOR aesthetic
const Loader = () => (
  <div className="min-h-screen bg-navy text-brand flex items-center justify-center">
    <div className="w-12 h-12 border-2 border-brand/20 border-t-brand rounded-full animate-spin"></div>
  </div>
);

const App = () => {
  return (
    <EstimationProvider>
      <BrowserRouter>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:slug" element={<ProjectDetailsPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/services/:slug" element={<ServiceDetailsPage />} />
              <Route path="/designs" element={<DesignsPage />} />
              <Route path="/process" element={<ProcessPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Catch-all route for unknown paths */}
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
      <EstimationModal />
    </EstimationProvider>
  );
};

export default App;