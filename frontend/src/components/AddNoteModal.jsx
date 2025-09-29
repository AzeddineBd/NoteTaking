import { IoCloseOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { createNote, updateNote } from "../redux/apiCalls/notesApiCall";

export default function AddNoteModal({ onClose, noteToEdit }) {
  const dispatch = useDispatch();
  const { activeFolderId } = useSelector((state) => state.folder);
  const { notes } = useSelector((state) => state.notes);

  const [title, setTitle] = useState(noteToEdit?.title || "");
  const [content, setContent] = useState(noteToEdit?.content || "");

  const submitHandler = (e) => {
    e.preventDefault();

    if (noteToEdit) {
      // Update Note
      dispatch(updateNote(noteToEdit._id, { title, content }));
    } else {
      if (!activeFolderId) {
        alert("⚠️ Please select a folder first!");
        return;
      }

      // Create Note
      dispatch(createNote(activeFolderId, { title, content }));
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white text-black rounded-xl p-6 w-96 relative shadow-lg border-2">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-black hover:text-gray-500"
        >
          <IoCloseOutline />
        </button>

        <h2 className="text-xl font-semibold mb-4">
          {noteToEdit ? "Edit Note" : "Add New Note"}
        </h2>

        <form onSubmit={submitHandler} className="flex flex-col gap-3">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 p-2 rounded bg-white text-black placeholder-gray-400"
          />
          <textarea
            placeholder="Description"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border border-gray-300 p-2 rounded bg-white text-black placeholder-gray-400"
            rows={4}
          />
          <button
            type="submit"
            className="bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            {noteToEdit ? "Update Note" : "Save Note"}
          </button>
        </form>
      </div>
    </div>
  );
}
