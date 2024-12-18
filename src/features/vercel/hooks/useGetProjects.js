import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getVercelProjects } from "../actions/getVercelProjects.action";
import { getEncryptedToken } from "../actions/getEncryptedVercelToken.action";
import { decryptToken } from "../utils/decryptToken";

const useGetProjects = (setSnackbar) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleToken = async (email) => {
    setLoading(true);
    try {
      const encryptedToken = await getEncryptedToken(email);
      const token = decryptToken(
        encryptedToken,
        process.env.REACT_APP_SECRET_KEY
      );
      const data = await getVercelProjects(token);
      console.log("Fetched projects:", data);

      navigate("/vercel-deployment-management/vercel-projects", {
        state: { vercelProjects: data },
      });
    } catch (error) {
      console.error("Failed to fetch Vercel projects:", error);
      setSnackbar({
        open: true,
        message: "Failed to fetch Vercel projects. Please check your token.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return { loading, handleToken };
};

export default useGetProjects;
