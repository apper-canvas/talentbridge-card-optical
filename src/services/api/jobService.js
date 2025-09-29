import { toast } from 'react-toastify';

export const jobService = {
  getAll: async () => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "location_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "experience_c"}},
          {"field": {"Name": "salary_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "requirements_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "posted_date_c"}}
        ]
      };

      const response = await apperClient.fetchRecords('job_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return (response.data || []).map(job => ({
        ...job,
        title: job.title_c,
        company: job.company_c,
        location: job.location_c,
        type: job.type_c,
        experience: job.experience_c,
        salary: job.salary_c,
        description: job.description_c,
        requirements: job.requirements_c ? job.requirements_c.split('\n').filter(req => req.trim()) : [],
        status: job.status_c,
        postedDate: job.posted_date_c
      }));
    } catch (error) {
      console.error("Error fetching jobs:", error);
      toast.error("Failed to load jobs. Please try again.");
      return [];
    }
  },

  getById: async (id) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        fields: [
          {"field": {"Name": "Id"}},
          {"field": {"Name": "Name"}},
          {"field": {"Name": "title_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "location_c"}},
          {"field": {"Name": "type_c"}},
          {"field": {"Name": "experience_c"}},
          {"field": {"Name": "salary_c"}},
          {"field": {"Name": "description_c"}},
          {"field": {"Name": "requirements_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "posted_date_c"}}
        ]
      };

      const response = await apperClient.getRecordById('job_c', id, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      const job = response.data;
      if (!job) return null;

      return {
        ...job,
        title: job.title_c,
        company: job.company_c,
        location: job.location_c,
        type: job.type_c,
        experience: job.experience_c,
        salary: job.salary_c,
        description: job.description_c,
        requirements: job.requirements_c ? job.requirements_c.split('\n').filter(req => req.trim()) : [],
        status: job.status_c,
        postedDate: job.posted_date_c
      };
    } catch (error) {
      console.error(`Error fetching job ${id}:`, error);
      toast.error("Failed to load job details.");
      return null;
    }
  },

  create: async (jobData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: jobData.title_c || jobData.title,
          title_c: jobData.title_c || jobData.title,
          company_c: jobData.company_c || jobData.company,
          location_c: jobData.location_c || jobData.location,
          type_c: jobData.type_c || jobData.type,
          experience_c: jobData.experience_c || jobData.experience,
          salary_c: jobData.salary_c || jobData.salary,
          description_c: jobData.description_c || jobData.description,
          requirements_c: Array.isArray(jobData.requirements) ? jobData.requirements.join('\n') : (jobData.requirements_c || jobData.requirements),
          status_c: jobData.status_c || jobData.status || 'active',
          posted_date_c: jobData.posted_date_c || jobData.postedDate || new Date().toISOString()
        }]
      };

      const response = await apperClient.createRecord('job_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} jobs:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }

        return successful.length > 0 ? successful[0].data : null;
      }

      return null;
    } catch (error) {
      console.error("Error creating job:", error);
      toast.error("Failed to create job. Please try again.");
      return null;
    }
  },

  update: async (id, jobData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Id: id,
          Name: jobData.title_c || jobData.title,
          title_c: jobData.title_c || jobData.title,
          company_c: jobData.company_c || jobData.company,
          location_c: jobData.location_c || jobData.location,
          type_c: jobData.type_c || jobData.type,
          experience_c: jobData.experience_c || jobData.experience,
          salary_c: jobData.salary_c || jobData.salary,
          description_c: jobData.description_c || jobData.description,
          requirements_c: Array.isArray(jobData.requirements) ? jobData.requirements.join('\n') : (jobData.requirements_c || jobData.requirements),
          status_c: jobData.status_c || jobData.status,
          posted_date_c: jobData.posted_date_c || jobData.postedDate
        }]
      };

      const response = await apperClient.updateRecord('job_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} jobs:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }

        return successful.length > 0 ? successful[0].data : null;
      }

      return null;
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("Failed to update job. Please try again.");
      return null;
    }
  },

  delete: async (id) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        RecordIds: [id]
      };

      const response = await apperClient.deleteRecord('job_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} jobs:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        return successful.length > 0;
      }

      return false;
    } catch (error) {
      console.error("Error deleting job:", error);
      toast.error("Failed to delete job. Please try again.");
      return false;
    }
  }
};