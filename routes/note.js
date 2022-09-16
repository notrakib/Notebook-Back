const express = require("express");
const route = express.Router();
const notesController = require("../controllers/note");

route.post("/post-note", notesController.postNote);
route.get("/get-note", notesController.getNote);

module.exports = route;
