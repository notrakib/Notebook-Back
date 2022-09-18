const express = require("express");
const route = express.Router();
const notesController = require("../controllers/note");
const isAuth = require("../middleware/auth");

route.post("/post-note", isAuth, notesController.postNote);
route.get("/get-note", notesController.getNote);

module.exports = route;
