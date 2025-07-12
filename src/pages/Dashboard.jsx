import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import StudentDashboardHeader from '../components/Dashboard/StudentDashboardHeader';
import { 
  FaTachometerAlt, 
  FaSearch, 
  FaFileAlt, 
  FaBookmark, 
  FaUser, 
  FaChartLine,
  FaCalendarAlt,
  FaBell
} from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  // Mock data for dashboard metrics
  const dashboardStats = {
    totalApplications: 12,
    pendingApplications: 5,
    interviews: 2,
    savedJobs: 8,
    profileCompletion: 85
  };

  const recentApplications = [
    { id: 1, jobTitle: 'Marketing Intern', company: 'Orange Media', status: 'Interview', date: '2024-05-25' },
    { id: 2, jobTitle: 'Software Engineering Intern', company: 'BlueTech Solutions', status: 'Applied', date: '2024-05-23' },
    { id: 3, jobTitle: 'Business Analyst Intern', company: 'Insight Partners', status: 'Offer', date: '2024-05-19' }
  ];

  const upcomingDeadlines = [
    { id: 1, company: 'Tech Corp', position: 'Software Intern', deadline: '2024-06-01' },
    { id: 2, company: 'Marketing Pro', position: 'Marketing Intern', deadline: '2024-06-05' }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <StudentDashboardHeader />
      
      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className="w-64 bg-white p-6 shadow-md border-r border-gray-200">
          <nav>
            <ul className="space-y-4">
              <li>
                <Link to="/dashboard" className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50 text-orange-600 font-semibold">
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
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.profile?.full_name || 'Student'}!
            </h1>
            <p className="text-gray-600">Here's what's happening with your internship journey</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardStats.totalApplications}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaFileAlt className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Pending Responses</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardStats.pendingApplications}</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <FaCalendarAlt className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Interviews</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardStats.interviews}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <FaChartLine className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Saved Jobs</p>
                  <p className="text-2xl font-bold text-gray-900">{dashboardStats.savedJobs}</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <FaBookmark className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Applications */}
            <div className="lg:col-span-2 bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Recent Applications</h2>
                <Link to="/my-applications" className="text-orange-600 hover:text-orange-700 text-sm font-medium">
                  View All
                </Link>
              </div>
              <div className="space-y-4">
                {recentApplications.map((app) => (
                  <div key={app.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                    <div className="flex-grow">
                      <h3 className="font-semibold text-gray-900">{app.jobTitle}</h3>
                      <p className="text-sm text-gray-600">{app.company}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        app.status === 'Interview' ? 'bg-yellow-100 text-yellow-800' :
                        app.status === 'Applied' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {app.status}
                      </span>
                      <span className="text-sm text-gray-500">{app.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Upcoming Deadlines</h2>
                <FaBell className="h-5 w-5 text-gray-400" />
              </div>
              <div className="space-y-4">
                {upcomingDeadlines.map((deadline) => (
                  <div key={deadline.id} className="p-4 border border-gray-200 rounded-lg">
                    <h3 className="font-semibold text-gray-900">{deadline.position}</h3>
                    <p className="text-sm text-gray-600">{deadline.company}</p>
                    <p className="text-sm text-red-600 mt-1">Due: {deadline.deadline}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link to="/find-internships" className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <FaSearch className="h-6 w-6 text-orange-600" />
                <span className="font-medium text-gray-900">Find New Internships</span>
              </Link>
              <Link to="/profile" className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <FaUser className="h-6 w-6 text-orange-600" />
                <span className="font-medium text-gray-900">Update Profile</span>
              </Link>
              <Link to="/my-applications" className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <FaFileAlt className="h-6 w-6 text-orange-600" />
                <span className="font-medium text-gray-900">Track Applications</span>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;