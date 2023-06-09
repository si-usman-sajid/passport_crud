const PassportModel = require("../models/passport");
const { ApiError } = require("../middlewares/error.middleware");
const fs = require("fs");

const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    let message;
    message = err
      ? `Failed to delete file: ${filePath}`
      : `File deleted: ${filePath}`;
    console.log(message);
  });
};

const readuserdetail = async (req, res) => {
  try {
    const passportD = await PassportModel.find({});
    console.log("User get :", passportD);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Failed to get User");
  }
};
const adduserdetail = async (req, res) => {
  const { name, fathername, gender, contact } = req.body;
  console.log({ name, fathername, gender, contact });
  try {
    let avatarUrl = null;
    avatarUrl = req.file
      ? req.body.avatar
        ? (deleteFile(req.body.avatar), req.file.path)
        : req.file.path
      : null;
    const passportDetails = await PassportModel.create({
      name,
      fathername,
      gender,
      contact,
      avatar: avatarUrl,
      userid: req.userId,
    });

    console.log("Passport User Details added:", passportDetails);

    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Failed to add user details");
  }
};
const deleteuserdetail = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteuser = await PassportModel.deleteOne({ _id: id });
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Failed to delete Passport User");
  }
};
const updateuserdetail = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, fathername, gender, contact } = req.body;
    const updatedUser = await BookModel.findByIdAndUpdate(
      id,
      { name, fathername, gender, contact },
      { new: true }
    );
    console.log("Passport User updated", updatedUser);
  } catch (error) {
    throw new ApiError(500, "Failed to update Passport User");
  }
};

module.exports = {
  adduserdetail,
  deleteuserdetail,
  updateuserdetail,
  readuserdetail,
};
