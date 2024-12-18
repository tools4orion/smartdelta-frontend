import vercelEndpoints from "../../../network/endpoints/vercel";
import { encryptToken } from "../utils/encrpytToken";

export const saveVercelProfile = async (username, email, token) => {
  const secretKey = process.env.REACT_APP_SECRET_KEY;
  if (!secretKey) {
    throw new Error("Secret key is missing.");
  }

  const encryptedToken = encryptToken(token, secretKey);

  try {
    const response = await vercelEndpoints.saveIntegration({
      username,
      email,
      token: encryptedToken,
    });

    console.log("Save Vercel Profile Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error saving Vercel profile:", error);
    throw new Error("Error saving Vercel profile.");
  }
};
