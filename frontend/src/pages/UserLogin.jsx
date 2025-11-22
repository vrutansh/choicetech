import React, { useState, useContext } from 'react'
import { userLogin } from '../services/authService'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'


export default function UserLogin() {
const [form, setForm] = useState({ email: '', password: '' })
const { login } = useContext(AuthContext)
const navigate = useNavigate()


const handleSubmit = async (e) => {
e.preventDefault()
try {
const res = await userLogin(form)
// res expected to be { token, role }
login(res.token, res.role || 'user')
navigate('/jobs')
} catch (err) {
alert(err.response?.data?.message || err.message)
}
}


return (
<form onSubmit={handleSubmit} className="max-w-md mx-auto">
<h2 className="text-2xl mb-4">User Login</h2>
<input required placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="block w-full p-2 mb-2" />
<input required type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="block w-full p-2 mb-2" />
<button className="btn">Login</button>
</form>
)
}