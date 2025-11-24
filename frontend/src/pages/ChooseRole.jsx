// src/pages/ChooseRole.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const ChooseRole = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-md p-8 w-full max-w-md">
        <header className="mb-6">
          <h1 className="text-2xl font-bold mb-2 text-center">Welcome</h1>
          <p className="text-gray-600 text-center">
            Are you a user or an employer? Login or register to continue.
          </p>
        </header>
        <div className="flex flex-col gap-4">
          <Link
            to="/register"
            className="text-center py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Register as User
          </Link>
          <Link
            to="/employer/register"
            className="text-center py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            Register as Employer
          </Link>
          <Link
            to="/login"
            className="text-center py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            Login as User
          </Link>
          <Link
            to="/employer/login"
            className="text-center py-2 px-4 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            Login as Employer
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ChooseRole;
