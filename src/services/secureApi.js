import axios from "axios";

const secureApi = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

export default secureApi;
