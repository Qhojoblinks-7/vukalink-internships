// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className="bg-white py-4 shadow-sm">
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          {/* Placeholder for your actual VukaLink logo */}
          <img src="/vukalink-logo.png" alt="VukaLink Logo" className="h-8" />
          <span className="text-xl font-bold text-gray-800 hidden sm:block">VukaLink</span>
        </Link>

        {/* Navigation Links (Hidden on small screens, can add hamburger menu later) */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/features" className="text-gray-600 hover:text-blue-700 font-medium">Features</Link>
          <Link to="/resources" className="text-gray-600 hover:text-blue-700 font-medium">Resources</Link>
          <Link to="/about" className="text-gray-600 hover:text-blue-700 font-medium">About Us</Link>
          <Link to="/contact" className="text-gray-600 hover:text-blue-700 font-medium">Contact</Link>
        </nav>

        {/* Auth Buttons */}
        <div className="flex items-center space-x-4">
          {/* Link to AuthPage, initially showing Login form */}
          <Link
            to="/auth?form=login" // <--- Change this
            className="text-gray-600 hover:text-blue-700 font-medium px-4 py-2"
          >
            Login
          </Link>
          {/* Link to AuthPage, initially showing Sign Up form */}
          <Link
            to="/auth?form=signup" // <--- Change this
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition duration-300"
          >
            Sign Up Free
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;