const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sharedNoteSchema = new Schema({
  fromShared: String,
  toShared: String,
  title: String,
  note: String,
  comment: [
    {
      name: String,
      comment: String,
    },
  ],
  sharedAt: String,
});

module.exports = mongoose.model("SharedNote", sharedNoteSchema);
