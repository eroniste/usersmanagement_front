import axios from "axios";

const httpClientreq = axios.create({
  baseURL: "http://localhost:8080" ,
});

httpClientreq.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    
    if (token) {
      console.log("done");
      config.headers["Authorization"] = `Bearer ${token}`;
      
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default httpClientreq;
