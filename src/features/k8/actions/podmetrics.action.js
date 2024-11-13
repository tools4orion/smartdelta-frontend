import k8sEndpoints from "network/endpoints/k8s";

const getPodMetrics = async (provider, credentials, authMethod, namespace) => {
  try {
    console.log(`PODMETRICS`, `provider`, provider, `credentials`, credentials, `authMethod`, authMethod);

    const response = await k8sEndpoints.getPodMetrics({
      provider,
      credentials,
      authMethod,
      namespace,
    });
    console.log("Pod Metrics:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching pod metrics:", error);
    throw error;
  }
};

export default getPodMetrics;
