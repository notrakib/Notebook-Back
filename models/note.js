const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User" },
  file: { type: Buffer, required: true },
  filename: { type: String, required: true },
  mimetype: { type: String, required: true },
  lastUpdatedAt: Date,
});

module.exports = mongoose.model("Note", noteSchema);
