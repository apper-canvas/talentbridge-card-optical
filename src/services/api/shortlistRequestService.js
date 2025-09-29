import { toast } from "react-toastify";
import React from "react";

export const shortlistRequestService = {
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
          {"field": {"Name": "employer_id_c"}},
          {"field": {"Name": "job_title_c"}},
          {"field": {"Name": "criteria_c"}},
          {"field": {"Name": "request_date_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "candidate_count_c"}}
        ]
      };

      const response = await apperClient.fetchRecords('shortlist_request_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return (response.data || []).map(request => ({
        ...request,
        employerId: request.employer_id_c,
        jobTitle: request.job_title_c,
        criteria: request.criteria_c,
        requestDate: request.request_date_c,
        status: request.status_c,
        candidateCount: request.candidate_count_c
      }));
    } catch (error) {
      console.error("Error fetching shortlist requests:", error);
      toast.error("Failed to load shortlist requests. Please try again.");
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
          {"field": {"Name": "employer_id_c"}},
          {"field": {"Name": "job_title_c"}},
          {"field": {"Name": "criteria_c"}},
          {"field": {"Name": "request_date_c"}},
          {"field": {"Name": "status_c"}},
          {"field": {"Name": "candidate_count_c"}}
        ]
      };

      const response = await apperClient.getRecordById('shortlist_request_c', id, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      const request = response.data;
      if (!request) return null;

      return {
        ...request,
        employerId: request.employer_id_c,
        jobTitle: request.job_title_c,
        criteria: request.criteria_c,
        requestDate: request.request_date_c,
        status: request.status_c,
        candidateCount: request.candidate_count_c
      };
    } catch (error) {
      console.error(`Error fetching shortlist request ${id}:`, error);
      toast.error("Failed to load shortlist request details.");
      return null;
    }
  },

  create: async (requestData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: `${requestData.job_title_c || requestData.jobTitle} - Shortlist Request`,
          employer_id_c: (requestData.employer_id_c || requestData.employerId || '').toString(),
          job_title_c: requestData.job_title_c || requestData.jobTitle,
          criteria_c: requestData.criteria_c || requestData.criteria,
          request_date_c: requestData.request_date_c || requestData.requestDate || new Date().toISOString(),
          status_c: requestData.status_c || requestData.status || 'pending',
          candidate_count_c: requestData.candidate_count_c || requestData.candidateCount || 5
        }]
      };

      const response = await apperClient.createRecord('shortlist_request_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} shortlist requests:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }

        return successful.length > 0 ? successful[0].data : null;
      }

      return null;
    } catch (error) {
      console.error("Error creating shortlist request:", error);
      toast.error("Failed to create shortlist request. Please try again.");
      return null;
    }
  },

  update: async (id, requestData) => {
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
      if (requestData.employer_id_c || requestData.employerId) {
        updateFields.employer_id_c = (requestData.employer_id_c || requestData.employerId).toString();
      }
      if (requestData.job_title_c || requestData.jobTitle) {
        updateFields.job_title_c = requestData.job_title_c || requestData.jobTitle;
        updateFields.Name = `${requestData.job_title_c || requestData.jobTitle} - Shortlist Request`;
      }
      if (requestData.criteria_c || requestData.criteria) {
        updateFields.criteria_c = requestData.criteria_c || requestData.criteria;
      }
      if (requestData.request_date_c || requestData.requestDate) {
        updateFields.request_date_c = requestData.request_date_c || requestData.requestDate;
      }
      if (requestData.status_c || requestData.status) {
        updateFields.status_c = requestData.status_c || requestData.status;
      }
      if (requestData.candidate_count_c || requestData.candidateCount) {
        updateFields.candidate_count_c = requestData.candidate_count_c || requestData.candidateCount;
      }

      const params = {
        records: [updateFields]
      };

      const response = await apperClient.updateRecord('shortlist_request_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} shortlist requests:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }

        return successful.length > 0 ? successful[0].data : null;
      }

      return null;
    } catch (error) {
      console.error("Error updating shortlist request:", error);
      toast.error("Failed to update shortlist request. Please try again.");
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

      const response = await apperClient.deleteRecord('shortlist_request_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} shortlist requests:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        return successful.length > 0;
      }

      return false;
    } catch (error) {
      console.error("Error deleting shortlist request:", error);
      toast.error("Failed to delete shortlist request. Please try again.");
      return false;
}
  }
};