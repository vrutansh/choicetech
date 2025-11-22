import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import UserRegister from './pages/UserRegister'
import UserLogin from './pages/UserLogin'
import UserJobs from './pages/UserJobs'
import JobDetails from './pages/JobDetails'
import AppliedJobs from './pages/AppliedJobs'
import EmployerRegister from './pages/EmployerRegister'
import EmployerLogin from './pages/EmployerLogin'
import EmployerJobs from './pages/EmployerJobs'
import CreateJob from './pages/CreateJob'
import EditJob from './pages/EditJob'
import ProtectedRoute from './components/ProtectedRoute'


function App() {
  

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          
          {/* Public / User */}
          <Route path="/" element={<Navigate to="/jobs" replace />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/jobs" element={<UserJobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/applied" element={
            <ProtectedRoute role="user"><AppliedJobs /></ProtectedRoute>
          } />

          {/* Employer */}
          <Route path="/employer/register" element={<EmployerRegister />} />
          <Route path="/employer/login" element={<EmployerLogin />} />
          <Route path="/employer/jobs" element={
            <ProtectedRoute role="employer"><EmployerJobs /></ProtectedRoute>
          } />
          <Route path="/employer/jobs/create" element={
            <ProtectedRoute role="employer"><CreateJob /></ProtectedRoute>
          } />
          <Route path="/employer/jobs/edit/:id" element={
            <ProtectedRoute role="employer"><EditJob /></ProtectedRoute>
          } />
        </Routes>
      </div>
    </>
  );
}


export default App