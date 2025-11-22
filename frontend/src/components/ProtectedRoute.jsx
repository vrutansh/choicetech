import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'


export default function ProtectedRoute({ children, role }) {
const { auth } = useContext(AuthContext)


if (!auth.token) return <Navigate to="/login" replace />
if (role && auth.role !== role) return <Navigate to="/" replace />
return children
}