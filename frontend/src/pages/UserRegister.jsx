import React, { useState } from 'react'
import { userRegister } from '../services/authService'
import { useNavigate } from 'react-router-dom'


export default function UserRegister() {
const [form, setForm] = useState({ name: '', email: '', password: '' })
const navigate = useNavigate()


const handleSubmit = async (e) => {
e.preventDefault()
try {
await userRegister(form)
alert('Registered. Please login.')
navigate('/login')
} catch (err) {
alert(err.response?.data?.message || err.message)
}
}


return (
<form onSubmit={handleSubmit} className="max-w-md mx-auto">
<h2 className="text-2xl mb-4">User Register</h2>
<input required placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="block w-full p-2 mb-2" />
<input required placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="block w-full p-2 mb-2" />
<input required type="password" placeholder="Password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} className="block w-full p-2 mb-2" />
<button className="btn">Register</button>
</form>
)
}