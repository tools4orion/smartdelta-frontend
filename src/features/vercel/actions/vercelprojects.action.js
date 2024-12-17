// import k8sEndpoints from "network/endpoints/k8s";
import axios from "axios";

const getVercelProjects = async (token) => {
  const url = "https://api.vercel.com/v9/projects";
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Failed to fetch Vercel projects:", error);
    throw error;
  }
};

export default getVercelProjects;
