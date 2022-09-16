const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");

const CLIENT_ID =
  "667369973571-k05cslsu3d0hdt9rh004q2glri5t4hms.apps.googleusercontent.com";

exports.userSignin = (req, res, next) => {
  let payload;

  const client = new OAuth2Client(CLIENT_ID);
  client
    .verifyIdToken({
      idToken: req.body.idToken,
      audience: CLIENT_ID,
    })
    .then((ticket) => {
      return User.findOne({ sub: ticket.getPayload().sub });
    })
    .then((user) => {
      if (user) {
        return user;
      } else {
        return User.create({
          sub: payload.sub,
          email: payload.email,
          name: payload.name,
          picture: req.body.profile.picture,
        });
      }
    })
    .then((user) => {
      userInfo = {
        userId: user._id,
        email: user.email,
        name: user.name,
        picture: req.body.profile.picture,
      };

      const token = jwt.sign(userInfo, "D+adu+Bha=i", {
        expiresIn: "30d",
      });
      return res.json({ token, userInfo });
    })
    .catch((err) => next(err));
};
