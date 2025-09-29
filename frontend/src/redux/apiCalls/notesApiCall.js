import { toast } from "react-toastify";
import request from "../../utils/request";
import { notesActions } from "../slices/noteSlice";

// Get Notes by Folder
export function getNotesByFolder(folderId) {
  return async (dispatch, getState) => {
    try {
      const {
        auth: { user },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`, // JWT Token
        },
      };

      const { data } = await request.get(
        `/api/folders/${folderId}/notes`,
        config
      );

      dispatch(notesActions.setNotes(data));
    } catch (error) {
      console.error("Notes Fetch Error:", error.response || error);
      toast.error(error.response?.data?.message || "Failed to fetch notes");
    }
  };
}

// Create Note
export function createNote(folderId, noteData) {
  return async (dispatch, getState) => {
    try {
      const {
        auth: { user },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "application/json",
        },
      };
      // Request
      const { data } = await request.post(
        `/api/folders/${folderId}/notes`,
        noteData,
        config
      );

      dispatch(notesActions.addNote(data));
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
}

// Delete Note
export function deleteNote(noteId) {
  return async (dispatch, getState) => {
    try {
      const {
        auth: { user },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      // Request
      const { data } = await request.delete(`api/notes/${noteId}`, config);

      dispatch(notesActions.noteDeleted(noteId));
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
}

// Update Note
export function updateNote(noteId, noteData) {
  return async (dispatch, getState) => {
    try {
      const {
        auth: { user },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      };
      // Request
      const { data } = await request.put(
        `/api/notes/${noteId}`,
        noteData,
        config
      );
      dispatch(notesActions.noteUpdated(data));
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
}
