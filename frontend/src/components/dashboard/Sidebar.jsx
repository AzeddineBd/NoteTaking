import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaUsers } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserProfile,
  getUsers,
  getUsersCount,
} from "../../redux/apiCalls/profileApiCall";

export default function Sidebar({ setActiveTab }) {
  const dispatch = useDispatch();
  const { profile } = useSelector((state) => state.profile);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(getUserProfile());
    dispatch(getUsersCount());
    dispatch(getUsers());
  }, [dispatch]);

  const closesidebar = (name) => {
    setActiveTab(name);
    setIsOpen(false);
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

      <aside
        className={`fixed md:static top-16 left-0 h-[calc(100vh-4rem)] w-72 bg-white border-r p-4 flex flex-col transform transition-transform duration-300 z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        md:translate-x-0`}
      >
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
              src={profile?.profilePhoto?.url}
              alt={profile?.username}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="font-semibold">{profile?.username}</p>
            <p className="text-sm text-gray-500">{profile?.email}</p>
          </div>
        </Link>

        {/* Menu Items */}
        <div className="flex-1 overflow-y-auto">
          <ul className="space-y-2">
            <li
              onClick={() => closesidebar("dashboard")}
              className="px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer flex items-center gap-2"
            >
              <FaHome /> Dashboard
            </li>
            <li
              onClick={() => closesidebar("users")}
              className="px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer flex items-center gap-2"
            >
              <FaUsers /> Users
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
