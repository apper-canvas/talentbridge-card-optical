import { toast } from "react-toastify";
import React from "react";

export const employerService = {
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
          {"field": {"Name": "company_name_c"}},
          {"field": {"Name": "contact_person_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "industry_c"}},
          {"field": {"Name": "size_c"}},
          {"field": {"Name": "description_c"}}
        ]
      };

      const response = await apperClient.fetchRecords('employer_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching employers:", error);
      toast.error("Failed to load employers. Please try again.");
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
          {"field": {"Name": "company_name_c"}},
          {"field": {"Name": "contact_person_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "industry_c"}},
          {"field": {"Name": "size_c"}},
          {"field": {"Name": "description_c"}}
        ]
      };

      const response = await apperClient.getRecordById('employer_c', id, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching employer ${id}:`, error);
      toast.error("Failed to load employer details.");
      return null;
    }
  },

  create: async (employerData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: employerData.company_name_c || employerData.companyName,
          company_name_c: employerData.company_name_c || employerData.companyName,
          contact_person_c: employerData.contact_person_c || employerData.contactPerson,
          email_c: employerData.email_c || employerData.email,
          industry_c: employerData.industry_c || employerData.industry,
          size_c: employerData.size_c || employerData.size,
          description_c: employerData.description_c || employerData.description
        }]
      };

      const response = await apperClient.createRecord('employer_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} employers:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }

        return successful.length > 0 ? successful[0].data : null;
      }

      return null;
    } catch (error) {
      console.error("Error creating employer:", error);
      toast.error("Failed to create employer. Please try again.");
      return null;
    }
  },

  update: async (id, employerData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Id: id,
          Name: employerData.company_name_c || employerData.companyName,
          company_name_c: employerData.company_name_c || employerData.companyName,
          contact_person_c: employerData.contact_person_c || employerData.contactPerson,
          email_c: employerData.email_c || employerData.email,
          industry_c: employerData.industry_c || employerData.industry,
          size_c: employerData.size_c || employerData.size,
          description_c: employerData.description_c || employerData.description
        }]
      };

      const response = await apperClient.updateRecord('employer_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} employers:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }

        return successful.length > 0 ? successful[0].data : null;
      }

      return null;
    } catch (error) {
      console.error("Error updating employer:", error);
      toast.error("Failed to update employer. Please try again.");
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

      const response = await apperClient.deleteRecord('employer_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} employers:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        return successful.length > 0;
      }

      return false;
    } catch (error) {
      console.error("Error deleting employer:", error);
      toast.error("Failed to delete employer. Please try again.");
return false;
    }
  }
};