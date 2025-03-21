import elasticApmEndpoints from "network/endpoints/elasticApm";

const listIntegrations = async () => {
  try {
    const res = await elasticApmEndpoints.getIntegrations();
    const { data } = res;
	console.log(data);

    return { data };
  } catch (error) {
    const { data } = error.response;
    return { isAuthenticated: false };
  }
};

export default listIntegrations;
