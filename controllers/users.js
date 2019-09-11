const User = require("../models/User");
const bcryptjs = require("bcryptjs");

/**
 * @param {*} req Request
 * @param {*} res Response
 * @method post
 * @public
 * @implements bcryptjs : for hashing password
 */
exports.registerUser = (req, res) => {
  const data = { ...req.body };
  const user = new User(data);
  const rounds = 10;
  bcryptjs.genSalt(rounds, (err, salt) => {
    bcryptjs.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      user.save((err, doc) => {
        if (err) return res.send(err);
        res.send({ success: true, doc });
      });
    });
  });
};

exports.getUsers = (req, res) => {
  User.find({}, (err, doc) => {
    if (err) return res.send(err);
    res.send({ success: true, doc });
  });
};

exports.login = (req, res) => {
  const data = { ...req.body };

  User.findOne({ email: data.email }, (err, doc) => {
    bcryptjs.compare(data.password, doc.password, (err, isTrue) => {
      if (err) return res.send(err);
      if (isTrue) {
        res.send({ success: true, message: "Logged in successfully" });
      }
    });
  });
};
