import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import MainNotes from "../components/MainNotes";

export default function Dashboard() {
  return (
    <div className="flex flex-col bg-gray-50 md:h-auto h-[92vh]">
      {/* Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />
        {/* Main Area */}
        <MainNotes />
      </div>
    </div>
  );
}
