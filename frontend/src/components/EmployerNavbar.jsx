// src/components/EmployerNavbar.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function EmployerNavbar() {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-neutral-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <div className="flex items-center space-x-6">
          <Link
            to="/"
            className="text-2xl font-bold text-blue-800 hover:text-blue-700 transition"
          >
            JobPortal
          </Link>
          <Link
            to="/employer/jobs"
            className="text-gray-900 hover:text-blue-600 transition font-medium"
          >
            My Jobs
          </Link>
          <Link
            to="/employer/jobs/create"
            className="text-gray-900 hover:text-blue-600 transition font-medium"
          >
            Create
          </Link>
        </div>

        
        <div>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition font-medium"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
