// src/components/Navbar.jsx
import React from 'react';

function Navbar() {
  return (
    <header className="bg-white py-4 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          {/* Placeholder for your actual VukaLink logo */}
          <img src="/vukalink-logo.png" alt="VukaLink Logo" className="h-8" />
          <span className="text-xl font-bold text-gray-800 hidden sm:block">VukaLink</span>
        </a>

        {/* Navigation Links (Hidden on small screens, can add hamburger menu later) */}
        <nav className="hidden md:flex space-x-8">
          <a href="#" className="text-gray-600 hover:text-blue-700 font-medium">Features</a>
          <a href="#" className="text-gray-600 hover:text-blue-700 font-medium">Resources</a>
          <a href="#" className="text-gray-600 hover:text-blue-700 font-medium">About Us</a>
          <a href="#" className="text-gray-600 hover:text-blue-700 font-medium">Contact</a>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          <button className="text-gray-600 hover:text-blue-700 font-medium px-4 py-2">
            Login
          </button>
          <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300">
            Sign Up Free
          </button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;