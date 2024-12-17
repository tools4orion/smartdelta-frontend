import { useState } from "react";
import { useNavigate } from "react-router-dom";
import getVercelProjects from "../actions/vercelprojects.action";

const useGetProjects = (setSnackbar) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleToken = async (inputVercelToken) => {
    setLoading(true);

    if (!inputVercelToken) {
      setSnackbar({
        open: true,
        message: "Token cannot be empty!",
        severity: "error",
      });
      setLoading(false);
      return;
    }

    try {
      const data = await getVercelProjects(inputVercelToken);
      console.log("Projects fetched successfully:", data);

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
