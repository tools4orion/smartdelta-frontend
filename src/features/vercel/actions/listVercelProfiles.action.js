import vercelEndpoints from "../../../network/endpoints/vercel";

// list all saved Vercel profiles
export const getVercelIntegratedProfiles = async () => {
  try {
    const response = await vercelEndpoints.listIntegrations();
    return response.data.integrations;
  } catch (error) {
    console.error("Error fetching integrations:", error);
    throw error;
  }
};
