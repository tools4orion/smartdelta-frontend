import { axiosClient } from "../apiClient";

 const analysisEndpoints = {
	getResourcePrediction: () => axiosClient.get('/analysis/predict-resource'),
	compareFiles: (data) => axiosClient.post('/analysis/compare-logs',data)

  };

 export default analysisEndpoints;