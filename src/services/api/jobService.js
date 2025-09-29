import jobsData from "@/services/mockData/jobs.json";

let jobs = [...jobsData];

export const jobService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return jobs.map(job => ({ ...job }));
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const job = jobs.find(j => j.Id === parseInt(id));
    return job ? { ...job } : null;
  },

  create: async (jobData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newJob = { ...jobData, Id: Math.max(...jobs.map(j => j.Id)) + 1 };
    jobs.push(newJob);
    return { ...newJob };
  },

  update: async (id, jobData) => {
    await new Promise(resolve => setTimeout(resolve, 350));
    const index = jobs.findIndex(j => j.Id === parseInt(id));
    if (index !== -1) {
      jobs[index] = { ...jobs[index], ...jobData };
      return { ...jobs[index] };
    }
    return null;
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = jobs.findIndex(j => j.Id === parseInt(id));
    if (index !== -1) {
      const deleted = jobs.splice(index, 1);
      return deleted[0];
    }
    return null;
  }
};