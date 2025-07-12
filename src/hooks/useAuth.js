import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { signInUser, signUpUser, signOutUser } from '../features/auth/authSlice';

export const useAuth = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, isLoading, error } = useSelector((state) => state.auth);

  const signIn = useCallback(async (credentials) => {
    try {
      const result = await dispatch(signInUser(credentials));
      return result;
    } catch (error) {
      throw error;
    }
  }, [dispatch]);

  const signUp = useCallback(async (userData) => {
    try {
      const result = await dispatch(signUpUser(userData));
      return result;
    } catch (error) {
      throw error;
    }
  }, [dispatch]);

  const signOut = useCallback(async () => {
    try {
      await dispatch(signOutUser());
    } catch (error) {
      throw error;
    }
  }, [dispatch]);

  const isStudent = user?.profile?.user_type === 'student';
  const isCompany = user?.profile?.user_type === 'company';

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    isStudent,
    isCompany,
    signIn,
    signUp,
    signOut
  };
};