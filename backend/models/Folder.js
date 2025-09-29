const mongoose = require("mongoose");
const Joi = require("joi");

const FolderSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Folder Model
const Folder = mongoose.model("Folder", FolderSchema);

// Validate Create Folder
function validateCreateFolder(obj) {
  const schema = Joi.object({
    name: Joi.string().trim().required(),
  });
  return schema.validate(obj);
}

// Validate Update Folder
function validateUpdateFolder(obj) {
  const schema = Joi.object({
    name: Joi.string().trim(),
  });
  return schema.validate(obj);
}

module.exports = {
  Folder,
  validateCreateFolder,
  validateUpdateFolder,
};
