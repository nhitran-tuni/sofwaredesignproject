import GraphDataApi from "./GraphDataApi";
import SaveDataApi from "./SaveDataApi";

export const getData = GraphDataApi.getData;
export const getAverageTemperature = GraphDataApi.getAverageTemperature;
export const getPowerPercentage = GraphDataApi.getPowerPercentage;

export const getAllPreferences = SaveDataApi.getAllPreferences;
export const getPreferenceById = SaveDataApi.getPreferenceById;
export const addPreference = SaveDataApi.addPreference;
export const updatePreferenceById = SaveDataApi.updatePreferenceById;
export const deletePreferenceById = SaveDataApi.deletePreferenceById;
