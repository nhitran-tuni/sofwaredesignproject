const { TYPE_TO_VAR_ID, REQUIRED_BODY_PARAMS } = require("./constants");

const bodyExtractor = (req, _res, next) => {
  const body = req.body;
  if (body && REQUIRED_BODY_PARAMS.every(p => body[p])) {
    body.descriptor = body.descriptor.map(des => ({
      ...des,
      variableIds: des.types.map(t => TYPE_TO_VAR_ID[t])
    }));
  } else {
    throw Error("MissingBody");
  }

  next();
};

const unknownEndpoint = (_req, res) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (err, _req, res, next) => {
  if (err.message === "MissingBody") {
    return res.status(400).send({ error: "Missing required body parameters" });
  } else if (err.message === "end_time before start_time") {
    return res
      .status(422)
      .send({ error: "End time should be after start time" });
  }

  next(err);
};

module.exports = { bodyExtractor, unknownEndpoint, errorHandler };
