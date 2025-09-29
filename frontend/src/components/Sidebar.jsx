import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../redux/apiCalls/profileApiCall";
import { folderActions } from "../redux/slices/folderSlice";
import {
  createFolder,
  deleteFolder,
  getFolders,
  updateFolder,
} from "../redux/apiCalls/folderApiCall";
import { getNotesByFolder } from "../redux/apiCalls/notesApiCall";
import { toast } from "react-toastify";
import { MdOutlineDelete, MdEdit, MdClose } from "react-icons/md";
import { IoCheckmarkSharp } from "react-icons/io5";

export default function Sidebar() {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);
  const { folder, activeFolderId } = useSelector((state) => state.folder);

  // const [activeFolder, setActiveFolder] = useState(null);
  const [folderName, setFolderName] = useState("");
  const [editId, setEditId] = useState(null);
  const [newName, setNewName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  // Get User & Folder
  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getFolders());
  }, [dispatch]);

  // Get Notes By Folder & Active Folder
  const handleFolderClick = (folderId) => {
    // setActiveFolder(folderId);
    dispatch(folderActions.setActiveFolder(folderId));
    dispatch(getNotesByFolder(folderId));
    setIsOpen(false);
  };

  // Create Folder
  const addFolderHandler = (e) => {
    e.preventDefault();
    if (!folderName) return toast.error("Please enter folder name");
    dispatch(createFolder({ name: folderName }));
    setFolderName("");
  };

  // Delete Folder
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this folder?")) {
      dispatch(deleteFolder(id));
    }
  };

  // Edit Folder Name
  const editHandler = (folder) => {
    setEditId(folder._id);
    setNewName(folder.name);
  };

  const saveHandler = (id) => {
    if (!newName) return alert("Folder name cannot be empty");
    dispatch(updateFolder(id, { name: newName }));
    setEditId(null);
    setNewName("");
  };

  return (
    <>
      {/* Mobile Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden p-2 m-2 border rounded cursor-pointer"
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-16 left-0 h-[calc(100vh-4rem)] w-72 bg-white border-r p-4 flex flex-col transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsOpen(false)}
          className="md:hidden absolute top-4 right-4 text-xl cursor-pointer"
        >
          <MdClose />
        </button>

        {/* Profile */}
        <Link to={"/profile"} className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-gray-300 overflow-hidden">
            <img
              src={profile?.profilePhoto.url}
              alt={profile?.username}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-semibold">{profile?.username}</p>
            <p className="text-sm text-gray-500">{profile?.email}</p>
          </div>
        </Link>

        {/* Folders */}
        <div className="flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {folder?.map((f) => (
              <li
                key={f._id}
                className={`px-3 py-2 rounded-md cursor-pointer flex items-center justify-between hover:bg-gray-200 ${
                  activeFolderId === f._id ? "bg-gray-300" : "bg-gray-100"
                }`}
              >
                {editId === f._id ? (
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="border p-1 rounded w-full pr-10"
                      autoFocus
                    />
                    <IoCheckmarkSharp
                      onClick={() => saveHandler(f._id)}
                      className="absolute right-7 top-1/2 -translate-y-1/2 text-green-600 cursor-pointer"
                    />
                    <MdClose
                      onClick={() => setEditId(null)}
                      className="absolute right-1 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
                    />
                  </div>
                ) : (
                  <>
                    <span
                      onClick={() => handleFolderClick(f._id)}
                      className="flex-1"
                    >
                      {f.name}
                    </span>
                    <div className="flex items-center space-x-2">
                      <MdEdit
                        onClick={() => editHandler(f)}
                        className="hover:scale-120"
                      />
                      <MdOutlineDelete
                        onClick={() => deleteHandler(f._id)}
                        className="hover:scale-120"
                      />
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* New Folder Button */}
        <form onSubmit={addFolderHandler} className="flex flex-col gap-2 mt-4">
          <input
            type="text"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            placeholder="New Folder"
            className="border rounded p-2 flex-1"
          />
          <button
            type="submit"
            className="px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-100"
          >
            + New Folder
          </button>
        </form>
      </aside>
    </>
  );
}
