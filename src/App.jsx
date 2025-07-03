// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import these!

import Layout from './components/Layout';
// Import your landing page components (keep them for later)
import DesktopHeroSection from './components/DesktopHome/DesktopHeroSection';
import MobileHeroSection from './components/MobileHeroSection';
import HowItWorksSection from './components/DesktopHome/HowItWorksSection';
import WhyChooseUsSection from './components/DesktopHome/WhyChooseUsSection';
import TestimonialsSection from './components/DesktopHome/TestimonialsSection';
import CallToActionSection from './components/DesktopHome/CallToActionSection';
import MyApplications from './pages/MyApplications'; // Use MyApplications (not MyApplicationsSection)

// Import the new AuthPage
import AuthPage from './pages/AuthPage';

function App() {
  return (
    <Router> {/* <-- Wrap your entire application or the routing part with BrowserRouter */}
      <Layout>
        <Routes>
          {/* Default/Landing Page Route */}
          {/* <Route
            path="/LoginForm"
            element={
              <AuthPage /> // This will render the AuthPage component for the login form
            }
          />
          <Route
            path="/SignUpForm"
            element={
              <AuthPage /> // This will render the AuthPage component for the signup form
            }
          /> */}
          <Route
            path="/"
            element={
              <>
                {/* Conditionally render desktop/mobile hero sections for the landing page */}
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
              </>
            }
          />

          {/* Authentication Page */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Student Dashboard / My Applications Page */}
          {/* This is where your authenticated users will land after login/signup */}
          <Route path="/my-applications" element={<MyApplications />} />

          {/* You can add more specific routes for other dashboard sections here */}
          {/* <Route path="/dashboard" element={<MyApplications />} /> */}
          {/* <Route path="/find-internships" element={<FindInternships />} /> */}
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
          {/* etc. */}

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;