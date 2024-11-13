import k8sEndpoints from "network/endpoints/k8s";

const getClusterInfo = async (provider, credentials, authMethod) => {
  try {
    console.log(
      `CLUSTER`,
      `provider`,
      provider,
      `credentials`,
      credentials,
      `authMethod`,
      authMethod
    );

    const response = await k8sEndpoints.getClusterInfo({
      provider,
      credentials,
      authMethod,
    });
    const { data } = response;
    console.log("Cluster Info:", data);
    return data;
  } catch (error) {
    console.error("Error fetching cluster info:", error);
    throw error;
  }
};

export default getClusterInfo;
