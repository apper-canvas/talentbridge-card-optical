import { toast } from "react-toastify";
import React from "react";

export const applicationService = {
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
          {"field": {"Name": "job_id_c"}},
          {"field": {"Name": "candidate_id_c"}},
          {"field": {"Name": "job_title_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "location_c"}},
          {"field": {"Name": "candidate_name_c"}},
          {"field": {"Name": "candidate_email_c"}},
          {"field": {"Name": "candidate_phone_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "applied_date_c"}},
          {"field": {"Name": "cover_letter_c"}},
          {"field": {"Name": "resume_url_c"}}
        ]
      };

      const response = await apperClient.fetchRecords('application_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return (response.data || []).map(app => ({
        ...app,
        jobId: app.job_id_c,
        candidateId: app.candidate_id_c,
        jobTitle: app.job_title_c,
        company: app.company_c,
        location: app.location_c,
        candidateName: app.candidate_name_c,
        candidateEmail: app.candidate_email_c,
        candidatePhone: app.candidate_phone_c,
        status: app.status_c,
        appliedDate: app.applied_date_c,
        coverLetter: app.cover_letter_c,
        resumeUrl: app.resume_url_c
      }));
    } catch (error) {
      console.error("Error fetching applications:", error);
      toast.error("Failed to load applications. Please try again.");
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
          {"field": {"Name": "job_id_c"}},
          {"field": {"Name": "candidate_id_c"}},
          {"field": {"Name": "job_title_c"}},
          {"field": {"Name": "company_c"}},
          {"field": {"Name": "location_c"}},
          {"field": {"Name": "candidate_name_c"}},
          {"field": {"Name": "candidate_email_c"}},
          {"field": {"Name": "candidate_phone_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "applied_date_c"}},
          {"field": {"Name": "cover_letter_c"}},
          {"field": {"Name": "resume_url_c"}}
        ]
      };

      const response = await apperClient.getRecordById('application_c', id, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      const app = response.data;
      if (!app) return null;

      return {
        ...app,
        jobId: app.job_id_c,
        candidateId: app.candidate_id_c,
        jobTitle: app.job_title_c,
        company: app.company_c,
        location: app.location_c,
        candidateName: app.candidate_name_c,
        candidateEmail: app.candidate_email_c,
        candidatePhone: app.candidate_phone_c,
        status: app.status_c,
        appliedDate: app.applied_date_c,
        coverLetter: app.cover_letter_c,
        resumeUrl: app.resume_url_c
      };
    } catch (error) {
      console.error(`Error fetching application ${id}:`, error);
      toast.error("Failed to load application details.");
      return null;
    }
  },

  create: async (applicationData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: `${applicationData.candidate_name_c || applicationData.candidateName} - ${applicationData.job_title_c || applicationData.jobTitle}`,
          job_id_c: (applicationData.job_id_c || applicationData.jobId || '').toString(),
          candidate_id_c: (applicationData.candidate_id_c || applicationData.candidateId || '').toString(),
          job_title_c: applicationData.job_title_c || applicationData.jobTitle,
          company_c: applicationData.company_c || applicationData.company,
          location_c: applicationData.location_c || applicationData.location,
          candidate_name_c: applicationData.candidate_name_c || applicationData.candidateName,
          candidate_email_c: applicationData.candidate_email_c || applicationData.candidateEmail,
          candidate_phone_c: applicationData.candidate_phone_c || applicationData.candidatePhone,
          status_c: applicationData.status_c || applicationData.status || 'applied',
          applied_date_c: applicationData.applied_date_c || applicationData.appliedDate || new Date().toISOString(),
          cover_letter_c: applicationData.cover_letter_c || applicationData.coverLetter,
          resume_url_c: applicationData.resume_url_c || applicationData.resumeUrl
        }]
      };

      const response = await apperClient.createRecord('application_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} applications:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }

        return successful.length > 0 ? successful[0].data : null;
      }

      return null;
    } catch (error) {
      console.error("Error creating application:", error);
      toast.error("Failed to create application. Please try again.");
      return null;
    }
  },

  update: async (id, applicationData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const updateFields = {
        Id: id
      };

      // Only include fields that are provided
      if (applicationData.job_id_c || applicationData.jobId) {
        updateFields.job_id_c = (applicationData.job_id_c || applicationData.jobId).toString();
      }
      if (applicationData.candidate_id_c || applicationData.candidateId) {
        updateFields.candidate_id_c = (applicationData.candidate_id_c || applicationData.candidateId).toString();
      }
      if (applicationData.job_title_c || applicationData.jobTitle) {
        updateFields.job_title_c = applicationData.job_title_c || applicationData.jobTitle;
      }
      if (applicationData.company_c || applicationData.company) {
        updateFields.company_c = applicationData.company_c || applicationData.company;
      }
      if (applicationData.location_c || applicationData.location) {
        updateFields.location_c = applicationData.location_c || applicationData.location;
      }
      if (applicationData.candidate_name_c || applicationData.candidateName) {
        updateFields.candidate_name_c = applicationData.candidate_name_c || applicationData.candidateName;
      }
      if (applicationData.candidate_email_c || applicationData.candidateEmail) {
        updateFields.candidate_email_c = applicationData.candidate_email_c || applicationData.candidateEmail;
      }
      if (applicationData.candidate_phone_c || applicationData.candidatePhone) {
        updateFields.candidate_phone_c = applicationData.candidate_phone_c || applicationData.candidatePhone;
      }
      if (applicationData.status_c || applicationData.status) {
        updateFields.status_c = applicationData.status_c || applicationData.status;
      }
      if (applicationData.applied_date_c || applicationData.appliedDate) {
        updateFields.applied_date_c = applicationData.applied_date_c || applicationData.appliedDate;
      }
      if (applicationData.cover_letter_c || applicationData.coverLetter) {
        updateFields.cover_letter_c = applicationData.cover_letter_c || applicationData.coverLetter;
      }
      if (applicationData.resume_url_c || applicationData.resumeUrl) {
        updateFields.resume_url_c = applicationData.resume_url_c || applicationData.resumeUrl;
      }

      const params = {
        records: [updateFields]
      };

      const response = await apperClient.updateRecord('application_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} applications:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }

        return successful.length > 0 ? successful[0].data : null;
      }

      return null;
    } catch (error) {
      console.error("Error updating application:", error);
      toast.error("Failed to update application. Please try again.");
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

      const response = await apperClient.deleteRecord('application_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} applications:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        return successful.length > 0;
      }

      return false;
    } catch (error) {
      console.error("Error deleting application:", error);
      toast.error("Failed to delete application. Please try again.");
      return false;
    }
}
};