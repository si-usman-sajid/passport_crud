const express = require("express");
const app = express();
const port = 5000;

const userRouter = require("./routes/userRoutes");
const passportRouter = require("./routes/passportRoutes");

app.use(express.json());
// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

// Mongoose conntected:
const mongoose = require("mongoose");
const { ApiError } = require("./middlewares/error.middleware");
mongoose.connect("mongodb://localhost:27017/passport_db").then((err, db) => {
  console.log("DB Connected");
});

// Routes of CRUD
app.use("/users", userRouter);
app.use("/passport", passportRouter);
app.use("/images", express.static("images"));

// API's error middleware
app.get("/", (req, res) => {
  console.log("Hi");
  throw new ApiError(500, "Bad Requet");
});

app.use((error, req, res, next) => {
  console.log("In error middleWare", error.statusCode, error.message);
  res.json({
    status: error.statusCode,
    message: error.message,
  });
});

app.listen(port, () => {
  console.log(`App listening on ${port}`);
});
