import elasticApmEndpoints from "network/endpoints/elasticApm";

const getTraces = async (dateRange) => {
  try {
    const res = await elasticApmEndpoints.getTraceSpans(
      "traceSpansByDate",
      dateRange
    );
    const { data } = res;
    console.log("getTraceSpans", data);
    return data ?? {};
  } catch (error) {
    console.error("Error fetching trace spans:", error);
    return { isAuthenticated: false, error: error.message };
  }
};

export default getTraces;
