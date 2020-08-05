import axios from "axios";
import { saveToken, loadState } from "../utils";

// axios.defaults.baseURL = 'http://localhost:5000/api/v1';
axios.defaults.baseURL = "https://www.smart-investment.club/ercapi/api";

const errorHandler = msg => {
  throw new Error(msg);
};
const request = (
  verb,
  endpoint,
  data,
  requireAuth = false,
  multipart = false
) => {
  const config = {
    url: endpoint,
    method: verb
  };
  if (data) {
    config.data = data;
  }
  const contentType = multipart
    ? "application/x-www-form-urlencoded"
    : "application/json";
  config.headers = {
    "Content-Type": contentType,
    "API-VERSION": 1.0,
    "Application-key": "a6cb5c9ce88b59ee360587f0459bcb37fe8895c9"
  };
  if (requireAuth) {
    try {
      const token = loadState("token");

      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      } else {
        return errorHandler("User not authenticated");
      }
    } catch (error) {
      return errorHandler(error);
    }
  }

  return axios(config)
    .then(res => {
      const { data } = res;
      const token = data && data.accessToken;

      if (token) {
        saveToken("token", token);
      }

      return data;
    })
    .catch(error => {
      if (error && error.response) {
        throw new Error(error.response.data);
      }
      throw new Error(error);
    });
};

export default request;
