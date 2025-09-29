import employersData from "@/services/mockData/employers.json";

let employers = [...employersData];

export const employerService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return employers.map(employer => ({ ...employer }));
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const employer = employers.find(e => e.Id === parseInt(id));
    return employer ? { ...employer } : null;
  },

  create: async (employerData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newEmployer = { ...employerData, Id: Math.max(...employers.map(e => e.Id)) + 1 };
    employers.push(newEmployer);
    return { ...newEmployer };
  },

  update: async (id, employerData) => {
    await new Promise(resolve => setTimeout(resolve, 350));
    const index = employers.findIndex(e => e.Id === parseInt(id));
    if (index !== -1) {
      employers[index] = { ...employers[index], ...employerData };
      return { ...employers[index] };
    }
    return null;
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = employers.findIndex(e => e.Id === parseInt(id));
    if (index !== -1) {
      const deleted = employers.splice(index, 1);
      return deleted[0];
    }
    return null;
  }
};