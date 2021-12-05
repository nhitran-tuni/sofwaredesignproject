// define data base
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

mongoose.set("useFindAndModify", false);

const preferenceSchema = Schema({
  name: {
    type: String,
    require: true
  },
  description: {
    type: String
  },
  startTime: {
    type: String,
    required: true,
    trim: true
  },
  endTime: {
    type: String,
    required: true,
    trim: true
  },
  group: {
    type: String,
    required: true,
    enum: ["power", "weather", "combine"],
    default: "power"
  },
  descriptor: { type: Schema.Types.Mixed },
  data: { type: Schema.Types.Mixed }
});

preferenceSchema.set("toJSON", {
  transform: (_document, returnedObject) => {
    returnedObject.id = returnedObject._id;
    delete returnedObject._id;
    delete returnedObject.__v;
  }
});

module.exports = mongoose.model("Preference", preferenceSchema);
