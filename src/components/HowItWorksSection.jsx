// src/components/HowItWorksSection.jsx
import React from 'react';
// Import icons from react-icons. We'll use Material Design icons (Md) for this example.
import { MdSearch, MdDescription, MdTimeline } from 'react-icons/md';

function HowItWorksSection() {
  return (
    <section className="bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">How VukaLink Works</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our platform simplifies the entire process of finding and securing career-starting opportunities.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Discover Opportunities */}
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
            <div className="bg-blue-100 p-4 rounded-full mb-6">
              {/* Actual Icon: MdSearch */}
              <MdSearch className="h-10 w-10 text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Discover Opportunities</h3>
            <p className="text-gray-600">
              Browse through curated internships and attachments matched to your skills and interests.
            </p>
          </div>

          {/* Card 2: Apply with Ease */}
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
            <div className="bg-blue-100 p-4 rounded-full mb-6">
              {/* Actual Icon: MdDescription */}
              <MdDescription className="h-10 w-10 text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Apply with Ease</h3>
            <p className="text-gray-600">
              Submit applications directly through our platform with your stored profile and documents.
            </p>
          </div>

          {/* Card 3: Track Your Progress */}
          <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-center text-center">
            <div className="bg-blue-100 p-4 rounded-full mb-6">
              {/* Actual Icon: MdTimeline */}
              <MdTimeline className="h-10 w-10 text-blue-700" />
            </div>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Track Your Progress</h3>
            <p className="text-gray-600">
              Monitor application status, receive updates, and manage your career journey all in one place.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;