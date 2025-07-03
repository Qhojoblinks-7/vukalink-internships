// src/pages/AuthPage.jsx
import React, { useState, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import SignUpForm from '../components/SignUpForm';
import LoginForm from '../components/LoginForm';
import authService from '../services/authService'; // Import the authService
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import {
  setAuthSession,
  fetchCurrentUserAndProfile,
  setLoading,
  clearAuth,
  clearError
} from '../features/auth/authSlice';

function AuthPage() {
  const [showLogin, setShowLogin] = useState(false);
  const dispatch = useDispatch();
  const { isAuthenticated, isLoading, user, error } = useSelector((state) => state.auth);

  useEffect(() => {
    // Set initial loading state
    dispatch(setLoading(true));

    // Listen for auth state changes from Supabase
    const authListener = authService.onAuthStateChange(async (event, session) => {
      console.log('Supabase Auth Event:', event, 'Session:', session);
      if (session) {
        // When a user signs in or session is restored
        // We fetch the full user object including our custom profile data
        dispatch(fetchCurrentUserAndProfile());
      } else {
        // When a user signs out or no session exists
        dispatch(clearAuth()); // Clear auth state in Redux
      }
      dispatch(setLoading(false)); // Finished initial loading check
    });

    // Cleanup the listener on component unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [dispatch]); // Dependency array to run only once

  const handleGoogleSignIn = async () => {
    dispatch(clearError()); // Clear any previous errors
    try {
      await authService.signInWithGoogle();
      // Supabase redirects, so no further client-side logic here for successful initiation.
    } catch (err) {
      console.error('Google Sign-in initiation failed:', err.message);
      dispatch(clearError(err.message)); // Set error in Redux state
      alert(`Google Sign-in failed: ${err.message}`);
    }
  };

  const handleAuthSuccess = () => {
    // This callback is triggered after a successful email/password signup or login.
    // The `onAuthStateChange` listener will then detect the new session
    // and dispatch `fetchCurrentUserAndProfile` to populate the Redux store.
    console.log("Form submission successful. Auth state will update via listener.");
    // If you were using React Router, this is where you might navigate:
    // navigate('/dashboard');
  };

  // If already authenticated and user data is loaded, maybe redirect or show dashboard
  if (!isLoading && isAuthenticated && user) {
    // In a real app, you would redirect to your main application dashboard
    // For now, let's just show a logged-in message.
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-3xl font-bold text-green-700 mb-4">Welcome, {user.profile?.full_name || user.email}!</h1>
        <p className="text-lg text-gray-700">Your role: {user.profile?.user_type}</p>
        <button
          onClick={() => dispatch(signOutUser())} // Dispatch logout action
          className="mt-6 px-6 py-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
        >
          Sign Out
        </button>
      </div>
    );
  }

  // Show loading indicator
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>Loading authentication state...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden">

        {/* Left Column: Welcome/Branding Area */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col items-center justify-center text-center">
          <img
            className="h-16 w-auto mb-6"
            src="/vukalink-logo.png"
            alt="VukaLink Logo"
          />
          <h2 className="text-3xl font-extrabold text-gray-900 mb-2">
            {showLogin ? "Welcome Back!" : "Start Your Journey"}
          </h2>
          <p className="text-gray-600 mb-8 max-w-sm">
            {showLogin ? "Log in to continue your career journey." : "Connect with internships and kickstart your career."}
          </p>

          <button
            onClick={handleGoogleSignIn}
            className="group relative w-full max-w-xs flex justify-center py-2.5 px-4 border border-gray-300 rounded-md shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            <FcGoogle className="h-5 w-5 mr-2" />
            {showLogin ? "Log In with Google" : "Sign Up with Google"}
          </button>
        </div>

        {/* Right Column: Dynamic Form Area (Sign Up or Log In) */}
        <div className="w-full md:w-1/2 p-8 md:p-12 border-t md:border-t-0 md:border-l border-gray-200 flex flex-col justify-center">

          {/* Conditional error display for AuthPage itself (e.g. Google sign-in errors) */}
          {error && !isLoading && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                <span className="block sm:inline">{error}</span>
              </div>
          )}

          {showLogin ? (
            <LoginForm onLoginSuccess={handleAuthSuccess} />
          ) : (
            <SignUpForm onSignUpSuccess={handleAuthSuccess} />
          )}

          <p className="mt-4 text-center text-sm text-gray-600">
            {showLogin ? (
              <>
                Don't have an account?{' '}
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setShowLogin(false); dispatch(clearError()); }}
                  className="font-medium text-orange-500 hover:text-orange-600"
                >
                  Sign Up
                </a>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <a
                  href="#"
                  onClick={(e) => { e.preventDefault(); setShowLogin(true); dispatch(clearError()); }}
                  className="font-medium text-orange-500 hover:text-orange-600"
                >
                  Log In
                </a>
              </>
            )}
          </p>

          {!showLogin && (
            <>
              <p className="mt-6 text-center text-sm text-gray-600">
                We use secure authentication to create your VukaLink profile for a seamless experience.
              </p>
              <p className="text-center text-xs text-gray-500 mt-2">
                By signing up, you agree to our{' '}
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Terms of Service
                </a>{' '}
                and{' '}
                <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                  Privacy Policy
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthPage;