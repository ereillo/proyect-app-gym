const { Schema, model } = require("mongoose");

const classSchema = new Schema({
  className: String,
  teacher: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  capacity: Number,
  students: [
    {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  weekDay: String,
  time: String,
  classPic: String
});

const Class = model("Class", classSchema);

module.exports = Class;
