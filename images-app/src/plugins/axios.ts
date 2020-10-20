"use strict";
import axios from "axios";
   
let config = {
  baseURL: "http://interview.agileengine.com",
};

const API = axios.create(config);

const setToken = async () => {
  try {
    const response = await API.post("auth", { apiKey: "23567b218376f79d9415" });
    localStorage.setItem('userToken', response.data.token);
    return response.data.token;
  } catch (error) {
    return Promise.reject(error);
  }
};


// Request interceptor
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
API.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      const token = await setToken();
      const newRequest = {
        ...originalRequest,
        headers: {
          ...originalRequest.headers,
          Authorization: "Bearer " + token,
        }
      }
      return axios(newRequest);
    }
    return Promise.reject(error);
  }
);

export default API;
