// src/App.jsx
import Layout from './components/Layout';
// Import your landing page components (keep them for later)
import DesktopHeroSection from './components/DesktopHeroSection';
import MobileHeroSection from './components/MobileHeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import WhyChooseUsSection from './components/WhyChooseUsSection';
import TestimonialsSection from './components/TestimonialsSection';
import CallToActionSection from './components/CallToActionSection';

// Import the new AuthPage
import AuthPage from './components/pages/AuthPage';


function App() {
  // For now, let's just render the AuthPage to test it out.
  // We'll set up routing later to switch between landing and auth pages.
  return (
    <Layout>
      <AuthPage />
      {/*
        Commented out landing page sections for now so AuthPage is the primary view.
        Uncomment or use routing to manage these views later.
      */}
      {/*
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
      */}
    </Layout>
  );
}

export default App;