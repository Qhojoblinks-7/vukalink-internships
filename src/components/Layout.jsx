// src/components/Layout.jsx
import React from 'react';
import Navbar from './DesktopHome/Navbar';
import Footer from './DesktopHome/Footer';

function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar (only visible on desktop, hidden on mobile) */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      {/* Main content area */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer (only visible on desktop, hidden on mobile) */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
}

export default Layout;