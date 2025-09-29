import { toast } from "react-toastify";
import React from "react";

export const candidateService = {
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
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "location_c"}},
          {"field": {"Name": "experience_c"}},
          {"field": {"Name": "skills_c"}},
          {"field": {"Name": "resume_url_c"}},
          {"field": {"Name": "profile_complete_c"}},
          {"field": {"Name": "bio_c"}}
        ]
      };

      const response = await apperClient.fetchRecords('candidate_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return [];
      }

      return (response.data || []).map(candidate => ({
        ...candidate,
        name: candidate.name_c,
        email: candidate.email_c,
        phone: candidate.phone_c,
        location: candidate.location_c,
        experience: candidate.experience_c,
        skills: candidate.skills_c ? candidate.skills_c.split('\n').filter(skill => skill.trim()) : [],
        resumeUrl: candidate.resume_url_c,
        profileComplete: candidate.profile_complete_c,
        bio: candidate.bio_c
      }));
    } catch (error) {
      console.error("Error fetching candidates:", error);
      toast.error("Failed to load candidates. Please try again.");
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
          {"field": {"Name": "name_c"}},
          {"field": {"Name": "email_c"}},
          {"field": {"Name": "phone_c"}},
          {"field": {"Name": "location_c"}},
          {"field": {"Name": "experience_c"}},
          {"field": {"Name": "skills_c"}},
          {"field": {"Name": "resume_url_c"}},
          {"field": {"Name": "profile_complete_c"}},
          {"field": {"Name": "bio_c"}}
        ]
      };

      const response = await apperClient.getRecordById('candidate_c', id, params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      const candidate = response.data;
      if (!candidate) return null;

      return {
        ...candidate,
        name: candidate.name_c,
        email: candidate.email_c,
        phone: candidate.phone_c,
        location: candidate.location_c,
        experience: candidate.experience_c,
        skills: candidate.skills_c ? candidate.skills_c.split('\n').filter(skill => skill.trim()) : [],
        resumeUrl: candidate.resume_url_c,
        profileComplete: candidate.profile_complete_c,
        bio: candidate.bio_c
      };
    } catch (error) {
      console.error(`Error fetching candidate ${id}:`, error);
      toast.error("Failed to load candidate details.");
      return null;
    }
  },

  create: async (candidateData) => {
    try {
      const { ApperClient } = window.ApperSDK;
      const apperClient = new ApperClient({
        apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
        apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
      });

      const params = {
        records: [{
          Name: candidateData.name_c || candidateData.name,
          name_c: candidateData.name_c || candidateData.name,
          email_c: candidateData.email_c || candidateData.email,
          phone_c: candidateData.phone_c || candidateData.phone,
          location_c: candidateData.location_c || candidateData.location,
          experience_c: candidateData.experience_c || candidateData.experience,
          skills_c: Array.isArray(candidateData.skills) ? candidateData.skills.join('\n') : (candidateData.skills_c || candidateData.skills),
          resume_url_c: candidateData.resume_url_c || candidateData.resumeUrl,
          profile_complete_c: candidateData.profile_complete_c !== undefined ? candidateData.profile_complete_c : candidateData.profileComplete,
          bio_c: candidateData.bio_c || candidateData.bio
        }]
      };

      const response = await apperClient.createRecord('candidate_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} candidates:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }

        return successful.length > 0 ? successful[0].data : null;
      }

      return null;
    } catch (error) {
      console.error("Error creating candidate:", error);
      toast.error("Failed to create candidate. Please try again.");
      return null;
    }
  },

  update: async (id, candidateData) => {
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
      if (candidateData.name_c || candidateData.name) {
        updateFields.Name = candidateData.name_c || candidateData.name;
        updateFields.name_c = candidateData.name_c || candidateData.name;
      }
      if (candidateData.email_c || candidateData.email) {
        updateFields.email_c = candidateData.email_c || candidateData.email;
      }
      if (candidateData.phone_c || candidateData.phone) {
        updateFields.phone_c = candidateData.phone_c || candidateData.phone;
      }
      if (candidateData.location_c || candidateData.location) {
        updateFields.location_c = candidateData.location_c || candidateData.location;
      }
      if (candidateData.experience_c || candidateData.experience) {
        updateFields.experience_c = candidateData.experience_c || candidateData.experience;
      }
      if (candidateData.skills || candidateData.skills_c) {
        updateFields.skills_c = Array.isArray(candidateData.skills) ? candidateData.skills.join('\n') : (candidateData.skills_c || candidateData.skills);
      }
      if (candidateData.resume_url_c || candidateData.resumeUrl) {
        updateFields.resume_url_c = candidateData.resume_url_c || candidateData.resumeUrl;
      }
      if (candidateData.profile_complete_c !== undefined || candidateData.profileComplete !== undefined) {
        updateFields.profile_complete_c = candidateData.profile_complete_c !== undefined ? candidateData.profile_complete_c : candidateData.profileComplete;
      }
      if (candidateData.bio_c || candidateData.bio) {
        updateFields.bio_c = candidateData.bio_c || candidateData.bio;
      }

      const params = {
        records: [updateFields]
      };

      const response = await apperClient.updateRecord('candidate_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return null;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} candidates:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            record.errors?.forEach(error => toast.error(`${error.fieldLabel}: ${error}`));
            if (record.message) toast.error(record.message);
          });
        }

        return successful.length > 0 ? successful[0].data : null;
      }

      return null;
    } catch (error) {
      console.error("Error updating candidate:", error);
      toast.error("Failed to update candidate. Please try again.");
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

      const response = await apperClient.deleteRecord('candidate_c', params);

      if (!response.success) {
        console.error(response.message);
        toast.error(response.message);
        return false;
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} candidates:${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) toast.error(record.message);
          });
        }

        return successful.length > 0;
      }

      return false;
    } catch (error) {
      console.error("Error deleting candidate:", error);
      toast.error("Failed to delete candidate. Please try again.");
      return false;
}
  }
};