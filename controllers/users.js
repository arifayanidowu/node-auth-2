const User = require("../models/User");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validateUser, loginValidate } = require("../config/validation");

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
  const { error } = validateUser(req.body);
  if (error) {
    return res.send(error.details[0].message);
  }

  bcryptjs.genSalt(rounds, (err, salt) => {
    bcryptjs.hash(user.password, salt, (err, hash) => {
      if (err) throw err;
      user.password = hash;
      User.findOne({ email: user.email }, (err, isExist) => {
        if (isExist) {
          return res
            .status(404)
            .send({ success: false, message: `Email already exists` });
        } else {
          if (!user.email.includes("@")) {
            return res.status(404).send(error.details[0].message);
          } else {
            user.save((err, doc) => {
              if (err) return res.send(err);
              res.send({ success: true, doc });
            });
          }
        }
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
  const { error } = loginValidate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  User.findOne({ email: data.email }, (err, doc) => {
    bcryptjs.compare(
      data.password,
      doc.password,
      (err, isExist) => {
        if (err) return res.status(400).send(err);
        if (!isExist) {
          return res
            .status(400)
            .send({ success: false, message: `Invalid email or password` });
        }
        if (doc) {
          const token = jwt.sign({ _id: doc._id }, process.env.SECRET);
          res.header("auth-token", token).send({ success: true, token });
        }
      },
      percent => {
        console.log(`Percentage completion: ${percent * 100}%`);
      }
    );
  });
};

exports.deleteUser = (req, res) => {
  User.findByIdAndDelete({ _id: req.params.id }, (err, doc) => {
    if (err) return res.send(err);
    res.send({ success: true, message: `User Deleted successfully`, doc });
  });
};

exports.index = (req, res) => {
  const token = req.header("auth-token");
  const doc = jwt.verify(token, process.env.SECRET);
  res.send({ success: true, doc });
};
