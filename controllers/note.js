const Note = require("../models/note");
const SharedNote = require("../models/sharedNote");
const fs = require("fs");

exports.postNote = (req, res, next) => {
  fs.writeFile(
    "files/63258c1fc9cb1e09a9d3dd4e.txt",
    req.body.note,
    function (err) {
      if (err) {
        next(err);
      }
    }
  );

  // const user = req.userId;
  const user = "63258c1fc9cb1e09a9d3dd4e";
  const filename = `${user.toString()}.txt`;
  const mimetype = "text/plain";
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
  // const user = req.userId;
  const user = "63258c1fc9cb1e09a9d3dd4e";

  Note.findOne({ user })
    .then((note) => {
      if (note) {
        fs.readFile(`files/${note.filename}`, function (err, data) {
          if (err) {
            next(err);
          }
          res.send(data.toString());
        });
      } else {
        res.json([]);
      }
    })
    .catch((err) => next(err));
};

exports.getShare = (req, res, next) => {
  // const user = req.userEmail;
  const user = "2018-2-60-28@std.ewubd.edu";
  SharedNote.find({
    $or: [
      {
        fromShared: user,
      },
      {
        toShared: user,
      },
    ],
  })
    .then((shared_note) => {
      res.json(shared_note);
    })
    .catch((err) => next(err));
};

exports.postShare = (req, res, next) => {
  // const user = req.userId;
  const fromShared = req.body.fromShared;
  const toShared = req.body.toShared;
  const title = req.body.title;
  const note = req.body.note;
  const comment = [];
  const sharedAt = req.body.sharedAt;

  SharedNote.create({ fromShared, toShared, title, note, comment, sharedAt })
    .then((shared_note) => {
      res.json(shared_note);
    })
    .catch((err) => next(err));
};

exports.postComment = (req, res, next) => {
  const noteId = req.body._id;
  const comment = req.body.comment;

  SharedNote.findOneAndUpdate({ _id: noteId }, { $set: { comment } })
    .then((updated_note) => {
      res.json(updated_note);
    })
    .catch((err) => next(err));
};
