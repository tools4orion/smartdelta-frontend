import { axiosClient } from "../apiClient";

const vercelEndpoints = {
  listIntegrations: () => axiosClient.get("/vercel/list"),
  saveIntegration: (data) => axiosClient.post("/vercel/store", data),
  fetchProjects: (email) => axiosClient.post("/vercel/projects", { email }),
};

export default vercelEndpoints;
