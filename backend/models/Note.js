const mongoose = require("mongoose");
const Joi = require("joi");

const NoteSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String },
    folder: { type: mongoose.Schema.Types.ObjectId, ref: "Folder" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Note Model
const Note = mongoose.model("Note", NoteSchema);

// Validate Create Note
function validateCreateNote(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().required(),
    content: Joi.string().trim().required(),
  });
  return schema.validate(obj);
}

module.exports = { Note, validateCreateNote };
