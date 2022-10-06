const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sharedNoteSchema = new Schema({
  fromShared: { type: Schema.Types.ObjectId, ref: "User" },
  toShared: { type: Schema.Types.ObjectId, ref: "User" },
  title: String,
  note: String,
  comment: String,
  sharedAt: String,
});

module.exports = mongoose.model("sharedNote", sharedNoteSchema);
