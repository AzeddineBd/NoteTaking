import { createSlice } from "@reduxjs/toolkit";

const folderSlice = createSlice({
  name: "folder",
  initialState: {
    folder: [],
    activeFolderId: null,
  },
  reducers: {
    setFolder(state, action) {
      state.folder = action.payload;
    },
    setActiveFolder(state, action) {
      state.activeFolderId = action.payload;
    },
    folderCreated(state, action) {
      state.folder.push(action.payload);
    },
    folderDeleted(state, action) {
      state.folder = state.folder.filter((f) => f._id !== action.payload);
    },
    folderUpdated(state, action) {
      state.folder = state.folder.map((f) =>
        f._id === action.payload._id ? action.payload : f
      );
    },
  },
});

const folderReducer = folderSlice.reducer;
const folderActions = folderSlice.actions;

export { folderActions, folderReducer };
