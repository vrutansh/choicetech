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
