import applicationsData from "@/services/mockData/applications.json";

let applications = [...applicationsData];

export const applicationService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return applications.map(app => ({ ...app }));
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const application = applications.find(a => a.Id === parseInt(id));
    return application ? { ...application } : null;
  },

  create: async (applicationData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newApplication = { ...applicationData, Id: Math.max(...applications.map(a => a.Id)) + 1 };
    applications.push(newApplication);
    return { ...newApplication };
  },

  update: async (id, applicationData) => {
    await new Promise(resolve => setTimeout(resolve, 350));
    const index = applications.findIndex(a => a.Id === parseInt(id));
    if (index !== -1) {
      applications[index] = { ...applications[index], ...applicationData };
      return { ...applications[index] };
    }
    return null;
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = applications.findIndex(a => a.Id === parseInt(id));
    if (index !== -1) {
      const deleted = applications.splice(index, 1);
      return deleted[0];
    }
    return null;
  }
};