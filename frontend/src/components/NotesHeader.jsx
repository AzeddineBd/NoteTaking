import { useState } from "react";
import AddNoteModal from "./AddNoteModal";

export default function NotesHeader() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 bg-black text-white w-14 h-14 rounded-full text-2xl flex justify-center items-center shadow-lg hover:bg-gray-800 transition"
      >
        +
      </button>

      {isModalOpen && <AddNoteModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
