const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateUpdateUser } = require("../models/User");
const { Folder } = require("../models/Folder");
const { Note } = require("../models/Note");
const path = require("path");
const fs = require("fs");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");

/**--------------------------------------------------- 
 * @desc   Get User Profile
 * @router /api/user/profile
 * @method GET
 * @access private (only user himself)
-----------------------------------------------------*/

module.exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");

  if (!user) {
    return res.status(404).json({ msg: "User not found" });
  }
  res.json(user);
});

/**--------------------------------------------------- 
 * @desc   Update User Profile
 * @router /api/user/profile
 * @method PUT
 * @access private (only user himself)
-----------------------------------------------------*/

module.exports.updateUserProfileCtrl = asyncHandler(async (req, res) => {
  // 1- Validation
  const { error } = validateUpdateUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  // 2- Password encryption
  // if (req.body.password) {
  //   const salt = await bcrypt.genSalt(10);
  //   req.body.password = await bcrypt.hash(req.body.password, salt);
  // }
  //* 3.Update User
  const updateUser = await User.findByIdAndUpdate(
    req.user.id,
    {
      $set: {
        username: req.body.username,
        email: req.body.email,
      },
    },
    { new: true }
  ).select("-password");

  res.status(200).json(updateUser);
});

/**-----------------------------------------------
 * @desc    Profile Photo Upload
 * @route   /api/users/profile/profile-photo-upload
 * @method  POST
 * @access  private (only logged in user)
------------------------------------------------*/
module.exports.profilePhotoUploadCtrl = asyncHandler(async (req, res) => {
  // 1- Validation
  if (!req.file) {
    return res.status(400).json({ message: "no file provided" });
  }

  // 2- Get the path to the image
  const imagePath = path.join(__dirname, `../images/${req.file.filename}`);
  console.log("Uploaded file:", req.file);

  // 3- Upload to cloudinary
  const result = await cloudinaryUploadImage(imagePath);
  console.log("Cloudinary upload result:", result);

  // 4- Get the user from DB
  const user = await User.findById(req.user.id);

  // 5- Delete the old profile photo if exist
  if (user.profilePhoto?.publicId) {
    await cloudinaryRemoveImage(user.profilePhoto.publicId);
  }

  // 6- Change the profilePhoto field in the DB
  user.profilePhoto = {
    url: result.secure_url,
    publicId: result.public_id,
  };
  await user.save();

  // 7- Send Response to client
  res.status(200).json({
    message: "your profile photo uploaded successfully",
    profilePhoto: { url: result.secure_url, publicId: result.public_id },
  });

  // Remove image from the server
  fs.unlinkSync(imagePath);
});

/**--------------------------------------------------- 
 * @desc   Delete User Profile (Account)
 * @router /api/users/profile/:id
 * @method DELETE
 * @access private (only user himself)
-----------------------------------------------------*/

module.exports.deleteUserProfileCtrl = asyncHandler(async (req, res) => {
  // 1- Get the user from DB
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  // 2- Delete all folders & notes belonging to this user
  await Folder.deleteMany({ user: req.user.id });
  await Note.deleteMany({ user: req.user.id });

  // 3- Delete the profile picture from cloudinary
  await cloudinaryRemoveImage(user.profilePhoto.publicId);

  // 4- Delete the user himself
  await User.findByIdAndDelete(req.user.id);

  // 5- Send a response to the client
  res.status(200).json({ message: "your profile has been deleted" });
});
