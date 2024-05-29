import elasticApmEndpoints from "network/endpoints/elasticApm";

const getServiceTransactions = async (serviceName) => {
  try {
    const res = await elasticApmEndpoints.getServiceTransactions(serviceName);
    const { data } = res;
	console.log(data);

    return data;
  } catch (error) {
    const { data } = error.response;
    return { isAuthenticated: false };
  }
};

export default getServiceTransactions;
