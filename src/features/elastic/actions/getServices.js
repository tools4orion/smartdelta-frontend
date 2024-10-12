import elasticApmEndpoints from "network/endpoints/elasticApm";

const getServices = async () => {
  try {
    const res = await elasticApmEndpoints.getServices();
    const { data } = res;
    console.log("getServicesData", data);

    return data;
  } catch (error) {
    const { data } = error.response;
    return { isAuthenticated: false };
  }
};

export default getServices;
