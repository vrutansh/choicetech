// src/components/PublicNavbar.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function PublicNavbar() {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div>
          <Link to="/" className="font-bold mr-4">JobPortal</Link>
        </div>
        <div>
          <Link to="/user/login" className="mr-4">Login</Link>
          <Link to="/user/register" className="mr-4">Register</Link>
          <Link to="/employer/login" className="mr-4">Employer</Link>
        </div>
      </div>
    </nav>
  );
}
