import axios from 'axios';

const API_URL = 'https://geotrip-api.onrender.com/points';

export const getPointById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/getbyid/${id}`);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error fetching point by ID:', error.response.data);
      throw error.response.data;
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw { error: 'No response from server' };
    } else {
      console.error('Error setting up request:', error.message);
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
      console.error('Error fetching point by name:', error.response.data);
      throw error.response.data;
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw { error: 'No response from server' };
    } else {
      console.error('Error setting up request:', error.message);
      throw { error: error.message };
    }
  }
};

export const getPointsByCoordinates = async ({northEast, southWest}) => {
  try {
    const response = await axios.post(`${API_URL}/getbycoordinates`, { northEast, southWest });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error fetching points by coordinates:', error.response.data);
      throw error.response.data;
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw { error: 'No response from server' };
    } else {
      console.error('Error setting up request:', error.message);
      throw { error: error.message };
    }
  }
};

export const createPointOfInterest = async ({name, description, latitude, longitude, userId}) => {
  try {
    const response = await axios.post(`${API_URL}/`, { 
      name,
      description,
      latitude, 
      longitude, 
      user_id: userId 
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error creating point of interest:', error.response.data);
      throw error.response.data;
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw { error: 'No response from server' };
    } else {
      console.error('Error setting up request:', error.message);
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
      console.error('Error deleting point of interest:', error.response.data);
      throw error.response.data;
    } else if (error.request) {
      console.error('No response received:', error.request);
      throw { error: 'No response from server' };
    } else {
      console.error('Error setting up request:', error.message);
      throw { error: error.message };
    }
  }
};