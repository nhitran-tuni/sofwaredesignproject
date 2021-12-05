const { aggregateResponse } = require("../utils/helpers");
const { fingridFetch } = require("./fingrid");
const { fmiFetch } = require("./fmi");

const combineRouter = require("express").Router();

const FETCH_MAP = {
  power: fingridFetch,
  weather: fmiFetch
};

combineRouter.post("/", async (req, res, next) => {
  const body = req.body;
  const descriptor = body.descriptor;

  const responses = await Promise.all(
    descriptor.map(async des => {
      const result = await FETCH_MAP[des.group](
        des,
        body.startTime,
        body.endTime
      );

      if (result instanceof Error) {
        return new Error();
      }

      return result;
    })
  );

  if (responses.some(r => r instanceof Error)) {
    return next("There is problem with one of the controllers");
  }

  const allTypes = descriptor.map(des => des.types).flat();

  return res.status(200).json(aggregateResponse(responses.flat(), allTypes));
});

module.exports = combineRouter;
