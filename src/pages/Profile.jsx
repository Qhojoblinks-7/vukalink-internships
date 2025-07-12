import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import StudentDashboardHeader from '../components/Dashboard/StudentDashboardHeader';
import { 
  FaTachometerAlt, 
  FaSearch, 
  FaFileAlt, 
  FaBookmark, 
  FaUser, 
  FaEdit,
  FaCamera,
  FaGraduationCap,
  FaTools,
  FaMapMarkerAlt,
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaGithub,
  FaPlus,
  FaTimes
} from 'react-icons/fa';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('personal');

  // Mock user profile data
  const [profileData, setProfileData] = useState({
    fullName: user?.profile?.full_name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    phone: '+27 82 123 4567',
    location: 'Cape Town, South Africa',
    bio: 'Computer Science student passionate about web development and machine learning. Looking for internship opportunities to gain practical experience.',
    university: 'University of Cape Town',
    degree: 'Bachelor of Science in Computer Science',
    year: 'Third Year',
    gpa: '3.8/4.0',
    skills: ['JavaScript', 'React', 'Python', 'Node.js', 'Git', 'SQL', 'Machine Learning'],
    linkedinUrl: 'https://linkedin.com/in/johndoe',
    githubUrl: 'https://github.com/johndoe',
    resume: 'john-doe-resume.pdf'
  });

  const [newSkill, setNewSkill] = useState('');
  const [tempProfileData, setTempProfileData] = useState(profileData);

  const handleEditToggle = () => {
    if (isEditing) {
      setTempProfileData(profileData);
    }
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    setProfileData(tempProfileData);
    setIsEditing(false);
  };

  const handleInputChange = (field, value) => {
    setTempProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddSkill = () => {
    if (newSkill && !tempProfileData.skills.includes(newSkill)) {
      setTempProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setTempProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const completionPercentage = () => {
    const fields = ['fullName', 'email', 'phone', 'location', 'bio', 'university', 'degree', 'year'];
    const completedFields = fields.filter(field => tempProfileData[field] && tempProfileData[field].length > 0);
    const skillsComplete = tempProfileData.skills.length > 0;
    const socialComplete = tempProfileData.linkedinUrl || tempProfileData.githubUrl;
    
    return Math.round(((completedFields.length + (skillsComplete ? 1 : 0) + (socialComplete ? 1 : 0)) / (fields.length + 2)) * 100);
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
                <Link to="/saved" className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100">
                  <FaBookmark className="h-5 w-5" />
                  <span>Saved Opportunities</span>
                </Link>
              </li>
              <li>
                <Link to="/profile" className="flex items-center space-x-3 p-3 rounded-lg bg-orange-50 text-orange-600 font-semibold">
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
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
                <p className="text-gray-600">Manage your personal information and preferences</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-gray-600">Profile Completion</p>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-orange-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${completionPercentage()}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">{completionPercentage()}%</span>
                  </div>
                </div>
                <button
                  onClick={isEditing ? handleSave : handleEditToggle}
                  className={`px-4 py-2 rounded-md transition-colors ${
                    isEditing 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-orange-600 text-white hover:bg-orange-700'
                  }`}
                >
                  {isEditing ? 'Save Changes' : 'Edit Profile'}
                </button>
                {isEditing && (
                  <button
                    onClick={handleEditToggle}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 transition-colors"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="bg-white rounded-lg shadow-md">
            {/* Profile Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                    <FaUser className="h-12 w-12 text-gray-500" />
                  </div>
                  {isEditing && (
                    <button className="absolute -bottom-2 -right-2 bg-orange-600 text-white p-2 rounded-full hover:bg-orange-700 transition-colors">
                      <FaCamera className="h-4 w-4" />
                    </button>
                  )}
                </div>
                <div className="flex-grow">
                  <h2 className="text-2xl font-bold text-gray-900">{profileData.fullName}</h2>
                  <p className="text-gray-600">{profileData.degree} • {profileData.university}</p>
                  <p className="text-gray-600">{profileData.location}</p>
                </div>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="border-b border-gray-200">
              <div className="flex space-x-8 px-6">
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'personal' 
                      ? 'border-orange-500 text-orange-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Personal Information
                </button>
                <button
                  onClick={() => setActiveTab('education')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'education' 
                      ? 'border-orange-500 text-orange-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Education
                </button>
                <button
                  onClick={() => setActiveTab('skills')}
                  className={`py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'skills' 
                      ? 'border-orange-500 text-orange-600' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Skills & Portfolio
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === 'personal' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempProfileData.fullName}
                          onChange={(e) => handleInputChange('fullName', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      ) : (
                        <p className="text-gray-900">{profileData.fullName}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <p className="text-gray-900 flex items-center space-x-2">
                        <FaEnvelope className="h-4 w-4 text-gray-400" />
                        <span>{profileData.email}</span>
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempProfileData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      ) : (
                        <p className="text-gray-900 flex items-center space-x-2">
                          <FaPhone className="h-4 w-4 text-gray-400" />
                          <span>{profileData.phone}</span>
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempProfileData.location}
                          onChange={(e) => handleInputChange('location', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      ) : (
                        <p className="text-gray-900 flex items-center space-x-2">
                          <FaMapMarkerAlt className="h-4 w-4 text-gray-400" />
                          <span>{profileData.location}</span>
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                    {isEditing ? (
                      <textarea
                        value={tempProfileData.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        rows={4}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                      />
                    ) : (
                      <p className="text-gray-900">{profileData.bio}</p>
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'education' && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">University</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempProfileData.university}
                          onChange={(e) => handleInputChange('university', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      ) : (
                        <p className="text-gray-900">{profileData.university}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Degree</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempProfileData.degree}
                          onChange={(e) => handleInputChange('degree', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      ) : (
                        <p className="text-gray-900">{profileData.degree}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Year of Study</label>
                      {isEditing ? (
                        <select
                          value={tempProfileData.year}
                          onChange={(e) => handleInputChange('year', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        >
                          <option value="First Year">First Year</option>
                          <option value="Second Year">Second Year</option>
                          <option value="Third Year">Third Year</option>
                          <option value="Fourth Year">Fourth Year</option>
                          <option value="Postgraduate">Postgraduate</option>
                        </select>
                      ) : (
                        <p className="text-gray-900">{profileData.year}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">GPA</label>
                      {isEditing ? (
                        <input
                          type="text"
                          value={tempProfileData.gpa}
                          onChange={(e) => handleInputChange('gpa', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      ) : (
                        <p className="text-gray-900">{profileData.gpa}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'skills' && (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                    {isEditing && (
                      <div className="flex items-center space-x-2 mb-4">
                        <input
                          type="text"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          placeholder="Add a skill"
                          className="flex-grow border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                          onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                        />
                        <button
                          onClick={handleAddSkill}
                          className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 transition-colors"
                        >
                          <FaPlus className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                    <div className="flex flex-wrap gap-2">
                      {(isEditing ? tempProfileData.skills : profileData.skills).map((skill, index) => (
                        <span key={index} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm flex items-center space-x-2">
                          <span>{skill}</span>
                          {isEditing && (
                            <button
                              onClick={() => handleRemoveSkill(skill)}
                              className="text-orange-600 hover:text-orange-800"
                            >
                              <FaTimes className="h-3 w-3" />
                            </button>
                          )}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">LinkedIn Profile</label>
                      {isEditing ? (
                        <input
                          type="url"
                          value={tempProfileData.linkedinUrl}
                          onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      ) : (
                        <p className="text-gray-900 flex items-center space-x-2">
                          <FaLinkedin className="h-4 w-4 text-blue-600" />
                          <a href={profileData.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {profileData.linkedinUrl}
                          </a>
                        </p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">GitHub Profile</label>
                      {isEditing ? (
                        <input
                          type="url"
                          value={tempProfileData.githubUrl}
                          onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      ) : (
                        <p className="text-gray-900 flex items-center space-x-2">
                          <FaGithub className="h-4 w-4 text-gray-800" />
                          <a href={profileData.githubUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            {profileData.githubUrl}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Resume</label>
                    <div className="flex items-center space-x-4">
                      <span className="text-gray-900">{profileData.resume}</span>
                      <button className="text-orange-600 hover:text-orange-700 text-sm">
                        {isEditing ? 'Upload New' : 'Download'}
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Profile;