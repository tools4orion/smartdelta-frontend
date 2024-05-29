import elasticApmEndpoints from "network/endpoints/elasticApm";

const getServiceLogs = async (serviceName) => {
  try {
    const res = await elasticApmEndpoints.getServiceLogs(serviceName);
    const { data } = res;
	console.log(data);

    return data;
  } catch (error) {
    const { data } = error.response;
    return { isAuthenticated: false };
  }
};

export default getServiceLogs;
