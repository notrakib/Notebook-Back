const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const noteSettingsSchema = new Schema({
  backgroundIMG: String,
  backgroundColor: String,
  fontColor: String,
});

module.exports = mongoose.model("noteSettings", noteSettingsSchema);
