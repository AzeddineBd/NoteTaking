const asyncHandler = require("express-async-handler");
const {
  Folder,
  validateCreateFolder,
  validateUpdateFolder,
} = require("../models/Folder");
const { Note } = require("../models/Note");

/**-----------------------------------------------
 * @desc    Create Folder
 * @route   /api/folders
 * @method  POST
 * @access  private
------------------------------------------------*/

module.exports.createFolderCtrl = asyncHandler(async (req, res) => {
  // 1- Validation
  const { error } = validateCreateFolder(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // 2- Create new folder and save it to DB
  const folder = await Folder.create({
    name: req.body.name,
    user: req.user.id,
  });

  // 5- Send response to the client
  res.status(201).json(folder);
});

/**-----------------------------------------------
 * @desc    Get All Folders
 * @route   /api/folders
 * @method  GET
 * @access  private
------------------------------------------------*/

module.exports.getAllFoldersCtrl = asyncHandler(async (req, res) => {
  const folders = await Folder.find({ user: req.user.id }).sort({
    createdAt: -1,
  });
  res.json(folders);
});

/**-----------------------------------------------
 * @desc    Get Single Folder
 * @route   /api/folders/:id
 * @method  GET
 * @access  private
------------------------------------------------*/

module.exports.getSingleFolderCtrl = asyncHandler(async (req, res) => {
  const folder = await Folder.findById({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!folder) {
    res.status(404).json({ message: "Folder not found" });
  }

  res.status(200).json(folder);
});

/**-----------------------------------------------
 * @desc    Update Folder
 * @route   /api/folders/:id
 * @method  PUT
 * @access  private
------------------------------------------------*/

module.exports.updateFolderCtrl = asyncHandler(async (req, res) => {
  // 1- Validation
  const { error } = validateUpdateFolder(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // 2- Update Folder (with ownership check)
  const updatedFolder = await Folder.findOneAndUpdate(
    { _id: req.params.id, user: req.user.id },
    { $set: { name: req.body.name } },
    { new: true }
  );

  // 3- If not found
  if (!updatedFolder) {
    return res
      .status(404)
      .json({ message: "Folder not found or not authorized" });
  }

  // 4- Send response
  res.status(200).json(updatedFolder);
});

/**-----------------------------------------------
 * @desc    Delete Folder
 * @route   /api/folders/:id
 * @method  DELETE
 * @access  private
------------------------------------------------*/

module.exports.deleteFolderCtrl = asyncHandler(async (req, res) => {
  const deletedFolder = await Folder.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!deletedFolder) {
    return res
      .status(404)
      .json({ message: "Folder not found or not authorized" });
  }

  await Note.deleteMany({ folder: req.params.id, user: req.user.id });

  res.status(200).json({
    message: "Folder deleted successfully",
    folder: deletedFolder,
  });
});
