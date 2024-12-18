import vercelEndpoints from "../../../network/endpoints/vercel";
import CryptoJS from "crypto-js";

// save a Vercel profile
export const saveVercelProfile = async (username, email, token) => {
  const encryptedToken = CryptoJS.AES.encrypt(
    token,
    process.env.SECRET_KEY
  ).toString();

  try {
    const response = await vercelEndpoints.saveIntegration({
      username,
      email,
      token: encryptedToken,
    });
    console.log("Vercel profile saved successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error saving integration:", error);
    throw error;
  }
};
