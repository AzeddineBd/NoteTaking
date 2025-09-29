import request from "../../utils/request";
import { toast } from "react-toastify";
import { profileActions } from "../slices/profileSlice";
import { authActions } from "../slices/authSlice";

// Get User
export function getUserProfile() {
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

      // 2- API Call (GET)
      const { data } = await request.get("/api/user/profile", config);

      // 3- Save to Redux
      dispatch(profileActions.setProfile(data));
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
}

// Upload Profile Photo
export function uploadProfilePhoto(formData) {
  return async (dispatch, getstate) => {
    try {
      const {
        auth: { user },
      } = getstate();

      const config = {
        headers: {
          Authorization: `Bearer ${user?.token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await request.post(
        "/api/user/profile/profile-photo-upload",
        formData,
        config
      );
      dispatch(profileActions.setProfilePhoto(data.profilePhoto));

      toast.success("Photo uploaded successfully");
    } catch (error) {
      console.error("Upload error:", error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
}

// Get Users Count (for admin dashboard)
export function getUsersCount() {
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

      // 2- API Call (GET)
      const { data } = await request.get("/api/admin/count", config);

      // 3- Save to Redux
      dispatch(profileActions.setUserCount(data));
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
}

// Get Users Count (for admin dashboard)
export function getUsers() {
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

      // 2- API Call (GET)
      const { data } = await request.get("/api/admin/users", config);

      // 3- Save to Redux
      dispatch(profileActions.setUsers(data));
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
}

// Delete Profile (Account) For Admin
export function deleteUserApi(userId) {
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

      // 2- API Call (GET)
      const { data } = await request.delete(
        `/api/admin/users/${userId}`,
        config
      );

      // Delete
      dispatch(profileActions.deleteUser(userId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
}

// Delete Profile (Account) User Himself
export function deleteUserHimselfApi() {
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

      const { data } = await request.delete("/api/user/profile", config);

      // Delete
      dispatch(profileActions.deleteUser());

      // Clear auth state + localStorage
      dispatch(authActions.logout());
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
}

// Update Profile
export function updateUserProfile(profileData) {
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

      const { data } = await request.put(
        "/api/user/profile",
        profileData,
        config
      );

      dispatch(profileActions.profileUpdated(data));
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };
}
