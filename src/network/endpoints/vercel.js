import { axiosClient } from "../apiClient";

const vercelEndpoints = {
  saveIntegration: (data) => axiosClient.post("/vercel/store", data),
  listIntegrations: () => axiosClient.get("/vercel/list"),
  fetchProjects: (email) => axiosClient.post("/vercel/projects", { email }),
};

export default vercelEndpoints;
