const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const shortId = require("shortid");

exports.signup = (req, res) => {
  console.log("SIGN UP PROCESS ====>>>>>");
  User.findOne({ email: req.body.email }, async (error, user) => {
    if (user)
      return res.status(400).json({
        message: "Admin Already registered!",
      });
    const { firstName, lastName, email, password } = req.body;
    const has_password = await bcrypt.hash(password, 10);
    const newUser = new User({
      firstName,
      lastName,
      email,
      has_password,
      userName: shortId.generate(),
      role: "admin",
    });
    newUser.save((error, data) => {
      console.log("error", error);
      if (error) {
        return res.status(400).json({
          message: "Something went wrong",
        });
      }
      if (data) {
        return res.status(201).json({
          message: "Admin created Successfully ...!",
        });
      }
    });
  });
};
exports.signin = (req, res) => {
  console.log("SIGN IN PROCESS ====>>>>>");
  User.findOne({ email: req.body.email }).exec((error, user) => {
    if (error) return res.status(400).json({ error });
    if (user) {
      if (user.authenticate(req.body.password) && user.role === "admin") {
        const token = jwt.sign(
          { _id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "1w" }
        );
        const { _id, firstName, lastName, email, role, fullName } = user;
        res.cookie("token", token, { expiresIn: "1w" });
        res.status(200).json({
          token,
          user: {
            _id,
            firstName,
            lastName,
            email,
            role,
            fullName,
          },
        });
      } else {
        return res.status(400).json({ message: "Invalid Password" });
      }
    } else {
      return res.status(400).json({ message: "Something went wrong" });
    }
  });
};
exports.signout = (req, res) => {
  res.clearCookie("token", { path: "/" });
  res.status(200).json({
    message: "Signout successfully ...!",
  });
};
