import { authActions } from "../slices/authSlice";
import request from "../../utils/request";
import { toast } from "react-toastify";

// Login User
export function loginUser(user) {
  return async (dispatch) => {
    try {
      // With Axios:
      const { data } = await request.post("/api/auth/login", user);

      dispatch(authActions.login(data));
      // Storage on browser
      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
}
// Logout User
export function logoutUser() {
  return (dispatch) => {
    dispatch(authActions.logout());
  };
}

// Login User
export function registerUser(user) {
  return async (dispatch) => {
    try {
      // With Axios:
      const { data } = await request.post("/api/auth/register", user);

      dispatch(authActions.register(data.message));
      console.log(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };
}
