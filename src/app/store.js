// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'; // We'll create this soon

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers/slices here as your app grows (e.g., student, company, jobs)
  },
  // Adding middleware for RTK Query if we use it, but for now, simple setup
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiService.middleware),
});