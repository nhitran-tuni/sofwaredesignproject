import axios from "axios";
import { FINGRID_AVG_TYPES, GROUP_MAP, SERVER_URL } from "../utils/constants";
import {
  getRequestDescriptor,
  toISOStringWithoutMiliSec
} from "../utils/helpers";

const getData = async ({ startTime, endTime, selections, location }) => {
  const startTimeOrNow = startTime ? startTime : new Date();
  const endTimeOrNow = endTime ? endTime : new Date();
  const body = {
    descriptor: getRequestDescriptor(selections, location, GROUP_MAP),
    startTime: toISOStringWithoutMiliSec(startTimeOrNow),
    endTime: toISOStringWithoutMiliSec(endTimeOrNow)
  };
  const response = await axios.post(`${SERVER_URL}/api/combine`, body);
  return response.data;
};

const getAverageTemperature = async ({
  startTime,
  endTime,
  types,
  location
}) => {
  const body = {
    descriptor: [{ types, location }],
    startTime: toISOStringWithoutMiliSec(startTime),
    endTime: toISOStringWithoutMiliSec(endTime)
  };
  const response = await axios.post(`${SERVER_URL}/api/fmi/average`, body);
  return response.data;
};

const getPowerPercentage = async ({ startTime, endTime }) => {
  const startTimeOrNow = startTime ? startTime : new Date();
  const endTimeOrNow = endTime ? endTime : new Date();
  const body = {
    descriptor: [{ types: FINGRID_AVG_TYPES }],
    startTime: toISOStringWithoutMiliSec(startTimeOrNow),
    endTime: toISOStringWithoutMiliSec(endTimeOrNow)
  };
  const response = await axios.post(`${SERVER_URL}/api/fingrid/average`, body);
  return response.data;
};

export default { getData, getAverageTemperature, getPowerPercentage };
