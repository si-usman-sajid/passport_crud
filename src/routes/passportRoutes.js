const express = require("express");
const {
  readuserdetail,
  adduserdetail,
  updateuserdetail,
  deleteuserdetail,
} = require("../controllers/passportController");
const auth = require("../middlewares/auth");
const images = require("../middlewares/upload");
const passportRouter = express.Router();

passportRouter.get("/", readuserdetail);
passportRouter.post("/", auth, images.single("avatar"), adduserdetail);
passportRouter.put("/:id", auth, updateuserdetail);
passportRouter.delete("/:id", auth, deleteuserdetail);

module.exports = passportRouter;
