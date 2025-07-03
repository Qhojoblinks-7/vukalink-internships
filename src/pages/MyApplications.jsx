// src/pages/MyApplications.jsx
import React, { useState } from 'react';
import StudentDashboardHeader from '../components/Dashboard/StudentDashboardHeader'; // Import the header
import { Link, NavLink } from 'react-router-dom'; // For sidebar navigation
import {
  FaTachometerAlt, FaSearch, FaFileAlt, FaBookmark, FaUser, FaEnvelope, FaBookOpen, FaDownload, FaTimesCircle, FaPlusCircle // Icons for sidebar and table actions
} from 'react-icons/fa'; // Assuming FontAwesome icons
import { FaAngleDown } from 'react-icons/fa6'; // For dropdown arrow

const MyApplications = () => {
  // Example dummy data for applications (replace with actual data from Redux/API)
  const [applications, setApplications] = useState([
    { id: 1, jobTitle: 'Marketing Intern', companyName: 'Orange Media', dateApplied: '24 May 2024', currentStatus: 'Applied', lastStatusUpdate: '25 May 2024' },
    { id: 2, jobTitle: 'Software Engineering Intern', companyName: 'BlueTech Solutions', dateApplied: '21 May 2024', currentStatus: 'Interview', lastStatusUpdate: '23 May 2024' },
    { id: 3, jobTitle: 'Graphic Design Intern', companyName: 'Creative Pulse', dateApplied: '19 May 2024', currentStatus: 'Reviewed', lastStatusUpdate: '19 May 2024' },
    { id: 4, jobTitle: 'Business Analyst Intern', companyName: 'Insight Partners', dateApplied: '16 May 2024', currentStatus: 'Offer', lastStatusUpdate: '19 May 2024' },
    { id: 5, jobTitle: 'Finance Intern', companyName: 'FinEdge Group', dateApplied: '10 May 2024', currentStatus: 'Rejected', lastStatusUpdate: '15 May 2024' },
  ]);

  // State for filters and pagination (basic implementation)
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Date Applied');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const applicationsPerPage = 5; // As per screenshot

  // Calculate applications to display based on filters and pagination
  const filteredApplications = applications.filter(app =>
    (statusFilter === 'All' || app.currentStatus === statusFilter) &&
    (app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
     app.companyName.toLowerCase().includes(searchQuery.toLowerCase()))
  ).sort((a, b) => {
    // Basic sorting by date
    if (sortBy === 'Date Applied') {
      return new Date(b.dateApplied) - new Date(a.dateApplied);
    }
    return 0; // No other sorting implemented yet
  });

  const indexOfLastApplication = currentPage * applicationsPerPage;
  const indexOfFirstApplication = indexOfLastApplication - applicationsPerPage;
  const currentApplications = filteredApplications.slice(indexOfFirstApplication, indexOfLastApplication);
  const totalPages = Math.ceil(filteredApplications.length / applicationsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Helper to get status color (matching screenshot)
  const getStatusColorClass = (status) => {
    switch (status) {
      case 'Applied': return 'bg-blue-100 text-blue-800';
      case 'Interview': return 'bg-yellow-100 text-yellow-800';
      case 'Reviewed': return 'bg-purple-100 text-purple-800';
      case 'Offer': return 'bg-green-100 text-green-800';
      case 'Rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <StudentDashboardHeader /> {/* The student-specific header */}

      <div className="flex flex-grow">
        {/* Left Sidebar */}
        <aside className="w-64 bg-white p-6 shadow-md border-r border-gray-200">
          <nav>
            <ul className="space-y-4">
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 p-3 rounded-lg ${isActive ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`
                  }
                >
                  <FaTachometerAlt className="h-5 w-5" />
                  <span>My Dashboard</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/find-internships"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 p-3 rounded-lg ${isActive ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`
                  }
                >
                  <FaSearch className="h-5 w-5" />
                  <span>Find Internships</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/my-applications"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 p-3 rounded-lg ${isActive ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`
                  }
                >
                  <FaFileAlt className="h-5 w-5" />
                  <span>My Applications</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/saved"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 p-3 rounded-lg ${isActive ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`
                  }
                >
                  <FaBookmark className="h-5 w-5" />
                  <span>Saved Opportunities</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 p-3 rounded-lg ${isActive ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`
                  }
                >
                  <FaUser className="h-5 w-5" />
                  <span>My Profile</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/messages"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 p-3 rounded-lg ${isActive ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`
                  }
                >
                  <FaEnvelope className="h-5 w-5" />
                  <span>Messages</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/resources"
                  className={({ isActive }) =>
                    `flex items-center space-x-3 p-3 rounded-lg ${isActive ? 'bg-orange-50 text-orange-600 font-semibold' : 'text-gray-700 hover:bg-gray-100'}`
                  }
                >
                  <FaBookOpen className="h-5 w-5" />
                  <span>Resources</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-grow p-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-6">My Applications</h1>

            {/* Filters and Search Bar */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              {/* Status Filter */}
              <div className="relative">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="All">Status: All</option>
                  <option value="Applied">Applied</option>
                  <option value="Interview">Interview</option>
                  <option value="Reviewed">Reviewed</option>
                  <option value="Offer">Offer</option>
                  <option value="Rejected">Rejected</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FaAngleDown />
                </div>
              </div>

              {/* Sort By */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 pl-3 pr-8 rounded-md leading-tight focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="Date Applied">Sort by: Date Applied</option>
                  {/* Add more sort options if needed */}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <FaAngleDown />
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative flex-grow max-w-sm">
                <input
                  type="text"
                  placeholder="Search by job or company"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-gray-300 rounded-md py-2 pl-10 pr-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className="text-gray-400" />
                </div>
                <button className="absolute inset-y-0 right-0 pr-3 flex items-center text-orange-500 hover:text-orange-600">
                  <FaSearch /> {/* Reusing search icon for the button too */}
                </button>
              </div>

              {/* Buttons */}
              <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300 transition-colors flex items-center space-x-2">
                <FaTimesCircle className="h-4 w-4" /> {/* Assuming an icon for Withdraw */}
                <span>Bulk Withdraw</span>
              </button>
              <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors flex items-center space-x-2">
                <FaDownload className="h-4 w-4" /> {/* Assuming an icon for Export */}
                <span>Export Data</span>
              </button>
            </div>

            {/* Applications Table */}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">
                      <input type="checkbox" className="form-checkbox h-4 w-4 text-orange-600 rounded" />
                    </th>
                    <th className="py-3 px-6 text-left">Job Title</th>
                    <th className="py-3 px-6 text-left">Company Name</th>
                    <th className="py-3 px-6 text-left">Date Applied</th>
                    <th className="py-3 px-6 text-left">Current Status</th>
                    <th className="py-3 px-6 text-left">Last Status Update</th>
                    <th className="py-3 px-6 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {currentApplications.length > 0 ? (
                    currentApplications.map((app) => (
                      <tr key={app.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <input type="checkbox" className="form-checkbox h-4 w-4 text-orange-600 rounded" />
                        </td>
                        <td className="py-3 px-6 text-left whitespace-nowrap font-medium">{app.jobTitle}</td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">{app.companyName}</td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">{app.dateApplied}</td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <span className={`py-1 px-3 rounded-full text-xs font-semibold ${getStatusColorClass(app.currentStatus)}`}>
                            {app.currentStatus}
                          </span>
                        </td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">{app.lastStatusUpdate}</td>
                        <td className="py-3 px-6 text-center whitespace-nowrap flex items-center justify-center space-x-2">
                          <button className="text-blue-500 hover:text-blue-700 text-sm">View</button>
                          <span className="text-gray-300">|</span>
                          <button className="text-red-500 hover:text-red-700 text-sm flex items-center space-x-1">
                            <FaTimesCircle className="h-3 w-3" />
                            <span>Withdraw</span>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" className="py-8 text-center text-gray-500">
                        No applications found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-between items-center mt-6">
              <span className="text-sm text-gray-600">
                Showing {indexOfFirstApplication + 1}-{Math.min(indexOfLastApplication, filteredApplications.length)} of {filteredApplications.length} applications
              </span>
              <nav className="flex space-x-1" aria-label="Pagination">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => paginate(page)}
                    className={`h-9 w-9 flex items-center justify-center rounded-full text-sm font-medium ${
                      currentPage === page ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default MyApplications;