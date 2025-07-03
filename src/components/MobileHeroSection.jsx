// src/components/MobileHeroSection.jsx
import React from 'react';
import { MdSearch, MdSend, MdTrendingUp } from 'react-icons/md'; // Icons for Find, Apply, Grow
import  Image  from '../assets/splash3.png';

function MobileHeroSection() {
  // Placeholder avatars for "Join 2,500+ students"
  const avatars = [
    '/avatar-1.png', // Small circular avatar
    '/avatar-2.png',
    '/avatar-3.png',
  ];

  return (
    <section className="relative h-screen flex flex-col items-center justify-center text-white text-center px-4 overflow-hidden">
      {/* Background Image with Dark Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={Image} // You'll need this mobile background image
          alt="Students in a collaborative setting"
          className="w-full h-full object-cover"
        />
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-blue-950 opacity-70"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow pt-16 pb-20"> {/* pt-16 to account for Navbar */}
        {/* Main Title */}
        <h1 className="text-4xl font-bold leading-tight mb-4">
          VukaLink
          <br />
          Your Career Journey Starts Here
        </h1>
        {/* Subtitle */}
        <p className="text-lg mb-8 max-w-xs">
          Streamline your internship and industrial attachment search with one powerful platform
        </p>

        {/* Feature Icons (Find, Apply, Grow) */}
        <div className="flex justify-around w-full max-w-xs mb-12">
          <div className="flex flex-col items-center space-y-2">
            <div className="bg-orange-500 p-4 rounded-full shadow-lg">
              <MdSearch className="h-7 w-7 text-white" />
            </div>
            <span className="text-sm font-medium">Find</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="bg-orange-500 p-4 rounded-full shadow-lg">
              <MdSend className="h-7 w-7 text-white" />
            </div>
            <span className="text-sm font-medium">Apply</span>
          </div>
          <div className="flex flex-col items-center space-y-2">
            <div className="bg-orange-500 p-4 rounded-full shadow-lg">
              <MdTrendingUp className="h-7 w-7 text-white" /> {/* Using TrendingUp for Grow */}
            </div>
            <span className="text-sm font-medium">Grow</span>
          </div>
        </div>

        {/* CTA Buttons */}
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 mb-4 w-full max-w-xs">
          <span>Get Started</span>
          <span className="ml-2">&rarr;</span> {/* Right arrow */}
        </button>
        <button className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition duration-300 w-full max-w-xs">
          I already have an account
        </button>
      </div>

      {/* Social Proof (Avatars) */}
      <div className="relative z-10 flex items-center justify-center mb-8">
        <div className="flex -space-x-3">
          {avatars.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Student Avatar ${index + 1}`}
              className="w-8 h-8 rounded-full border-2 border-white object-cover"
            />
          ))}
        </div>
        <span className="ml-3 text-lg font-medium">Join 2,500+ students</span>
      </div>

      {/* Carousel Indicators (Dots) */}
      <div className="relative z-10 flex space-x-2 pb-8">
        <span className="w-2 h-2 bg-white rounded-full opacity-50"></span>
        <span className="w-2 h-2 bg-orange-500 rounded-full"></span> {/* Active dot */}
        <span className="w-2 h-2 bg-white rounded-full opacity-50"></span>
      </div>
    </section>
  );
}

export default MobileHeroSection;