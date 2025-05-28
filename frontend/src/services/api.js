// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000';  // Change this to your backend URL if it's different

// Register a new user
export const signupUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/signup`, userData);
    return response.data;  // Returns the response from the backend (message and token)
  } catch (error) {
    console.error("Signup Error:", error.response ? error.response.data : error.message);
    throw error;
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/login`, credentials);
    return response.data;  // Returns the response from the backend (message and token)
  } catch (error) {
    console.error("Login Error:", error.response ? error.response.data : error.message);
    throw error;
  }
};
