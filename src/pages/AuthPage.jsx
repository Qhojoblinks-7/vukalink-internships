// src/pages/AuthPage.jsx (Updated Snippet)
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import useNavigate
import { FcGoogle } from 'react-icons/fc';
import SignUpForm from '../components/Auth/SignUpForm';
import LoginForm from '../components/Auth/LoginForm';
import authService from '../services/authService';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAuthSession,
  fetchCurrentUserAndProfile,
  setLoading,
  clearAuth,
  clearError,
  signOutUser
} from '../features/auth/authSlice';
import { supabase } from '../lib/supabaseClient';

function AuthPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [emailConfirmedMessage, setEmailConfirmedMessage] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const location = useLocation();

  const { isAuthenticated, isLoading, user, error } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check URL for email confirmation message
    const queryParams = new URLSearchParams(location.search);
    if (queryParams.get('email_confirmed') === 'true') {
      setEmailConfirmedMessage('Your email has been successfully confirmed! Please log in below.');
      navigate(location.pathname, { replace: true });
    }

    if (!isAuthenticated && !user && !isLoading) {
        dispatch(setLoading(true));
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Supabase Auth Event:', event, 'Session:', session);
      if (session) {
        dispatch(setAuthSession(session));
        await dispatch(fetchCurrentUserAndProfile());
        // Redirect to "My Applications" page after successful login/session restore
        navigate('/my-applications', { replace: true }); // <--- THIS IS THE KEY CHANGE
      } else {
        dispatch(clearAuth());
      }
      dispatch(setLoading(false));
    });

    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, [dispatch, location.search, location.pathname, navigate, isAuthenticated, user, isLoading]); // Added missing dependencies

  const handleGoogleSignIn = async () => {
    dispatch(clearError());
    dispatch(setLoading(true));
    try {
      // For Google OAuth, the redirectTo ensures Supabase sends the user back
      // to your app, and then the onAuthStateChange listener takes over.
      await authService.signInWithGoogle({ redirectTo: window.location.origin + '/my-applications' }); // Optional: direct Google to dashboard after auth
    } catch (err) {
      console.error('Google Sign-in initiation failed:', err.message);
      dispatch(clearError(err.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

  const handleAuthSuccess = () => {
    console.log("Form submission successful. Auth state will update via listener.");
    if (!showLogin) { // If it was a sign-up
      setEmailConfirmedMessage("Account created! Please check your email to confirm your account, then log in.");
    }
  };

  // --- Conditional Rendering Logic ---

  // Instead of showing a "Welcome" message here, directly redirect.
  // The `Maps` call inside `useEffect` already handles this.
  // This `if (isAuthenticated && user)` block should ideally not be reached
  // if navigation is working correctly, but it's good for fallback/development.
  if (isAuthenticated && user) {
     // If for some reason the navigate above didn't fire or there's a slight delay,
     // you can add a fallback redirect here.
     navigate('/my-applications', { replace: true });
     return null; // Or a simple loading screen while redirecting
  }

  if (isLoading && !isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>Loading authentication state...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      {/* ... (rest of your AuthPage JSX remains the same) ... */}
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg flex flex-col md:flex-row overflow-hidden">
        {/* Left Column: Welcome/Branding Area */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col items-center justify-center text-center">
          <img className="h-16 w-auto mb-6" src="/vukalink-logo.png" alt="VukaLink Logo"/>
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
          {emailConfirmedMessage && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{emailConfirmedMessage}</span>
            </div>
          )}

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
                  onClick={(e) => { e.preventDefault(); setShowLogin(false); dispatch(clearError()); setEmailConfirmedMessage(''); }}
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
                  onClick={(e) => { e.preventDefault(); setShowLogin(true); dispatch(clearError()); setEmailConfirmedMessage(''); }}
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