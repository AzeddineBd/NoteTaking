import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserHimselfApi,
  getUserProfile,
  updateUserProfile,
  uploadProfilePhoto,
} from "../redux/apiCalls/profileApiCall";
import { CiCamera } from "react-icons/ci";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { profile } = useSelector((state) => state.profile);

  const [file, setFile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username,
        email: profile.email,
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData));
    setIsEditing(false);
  };

  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("there is no file!");

    const formData = new FormData();
    formData.append("image", file);
    dispatch(uploadProfilePhoto(formData));
  };

  // Delete Function
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUserHimselfApi(id)).then(() => {
        navigate("/");
      });
    }
  };

  return (
    <div className="p-6 h-screen bg-gray-50 flex justify-center items-start sm:items-center">
      <div className="bg-white text-black rounded-xl shadow-lg p-6 w-full max-w-3xl flex flex-col md:flex-row gap-6">
        {/* Image */}
        <div className="flex flex-col items-center md:items-start md:w-1/3">
          <div className="relative w-32 h-32 mb-4">
            <img
              src={file ? URL.createObjectURL(file) : profile?.profilePhoto.url}
              alt=""
              className="w-32 h-32 rounded-full object-cover border-2 border-gray-300"
            />

            <abbr title="choose profile photo">
              <label
                htmlFor="file"
                className="absolute -bottom-2 -right-1 transform -translate-x-1/2 bg-white p-2 rounded-full shadow cursor-pointer border-2 "
              >
                <CiCamera className="w-5 h-5 text-gray-700" />
              </label>
            </abbr>
          </div>
          <form onSubmit={formSubmitHandler}>
            <input
              type="file"
              name="file"
              id="file"
              className="hidden"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button
              type="submit"
              className={`text-sm px-3 py-1 rounded-md border transition ${
                file
                  ? "border-gray-300 hover:bg-gray-100 cursor-pointer"
                  : "bg-gray-200 cursor-not-allowed"
              }`}
            >
              Upload
            </button>
          </form>
        </div>

        {/* Data */}
        <div className="flex-1 flex flex-col justify-between">
          {isEditing ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Name"
                className="border border-gray-300 rounded p-2 bg-white text-black placeholder-gray-400"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="border border-gray-300 rounded p-2 bg-white text-black placeholder-gray-400"
              />

              <div className="flex justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col gap-2">
              <h2 className="text-2xl font-semibold">{formData.username}</h2>
              <p className="text-gray-600">{formData?.email}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition"
              >
                Edit Profile
              </button>

              <button
                onClick={() => deleteHandler(profile?._id)}
                className="mt-4 px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition"
              >
                Delete Profile
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
