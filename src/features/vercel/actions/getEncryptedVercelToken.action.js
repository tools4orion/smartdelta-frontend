import vercelEndpoints from "../../../network/endpoints/vercel";

export const getEncryptedToken = async (email) => {
  try {
    const response = await vercelEndpoints.getEncryptedToken(email);
    return response.data.encryptedToken;
  } catch (error) {
    console.error("Error fetching encrypted token:", error);
    throw error;
  }
};
