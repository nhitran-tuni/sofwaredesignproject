import axios from "axios";
import { SERVER_URL } from "../utils/constants";

const getAllPreferences = async () => {
  const response = await axios.get(`${SERVER_URL}/save`);
  return response.data;
};

const getPreferenceById = async ({ id }) => {
  const response = await axios.get(`${SERVER_URL}/save/${id}`);
  return response.data;
};

const addPreference = async ({ savePreferenceObject }) => {
  const response = await axios.post(`${SERVER_URL}/save`, savePreferenceObject);
  return response.data;
};

const updatePreferenceById = async ({ id, newPreferenceObject }) => {
  const body = { ...newPreferenceObject, id: id };
  const response = await axios.put(`${SERVER_URL}/save`, body);
  return response.data;
};

const deletePreferenceById = async ({ id }) => {
  const response = await axios.delete(`${SERVER_URL}/save/${id}`);
  return response.data;
};

export default {
  getAllPreferences,
  getPreferenceById,
  addPreference,
  updatePreferenceById,
  deletePreferenceById
};
