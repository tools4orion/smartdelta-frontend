import axios from 'axios';
const axiosClient = axios.create({
	baseURL: `http://localhost:5001`,
  });

  export {
	axiosClient
  };