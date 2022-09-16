const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const toDoListSchema = new Schema({
  toDo: { type: Schema.Types.ObjectId, ref: "ToDoList" },
  text: String,
  status: String,
  startAt: Date,
  endAt: Date,
});

module.exports = mongoose.model("ToDoList", toDoListSchema);
