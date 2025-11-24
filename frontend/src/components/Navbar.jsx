// import React, { useContext } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// export default function Navbar() {
//   const { auth, logout, loading } = useContext(AuthContext);
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   if (loading) return null; // wait until auth initialized

//   return (
//     <nav className="bg-gray-800 text-white p-4">
//       <div className="container mx-auto flex justify-between items-center">
//         <div>
//           <Link to="/" className="font-bold mr-4">JobPortal</Link>
//         </div>

//         <div>
//           {!auth.token && (
//             <>
//               <Link to="/user/login" className="mr-4">Login</Link>
//               <Link to="/user/register" className="mr-4">Register</Link>
//               <Link to="/employer/login" className="mr-4">Employer</Link>
//             </>
//           )}

//           {auth.token && auth.role === "user" && (
//             <>
//               <Link to="/jobs" className="mr-4">Jobs</Link>
//               <Link to="/applied" className="mr-4">Applied</Link>
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
//               >
//                 Logout
//               </button>
//             </>
//           )}

//           {auth.token && auth.role === "employer" && (
//             <>
//               <Link to="/employer/jobs" className="mr-4">My Jobs</Link>
//               <Link to="/employer/jobs/create" className="mr-4">Create</Link>
//               <button
//                 onClick={handleLogout}
//                 className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
//               >
//                 Logout
//               </button>
//             </>
//           )}
//         </div>
//       </div>
//     </nav>
//   );
// }



// src/components/Navbar.jsx
import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import PublicNavbar from "./PublicNavbar";
import UserNavbar from "./UserNavbar";
import EmployerNavbar from "./EmployerNavbar";

export default function Navbar() {
  const { auth, loading } = useContext(AuthContext);

  if (loading) return null; 

  if (!auth.token) return <PublicNavbar />;
  if (auth.role === "user" || auth.role === "applicant") {
    return <UserNavbar />;
  }
  if (auth.role === "employer") return <EmployerNavbar />;

  return <PublicNavbar />; 
}
