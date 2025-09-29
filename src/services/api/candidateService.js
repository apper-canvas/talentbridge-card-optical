import candidatesData from "@/services/mockData/candidates.json";

let candidates = [...candidatesData];

export const candidateService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return candidates.map(candidate => ({ ...candidate }));
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const candidate = candidates.find(c => c.Id === parseInt(id));
    return candidate ? { ...candidate } : null;
  },

  create: async (candidateData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newCandidate = { ...candidateData, Id: Math.max(...candidates.map(c => c.Id)) + 1 };
    candidates.push(newCandidate);
    return { ...newCandidate };
  },

  update: async (id, candidateData) => {
    await new Promise(resolve => setTimeout(resolve, 350));
    const index = candidates.findIndex(c => c.Id === parseInt(id));
    if (index !== -1) {
      candidates[index] = { ...candidates[index], ...candidateData };
      return { ...candidates[index] };
    }
    return null;
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = candidates.findIndex(c => c.Id === parseInt(id));
    if (index !== -1) {
      const deleted = candidates.splice(index, 1);
      return deleted[0];
    }
    return null;
  }
};