import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    console.log("AuthProvider rendered");

  const [auth, setAuth] = useState({
    token: localStorage.getItem("token") || "",
    role: localStorage.getItem("role") || "",
    user: null
  });

//   const login = (token, role) => {
//     localStorage.setItem("token", token);
//     localStorage.setItem("role", role);
//     setAuth({ token, role, user: null });
//   };

const login = (token, role) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);

  setAuth(prev => ({
    ...prev,
    token,
    role
  }));
};

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setAuth({ token: "", role: "", user: null });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
