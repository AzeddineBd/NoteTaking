import { createSlice } from "@reduxjs/toolkit";

const profileSlice = createSlice({
  name: "profile",
  initialState: {
    profile: null,
    users: [],
    usersCount: null,
  },
  reducers: {
    setProfile(state, action) {
      state.profile = action.payload;
    },
    setProfilePhoto(state, action) {
      state.profile.profilePhoto = action.payload;
    },
    setUserCount(state, action) {
      state.usersCount = action.payload;
    },
    setUsers(state, action) {
      state.users = action.payload;
    },
    deleteUser(state, action) {
      state.users = state.users.filter((u) => u._id !== action.payload);
    },
    profileUpdated(state, action) {
      state.profile = action.payload;
    },
  },
});

const profileReducer = profileSlice.reducer;
const profileActions = profileSlice.actions;

export { profileActions, profileReducer };
