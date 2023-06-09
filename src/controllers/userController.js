const UserModel = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const SECTRET_KEY = "SECTRET_KEY";

const signup = async (req, res) => {
  // Existing User Check
  const { username, email, password } = req.body;
  try {
    const existningUser = await UserModel.findOne({ email: email });
    if (existningUser === true) {
      return res.status(200).json({ message: "User Already Exist" });
    }

    // Hash Password
    const hashpassword = await bcrypt.hash(password, 10);

    // User creation
    const result = await UserModel.create({
      email: email,
      password: hashpassword,
      username: username,
    });

    // Token Generation
    const Token = jwt.sign(
      { email: result.email, id: result._id },
      SECTRET_KEY
    );

    //sending response
    res.status(201).json({ user: result, token: Token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};
const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existningUser = await UserModel.findOne({ email: email });
    if (!existningUser === true) {
      return res.status(200).json({ message: "User not found" });
    }

    const matchpassword = await bcrypt.compare(
      password,
      existningUser.password
    );
    if (!matchpassword) {
      return res.status(404).json({ message: "Inavlid Password" });
    }
    const Token = jwt.sign(
      { email: existningUser.email, id: existningUser._id },
      SECTRET_KEY
    );

    res.status(201).json({ user: existningUser, token: Token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err });
  }
};

module.exports = { signup, signin };
