// import React, { createContext, useState } from "react";

// export const AuthContext = createContext();

// export function AuthProvider({ children }) {
//     console.log("AuthProvider rendered");

//   const [auth, setAuth] = useState({
//     token: localStorage.getItem("token") || "",
//     role: localStorage.getItem("role") || "",
//     user: null
//   });

// //   const login = (token, role) => {
// //     localStorage.setItem("token", token);
// //     localStorage.setItem("role", role);
// //     setAuth({ token, role, user: null });
// //   };

// const login = (token, role) => {
//   localStorage.setItem("token", token);
//   localStorage.setItem("role", role);

//   setAuth(prev => ({
//     ...prev,
//     token,
//     role
//   }));
// };

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     setAuth({ token: "", role: "", user: null });
//   };

//   return (
//     <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }

import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState({
    token: null,
    role: null,
  });
  const [loading, setLoading] = useState(true); // wait until localStorage loaded

  // initialize auth from localStorage on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (token && role) setAuth({ token, role });
    setLoading(false);
  }, []);

  const login = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setAuth({ token, role });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setAuth({ token: null, role: null });
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}


