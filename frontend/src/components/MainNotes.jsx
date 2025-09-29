import NoteCard from "../components/NoteCard";
import NotesHeader from "./NotesHeader";
import { useSelector } from "react-redux";

const MainNotes = () => {
  const { notes } = useSelector((state) => state.notes);
  const { activeFolderId } = useSelector((state) => state.folder);

  return (
    <main
      className={` 
          ${
            notes.length > 0
              ? "flex-1 p-6 overflow-y-auto"
              : "flex-1 p-6 flex items-center justify-center"
          }
          `}
    >
      {!activeFolderId ? (
        <p className="text-center text-gray-500 mb-6">
          ⚠️ Please select a folder first!
        </p>
      ) : notes.length > 0 ? (
        <>
          <h1 className="text-2xl font-bold mb-6">My Notes</h1>
          <NotesHeader />
        </>
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-6">+Add Note</h1>
          <NotesHeader />
        </>
      )}

      {/* Grid of Notes */}
      {activeFolderId && notes.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              id={note._id}
              title={note.title}
              content={note.content}
              date={note.date}
              folderId={note.folder?._id}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default MainNotes;
