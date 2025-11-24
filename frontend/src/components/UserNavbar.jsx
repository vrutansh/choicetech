// src/components/UserNavbar.jsx
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function UserNavbar() {
  const { auth,logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="font-bold mr-4">JobPortal</Link>
          <Link to="/jobs" className="mr-4">Jobs</Link>
          {(auth.role === "user" || auth.role === "applicant") && (
            <Link to="/applied-jobs" className="mr-4">Applied</Link>
          )}
        
        </div>
        <div>
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
