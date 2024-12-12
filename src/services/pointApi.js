import axios from 'axios';

const API_URL = 'https://geotrip-api.onrender.com/points';

export const getPointsByOwnerId = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/getbyuserid/${userId}`);
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
}

export const getPointById = async (id) => {
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

export const getPointByName = async (name) => {
  try {
    const response = await axios.get(`${API_URL}/getbyname/${name}`);
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

export const getPointsByCoordinates = async ({northEast, southWest, zoom}) => {
  try {
    const response = await axios.post(`${API_URL}/getbycoordinates`, { northEast, southWest, zoom });
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

export const createPointOfInterest = async ({name, description, latitude, longitude, userId, color}) => {
  try {
    const response = await axios.post(`${API_URL}/`, { 
      name,
      description,
      latitude, 
      longitude, 
      user_id: userId,
      color,
    });
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

export const deletePointOfInterest = async (pointId) => {
  try {
    const response = await axios.delete(`${API_URL}/`, { data: { point_id: pointId } });
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