const {
  getSingleNoteCtrl,
  updateNoteCtrl,
  deleteNoteCtrl,
} = require("../controllers/noteController");
const { verifyToken } = require("../middlewares/verifyToken");

const router = require("express").Router();

// api/notes/:id
router
  .route("/notes/:id")
  .get(verifyToken, getSingleNoteCtrl)
  .put(verifyToken, updateNoteCtrl)
  .delete(verifyToken, deleteNoteCtrl);

module.exports = router;
