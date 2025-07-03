// src/components/WhyChooseUsSection.jsx
import React from 'react';
// Import icons for the benefits
import {
  MdOutlineWifiCalling, // Could represent network/connection
  MdAccountCircle,      // Could represent personalized/profile
  MdSend,               // Could represent streamlined application/sending
  MdLightbulb           // Could represent resources/guides
} from 'react-icons/md';

function WhyChooseUsSection() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-12">
        {/* Left Image Area */}
        <div className="w-full md:w-1/2">
          {/* Placeholder for the large group of students image */}
          {/* Make sure 'students-group.jpg' is in your public folder */}
          <img
            src="/students-group.jpg"
            alt="Group of diverse students raising hands"
            className="rounded-lg shadow-xl object-cover w-full h-auto max-h-[500px]"
          />
        </div>

        {/* Right Content Area: Reasons to Choose VukaLink */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-4xl font-bold text-gray-800 mb-8">
            Why Students Choose VukaLink
          </h2>

          <div className="space-y-6">
            {/* Benefit 1 */}
            <div className="flex items-start md:items-center space-x-4">
              <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                <MdOutlineWifiCalling className="h-7 w-7 text-blue-700" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Access a Wide Network</h3>
                <p className="text-gray-600">
                  Connect with hundreds of employers actively seeking fresh talent like you.
                </p>
              </div>
            </div>

            {/* Benefit 2 */}
            <div className="flex items-start md:items-center space-x-4">
              <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                <MdAccountCircle className="h-7 w-7 text-blue-700" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Personalized Matches</h3>
                <p className="text-gray-600">
                  Our algorithm suggests opportunities that align with your skills, interests, and career goals.
                </p>
              </div>
            </div>

            {/* Benefit 3 */}
            <div className="flex items-start md:items-center space-x-4">
              <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                <MdSend className="h-7 w-7 text-blue-700" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Streamlined Applications</h3>
                <p className="text-gray-600">
                  Say goodbye to repetitive forms. Apply to multiple positions with just a few clicks.
                </p>
              </div>
            </div>

            {/* Benefit 4 */}
            <div className="flex items-start md:items-center space-x-4">
              <div className="flex-shrink-0 bg-blue-100 p-3 rounded-full">
                <MdLightbulb className="h-7 w-7 text-blue-700" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-1">Expert Resources & Guides</h3>
                <p className="text-gray-600">
                  Access career advice, interview tips, and industry insights to boost your chances.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhyChooseUsSection;