const router = require("express").Router();
const {
  getAllUsersCtrl,
  getUserCtrl,
  getUsersCountCtrl,
  adminDeleteUserCtrl,
} = require("../controllers/adminController");
const { verifyTokenAndAdmin } = require("../middlewares/verifyToken");

// /api/admin/users
router.route("/users").get(verifyTokenAndAdmin, getAllUsersCtrl);

// /api/admin/users/:id
router
  .route("/users/:id")
  .get(verifyTokenAndAdmin, getUserCtrl)
  .delete(verifyTokenAndAdmin, adminDeleteUserCtrl);

// /api/admin/count
router.route("/count").get(verifyTokenAndAdmin, getUsersCountCtrl);

module.exports = router;
