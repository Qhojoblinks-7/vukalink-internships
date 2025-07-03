// src/features/auth/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authService from '../../services/authService'; // Import your auth service

// Async thunks for authentication operations
export const signUpUser = createAsyncThunk(
  'auth/signUpUser',
  async (userData, { rejectWithValue }) => {
    try {
      const user = await authService.signUp(userData);
      return user; // user will be null if email confirmation needed
    } catch (error) {
      console.error('Sign up failed:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const user = await authService.signIn(credentials);
      return user;
    } catch (error) {
      console.error('Sign in failed:', error);
      return rejectWithValue(error.message);
    }
  }
);

export const signOutUser = createAsyncThunk(
  'auth/signOutUser',
  async (_, { rejectWithValue }) => {
    try {
      await authService.signOut();
      return true;
    } catch (error) {
      console.error('Sign out failed:', error);
      return rejectWithValue(error.message);
    }
  }
);

// This thunk will fetch the full user profile including role-specific data
export const fetchCurrentUserAndProfile = createAsyncThunk(
  'auth/fetchCurrentUserAndProfile',
  async (_, { rejectWithValue, getState }) => {
    try {
      const user = await authService.getUser(); // Get the authenticated user from Supabase
      if (!user) {
        return null; // No user logged in
      }

      // Fetch the combined profile and role data
      const userProfile = await authService.fetchUserProfile(user.id);
      return { ...user, profile: userProfile }; // Combine Supabase user data with custom profile data
    } catch (error) {
      console.error('Failed to fetch user and profile:', error);
      return rejectWithValue(error.message);
    }
  }
);


const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null, // Stores the Supabase user object + our custom profile data
    isAuthenticated: false,
    isLoading: true, // Used for initial loading/session check
    error: null,
  },
  reducers: {
    // Reducer for handling auth state changes directly from the Supabase listener
    setAuthSession: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.isLoading = false;
      state.error = null; // Clear error on successful session
    },
    clearAuth: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Sign Up
      .addCase(signUpUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.isLoading = false;
        // If email confirmation is required, action.payload might be a message not a user
        if (action.payload && action.payload.id) { // Check if it's a user object
          state.user = action.payload; // Store the initial user data (no custom profile yet)
          state.isAuthenticated = true; // Only if direct sign in (not email verification)
        } else {
          // If email confirmation is pending, user is not immediately authenticated
          state.user = null;
          state.isAuthenticated = false;
        }
        state.error = null; // Clear error
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Signup failed';
        state.user = null;
        state.isAuthenticated = false;
      })
      // Sign In
      .addCase(signInUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; // action.payload is the user object from authService.signIn
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Login failed';
        state.user = null;
        state.isAuthenticated = false;
      })
      // Sign Out
      .addCase(signOutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isLoading = false;
        state.error = null;
      })
      .addCase(signOutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Logout failed';
      })
      // Fetch Current User and Profile
      .addCase(fetchCurrentUserAndProfile.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUserAndProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload; // This payload includes user and nested profile
        state.isAuthenticated = !!action.payload; // True if user data exists
        state.error = null;
      })
      .addCase(fetchCurrentUserAndProfile.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || 'Failed to fetch user profile';
        state.user = null;
        state.isAuthenticated = false;
      });
  },
});

export const { setAuthSession, clearAuth, setLoading, clearError } = authSlice.actions;
export default authSlice.reducer;