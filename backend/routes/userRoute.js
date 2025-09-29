const router = require("express").Router();
const { getUserProfile } = require("../controllers/authController");
const {
  updateUserProfileCtrl,
  profilePhotoUploadCtrl,
  deleteUserProfileCtrl,
} = require("../controllers/userController");
const photoUpload = require("../middlewares/photoUpload");
const { verifyToken } = require("../middlewares/verifyToken");

// /api/user/profile
router
  .route("/profile")
  .get(verifyToken, getUserProfile)
  .put(verifyToken, updateUserProfileCtrl)
  .delete(verifyToken, deleteUserProfileCtrl);

// api/user/profile/profile-photo-upload
router
  .route("/profile/profile-photo-upload")
  .post(verifyToken, photoUpload.single("image"), profilePhotoUploadCtrl);

module.exports = router;
