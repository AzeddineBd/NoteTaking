import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/apiCalls/authApiCall";

export default function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-16 bg-white border-b shadow">
      <Link to="/" className="text-2xl font-bold">
        MyNotes
      </Link>

      <div className="space-x-2 md:flex">
        {user ? (
          <>
            {user?.isAdmin && (
              <Link
                to="/admin"
                className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
              >
                Admin
              </Link>
            )}
            <Link
              onClick={() => dispatch(logoutUser())}
              to="/"
              className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800"
            >
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 rounded-md border border-gray-800 hover:bg-gray-100"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
