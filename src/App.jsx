// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

// Landing page components
import DesktopHeroSection from './components/DesktopHome/DesktopHeroSection';
import MobileHeroSection from './components/MobileHeroSection';
import HowItWorksSection from './components/DesktopHome/HowItWorksSection';
import WhyChooseUsSection from './components/DesktopHome/WhyChooseUsSection';
import TestimonialsSection from './components/DesktopHome/TestimonialsSection';
import CallToActionSection from './components/DesktopHome/CallToActionSection';

// Pages
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import MyApplications from './pages/MyApplications';
import FindInternships from './pages/FindInternships';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Routes>
          {/* Public Landing Page */}
          <Route
            path="/"
            element={
              <ProtectedRoute requireAuth={false}>
                <Layout>
                  <div className="block md:hidden">
                    <MobileHeroSection />
                  </div>
                  <div className="hidden md:block">
                    <DesktopHeroSection />
                    <HowItWorksSection />
                    <WhyChooseUsSection />
                    <TestimonialsSection />
                    <CallToActionSection />
                  </div>
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Authentication Page */}
          <Route 
            path="/auth" 
            element={
              <ProtectedRoute requireAuth={false}>
                <AuthPage />
              </ProtectedRoute>
            } 
          />

          {/* Protected Dashboard Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/my-applications" 
            element={
              <ProtectedRoute>
                <MyApplications />
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/find-internships" 
            element={
              <ProtectedRoute>
                <FindInternships />
              </ProtectedRoute>
            } 
          />

          {/* Placeholder routes for future implementation */}
          <Route 
            path="/saved" 
            element={
              <ProtectedRoute>
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Saved Opportunities</h2>
                    <p className="text-gray-600">This feature is coming soon!</p>
                  </div>
                </div>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">My Profile</h2>
                    <p className="text-gray-600">This feature is coming soon!</p>
                  </div>
                </div>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/messages" 
            element={
              <ProtectedRoute>
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Messages</h2>
                    <p className="text-gray-600">This feature is coming soon!</p>
                  </div>
                </div>
              </ProtectedRoute>
            } 
          />

          <Route 
            path="/resources" 
            element={
              <ProtectedRoute>
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-900 mb-4">Resources</h2>
                    <p className="text-gray-600">This feature is coming soon!</p>
                  </div>
                </div>
              </ProtectedRoute>
            } 
          />

          {/* 404 Page */}
          <Route 
            path="*" 
            element={
              <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                  <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
                  <h2 className="text-2xl font-semibold text-gray-700 mb-4">Page Not Found</h2>
                  <p className="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
                  <a
                    href="/"
                    className="bg-orange-500 text-white px-6 py-3 rounded-md hover:bg-orange-600 transition-colors font-medium"
                  >
                    Go Home
                  </a>
                </div>
              </div>
            } 
          />
        </Routes>
      </Router>
    </ErrorBoundary>
  );
}

export default App;