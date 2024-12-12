import axios from 'axios';

const API_URL = 'https://geotrip-api.onrender.com/users';

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else if (error.request) {
      throw { error: 'No response from server.' };
    } else {
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
      throw error.response.data;
    } else if (error.request) {
      throw { error: 'No response from server.' };
    } else {
      throw { error: error.message };
    }
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/getbyid/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      throw error.response.data;
    } else if (error.request) {
      throw { error: 'No response from server' };
    } else {
      throw { error: error.message };
    }
  }
};