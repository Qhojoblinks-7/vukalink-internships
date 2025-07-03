// src/components/HeroSection.jsx
import React from 'react';

function DesktopHeroSection() {
  return (
    <section className="relative bg-blue-900 text-white py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between z-10 relative">
        {/* Left Content Area */}
        <div className="w-full md:w-1/2 text-center md:text-left mb-12 md:mb-0">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            Accelerate Your Career. <span className="text-orange-500">Simplified.</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-lg mx-auto md:mx-0">
            VukaLink connects tertiary students and graduates to vetted industrial
            attachments and internships, making your job hunt effortless.
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center md:justify-start">
            <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
              Find Your Opportunity
            </button>
            <button className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white font-semibold px-8 py-3 rounded-lg shadow-md transition duration-300 transform hover:scale-105">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Image Area */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          {/* Placeholder for your actual Hero Image */}
          {/* Make sure 'hero-students.jpg' is in your public folder */}
          <img
            src="/hero-students.jpg" 
            alt="Students collaborating and smiling"
            className="rounded-lg shadow-2xl object-cover w-full max-w-lg h-auto md:h-[450px]" 
            // The image in the mockup has specific aspect ratio and styling.
            // You might need to adjust w/h and object-fit for your specific image.
          />
        </div>
      </div>

      {/* Stats Section Overlay */}
      {/* Positioned absolutely at the bottom to span across the sections */}
      <div className="absolute bottom-0 left-0 w-full bg-white text-gray-800 py-6 transform translate-y-1/2 z-20 shadow-xl rounded-lg">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold text-blue-700">5000+</span>
            <span className="text-sm md:text-base text-gray-600">Students Placed</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold text-blue-700">350+</span>
            <span className="text-sm md:text-base text-gray-600">Partner Companies</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold text-blue-700">25+</span>
            <span className="text-sm md:text-base text-gray-600">Universities</span>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-3xl md:text-4xl font-bold text-blue-700">90%</span>
            <span className="text-sm md:text-base text-gray-600">Success Rate</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default DesktopHeroSection;