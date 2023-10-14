import { axiosClient } from "../apiClient";

 const analysisEndpoints = {
	getResourcePrediction: () => axiosClient.get('/analysis/predict-resource'),

  };

 export default analysisEndpoints;