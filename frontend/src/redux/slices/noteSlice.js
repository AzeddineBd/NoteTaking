import { createSlice } from "@reduxjs/toolkit";

const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
  },
  reducers: {
    setNotes(state, action) {
      state.notes = action.payload;
    },
    addNote(state, action) {
      state.notes.push(action.payload);
    },
    noteDeleted(state, action) {
      state.notes = state.notes.filter((n) => n._id !== action.payload);
    },
    noteUpdated(state, action) {
      state.notes = state.notes.map((n) =>
        n._id === action.payload._id ? action.payload : n
      );
    },
  },
});

const notesReducer = notesSlice.reducer;
const notesActions = notesSlice.actions;

export { notesReducer, notesActions };
