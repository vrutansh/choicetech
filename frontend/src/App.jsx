import React, { useContext } from 'react'
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
import ChooseRole from './pages/ChooseRole'
import EmployerApplicants from './pages/EmployerApplicants'
import { AuthContext } from './context/AuthContext'

function App() {
  const { auth } = useContext(AuthContext);

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
           <Route
            path="/"
            element={
              !auth.token ? (
                <ChooseRole />
              ) : auth.role === "employer" ? (
                <Navigate to="/employer/jobs" replace />
              ) : (
                <Navigate to="/jobs" replace />
              )
            }
          />
          {/* Public / User */}
          {/* <Route path="/" element={<ChooseRole />} /> */}
          <Route path="/register" element={<UserRegister />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/jobs" element={<UserJobs />} />
          <Route path="/jobs/:id" element={<JobDetails />} />
          <Route path="/applied-jobs" element={
            <ProtectedRoute role={["user", "applicant"]}><AppliedJobs /></ProtectedRoute>
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
          <Route path="/employer/jobs/:jobId/applications" element={ 
            <ProtectedRoute role="employer">
               <EmployerApplicants />
             </ProtectedRoute> } />
        </Routes>
      </div>
    </>
  );
}


export default App