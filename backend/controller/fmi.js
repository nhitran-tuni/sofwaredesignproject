/* eslint-disable camelcase */
const axios = require("axios");
const fmiRouter = require("express").Router();
const {
  TEMPERATURE,
  TEMPERATURE_FORECAST,
  OBSERVED_WIND,
  OBSERVED_CLOUDINESS,
  PREDICTED_WIND,
  AVG_TEMP_MONTH,
  AVG_MAX_TEMP_MONTH,
  AVG_MIN_TEMP_MONTH
} = require("../utils/constants");
const {
  aggregateResponse,
  parseXML,
  calculateAverageValue,
  contractMultipleData,
  separateIntoTimeIntervals
} = require("../utils/helpers");

const FMI_STOREDQUERY_ID = {
  [TEMPERATURE]: "fmi::observations::weather::hourly::timevaluepair",
  [OBSERVED_WIND]: "fmi::observations::weather::hourly::timevaluepair",
  [OBSERVED_CLOUDINESS]: "fmi::observations::weather::timevaluepair",
  [PREDICTED_WIND]: "fmi::forecast::hirlam::surface::point::timevaluepair",
  [TEMPERATURE_FORECAST]:
    "fmi::forecast::hirlam::surface::point::timevaluepair",
  [AVG_TEMP_MONTH]: "fmi::observations::weather::daily::timevaluepair",
  [AVG_MAX_TEMP_MONTH]: "fmi::observations::weather::daily::timevaluepair",
  [AVG_MIN_TEMP_MONTH]: "fmi::observations::weather::daily::timevaluepair"
};

const fmiFetch = async (descriptor, startTime, endTime) => {
  const parameters = descriptor.variableIds;
  const timeList = separateIntoTimeIntervals(startTime, endTime, 168, "h");

  const promises = [];

  parameters.forEach((param, i) => {
    timeList.forEach(time => {
      promises.push(
        axios
          .get("http://opendata.fmi.fi/wfs", {
            params: {
              service: "WFS",
              version: "2.0.0",
              request: "getFeature",
              storedquery_id: FMI_STOREDQUERY_ID[descriptor.types[i]],
              place: descriptor.location || "helsinki",
              starttime: time.startTime,
              endtime: time.endTime,
              timestep: 60,
              parameters: param
            }
          })
          .catch(err => err)
      );
    });
  });

  const responses = await Promise.all(promises);

  if (responses.some(r => r instanceof Error))
    return new Error("Error when fetching FMI");

  const readData = parseXML(responses);

  const contractedResponse = contractMultipleData(readData, timeList.length);

  return contractedResponse;
};

fmiRouter.post("/", async (req, res, next) => {
  const body = req.body;
  const descriptor = body.descriptor[0];

  const readData = await fmiFetch(descriptor, body.startTime, body.endTime);

  if (readData instanceof Error) {
    return next(readData);
  }

  return res.status(200).json(aggregateResponse(readData, descriptor.types));
});

fmiRouter.post("/average", async (req, res) => {
  const body = req.body;
  const descriptor = body.descriptor[0];

  const readData = await fmiFetch(descriptor, body.startTime, body.endTime);

  if (readData instanceof Error) {
    return next(readData);
  }

  const averageResponse = readData
    .map(data => {
      const value = calculateAverageValue(data.map(d => d.value));
      return Number.isNaN(value)
        ? undefined
        : [{ start_time: body.startTime, value }];
    })
    .filter(Boolean);

  return res
    .status(200)
    .json(aggregateResponse(averageResponse, descriptor.types)[0]);
});

module.exports = { fmiRouter, fmiFetch };
