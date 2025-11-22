import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'


export default function Navbar() {
    console.log("Navbar rendered");

const { auth, logout } = useContext(AuthContext)
const navigate = useNavigate()


const handleLogout = () => {
logout()
navigate('/')
}


return (
<nav className="bg-gray-800 text-white p-4">
<div className="container mx-auto flex justify-between items-center">
<div>
<Link to="/" className="font-bold mr-4">JobPortal</Link>
<Link to="/jobs" className="mr-4">Jobs</Link>
</div>


<div>
{!auth.token && (
<>
<Link to="/login" className="mr-4">Login</Link>
<Link to="/register" className="mr-4">Register</Link>
<Link to="/employer/login" className="mr-4">Employer</Link>
</>
)}


{auth.token && auth.role === 'user' && (
<>
<Link to="/applied" className="mr-4">Applied</Link>
<button onClick={handleLogout}>Logout</button>
</>
)}


{auth.token && auth.role === 'employer' && (
<>
<Link to="/employer/jobs" className="mr-4">My Jobs</Link>
<Link to="/employer/jobs/create" className="mr-4">Create</Link>
<button onClick={handleLogout}>Logout</button>
</>
)}
</div>
</div>
</nav>
)
}