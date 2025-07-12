import { supabase } from '../lib/supabaseClient';

const internshipService = {
  /**
   * Fetch all internships with optional filters
   * @param {Object} filters - Search and filter criteria
   * @returns {Array} - Array of internship objects
   */
  getInternships: async (filters = {}) => {
    try {
      let query = supabase
        .from('internships')
        .select(`
          *,
          companies (
            company_name,
            industry,
            description
          )
        `)
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.search) {
        query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
      }

      if (filters.location) {
        query = query.ilike('location', `%${filters.location}%`);
      }

      if (filters.type) {
        query = query.eq('type', filters.type);
      }

      if (filters.duration) {
        query = query.eq('duration', filters.duration);
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching internships:', error);
      throw error;
    }
  },

  /**
   * Fetch a single internship by ID
   * @param {string} id - Internship ID
   * @returns {Object} - Internship object
   */
  getInternshipById: async (id) => {
    try {
      const { data, error } = await supabase
        .from('internships')
        .select(`
          *,
          companies (
            company_name,
            industry,
            description
          )
        `)
        .eq('id', id)
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching internship:', error);
      throw error;
    }
  },

  /**
   * Apply for an internship
   * @param {string} internshipId - Internship ID
   * @param {string} studentId - Student ID
   * @param {Object} applicationData - Additional application data
   * @returns {Object} - Application object
   */
  applyForInternship: async (internshipId, studentId, applicationData = {}) => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .insert({
          internship_id: internshipId,
          student_id: studentId,
          status: 'applied',
          ...applicationData
        })
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error applying for internship:', error);
      throw error;
    }
  },

  /**
   * Get user's saved internships
   * @param {string} userId - User ID
   * @returns {Array} - Array of saved internship objects
   */
  getSavedInternships: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('saved_internships')
        .select(`
          internship_id,
          internships (
            *,
            companies (
              company_name,
              industry
            )
          )
        `)
        .eq('user_id', userId);

      if (error) {
        throw error;
      }

      return data.map(item => item.internships);
    } catch (error) {
      console.error('Error fetching saved internships:', error);
      throw error;
    }
  },

  /**
   * Save/unsave an internship
   * @param {string} internshipId - Internship ID
   * @param {string} userId - User ID
   * @param {boolean} save - Whether to save or unsave
   * @returns {Object} - Result object
   */
  toggleSavedInternship: async (internshipId, userId, save = true) => {
    try {
      if (save) {
        const { data, error } = await supabase
          .from('saved_internships')
          .insert({
            internship_id: internshipId,
            user_id: userId
          });

        if (error) {
          throw error;
        }

        return data;
      } else {
        const { error } = await supabase
          .from('saved_internships')
          .delete()
          .eq('internship_id', internshipId)
          .eq('user_id', userId);

        if (error) {
          throw error;
        }

        return { success: true };
      }
    } catch (error) {
      console.error('Error toggling saved internship:', error);
      throw error;
    }
  },

  /**
   * Get user's applications
   * @param {string} userId - User ID
   * @returns {Array} - Array of application objects
   */
  getUserApplications: async (userId) => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          internships (
            title,
            companies (
              company_name
            )
          )
        `)
        .eq('student_id', userId)
        .order('applied_at', { ascending: false });

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error fetching user applications:', error);
      throw error;
    }
  },

  /**
   * Update application status
   * @param {string} applicationId - Application ID
   * @param {string} status - New status
   * @returns {Object} - Updated application object
   */
  updateApplicationStatus: async (applicationId, status) => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .update({ 
          status,
          updated_at: new Date().toISOString()
        })
        .eq('id', applicationId)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Error updating application status:', error);
      throw error;
    }
  },

  /**
   * Withdraw application
   * @param {string} applicationId - Application ID
   * @returns {Object} - Result object
   */
  withdrawApplication: async (applicationId) => {
    try {
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', applicationId);

      if (error) {
        throw error;
      }

      return { success: true };
    } catch (error) {
      console.error('Error withdrawing application:', error);
      throw error;
    }
  }
};

export default internshipService;