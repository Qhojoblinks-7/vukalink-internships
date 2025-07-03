// src/components/SignUpForm.jsx
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux'; // Import Redux hooks
import { signUpUser, clearError } from '../features/auth/authSlice'; // Import thunk and action

function SignUpForm({ onSignUpSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const dispatch = useDispatch();
  const { isLoading, error } = useSelector((state) => state.auth); // Get loading and error state from Redux

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const SignupSchema = Yup.object().shape({
    fullName: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Full Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Confirm Password is required'),
    userType: Yup.string()
      .oneOf(['student', 'company'], 'You must select a user type')
      .required('User type is required'),
  });

  const handleEmailSignUp = async (values, actions) => {
    dispatch(clearError()); // Clear any previous errors before new attempt
    const resultAction = await dispatch(signUpUser(values)); // Dispatch the async thunk
    if (signUpUser.fulfilled.match(resultAction)) {
      if (resultAction.payload && resultAction.payload.message) {
        // This means email confirmation is required, not direct sign-in
        alert(resultAction.payload.message);
      } else {
        alert('Sign up successful! You are now logged in (or check email for verification).');
      }
      if (onSignUpSuccess) onSignUpSuccess(); // Notify parent component of success
    } else if (signUpUser.rejected.match(resultAction)) {
      // Error is already in Redux state, will be displayed via useSelector
    }
    actions.setSubmitting(false); // Re-enable the form button
  };

  return (
    <>
      <div className="relative flex justify-center text-sm my-6">
        <span className="bg-white px-2 text-gray-500 z-10">or</span>
        <div className="absolute inset-y-0 left-0 right-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{error}</span>
        </div>
      )}

      <Formik
        initialValues={{
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          userType: '',
        }}
        validationSchema={SignupSchema}
        onSubmit={handleEmailSignUp}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-6">
            <div>
              <label htmlFor="fullName" className="sr-only">Full Name</label>
              <Field
                type="text"
                name="fullName"
                id="fullName"
                className="appearance-none rounded-md relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your full name"
              />
              <ErrorMessage name="fullName" component="div" className="text-red-500 text-xs mt-1 text-left" />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">Email Address</label>
              <Field
                type="email"
                name="email"
                id="email"
                className="appearance-none rounded-md relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter your email"
              />
              <ErrorMessage name="email" component="div" className="text-red-500 text-xs mt-1 text-left" />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <div className="relative">
                <Field
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  className="appearance-none rounded-md relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Create a password"
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

            <div>
              <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
              <div className="relative">
                <Field
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  id="confirmPassword"
                  className="appearance-none rounded-md relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Confirm your password"
                />
                <span
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
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
              <ErrorMessage name="confirmPassword" component="div" className="text-red-500 text-xs mt-1 text-left" />
            </div>

            <div>
              <label htmlFor="userType" className="sr-only">I am a...</label>
              <Field
                as="select"
                name="userType"
                id="userType"
                className="appearance-none rounded-md relative block w-full px-3 py-2.5 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="">I am a...</option>
                <option value="student">Student</option>
                <option value="company">Company</option>
              </Field>
              <ErrorMessage name="userType" component="div" className="text-red-500 text-xs mt-1 text-left" />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || isLoading}
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-lg font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-300"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </Form>
        )}
      </Formik>
      
    </>
  );
}

export default SignUpForm;