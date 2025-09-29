const asyncHandler = require("express-async-handler");
const { User } = require("../models/User");
const { Folder } = require("../models/Folder");
const { Note } = require("../models/Note");

/**--------------------------------------------------- 
 * @desc   Get All Users Profile
 * @router /api/admin/users
 * @method GET
 * @access private (only admin)
-----------------------------------------------------*/
module.exports.getAllUsersCtrl = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");
  res.status(200).json(users);
});

/**--------------------------------------------------- 
 * @desc   Get User Profile By ID
 * @router /api/admin/users/:id
 * @method GET
 * @access private (only admin)
-----------------------------------------------------*/
module.exports.getUserCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  res.status(200).json(user);
});

/**--------------------------------------------------- 
 * @desc   Delete User Profile (Account)
 * @router /api/admin/users/:id
 * @method DELETE
 * @access private (only admin himself)
-----------------------------------------------------*/

// Admin delete any user by ID
module.exports.adminDeleteUserCtrl = asyncHandler(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }

  // Delete Profile Photo From Cloudinary
  if (user.profilePhoto?.publicId) {
    await cloudinaryRemoveImage(user.profilePhoto.publicId);
  }

  // Delete all folders & notes belonging to this user
  await Folder.deleteMany({ user: req.user.id });
  await Note.deleteMany({ user: req.user.id });

  // Delete User
  await User.findByIdAndDelete(userId);

  res.status(200).json({ message: "user has been deleted by admin" });
});

/**-----------------------------------------------
 * @desc    Get Users Count
 * @route   /api/users/count
 * @method  GET
 * @access  private (only admin)
------------------------------------------------*/
module.exports.getUsersCountCtrl = asyncHandler(async (req, res) => {
  const count = await User.countDocuments();
  res.status(200).json(count);
});

// TODO GET /api/admin/users/:id → يرجع مستخدم معين.
