// src/components/StudentDashboardHeader.jsx
import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // For navigation
import { FaRegBell, FaUserCircle } from 'react-icons/fa'; // Icons for notification and profile

const StudentDashboardHeader = () => {
  return (
    <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
        <Link to="/my-applications"> {/* Link to the main dashboard */}
          <img src="/vukalink-logo.png" alt="VukaLink Logo" className="h-8 w-auto" />
        </Link>
      </div>

      {/* Navigation Links (Desktop) */}
      <nav className="hidden md:flex items-center space-x-6">
        <NavLink
          to="/dashboard" // Assuming a general dashboard route
          className={({ isActive }) =>
            isActive ? "text-orange-500 font-semibold" : "text-gray-700 hover:text-orange-500 transition-colors"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/find-internships"
          className={({ isActive }) =>
            isActive ? "text-orange-500 font-semibold" : "text-gray-700 hover:text-orange-500 transition-colors"
          }
        >
          Find Internships
        </NavLink>
        <NavLink
          to="/my-applications" // Active for this page
          className={({ isActive }) =>
            isActive ? "text-orange-500 font-semibold" : "text-gray-700 hover:text-orange-500 transition-colors"
          }
        >
          My Applications
        </NavLink>
        <NavLink
          to="/saved" 
          className={({ isActive }) =>
            isActive ? "text-orange-500 font-semibold" : "text-gray-700 hover:text-orange-500 transition-colors"
          }
        >
          Saved
        </NavLink>
        <NavLink
          to="/profile" 
          className={({ isActive }) =>
            isActive ? "text-orange-500 font-semibold" : "text-gray-700 hover:text-orange-500 transition-colors"
          }
        >
          Profile
        </NavLink>
        <NavLink
          to="/messages" 
          className={({ isActive }) =>
            isActive ? "text-orange-500 font-semibold" : "text-gray-700 hover:text-orange-500 transition-colors"
          }
        >
          Messages
        </NavLink>
        <NavLink
          to="/resources" 
          className={({ isActive }) =>
            isActive ? "text-orange-500 font-semibold" : "text-gray-700 hover:text-orange-500 transition-colors"
          }
        >
          Resources
        </NavLink>
      </nav>

      {/* User Actions / Icons */}
      <div className="flex items-center space-x-4">
        {/* Notification Bell */}
        <button className="text-gray-600 hover:text-orange-500 focus:outline-none relative">
          <FaRegBell className="h-6 w-6" />
          {/* Optional: Notification count badge */}
          {/* <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">3</span> */}
        </button>

        {/* User Profile / Avatar */}
        <Link to="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-orange-500 transition-colors">
          <FaUserCircle className="h-8 w-8 text-gray-400" /> {/* Placeholder for user avatar */}
          {/* <span className="hidden sm:inline">John Doe</span> */} {/* Optional: User name */}
        </Link>
      </div>

      {/* Mobile Menu Toggle (if you implement a mobile menu) */}
      {/* <div className="md:hidden">
        <button className="text-gray-700 focus:outline-none">
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
      </div> */}
    </header>
  );
};

export default StudentDashboardHeader;