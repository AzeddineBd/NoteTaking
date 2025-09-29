import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/authSlice";
import { profileReducer } from "./slices/profileSlice";
import { folderReducer } from "./slices/folderSlice";
import { notesReducer } from "./slices/noteSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    profile: profileReducer,
    folder: folderReducer,
    notes: notesReducer,
  },
});

export default store;
