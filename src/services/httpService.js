import axios from "axios";
import { toast } from "react-toastify";
import config from "../../src/config.json";
// import logging from "./logService";

axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    toast.dark("an unexpected error accured", {
      position: "top-right",
      autoClose: 7000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    // logging.log(error);
  }
  return Promise.reject(error);
});

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

const http = {
  get: axios.get,
  put: axios.put,
  delete: axios.delete,
  post: axios.post,
  request: axios.request,
  setJwt,
};

export default http;
