const asyncHandler = require("express-async-handler");
const {
  Note,
  validateCreateNote,
  validateUpdateNote,
} = require("../models/Note");
const { Folder } = require("../models/Folder");

/**-----------------------------------------------
 * @desc    Create Note
 * @route   api/folders/:folderId/notes
 * @method  POST
 * @access  private
------------------------------------------------*/
module.exports.createNoteCtrl = asyncHandler(async (req, res) => {
  // 1- Validation
  const { error } = validateCreateNote(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { title, content } = req.body;
  const { folderId } = req.params;

  // 2- Make sure the folder exists and belongs to the same user.
  const folder = await Folder.findOne({ _id: folderId, user: req.user.id });
  if (!folder) {
    return res.status(404).json({ message: "Folder not found or not yours" });
  }

  // 3- Create Note
  const note = await Note.create({
    title,
    content,
    folder: folderId,
    user: req.user.id,
  });

  res.status(201).json(note);
});

/**-----------------------------------------------
 * @desc    Get Notes in Folder
 * @route   api/folders/:folderId/notes
 * @method  GET
 * @access  private
------------------------------------------------*/
module.exports.getNotesInFolderCtrl = asyncHandler(async (req, res) => {
  const notes = await Note.find({
    folder: req.params.folderId,
    user: req.user.id,
  }).populate("folder", "name");

  res.status(200).json(notes);
});

/**-----------------------------------------------
 * @desc    Get Single Notes
 * @route   /api/notes/:id
 * @method  GET
 * @access  private
------------------------------------------------*/

module.exports.getSingleNoteCtrl = asyncHandler(async (req, res) => {
  const note = await Note.findOne({
    _id: req.params.id,
    user: req.user.id,
  }).populate("folder", "name");

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  res.status(200).json(note);
});

/**-----------------------------------------------
 * @desc    Update Note
 * @route   PUT /api/notes/:id
 * @method  PUT
 * @access  private (only owner)
------------------------------------------------*/

module.exports.updateNoteCtrl = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  // 1- Make sure note is exist
  const note = await Note.findOne({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  // 2- Update Note
  note.title = title || note.title;
  note.content = content || note.content;

  const updatedNote = await note.save();

  // 3- Response
  res.status(200).json(updatedNote);
});

/**-----------------------------------------------
 * @desc    Delete Note
 * @route   DELETE /api/notes/:id
 * @method  DELETE
 * @access  private (only owner)
------------------------------------------------*/
module.exports.deleteNoteCtrl = asyncHandler(async (req, res) => {
  const note = await Note.findOneAndDelete({
    _id: req.params.id,
    user: req.user.id,
  });

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  res.status(200).json({ message: "Note has been deleted" });
});
