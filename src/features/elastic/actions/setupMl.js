import elasticApmEndpoints from "network/endpoints/elasticApm";

const setupMl = async () => {
  try {
    const res = await elasticApmEndpoints.setupMl();
    const { data } = res;
	console.log(data);

    return data;
  } catch (error) {
    const { data } = error.response;
    return { isSetupSuccessful: false };
  }
};

export default setupMl;
