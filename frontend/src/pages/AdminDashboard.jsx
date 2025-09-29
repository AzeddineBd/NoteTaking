import { useState } from "react";
import { useSelector } from "react-redux";
import { FaUsers } from "react-icons/fa";
import {
  Sidebar,
  StatCard,
  UsersTable,
  NotesTable,
  FoldersTable,
} from "../components/dashboard";

export default function Dashboard() {
  const { usersCount } = useSelector((state) => state.profile);
  const [activeTab, setActiveTab] = useState("dashboard");

  const stats = [
    { id: 1, label: "Total Users", value: usersCount, icon: <FaUsers /> },
  ];

  return (
    <div className="flex min-h-screen bg-gray-50 text-black">
      {/* Sidebar */}
      <Sidebar setActiveTab={setActiveTab} />

      {/* Main Dashboard */}
      <main className="flex-1 p-6">
        {activeTab === "dashboard" && (
          <>
            <h1 className="text-3xl font-bold mb-8">Dashboard Admin</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {stats.map((stat) => (
                <StatCard key={stat.id} {...stat} />
              ))}
            </div>
          </>
        )}

        {activeTab === "users" && <UsersTable />}
        {activeTab === "notes" && <NotesTable />}
        {activeTab === "folders" && <FoldersTable />}
      </main>
    </div>
  );
}
