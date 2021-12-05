//Define save controller.
const Preference = require("../model/preference.js");
const saveRouter = require("express").Router();

saveRouter.post("/", async (req, res) => {
  if (await Preference.findOne({ name: req.body.name })) {
    return res.status(400).end();
  }
  const newGraph = new Preference(req.body);
  return res.status(201).json(await newGraph.save());
});

saveRouter.get("/", async (_req, res) => {
  const data = await Preference.find({});
  return res.status(200).json(
    data.map(({ _id, name, description, group }) => ({
      id: _id,
      name,
      description,
      group
    }))
  );
});

saveRouter.get("/:graphId", async (req, res) => {
  const data = await Preference.findById(req.params.graphId).exec();
  return !data ? res.status(404).end() : res.status(200).json(data);
});

saveRouter.put("/", async (req, res) => {
  const data = await Preference.findByIdAndUpdate(req.body.id, req.body, {
    new: true
  });
  return !data ? res.status(404).end() : res.status(202).json(data);
});

saveRouter.delete("/:graphId", async (req, res) => {
  const data = await Preference.findByIdAndDelete(req.params.graphId);
  return !data ? res.status(404).end() : res.status(200).json(data);
});

module.exports = saveRouter;
