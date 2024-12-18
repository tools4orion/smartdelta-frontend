import vercelEndpoints from "../../../network/endpoints/vercel";

export const getVercelProjects = async (token) => {
  try {
    const response = await vercelEndpoints.fetchProjects(token);
    return response.data;
  } catch (error) {
    console.error("Error fetching Vercel projects:", error);
    throw error;
  }
};
