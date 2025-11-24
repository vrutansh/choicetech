// src/components/UserNavbar.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function UserNavbar() {
  const { auth, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-neutral-50 shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        <div className="flex items-center space-x-10">
          <Link
            to="/"
            className="text-2xl font-bold text-blue-800 hover:text-blue-700 transition"
          >
            JobPortal
          </Link>
          <Link
            to="/jobs"
            className="text-gray-900 hover:text-blue-600 transition font-medium"
          >
            Jobs
          </Link>
          {(auth.role === "user" || auth.role === "applicant") && (
            <Link
              to="/applied-jobs"
              className="text-gray-900 hover:text-blue-600 transition font-medium"
            >
              Applied
            </Link>
          )}
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
