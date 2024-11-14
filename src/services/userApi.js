// src/api/userApi.js
import axios from 'axios';

const API_URL = 'https://geotrip-api.onrender.com/users';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Login error:', error.response.data);
      throw error.response.data;
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw { error: 'No response from server.' };
    } else {
      console.error('Error setting up request:', error.message);
      throw { error: error.message };
    }
  }
};

export const createUser = async (username, email, password) => {
  try {
    const response = await axios.post(`${API_URL}/create`, { username, email, password });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Login error:', error.response.data);
      throw error.response.data;
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw { error: 'No response from server.' };
    } else {
      console.error('Error setting up request:', error.message);
      throw { error: error.message };
    }
  }
};