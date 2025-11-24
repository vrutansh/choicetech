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
<form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md mt-10">
  <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">User Register</h2>

  <div className="mb-4">
    <input
      required
      type="text"
      placeholder="Name"
      value={form.name}
      onChange={e => setForm({ ...form, name: e.target.value })}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
    />
  </div>

  <div className="mb-4">
    <input
      required
      type="email"
      placeholder="Email"
      value={form.email}
      onChange={e => setForm({ ...form, email: e.target.value })}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
    />
  </div>

  <div className="mb-4">
    <input
      required
      type="password"
      placeholder="Password"
      value={form.password}
      onChange={e => setForm({ ...form, password: e.target.value })}
      className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
    />
  </div>

  <button
    type="submit"
    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow transition-colors"
  >
    Register
  </button>

  <p className="text-sm text-gray-500 mt-4 text-center">
    Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
  </p>
</form>

)
}