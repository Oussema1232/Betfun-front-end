import axios from "axios";
import { toast } from "react-toastify";



axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    toast("an unexpected error accured", {
      position: "top-right",
      autoClose: 7000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    
  }
  return Promise.reject(error);
});


axios.interceptors.request.use(
  function(config) {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers["x-auth-token"] =  token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);

const http = {
  get: axios.get,
  put: axios.put,
  delete: axios.delete,
  post: axios.post,
  request: axios.request,
  
};

export default http;
