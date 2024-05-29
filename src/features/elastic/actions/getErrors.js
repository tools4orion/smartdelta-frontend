import elasticApmEndpoints from "network/endpoints/elasticApm";

const getErrors = async (serviceName, timeFilter,textFilters) => {
  try {
    const res = await elasticApmEndpoints.getErrors(serviceName,timeFilter,textFilters);
    const { data } = res;
	console.log(data);

    return data;
  } catch (error) {
    const { data } = error.response;
    return { isAuthenticated: false };
  }
};

export default getErrors;
