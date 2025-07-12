// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import internshipReducer from '../features/internships/internshipSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    internships: internshipReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});