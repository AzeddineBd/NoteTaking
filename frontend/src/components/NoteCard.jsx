import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AddNoteModal from "./AddNoteModal";
import { deleteNote } from "../redux/apiCalls/notesApiCall";

export default function NoteCard({ title, content, date, id }) {
  const dispatch = useDispatch();
  const { notes } = useSelector((state) => state.notes);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const noteData = { _id: id, title, content, date };

  // Delete Folder
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this folder?")) {
      dispatch(deleteNote(id));
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border p-4 flex flex-col justify-between hover:shadow-md transition">
        {/* Title */}
        <h3 className="font-semibold text-lg mb-2">{title}</h3>

        {/* Content preview */}
        <p className="text-gray-600 text-sm flex-1">
          {content.length > 100 ? content.slice(0, 100) + "..." : content}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between mt-4 text-sm text-gray-500">
          <span>{date}</span>
          <div className="space-x-2">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-2 py-1 rounded-md bg-gray-100 hover:bg-gray-200"
            >
              Edit
            </button>
            <button
              onClick={() => deleteHandler(id)}
              className="px-2 py-1 rounded-md bg-red-100 text-red-600 hover:bg-red-200"
            >
              Delete
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <AddNoteModal
          onClose={() => setIsModalOpen(false)}
          noteToEdit={noteData}
        />
      )}
    </>
  );
}
