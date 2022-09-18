const User = require("../models/user");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID =
  "667369973571-k05cslsu3d0hdt9rh004q2glri5t4hms.apps.googleusercontent.com";

exports.userAutoSignin = (req, res, next) => {
  let payload;

  const client = new OAuth2Client(CLIENT_ID);
  client
    .verifyIdToken({
      idToken: req.body.idToken,
      audience: CLIENT_ID,
    })
    .then((ticket) => {
      payload = ticket.getPayload();
      return User.findOne({ email: payload.email });
    })
    .then((user) => {
      if (user) {
        return user;
      } else {
        return User.create({
          email: payload.email,
          name: req.body.profile.name,
          picture: req.body.profile.picture,
        });
      }
    })
    .then((user) => {
      userInfo = {
        userId: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture,
      };

      const token = jwt.sign(userInfo, "D+adu+Bha=i", {
        expiresIn: "30d",
      });
      return res.json({ token, userInfo });
    })
    .catch((err) => next(err));
};

exports.userManualSignup = (req, res, next) => {
  User.create({
    email: req.body.email,
    name: req.body.email.split("@")[0],
    picture: null,
  })
    .then(() => {
      return res.json({ message: "Account created" });
    })
    .catch((err) => next(err));
};

exports.userManualSignin = (req, res, next) => {
  User.findOne({ email: req.body.email })

    .then((user) => {
      const userInfo = {
        userId: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture,
      };

      const token = jwt.sign(userInfo, "D+adu+Bha=i", {
        expiresIn: "30d",
      });
      return res.json({ token, userInfo });
    })

    .catch((err) => next(err));
};

exports.userEditProfile = (req, res, next) => {
  User.findOne({ email: req.body.email })

    .then((user) => {
      if (req.body.name) {
        user.name = req.body.name;
      }
      if (req.file) {
        fs.unlink(`images/${user.picture}`, (err) => {
          if (err) {
            next(err);
          }
        });

        user.picture = req.file.filename;
      }
      user.save();
    })
    .then((user) => {
      return res.json(user);
    })

    .catch((err) => next(err));
};
