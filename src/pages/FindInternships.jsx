import React, { useState, useEffect } from 'react';
import StudentDashboardHeader from '../components/Dashboard/StudentDashboardHeader';
import { Link } from 'react-router-dom';
import {
  FaSearch, FaFileAlt, FaBookmark, FaUser, FaEnvelope, FaBookOpen,
  FaMapMarkerAlt, FaClock, FaBuilding, FaFilter, FaHeart, FaHeartBroken
} from 'react-icons/fa';

const FindInternships = () => {
  const [internships, setInternships] = useState([
    {
      id: 1,
      title: 'Software Engineering Intern',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      type: 'Remote',
      duration: '3 months',
      salary: '$25/hour',
      description: 'Join our engineering team to build scalable web applications using React and Node.js.',
      skills: ['React', 'Node.js', 'JavaScript', 'Git'],
      postedDate: '2 days ago',
      saved: false
    },
    {
      id: 2,
      title: 'Marketing Intern',
      company: 'Creative Agency',
      location: 'New York, NY',
      type: 'Hybrid',
      duration: '6 months',
      salary: '$20/hour',
      description: 'Help develop and execute marketing campaigns for our diverse client portfolio.',
      skills: ['Social Media', 'Content Creation', 'Analytics', 'Adobe Creative Suite'],
      postedDate: '1 week ago',
      saved: false
    },
    {
      id: 3,
      title: 'Data Science Intern',
      company: 'Analytics Inc',
      location: 'Austin, TX',
      type: 'On-site',
      duration: '4 months',
      salary: '$30/hour',
      description: 'Work with large datasets to develop machine learning models and insights.',
      skills: ['Python', 'SQL', 'Machine Learning', 'Statistics'],
      postedDate: '3 days ago',
      saved: true
    },
    {
      id: 4,
      title: 'UX/UI Design Intern',
      company: 'Design Studio',
      location: 'Seattle, WA',
      type: 'Remote',
      duration: '3 months',
      salary: '$22/hour',
      description: 'Create user-centered designs for web and mobile applications.',
      skills: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      postedDate: '5 days ago',
      saved: false
    },
    {
      id: 5,
      title: 'Finance Intern',
      company: 'Investment Bank',
      location: 'Chicago, IL',
      type: 'On-site',
      duration: '6 months',
      salary: '$28/hour',
      description: 'Support financial analysis and reporting for investment decisions.',
      skills: ['Excel', 'Financial Modeling', 'Accounting', 'PowerPoint'],
      postedDate: '1 day ago',
      saved: false
    }
  ]);

  const [filters, setFilters] = useState({
    search: '',
    location: '',
    type: '',
    duration: '',
    skills: []
  });

  const [savedInternships, setSavedInternships] = useState(new Set([3])); // ID 3 is saved

  const toggleSaved = (internshipId) => {
    const newSaved = new Set(savedInternships);
    if (newSaved.has(internshipId)) {
      newSaved.delete(internshipId);
    } else {
      newSaved.add(internshipId);
    }
    setSavedInternships(newSaved);
  };

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(filters.search.toLowerCase()) ||
                         internship.company.toLowerCase().includes(filters.search.toLowerCase()) ||
                         internship.description.toLowerCase().includes(filters.search.toLowerCase());
    
    const matchesLocation = !filters.location || internship.location.includes(filters.location);
    const matchesType = !filters.type || internship.type === filters.type;
    const matchesDuration = !filters.duration || internship.duration === filters.duration;
    
    return matchesSearch && matchesLocation && matchesType && matchesDuration;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <StudentDashboardHeader />

      <div className="flex flex-grow">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white p-6 shadow-md border-r border-gray-200">
          <nav>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/dashboard"
                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  <FaSearch className="h-5 w-5" />
                  <span>My Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/find-internships"
                  className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50 text-orange-600 font-semibold"
                >
                  <FaSearch className="h-5 w-5" />
                  <span>Find Internships</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/my-applications"
                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  <FaFileAlt className="h-5 w-5" />
                  <span>My Applications</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/saved"
                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  <FaBookmark className="h-5 w-5" />
                  <span>Saved Opportunities</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  <FaUser className="h-5 w-5" />
                  <span>My Profile</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/messages"
                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  <FaEnvelope className="h-5 w-5" />
                  <span>Messages</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100"
                >
                  <FaBookOpen className="h-5 w-5" />
                  <span>Resources</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Internships</h1>
            <p className="text-gray-600">
              Discover amazing internship opportunities that match your skills and interests
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search internships..."
                  value={filters.search}
                  onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Location */}
              <div className="relative">
                <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
              </div>

              {/* Type */}
              <select
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="Remote">Remote</option>
                <option value="On-site">On-site</option>
                <option value="Hybrid">Hybrid</option>
              </select>

              {/* Duration */}
              <select
                value={filters.duration}
                onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="">All Durations</option>
                <option value="3 months">3 months</option>
                <option value="4 months">4 months</option>
                <option value="6 months">6 months</option>
              </select>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {filteredInternships.length > 0 ? (
              filteredInternships.map((internship) => (
                <div key={internship.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h2 className="text-xl font-semibold text-gray-900">{internship.title}</h2>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          internship.type === 'Remote' ? 'bg-green-100 text-green-800' :
                          internship.type === 'Hybrid' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {internship.type}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <FaBuilding className="mr-1" />
                          {internship.company}
                        </div>
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="mr-1" />
                          {internship.location}
                        </div>
                        <div className="flex items-center">
                          <FaClock className="mr-1" />
                          {internship.duration}
                        </div>
                      </div>

                      <p className="text-gray-700 mb-4">{internship.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-2">
                          {internship.skills.map((skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        
                        <div className="text-right">
                          <p className="text-lg font-semibold text-green-600 mb-1">{internship.salary}</p>
                          <p className="text-sm text-gray-500">{internship.postedDate}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col items-center space-y-2 ml-4">
                      <button
                        onClick={() => toggleSaved(internship.id)}
                        className={`p-2 rounded-full transition-colors ${
                          savedInternships.has(internship.id)
                            ? 'text-red-500 hover:text-red-600'
                            : 'text-gray-400 hover:text-red-500'
                        }`}
                      >
                        {savedInternships.has(internship.id) ? (
                          <FaHeart className="h-5 w-5" />
                        ) : (
                          <FaHeartBroken className="h-5 w-5" />
                        )}
                      </button>
                      
                      <Link
                        to={`/apply/${internship.id}`}
                        className="bg-orange-500 text-white px-6 py-2 rounded-md hover:bg-orange-600 transition-colors font-medium"
                      >
                        Apply Now
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <FaSearch className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No internships found</h3>
                <p className="text-gray-500">Try adjusting your search criteria or filters.</p>
              </div>
            )}
          </div>

          {/* Load More Button */}
          {filteredInternships.length > 0 && (
            <div className="text-center mt-8">
              <button className="bg-gray-200 text-gray-700 px-6 py-3 rounded-md hover:bg-gray-300 transition-colors font-medium">
                Load More Internships
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default FindInternships;