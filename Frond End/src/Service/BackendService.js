import axios from "axios";

class BackendService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  // Send a GET request to the specified endpoint
  async get(endpoint) {
    try {
      const response = await axios.get(`${this.baseUrl}/${endpoint}`);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Send a POST request to the specified endpoint
  async post(endpoint, data) {
    try {
      const response = await axios.post(`${this.baseUrl}/${endpoint}`, data.toJSONType());
      console.log(response);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  // Send a POST request to the specified endpoint
  async post_login(data) {
    try {
      const response = await axios.post(`${this.baseUrl}/login`, data.toJSONType());
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Send a PUT request to the specified endpoint
  async put(endpoint, data) {
    try {
      if (typeof data === 'string') {
        console.log(data);
        const response = await axios.put(`${this.baseUrl}/${endpoint}`,JSON.stringify({ username: data }));
        return response.data;
    }
    console.log(JSON.stringify(data.toJSONType()));
      const response = await axios.put(`${this.baseUrl}/${endpoint}`, data.toJSONType());
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // Send a DELETE request to the specified endpoint
  async delete(endpoint) {
    try {
      await axios.delete(`${this.baseUrl}/${endpoint}`);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default BackendService;
