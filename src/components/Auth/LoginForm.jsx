// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import { signInUser, clearError } from '../features/auth/authSlice'; // Import thunk and action

function LoginForm({ onLoginSuccess }) {
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth); // Get loading and error state

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const LoginSchema = Yup.object().shape({
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .required('Password is required'),
  });

  const handleEmailLogin = async (values, actions) => {
    dispatch(clearError()); // Clear any previous errors
    const resultAction = await dispatch(signInUser(values)); // Dispatch the async thunk
    if (signInUser.fulfilled.match(resultAction)) {
      alert('Login successful!');
      if (onLoginSuccess) onLoginSuccess(); // Notify parent component
    } else if (signInUser.rejected.match(resultAction)) {
      // Error is already in Redux state
    }
    actions.setSubmitting(false); // Re-enable the form button
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={LoginSchema}
      onSubmit={handleEmailLogin}
    >
      {({ isSubmitting }) => (
        <Form className="mt-8 space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          <div>
            <label htmlFor="loginEmail" className="sr-only">Email Address</label>
            <Field
              type="email"
              name="email"
              id="loginEmail"
              className="appearance-none rounded-md relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email"
            />
            <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1 text-left" />
          </div>

          <div>
            <label htmlFor="loginPassword" className="sr-only">Password</label>
            <div className="relative">
              <Field
                type={showPassword ? 'text' : 'password'}
                name="password"
                id="loginPassword"
                className="appearance-none rounded-md relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your password"
              />
              <span
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.656-1.115A9.97 9.97 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.268 5.768M4 12a8 8 0 018-8m0 16a8 8 0 01-8-8m16 0a8 8 0 01-8 8m0-16a8 8 0 018 8" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </span>
            </div>
            <ErrorMessage name="password" component="div" className="text-red-500 text-xs mt-1 text-left" />
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                Forgot your password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting || isLoading}
            className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
          >
            {isLoading ? 'Logging In...' : 'Log In'}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default LoginForm;