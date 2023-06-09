const jwt = require("jsonwebtoken");
const SECTRET_KEY = "SECTRET_KEY";

const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(" ")[1];
      const user = jwt.verify(token, SECTRET_KEY);
      req.userId = user.id;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized User" });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Unauthorized User" });
  }
};
module.exports = auth;
