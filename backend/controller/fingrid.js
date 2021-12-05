/* eslint-disable camelcase */
const axios = require("axios");
const { X_API_KEYS } = require("../utils/constants");
const fingridRouter = require("express").Router();
const {
  aggregateResponse,
  returnTotalData,
  separateIntoTimeIntervals,
  contractMultipleData
} = require("../utils/helpers");

const fingridFetch = async (descriptor, startTime, endTime) => {
  const varIds = descriptor.variableIds;
  const timeList = separateIntoTimeIntervals(startTime, endTime, 14, "d");

  const promises = [];

  varIds.forEach(id => {
    timeList.forEach(time =>
      promises.push(
        axios
          .get(`https://api.fingrid.fi/v1/variable/${id}/events/json`, {
            headers: { "x-api-key": X_API_KEYS },
            params: {
              start_time: time.startTime,
              end_time: time.endTime
            }
          })
          .catch(err => {
            return err;
          })
      )
    );
  });

  const responses = await Promise.all(promises);

  if (responses.some(r => r instanceof Error))
    return new Error("Error when fetching fingrid");

  const responseWithISOTime = responses
    .map(r => r.data)
    .map(r =>
      r.map(data => ({
        value: data.value,
        start_time: data.start_time.replace("+0000", "Z")
      }))
    );

  const contractedResponse = contractMultipleData(
    responseWithISOTime,
    timeList.length
  );

  return contractedResponse;
};

fingridRouter.post("/", async (req, res, next) => {
  const body = req.body;
  const descriptor = body.descriptor[0];

  const responses = await fingridFetch(
    descriptor,
    body.startTime,
    body.endTime
  );

  if (responses instanceof Error) {
    return next(responses);
  }

  return res.status(200).json(aggregateResponse(contracted, descriptor.types));
});

fingridRouter.post("/average", async (req, res, next) => {
  const body = req.body;
  const descriptor = body.descriptor[0];

  const responses = await fingridFetch(
    descriptor,
    body.startTime,
    body.endTime
  );
  if (responses instanceof Error) return next(responses);

  return res.status(200).json(returnTotalData(responses, descriptor.types));
});

module.exports = { fingridRouter, fingridFetch };
