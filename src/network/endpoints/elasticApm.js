import { axiosClient } from "../apiClient";
const elasticApmEndpoints = {
	 getLogs:()=> axiosClient.get('/elastic/logs'),
	 authenticate:(credentials)=> axiosClient.post('/elastic/save-integration',credentials),
	 getIntegrations:()=> axiosClient.get('/elastic/integrations'),

}
export default elasticApmEndpoints;