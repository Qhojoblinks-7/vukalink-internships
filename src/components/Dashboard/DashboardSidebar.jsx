import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaTachometerAlt, 
  FaSearch, 
  FaFileAlt, 
  FaBookmark, 
  FaUser, 
  FaEnvelope, 
  FaBookOpen 
} from 'react-icons/fa';

const DashboardSidebar = () => {
  const navItems = [
    { 
      to: '/dashboard', 
      icon: FaTachometerAlt, 
      label: 'My Dashboard' 
    },
    { 
      to: '/find-internships', 
      icon: FaSearch, 
      label: 'Find Internships' 
    },
    { 
      to: '/my-applications', 
      icon: FaFileAlt, 
      label: 'My Applications' 
    },
    { 
      to: '/saved', 
      icon: FaBookmark, 
      label: 'Saved Opportunities' 
    },
    { 
      to: '/profile', 
      icon: FaUser, 
      label: 'My Profile' 
    },
    { 
      to: '/messages', 
      icon: FaEnvelope, 
      label: 'Messages' 
    },
    { 
      to: '/resources', 
      icon: FaBookOpen, 
      label: 'Resources' 
    }
  ];

  return (
    <aside className="w-64 bg-white p-6 shadow-md border-r border-gray-200">
      <nav>
        <ul className="space-y-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      isActive 
                        ? 'bg-orange-50 text-orange-600 font-semibold' 
                        : 'text-gray-700 hover:bg-gray-100'
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default DashboardSidebar;