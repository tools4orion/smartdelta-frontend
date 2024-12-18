import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import getVercelProjects from "../actions/vercelprojects.action";
import { getEncryptedToken } from "../actions/getEncryptedVercelToken.action";

const useGetProjects = (setSnackbar) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleToken = async (email) => {
    setLoading(true);

    if (!email) {
      setSnackbar({
        open: true,
        message: "There is no token found related to the associated email",
        severity: "error",
      });
      setLoading(false);
      return;
    }

    try {
      const encryptedToken = await getEncryptedToken(email);

      const data = await getVercelProjects(encryptedToken);

      setSnackbar({
        open: true,
        message: "Projects fetched successfully!",
        severity: "success",
      });

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
