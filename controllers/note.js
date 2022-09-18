const Note = require("../models/note");
const fs = require("fs");

exports.postNote = (req, res, next) => {
  if (!req.file) {
    throw Error("No file attached");
  }
  const user = req.userId;
  const filename = req.file.filename;
  const mimetype = req.file.mimetype;
  const lastUpdatedAt = new Date();

  Note.findOne({ user })
    .then((note) => {
      if (note) {
        fs.unlink(`images/${note.filename}`, (err) => {
          if (err) {
            next(err);
          }
        });
        note.filename = filename;
        return note.save();
      } else {
        return Note.create({ user, filename, mimetype, lastUpdatedAt });
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
