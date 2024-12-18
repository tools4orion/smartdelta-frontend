import vercelEndpoints from "../../../network/endpoints/vercel";

export const getVercelProjects = async (encryptedToken) => {
  try {
    const response = await vercelEndpoints.fetchProjects(encryptedToken);
    return response.data;
  } catch (error) {
    console.error("Error fetching Vercel projects:", error);
    throw error;
  }
};
