import axios from "axios";
const axiosClient = axios.create({
  baseURL: process.env.NODEJS_API_URL || "http://localhost:5001",
});

export { axiosClient };
