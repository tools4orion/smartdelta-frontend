import { axiosClient } from "../apiClient";
const k8sEndpoints = {
	 authenticate:(data)=> axiosClient.post('/k8s/authenticate',data),
	 getClusterInfo:()=> axiosClient.get('/k8s/cluster-info')

}
export default k8sEndpoints;