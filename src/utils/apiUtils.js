import axios from "axios";
import { API_ENDPOINTS } from "../constants/apiEndpoints";

// Make a GET request
const getRequest = async (endpoint) => {
  try {
    const response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "An error occurred");
  }
};

// Make a POST request
const postRequest = async (endpoint, data) => {
  try {
    const response = await axios.post(endpoint, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "An error occurred");
  }
};

// Make a PUT request
const putRequest = async (endpoint, data) => {
  try {
    const response = await axios.put(endpoint, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "An error occurred");
  }
};

// Make a DELETE request
const deleteRequest = async (endpoint) => {
  try {
    const response = await axios.delete(endpoint);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || "An error occurred");
  }
};

export { getRequest, postRequest, putRequest, deleteRequest };




export const fetchWithRetry = async (url, options, retries = 3, delay = 1000) => {
  try {
    const response = await axios.request({ url, ...options });
    return response;
  } catch (error) {
    if (retries === 0 || error.response?.status !== 429) {
      throw error;
    }
    await new Promise(res => setTimeout(res, delay));
    return fetchWithRetry(url, options, retries - 1, delay * 2);
  }
};
