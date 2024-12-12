import axios from 'axios';

const API_URL = 'https://geotrip-api.onrender.com/user-points';

export const userCheckin = async (user_id, point_id) => {
  try {
    const response = await axios.post(`${API_URL}/`, { user_id, point_id });
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

export const userCheckout = async (user_id, point_id) => {
  try {
    const response = await axios.delete(`${API_URL}/`, {
      data: { user_id, point_id },
    });
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

export const getCheckinInfo = async (user_id, point_id) => {
  try {
    const response = await axios.get(`${API_URL}/getCheckinInfo`, {
      params: { point_id, user_id },
    });
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