const toDo = require("../models/toDo");
const toDoList = require("../models/toDoList");

exports.createToDo = (req, res, next) => {
  toDo
    .create({
      user: "6321e823a8e076246a0a803b",
      toDoTitle: req.body.toDoTitle,
      status: "Open",
      createdAt: req.body.createdAt || new Date(),
      endedAt: req.body.endedAt || null,
    })
    .then((toDo) => {
      return res.json(toDo);
    })
    .catch((err) => next(err));
};

exports.fetchAllToDo = (req, res, next) => {
  toDo
    .find()
    .populate("toDoList")
    .then((toDos) => {
      return res.json(toDos);
    })
    .catch((err) => next(err));
};

exports.editToDo = (req, res, next) => {
  toDo
    .findByIdAndUpdate(
      {
        _id: req.params.toDoId,
      },
      { $set: { toDoTitle: req.body.toDoTitle } }
    )
    .then((toDo) => {
      return res.json(toDo);
    })
    .catch((err) => next(err));
};

exports.deleteToDo = (req, res, next) => {
  toDo
    .deleteOne({
      _id: req.params.toDoId,
    })
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => next(err));
};

exports.changeStatusToDo = (req, res, next) => {
  if (req.body.status === "Open") {
    endedAt = null;
  } else {
    endedAt = req.body.endedAt;
  }

  toDo
    .findByIdAndUpdate(
      {
        _id: req.params.toDoId,
      },
      { $set: { status: req.body.status, endedAt } }
    )
    .then((toDo) => {
      return res.json(toDo);
    })
    .catch((err) => next(err));
};

exports.createToDoList = (req, res, next) => {
  toDoList
    .create({
      toDo: req.params.toDoId,
      text: req.body.text,
      status: "Open",
      startAt: req.body.startAt || new Date(),
      endAt: req.body.endAt || null,
    })
    .then((toDoList) => {
      return res.json(toDoList);
    })
    .catch((err) => next(err));
};

exports.editToDoList = (req, res, next) => {
  toDoList
    .findByIdAndUpdate(
      {
        _id: req.params.toDoListId,
      },
      {
        $set: {
          text: req.body.text,
          startAt: req.body.startAt,
          endAt: req.body.endAt,
        },
      }
    )
    .then((toDo) => {
      return res.json(toDo);
    })
    .catch((err) => next(err));
};

exports.deleteToDoList = (req, res, next) => {
  toDoList
    .deleteOne({
      _id: req.params.toDoListId,
    })
    .then((result) => {
      return res.json(result);
    })
    .catch((err) => next(err));
};

exports.changeStatusToDoList = (req, res, next) => {
  if (req.body.status === "Open") {
    endAt = req.body.endAt;
  } else {
    endAt = new Date();
  }

  toDoList
    .findByIdAndUpdate(
      {
        _id: req.params.toDoListId,
      },
      { $set: { status: req.body.status, endAt } }
    )
    .then((toDoList) => {
      return res.json(toDoList);
    })
    .catch((err) => next(err));
};
