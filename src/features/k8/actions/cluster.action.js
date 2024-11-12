import k8sEndpoints from "network/endpoints/k8s";
export const getClusterInfo = async () => {
  console.log("getClusterInfo");
  try {
    const response = await k8sEndpoints.getClusterInfo();
    console.log("Cluster Info:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching cluster info:", error);
    throw error;
  }
};
