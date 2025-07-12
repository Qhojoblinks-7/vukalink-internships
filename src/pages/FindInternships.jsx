import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StudentDashboardHeader from '../components/Dashboard/StudentDashboardHeader';
import { 
  FaTachometerAlt, 
  FaSearch, 
  FaFileAlt, 
  FaBookmark, 
  FaUser, 
  FaMapMarkerAlt,
  FaClock,
  FaHeart,
  FaFilter,
  FaSort
} from 'react-icons/fa';

const FindInternships = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Mock internship data
  const internships = [
    {
      id: 1,
      title: 'Software Engineering Intern',
      company: 'TechCorp',
      location: 'Cape Town, South Africa',
      type: 'Full-time',
      duration: '3 months',
      salary: 'R12,000/month',
      description: 'Join our development team to build cutting-edge web applications using React and Node.js.',
      requirements: ['React', 'JavaScript', 'Node.js', 'Git'],
      posted: '2 days ago',
      category: 'Technology',
      saved: false
    },
    {
      id: 2,
      title: 'Marketing Intern',
      company: 'BrandMax',
      location: 'Johannesburg, South Africa',
      type: 'Part-time',
      duration: '6 months',
      salary: 'R8,000/month',
      description: 'Help develop marketing campaigns and social media strategies for our growing brand.',
      requirements: ['Social Media', 'Content Creation', 'Analytics', 'Adobe Creative Suite'],
      posted: '1 week ago',
      category: 'Marketing',
      saved: true
    },
    {
      id: 3,
      title: 'Data Science Intern',
      company: 'DataFlow',
      location: 'Remote',
      type: 'Full-time',
      duration: '4 months',
      salary: 'R15,000/month',
      description: 'Work with our data science team to analyze large datasets and build predictive models.',
      requirements: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
      posted: '3 days ago',
      category: 'Data Science',
      saved: false
    },
    {
      id: 4,
      title: 'Business Analyst Intern',
      company: 'ConsultPro',
      location: 'Durban, South Africa',
      type: 'Full-time',
      duration: '6 months',
      salary: 'R10,000/month',
      description: 'Assist in business process analysis and improvement initiatives for our clients.',
      requirements: ['Excel', 'Business Analysis', 'Process Mapping', 'Communication'],
      posted: '5 days ago',
      category: 'Business',
      saved: false
    },
    {
      id: 5,
      title: 'UI/UX Design Intern',
      company: 'DesignHub',
      location: 'Cape Town, South Africa',
      type: 'Part-time',
      duration: '3 months',
      salary: 'R9,000/month',
      description: 'Create beautiful and user-friendly designs for web and mobile applications.',
      requirements: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      posted: '1 day ago',
      category: 'Design',
      saved: true
    }
  ];

  const categories = ['All', 'Technology', 'Marketing', 'Data Science', 'Business', 'Design'];

  const filteredInternships = internships.filter(internship => {
    const matchesSearch = internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         internship.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !locationFilter || internship.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesCategory = !categoryFilter || categoryFilter === 'All' || internship.category === categoryFilter;
    
    return matchesSearch && matchesLocation && matchesCategory;
  });

  const handleSaveJob = (jobId) => {
    // In a real app, this would update the backend
    console.log(`Save/unsave job ${jobId}`);
  };

  const handleApplyJob = (jobId) => {
    // In a real app, this would navigate to application form
    console.log(`Apply to job ${jobId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <StudentDashboardHeader />
      
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-64 bg-white p-6 shadow-md border-r border-gray-200">
          <nav>
            <ul className="space-y-4">
              <li>
                <Link to="/dashboard" className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100">
                  <FaTachometerAlt className="h-5 w-5" />
                  <span>My Dashboard</span>
                </Link>
              </li>
              <li>
                <Link to="/find-internships" className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50 text-orange-600 font-semibold">
                  <FaSearch className="h-5 w-5" />
                  <span>Find Internships</span>
                </Link>
              </li>
              <li>
                <Link to="/my-applications" className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100">
                  <FaFileAlt className="h-5 w-5" />
                  <span>My Applications</span>
                </Link>
              </li>
              <li>
                <Link to="/saved" className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100">
                  <FaBookmark className="h-5 w-5" />
                  <span>Saved Opportunities</span>
                </Link>
              </li>
              <li>
                <Link to="/profile" className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100">
                  <FaUser className="h-5 w-5" />
                  <span>My Profile</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Internships</h1>
            <p className="text-gray-600">Discover exciting internship opportunities that match your skills and interests</p>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search Bar */}
              <div className="relative lg:col-span-2">
                <input
                  type="text"
                  placeholder="Search by job title or company"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <FaSearch className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              </div>

              {/* Location Filter */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Location"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <FaMapMarkerAlt className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              </div>

              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Sort Options */}
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600">
                Showing {filteredInternships.length} internships
              </p>
              <div className="flex items-center space-x-2">
                <FaSort className="h-4 w-4 text-gray-400" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md py-1 px-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="salary">Highest Salary</option>
                  <option value="company">Company A-Z</option>
                </select>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="space-y-6">
            {filteredInternships.map(internship => (
              <div key={internship.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-grow">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{internship.title}</h3>
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                        {internship.type}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                      <span className="font-medium">{internship.company}</span>
                      <span className="flex items-center space-x-1">
                        <FaMapMarkerAlt className="h-3 w-3" />
                        <span>{internship.location}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <FaClock className="h-3 w-3" />
                        <span>{internship.duration}</span>
                      </span>
                    </div>

                    <p className="text-gray-700 mb-4">{internship.description}</p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {internship.requirements.map((req, index) => (
                        <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm">
                          {req}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <span className="font-semibold text-green-600">{internship.salary}</span>
                        <span className="text-sm text-gray-500">Posted {internship.posted}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleSaveJob(internship.id)}
                          className={`p-2 rounded-full transition-colors ${
                            internship.saved 
                              ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          <FaHeart className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => handleApplyJob(internship.id)}
                          className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
                        >
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* No Results */}
          {filteredInternships.length === 0 && (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <FaSearch className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No internships found</h3>
              <p className="text-gray-600">Try adjusting your search criteria or check back later for new opportunities.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default FindInternships;