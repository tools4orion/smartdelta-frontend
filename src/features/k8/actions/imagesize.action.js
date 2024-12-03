import dockerhubEndpoints from "network/endpoints/dockerhub";

const getLatestTag = async (username, podName) => {
  try {
    console.log("Fetching latest tag for:", username, podName);

    const response = await dockerhubEndpoints.getLatestTag(username, podName);
    const { data } = response;

    console.log("Latest Tag Data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching latest tag:", error);
    throw error;
  }
};

export default getLatestTag;
