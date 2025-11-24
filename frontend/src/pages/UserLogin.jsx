import React, { useState, useContext } from 'react'
import { userLogin } from '../services/authService'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'


export default function UserLogin() {
const [form, setForm] = useState({ email: '', password: '' })
const { login } = useContext(AuthContext)
const navigate = useNavigate()


// const handleSubmit = async (e) => {
// e.preventDefault()
// try {
// const res = await userLogin(form)
// // res expected to be { token, role }
// login(res.token, res.role || 'user')
// navigate('/jobs')
// } catch (err) {
// alert(err.response?.data?.message || err.message)
// }
// }

const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await userLogin(form);
    const role = res.role || 'user'; // force role
    login(res.token, role); // update AuthContext
    navigate('/jobs'); // redirect after state update
  } catch (err) {
    alert(err.response?.data?.message || err.message);
  }
};

return (
<form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-8 rounded-xl shadow-md mt-10">
  <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">User Login</h2>

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
    Login
  </button>

  <p className="text-sm text-gray-500 mt-4 text-center">
    Don’t have an account? <a href="/register" className="text-blue-600 hover:underline">Sign up</a>
  </p>
</form>

)
}