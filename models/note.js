const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  filename: { type: String, required: true },
  mimetype: { type: String, required: true },
  lastEdited: Date,
});

module.exports = mongoose.model("Note", noteSchema);
