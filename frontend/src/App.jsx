// src/App.jsx
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LandingPage from "./pages/LandingPage";
import Dashboard from "./pages/Dashboard";
import ProfilePage from "./pages/ProfilePage";
import AdminDashboard from "./pages/AdminDashboard";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";

function App() {
  const { user } = useSelector((state) => state.auth);
  return (
    <BrowserRouter>
      <ToastContainer theme="colored" position="top-center" />
      <Navbar />
      <main className="pt-16 min-h-[calc(100vh-4rem)]">
        <Routes>
          <Route
            path="/"
            element={!user ? <LandingPage /> : <Navigate to="dashboard" />}
          />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/register"
            element={!user ? <Register /> : <Navigate to="/dashboard" />}
          />
          <Route
            path="/dashboard"
            element={!user ? <Navigate to="/" /> : <Dashboard />}
          />
          <Route
            path="/profile"
            element={!user ? <Navigate to="/" /> : <ProfilePage />}
          />
          <Route
            path="/admin"
            element={!user?.isAdmin ? <Navigate to="/" /> : <AdminDashboard />}
          />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
