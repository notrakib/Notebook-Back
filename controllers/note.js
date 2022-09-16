const Note = require("../models/note");

exports.postNote = (req, res, next) => {
  const user = req.userId;
  const file = req.file;
  const filename = req.file.filename;
  const mimetype = req.file.mimetype;
  const lastUpdatedAt = new Date();

  Note.create({ user, file, filename, mimetype, lastUpdatedAt })
    .then(() => {
      res.json("Done");
    })
    .catch((err) => next(err));
};

exports.getNote = (req, res, next) => {
  const user = req.userId;

  Note.findOne({ user })
    .then(() => {
      res.json("Done");
    })
    .catch((err) => next(err));
};
