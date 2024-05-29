import { axiosClient } from "../apiClient";
const gptEndpoints = {
	inputErrorData :(data)=> axiosClient.post('/gpt/input-error-data',{errorData:data}),
}
export default gptEndpoints;