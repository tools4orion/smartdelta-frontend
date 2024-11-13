import { axiosClient } from "../apiClient";
const k8sEndpoints = {
	authenticate: (data) => axiosClient.post('/k8s/authenticate', data),
	getClusterInfo: (data) => axiosClient.post('/k8s/cluster-info', data),
	getPodMetrics: (data) => axiosClient.post('/k8s/pod-metrics', data)
  };
  
export default k8sEndpoints;