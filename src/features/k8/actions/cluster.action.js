import k8sEndpoints from "network/endpoints/k8s";
export const getClusterInfo = async() => {

		const response = await k8sEndpoints.getClusterInfo();
		return response.data;

	}