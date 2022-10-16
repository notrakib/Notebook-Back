const Note = require("../models/note");
const fs = require("fs");

exports.postNote = (req, res, next) => {
  if (!req.file) {
    throw Error("No file attached");
  }
  // const user = req.userId;
  const user = "63258c1fc9cb1e09a9d3dd4e";
  const filename = req.file.originalname;
  const mimetype = req.file.mimetype;
  const lastEdited = new Date();

  Note.findOne({ user })
    .then((note) => {
      if (note) {
        note.lastEdited = lastEdited;
        return note.save();
      } else {
        return Note.create({ user, filename, mimetype, lastEdited });
      }
    })
    .then((newNote) => {
      res.json(newNote);
    })
    .catch((err) => next(err));
};

exports.getNote = (req, res, next) => {
  Note.findOne({ user: req.userId })
    .then((note) => {
      res.json(note);
    })
    .catch((err) => next(err));
};
