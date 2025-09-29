import shortlistRequestsData from "@/services/mockData/shortlistRequests.json";

let shortlistRequests = [...shortlistRequestsData];

export const shortlistRequestService = {
  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return shortlistRequests.map(request => ({ ...request }));
  },

  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 200));
    const request = shortlistRequests.find(r => r.Id === parseInt(id));
    return request ? { ...request } : null;
  },

  create: async (requestData) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    const newRequest = { ...requestData, Id: Math.max(...shortlistRequests.map(r => r.Id)) + 1 };
    shortlistRequests.push(newRequest);
    return { ...newRequest };
  },

  update: async (id, requestData) => {
    await new Promise(resolve => setTimeout(resolve, 350));
    const index = shortlistRequests.findIndex(r => r.Id === parseInt(id));
    if (index !== -1) {
      shortlistRequests[index] = { ...shortlistRequests[index], ...requestData };
      return { ...shortlistRequests[index] };
    }
    return null;
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 250));
    const index = shortlistRequests.findIndex(r => r.Id === parseInt(id));
    if (index !== -1) {
      const deleted = shortlistRequests.splice(index, 1);
      return deleted[0];
    }
    return null;
  }
};