import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import internshipService from '../../services/internshipService';

// Async thunks
export const fetchInternships = createAsyncThunk(
  'internships/fetchInternships',
  async (filters = {}, { rejectWithValue }) => {
    try {
      const data = await internshipService.getInternships(filters);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchInternshipById = createAsyncThunk(
  'internships/fetchInternshipById',
  async (id, { rejectWithValue }) => {
    try {
      const data = await internshipService.getInternshipById(id);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const applyForInternship = createAsyncThunk(
  'internships/applyForInternship',
  async ({ internshipId, studentId, applicationData }, { rejectWithValue }) => {
    try {
      const data = await internshipService.applyForInternship(internshipId, studentId, applicationData);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchSavedInternships = createAsyncThunk(
  'internships/fetchSavedInternships',
  async (userId, { rejectWithValue }) => {
    try {
      const data = await internshipService.getSavedInternships(userId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const toggleSavedInternship = createAsyncThunk(
  'internships/toggleSavedInternship',
  async ({ internshipId, userId, save }, { rejectWithValue }) => {
    try {
      const data = await internshipService.toggleSavedInternship(internshipId, userId, save);
      return { internshipId, save, data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchUserApplications = createAsyncThunk(
  'internships/fetchUserApplications',
  async (userId, { rejectWithValue }) => {
    try {
      const data = await internshipService.getUserApplications(userId);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const updateApplicationStatus = createAsyncThunk(
  'internships/updateApplicationStatus',
  async ({ applicationId, status }, { rejectWithValue }) => {
    try {
      const data = await internshipService.updateApplicationStatus(applicationId, status);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const withdrawApplication = createAsyncThunk(
  'internships/withdrawApplication',
  async (applicationId, { rejectWithValue }) => {
    try {
      const data = await internshipService.withdrawApplication(applicationId);
      return { applicationId, data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  internships: [],
  currentInternship: null,
  savedInternships: [],
  applications: [],
  filters: {
    search: '',
    location: '',
    type: '',
    duration: ''
  },
  isLoading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    hasMore: true
  }
};

const internshipSlice = createSlice({
  name: 'internships',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.pagination.currentPage = 1; // Reset to first page when filters change
    },
    clearFilters: (state) => {
      state.filters = {
        search: '',
        location: '',
        type: '',
        duration: ''
      };
      state.pagination.currentPage = 1;
    },
    setCurrentPage: (state, action) => {
      state.pagination.currentPage = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentInternship: (state) => {
      state.currentInternship = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Internships
      .addCase(fetchInternships.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInternships.fulfilled, (state, action) => {
        state.isLoading = false;
        state.internships = action.payload;
        state.error = null;
      })
      .addCase(fetchInternships.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch Internship by ID
      .addCase(fetchInternshipById.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchInternshipById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.currentInternship = action.payload;
        state.error = null;
      })
      .addCase(fetchInternshipById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Apply for Internship
      .addCase(applyForInternship.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(applyForInternship.fulfilled, (state, action) => {
        state.isLoading = false;
        // Add the new application to the applications list
        state.applications.unshift(action.payload);
        state.error = null;
      })
      .addCase(applyForInternship.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Fetch Saved Internships
      .addCase(fetchSavedInternships.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchSavedInternships.fulfilled, (state, action) => {
        state.isLoading = false;
        state.savedInternships = action.payload;
        state.error = null;
      })
      .addCase(fetchSavedInternships.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Toggle Saved Internship
      .addCase(toggleSavedInternship.fulfilled, (state, action) => {
        const { internshipId, save } = action.payload;
        if (save) {
          // Add to saved internships
          const internship = state.internships.find(i => i.id === internshipId);
          if (internship && !state.savedInternships.find(s => s.id === internshipId)) {
            state.savedInternships.push(internship);
          }
        } else {
          // Remove from saved internships
          state.savedInternships = state.savedInternships.filter(i => i.id !== internshipId);
        }
      })
      
      // Fetch User Applications
      .addCase(fetchUserApplications.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUserApplications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.applications = action.payload;
        state.error = null;
      })
      .addCase(fetchUserApplications.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // Update Application Status
      .addCase(updateApplicationStatus.fulfilled, (state, action) => {
        const updatedApplication = action.payload;
        const index = state.applications.findIndex(app => app.id === updatedApplication.id);
        if (index !== -1) {
          state.applications[index] = updatedApplication;
        }
      })
      
      // Withdraw Application
      .addCase(withdrawApplication.fulfilled, (state, action) => {
        const { applicationId } = action.payload;
        state.applications = state.applications.filter(app => app.id !== applicationId);
      });
  }
});

export const { 
  setFilters, 
  clearFilters, 
  setCurrentPage, 
  clearError, 
  clearCurrentInternship 
} = internshipSlice.actions;

export default internshipSlice.reducer;