import request from "../../utils/request";
import { toast } from "react-toastify";
import { folderActions } from "../slices/folderSlice";

// Get Folders
export function getFolders() {
  return async (dispatch, getState) => {
    try {
      // 1- Get token from redux or localStorage
      const {
        auth: { user },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`, // JWT Token
        },
      };
      const { data } = await request.get("/api/folders", config);
      dispatch(folderActions.setFolder(data));
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
}

// Create Folder
export function createFolder(folderData) {
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
      const { data } = await request.post("/api/folders", folderData, config);

      dispatch(folderActions.folderCreated(data));
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
}

// Delete Folder
export function deleteFolder(folderId) {
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
      const { data } = await request.delete(`/api/folders/${folderId}`, config);

      dispatch(folderActions.folderDeleted(folderId));
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
}

// Update Folder
export function updateFolder(folderId, folderData) {
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
        `/api/folders/${folderId}`,
        folderData,
        config
      );
      console.log(data);
      dispatch(folderActions.folderUpdated(data));
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
}
