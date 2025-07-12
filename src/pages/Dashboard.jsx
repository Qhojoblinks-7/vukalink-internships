import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import StudentDashboardHeader from '../components/Dashboard/StudentDashboardHeader';
import { Link } from 'react-router-dom';
import {
  FaSearch, FaFileAlt, FaBookmark, FaUser, FaEnvelope, FaBookOpen,
  FaChartLine, FaCalendarAlt, FaCheckCircle, FaClock, FaExclamationTriangle
} from 'react-icons/fa';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const [stats, setStats] = useState({
    totalApplications: 12,
    pendingApplications: 3,
    interviewsScheduled: 2,
    offersReceived: 1
  });

  const [recentActivity, setRecentActivity] = useState([
    {
      id: 1,
      type: 'application',
      title: 'Software Engineering Intern',
      company: 'TechCorp',
      date: '2 hours ago',
      status: 'Applied'
    },
    {
      id: 2,
      type: 'interview',
      title: 'Marketing Intern',
      company: 'Creative Agency',
      date: '1 day ago',
      status: 'Interview Scheduled'
    },
    {
      id: 3,
      type: 'offer',
      title: 'Data Science Intern',
      company: 'Analytics Inc',
      date: '3 days ago',
      status: 'Offer Received'
    }
  ]);

  const [upcomingInterviews, setUpcomingInterviews] = useState([
    {
      id: 1,
      title: 'Marketing Intern',
      company: 'Creative Agency',
      date: 'Tomorrow, 2:00 PM',
      type: 'Video Call'
    },
    {
      id: 2,
      title: 'Software Engineering Intern',
      company: 'TechCorp',
      date: 'Friday, 10:00 AM',
      type: 'On-site'
    }
  ]);

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
                  className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50 text-orange-600 font-semibold"
                >
                  <FaChartLine className="h-5 w-5" />
                  <span>My Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/find-internships"
                  className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100"
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
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Welcome back, {user?.profile?.full_name || 'Student'}!
            </h1>
            <p className="text-gray-600">
              Here's what's happening with your internship applications
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-blue-100 text-blue-600">
                  <FaFileAlt className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Applications</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.totalApplications}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
                  <FaClock className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.pendingApplications}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-purple-100 text-purple-600">
                  <FaCalendarAlt className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Interviews</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.interviewsScheduled}</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center">
                <div className="p-3 rounded-full bg-green-100 text-green-600">
                  <FaCheckCircle className="h-6 w-6" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Offers</p>
                  <p className="text-2xl font-semibold text-gray-900">{stats.offersReceived}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Activity */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'offer' ? 'bg-green-100 text-green-600' :
                      activity.type === 'interview' ? 'bg-purple-100 text-purple-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {activity.type === 'offer' ? <FaCheckCircle className="h-4 w-4" /> :
                       activity.type === 'interview' ? <FaCalendarAlt className="h-4 w-4" /> :
                       <FaFileAlt className="h-4 w-4" />}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{activity.title}</p>
                      <p className="text-sm text-gray-600">{activity.company} • {activity.status}</p>
                    </div>
                    <span className="text-xs text-gray-500">{activity.date}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/my-applications"
                className="mt-4 inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
              >
                View all applications
                <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>

            {/* Upcoming Interviews */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Upcoming Interviews</h2>
              <div className="space-y-4">
                {upcomingInterviews.length > 0 ? (
                  upcomingInterviews.map((interview) => (
                    <div key={interview.id} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{interview.title}</h3>
                        <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                          {interview.type}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{interview.company}</p>
                      <p className="text-sm text-gray-500">{interview.date}</p>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8">
                    <FaCalendarAlt className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                    <p className="text-gray-500">No upcoming interviews</p>
                    <Link
                      to="/find-internships"
                      className="mt-2 inline-flex items-center text-orange-600 hover:text-orange-700 font-medium"
                    >
                      Browse internships
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link
                to="/find-internships"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FaSearch className="h-6 w-6 text-orange-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Find Internships</p>
                  <p className="text-sm text-gray-600">Browse new opportunities</p>
                </div>
              </Link>
              
              <Link
                to="/profile"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FaUser className="h-6 w-6 text-orange-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Update Profile</p>
                  <p className="text-sm text-gray-600">Keep your info current</p>
                </div>
              </Link>
              
              <Link
                to="/resources"
                className="flex items-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <FaBookOpen className="h-6 w-6 text-orange-500 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">Resources</p>
                  <p className="text-sm text-gray-600">Tips and guides</p>
                </div>
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;