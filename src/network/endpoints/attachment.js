import { axiosClient } from "../apiClient";

 const attachmentEndpoints = {
	list: () => axiosClient.get('/attachment/list'),
	getMeta: (name) => axiosClient.get(`/attachment/read/${name}`),
	upload: (data, config) => axiosClient.post('/attachment/upload', data, config),
	delete: (id) => axiosClient.delete(`/attachment/delete?id=${id}`),
  };

 export default attachmentEndpoints;