import { axiosClient } from "../apiClient";

const dockerhubEndpoints = {
  getLatestTag: (username, podName) =>
    axiosClient.get(`/dockerhub/latest-tag`, {
      params: { username, podName },
    }),
};

export default dockerhubEndpoints;
