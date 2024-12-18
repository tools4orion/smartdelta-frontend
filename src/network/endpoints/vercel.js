import { axiosClient } from "../apiClient";

const vercelEndpoints = {
  listIntegrations: () => axiosClient.get("/vercel/list"),
  saveIntegration: (data) => axiosClient.post("/vercel/store", data),
  fetchProjects: (encryptedToken) =>
    axiosClient.post("/vercel/projects", { encryptedToken }),
  getEncryptedToken: (email) => axiosClient.post("/vercel/token", { email }),
};

export default vercelEndpoints;
