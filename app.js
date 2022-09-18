const accountRoute = require("./routes/user");
const noteRoute = require("./routes/note");
const toDoRoute = require("./routes/toDo");

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const multer = require("multer");
const mongoose = require("mongoose");

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname);
  },
});

// const fileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/png" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/jpeg"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

const app = express();

app.use(bodyParser.json());
// app.use(
//   multer({ storage: fileStorage, fileFilter: fileFilter }).single("file")
// );
app.use(multer({ storage: fileStorage }).single("file"));

app.use(express.static(path.join(__dirname, "images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

app.use(accountRoute);
app.use(noteRoute);
app.use(toDoRoute);

app.use((error, req, res, next) => {
  res.json({ error: { message: error.message } });
});

mongoose
  .connect("mongodb+srv://rakib:rakib@cluster0.f4fx5.mongodb.net/sen")
  // .then(() => app.listen(process.env.PORT || 3000))
  .then(() => app.listen(8080))
  .catch((err) => console.log(err));
