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
  FaTrash,
  FaEye
} from 'react-icons/fa';

const SavedOpportunities = () => {
  const [savedJobs, setSavedJobs] = useState([
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
      dateSaved: '2024-05-20',
      category: 'Technology',
      applicationDeadline: '2024-06-15'
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
      dateSaved: '2024-05-18',
      category: 'Marketing',
      applicationDeadline: '2024-06-10'
    },
    {
      id: 3,
      title: 'UI/UX Design Intern',
      company: 'DesignHub',
      location: 'Cape Town, South Africa',
      type: 'Part-time',
      duration: '3 months',
      salary: 'R9,000/month',
      description: 'Create beautiful and user-friendly designs for web and mobile applications.',
      requirements: ['Figma', 'Adobe XD', 'User Research', 'Prototyping'],
      dateSaved: '2024-05-15',
      category: 'Design',
      applicationDeadline: '2024-06-05'
    }
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  const filteredJobs = savedJobs.filter(job => 
    job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    job.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemoveJob = (jobId) => {
    setSavedJobs(savedJobs.filter(job => job.id !== jobId));
  };

  const handleApplyJob = (jobId) => {
    console.log(`Apply to job ${jobId}`);
  };

  const getDaysUntilDeadline = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
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
                <Link to="/find-internships" className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100">
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
                <Link to="/saved" className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50 text-orange-600 font-semibold">
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Saved Opportunities</h1>
            <p className="text-gray-600">Keep track of internships you're interested in and apply when ready</p>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Search Bar */}
              <div className="relative flex-grow max-w-md">
                <input
                  type="text"
                  placeholder="Search saved opportunities..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <FaSearch className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              </div>

              {/* Sort Options */}
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-600">{filteredJobs.length} saved opportunities</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="border border-gray-300 rounded-md py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="newest">Date Saved (Newest)</option>
                  <option value="oldest">Date Saved (Oldest)</option>
                  <option value="deadline">Application Deadline</option>
                  <option value="salary">Salary (Highest)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Saved Jobs List */}
          <div className="space-y-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map(job => {
                const daysUntilDeadline = getDaysUntilDeadline(job.applicationDeadline);
                const isUrgent = daysUntilDeadline <= 5 && daysUntilDeadline > 0;
                const isExpired = daysUntilDeadline < 0;

                return (
                  <div key={job.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-grow">
                        {/* Job Header */}
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                            {job.type}
                          </span>
                          {isUrgent && (
                            <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-semibold">
                              Urgent
                            </span>
                          )}
                          {isExpired && (
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">
                              Expired
                            </span>
                          )}
                        </div>
                        
                        {/* Company & Location Info */}
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <span className="font-medium">{job.company}</span>
                          <span className="flex items-center space-x-1">
                            <FaMapMarkerAlt className="h-3 w-3" />
                            <span>{job.location}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <FaClock className="h-3 w-3" />
                            <span>{job.duration}</span>
                          </span>
                        </div>

                        {/* Description */}
                        <p className="text-gray-700 mb-4">{job.description}</p>

                        {/* Requirements */}
                        <div className="flex flex-wrap gap-2 mb-4">
                          {job.requirements.map((req, index) => (
                            <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md text-sm">
                              {req}
                            </span>
                          ))}
                        </div>

                        {/* Bottom Info */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="font-semibold text-green-600">{job.salary}</span>
                            <span className="text-sm text-gray-500">
                              Saved on {new Date(job.dateSaved).toLocaleDateString()}
                            </span>
                          </div>
                          
                          {/* Deadline Info */}
                          <div className="text-sm">
                            {isExpired ? (
                              <span className="text-red-600 font-medium">Application Expired</span>
                            ) : (
                              <span className={`${isUrgent ? 'text-orange-600' : 'text-gray-600'}`}>
                                Deadline: {new Date(job.applicationDeadline).toLocaleDateString()}
                                {daysUntilDeadline > 0 && (
                                  <span className="ml-1">({daysUntilDeadline} days left)</span>
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center justify-end space-x-2 mt-4 pt-4 border-t border-gray-200">
                      <button
                        onClick={() => handleRemoveJob(job.id)}
                        className="flex items-center space-x-1 px-3 py-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
                      >
                        <FaTrash className="h-4 w-4" />
                        <span>Remove</span>
                      </button>
                      <button className="flex items-center space-x-1 px-3 py-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-md transition-colors">
                        <FaEye className="h-4 w-4" />
                        <span>View Details</span>
                      </button>
                      <button
                        onClick={() => handleApplyJob(job.id)}
                        disabled={isExpired}
                        className={`px-4 py-2 rounded-md transition-colors ${
                          isExpired 
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
                            : 'bg-orange-600 text-white hover:bg-orange-700'
                        }`}
                      >
                        {isExpired ? 'Expired' : 'Apply Now'}
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="bg-white rounded-lg shadow-md p-8 text-center">
                <FaBookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No saved opportunities yet</h3>
                <p className="text-gray-600 mb-4">
                  Start exploring internships and save the ones that interest you for later.
                </p>
                <Link
                  to="/find-internships"
                  className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
                >
                  Find Internships
                </Link>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default SavedOpportunities;