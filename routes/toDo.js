const express = require("express");
const route = express.Router();
const toDoController = require("../controllers/toDO");

route.post("/create-toDO", toDoController.createToDo);
route.get("/fetch-all-toDO", toDoController.fetchAllToDo);
route.post("/edit-toDO/:toDoId", toDoController.editToDo);
route.delete("/delete-toDO/:toDoId", toDoController.deleteToDo);
route.post("/change_status-toDO/:toDoId", toDoController.changeStatusToDo);

route.post("/create-toDOList/:toDoId", toDoController.createToDoList);
route.post("/edit-toDOList/:toDoListId", toDoController.editToDoList);
route.delete("/delete-toDOList/:toDoListId", toDoController.deleteToDoList);
route.post(
  "/change_status-toDOList/:toDoListId",
  toDoController.changeStatusToDoList
);

module.exports = route;
