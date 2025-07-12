// src/App.jsx
import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import AuthPage from './pages/AuthPage';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';

// Lazy load components for better performance
const DesktopHeroSection = React.lazy(() => import('./components/DesktopHome/DesktopHeroSection'));
const MobileHeroSection = React.lazy(() => import('./components/MobileHeroSection'));
const HowItWorksSection = React.lazy(() => import('./components/DesktopHome/HowItWorksSection'));
const WhyChooseUsSection = React.lazy(() => import('./components/DesktopHome/WhyChooseUsSection'));
const TestimonialsSection = React.lazy(() => import('./components/DesktopHome/TestimonialsSection'));
const CallToActionSection = React.lazy(() => import('./components/DesktopHome/CallToActionSection'));
const Dashboard = React.lazy(() => import('./pages/Dashboard'));
const FindInternships = React.lazy(() => import('./pages/FindInternships'));
const MyApplications = React.lazy(() => import('./pages/MyApplications'));
const SavedOpportunities = React.lazy(() => import('./pages/SavedOpportunities'));
const Profile = React.lazy(() => import('./pages/Profile'));

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
  </div>
);

// Landing page component
const LandingPage = () => (
  <Suspense fallback={<LoadingSpinner />}>
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
  </Suspense>
);

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <Layout>
          <Suspense fallback={<LoadingSpinner />}>
            <Routes>
              {/* Landing Page */}
              <Route path="/" element={<LandingPage />} />

              {/* Authentication */}
              <Route path="/auth" element={<AuthPage />} />

              {/* Protected Dashboard Routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/find-internships" element={
                <ProtectedRoute>
                  <FindInternships />
                </ProtectedRoute>
              } />
              <Route path="/my-applications" element={
                <ProtectedRoute>
                  <MyApplications />
                </ProtectedRoute>
              } />
              <Route path="/saved" element={
                <ProtectedRoute>
                  <SavedOpportunities />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />

              {/* Placeholder routes for future implementation */}
              <Route path="/messages" element={
                <ProtectedRoute>
                  <div className="p-8 text-center">Messages - Coming Soon</div>
                </ProtectedRoute>
              } />
              <Route path="/resources" element={
                <ProtectedRoute>
                  <div className="p-8 text-center">Resources - Coming Soon</div>
                </ProtectedRoute>
              } />
              
              {/* 404 Page */}
              <Route path="*" element={
                <div className="min-h-screen flex items-center justify-center bg-gray-50">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                    <p className="text-gray-600 mb-8">Page not found</p>
                    <a href="/" className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors">
                      Go Home
                    </a>
                  </div>
                </div>
              } />
            </Routes>
          </Suspense>
        </Layout>
      </Router>
    </ErrorBoundary>
  );
}

export default App;