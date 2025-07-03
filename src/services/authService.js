// src/services/authService.js
import { supabase } from '../lib/supabaseClient';

const authService = {
  /**
   * Handles user sign-up with email and password.
   * Also creates entries in `profiles` and role-specific tables (`students`/`companies`).
   * @param {Object} userData - Contains email, password, fullName, userType.
   * @returns {Object} - Supabase user object on success.
   * @throws {Error} - If any Supabase operation fails.
   */
  signUp: async ({ email, password, fullName, userType }) => {
    // 1. Sign up user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName, // Store full name in raw_user_meta_data for auth.users
        },
      },
    });

    if (authError) {
      throw authError;
    }

    const user = authData?.user;

    // If email confirmation is required, user object might be null initially
    if (!user) {
      // Supabase sends a verification email, user needs to confirm to become active
      return { message: 'Please check your email for a verification link to complete your signup.' };
    }

    // 2. Create entry in public.profiles table
    const { error: profileError } = await supabase
      .from('profiles')
      .insert({
        id: user.id,
        full_name: fullName,
        user_type: userType,
      });

    if (profileError) {
      // If profile creation fails, consider rolling back the auth user or logging extensively
      console.error("Failed to create profile after successful auth signup:", profileError.message);
      // Optionally, you might want to sign out the user or delete them if profile creation is critical
      // await supabase.auth.signOut();
      throw profileError;
    }

    // 3. Create entry in specific user type table (students or companies)
    if (userType === 'student') {
      const { error: studentError } = await supabase
        .from('students')
        .insert({
          id: user.id,
          // Add default student fields if necessary, e.g., major: null
        });
      if (studentError) {
        console.error("Failed to create student profile after successful profile creation:", studentError.message);
        throw studentError;
      }
    } else if (userType === 'company') {
      const { error: companyError } = await supabase
        .from('companies')
        .insert({
          id: user.id,
          company_name: fullName, // Using full name as company name default
          // Add default company fields if necessary
        });
      if (companyError) {
        console.error("Failed to create company profile after successful profile creation:", companyError.message);
        throw companyError;
      }
    }

    return user; // Return the Supabase user object on success
  },

  /**
   * Handles user login with email and password.
   * @param {Object} credentials - Contains email and password.
   * @returns {Object} - Supabase user object on success.
   * @throws {Error} - If login fails.
   */
  signIn: async ({ email, password }) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw error;
    }
    return data.user;
  },

  /**
   * Handles Google OAuth sign-in.
   * @returns {void} - Redirects to Google.
   * @throws {Error} - If initiation fails.
   */
  signInWithGoogle: async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin, // Redirect back to your app's base URL
      },
    });
    if (error) {
      throw error;
    }
    // Supabase handles the redirect, so no return value here.
  },

  /**
   * Fetches the current authenticated user's session.
   * @returns {Object|null} - Current session data or null.
   */
  getSession: async () => {
    const { data: { session }, error } = await supabase.auth.getSession();
    if (error) {
      console.error("Error getting session:", error.message);
      return null;
    }
    return session;
  },

  /**
   * Fetches the current authenticated user.
   * @returns {Object|null} - Current user object or null.
   */
  getUser: async () => {
    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error("Error getting user:", error.message);
      return null;
    }
    return user;
  },

  /**
   * Signs out the current user.
   * @returns {void}
   * @throws {Error} - If logout fails.
   */
  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      throw error;
    }
  },

  /**
   * Fetches the user's profile and specific role data.
   * @param {string} userId - The ID of the authenticated user.
   * @returns {Object|null} - Combined profile and role data, or null.
   */
  fetchUserProfile: async (userId) => {
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*, user_type') // Select all from profiles and specifically user_type
      .eq('id', userId)
      .single();

    if (profileError) {
      if (profileError.code === 'PGRST116') { // No rows found
        console.warn(`Profile not found for user ID: ${userId}`);
        return null;
      }
      throw profileError;
    }

    let roleData = null;
    if (profile.user_type === 'student') {
      const { data: student, error: studentError } = await supabase
        .from('students')
        .select('*')
        .eq('id', userId)
        .single();
      if (studentError && studentError.code !== 'PGRST116') throw studentError;
      roleData = student;
    } else if (profile.user_type === 'company') {
      const { data: company, error: companyError } = await supabase
        .from('companies')
        .select('*')
        .eq('id', userId)
        .single();
      if (companyError && companyError.code !== 'PGRST116') throw companyError;
      roleData = company;
    }

    return { ...profile, ...roleData }; // Combine profile and role-specific data
  },

  // Listener for auth state changes
  onAuthStateChange: (callback) => {
    const { data: authListener } = supabase.auth.onAuthStateChange(callback);
    return authListener;
  },
};

export default authService;