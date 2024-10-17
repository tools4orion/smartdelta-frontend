import { axiosClient } from "../apiClient";
const elasticApmEndpoints = {
  getLogs: () => axiosClient.get("/elastic/logs"),
  getTraceSpans: (serviceName, dateRange) =>
    axiosClient.get(
      `/elastic/trace-spans/${serviceName}?dateRange=${dateRange}`
    ),
  getServiceLogs: (serviceName) =>
    axiosClient.get(`/elastic/logs/${serviceName}`),
  getServiceTransactions: (serviceName) =>
    axiosClient.get(`/elastic/transactions/${serviceName}`),
  getErrors: (serviceName, timeFilter, { traceId, spanId, textToInclude }) =>
    axiosClient.get(
      `/elastic/errors/${serviceName}/?timeFilter=${timeFilter}&traceId=${traceId}&spanId=${spanId}&textToInclude=${textToInclude}`
    ),
  authenticate: (credentials) =>
    axiosClient.post("/elastic/save-integration", credentials),
  getIntegrations: () => axiosClient.get("/elastic/integrations"),
  getMetrics: (serviceName) =>
    axiosClient.get(`/elastic/metrics/${serviceName}`),
  setupMl: () => axiosClient.get("/elastic/setup-ml"),
  getServices: () => axiosClient.get("/elastic/services"),
};
export default elasticApmEndpoints;
