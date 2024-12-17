import vercelEndpoints from "../network/endpoints/vercel";

// Save a Vercel Integration
export const saveVercelIntegration = async (username, email, token) => {
  try {
    const response = await vercelEndpoints.saveIntegration({
      username,
      email,
      token,
    });
    console.log("Integration saved successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error saving integration:", error);
    throw error;
  }
};

// List all saved Vercel Integrations
export const getVercelIntegrations = async () => {
  try {
    const response = await vercelEndpoints.listIntegrations();
    return response.data.integrations;
  } catch (error) {
    console.error("Error fetching integrations:", error);
    throw error;
  }
};

// Fetch Vercel Projects using saved email
export const getVercelProjects = async (email) => {
  try {
    const response = await vercelEndpoints.fetchProjects(email);
    return response.data;
  } catch (error) {
    console.error("Error fetching Vercel projects:", error);
    throw error;
  }
};
