import { useSelector, useDispatch } from "react-redux";
import { deleteUserApi } from "../../redux/apiCalls/profileApiCall";

export default function UsersTable() {
  const { users } = useSelector((state) => state.profile);
  const dispatch = useDispatch();

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      dispatch(deleteUserApi(id));
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">All Users</h2>

      {/* Table For Large screen */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Username</th>
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr
                key={user?._id}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="border px-4 py-2">{user?._id}</td>
                <td className="border px-4 py-2">{user?.username}</td>
                <td className="border px-4 py-2">{user?.email}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    onClick={() => deleteHandler(user?._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Table For Small screen */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {users?.map((user) => (
          <div
            key={user?._id}
            className="border rounded-lg p-4 shadow-sm bg-gray-50"
          >
            <p className="text-sm text-gray-500">
              <span className="font-semibold">ID:</span> {user?._id}
            </p>
            <p className="mt-2">
              <span className="font-semibold">Username:</span> {user?.username}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user?.email}
            </p>
            <div className="mt-3 text-right">
              <button
                onClick={() => deleteHandler(user?._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
