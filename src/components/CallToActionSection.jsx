// src/components/CallToActionSection.jsx
import React, { useState } from 'react';

function CallToActionSection() {
  const [userType, setUserType] = useState('student'); // 'student' or 'company'
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // For now, just log the form data.
    // This is where you would integrate with Supabase Auth (next steps!).
    console.log('Sign Up Data:', { fullName, email, userType });
    alert(`Thank you for signing up as a ${userType}! Check the console for data.`);
    // Reset form
    setFullName('');
    setEmail('');
    setUserType('student');
  };

  return (
    <section className="bg-blue-700 py-16 md:py-24 text-white">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        {/* Main CTA Text */}
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Ready to Kickstart Your Career?
        </h2>
        <p className="text-lg md:text-xl mb-12 max-w-2xl">
          Join thousands of students and leading companies connecting on VukaLink today.
        </p>

        {/* Sign-up Form Card */}
        <div className="bg-white text-gray-800 p-8 md:p-12 rounded-lg shadow-xl w-full max-w-md">
          <h3 className="text-2xl font-bold mb-6">Sign Up Free</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="fullName" className="sr-only">Full Name</label>
              <input
                type="text"
                id="fullName"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="sr-only">Email Address</label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="userType" className="sr-only">I am a...</label>
              <select
                id="userType"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg appearance-none bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
              >
                <option value="student">I am a Student</option>
                <option value="company">I am a Company</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
            >
              Sign Up Free
            </button>
          </form>
          <p className="mt-6 text-gray-600">
            Already have an account?{' '}
            <a href="#" className="text-blue-700 font-semibold hover:underline">
              Login here
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

export default CallToActionSection;