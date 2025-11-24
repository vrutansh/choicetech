// src/components/PublicNavbar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function PublicNavbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div>
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 hover:text-blue-700 transition"
          >
            JobPortal
          </Link>
        </div>

        {/* <div className="flex items-center space-x-4">
          <Link
            to="/user/login"
            className="text-gray-700 hover:text-blue-600 transition font-medium"
          >
            Login
          </Link>
          <Link
            to="/user/register"
            className="text-gray-700 hover:text-blue-600 transition font-medium"
          >
            Register
          </Link>
          <Link
            to="/employer/login"
            className="text-gray-700 hover:text-blue-600 transition font-medium"
          >
            Employer
          </Link>
        </div> */}
      </div>
    </nav>
  );
}
