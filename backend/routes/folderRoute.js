const router = require("express").Router();
const { verifyToken } = require("../middlewares/verifyToken");
const {
  createFolderCtrl,
  getAllFoldersCtrl,
  getSingleFolderCtrl,
  updateFolderCtrl,
  deleteFolderCtrl,
} = require("../controllers/folderController");
const {
  getNotesInFolderCtrl,
  createNoteCtrl,
} = require("../controllers/noteController");

// api/folders
router
  .route("/folders")
  .post(verifyToken, createFolderCtrl)
  .get(verifyToken, getAllFoldersCtrl);

// api/folders/:id
router
  .route("/folders/:id")
  .get(verifyToken, getSingleFolderCtrl)
  .put(verifyToken, updateFolderCtrl)
  .delete(verifyToken, deleteFolderCtrl);

// api/folders/:folderId/notes
router
  .route("/folders/:folderId/notes")
  .post(verifyToken, createNoteCtrl)
  .get(verifyToken, getNotesInFolderCtrl);

module.exports = router;
