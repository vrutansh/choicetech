import React, { useState, useContext } from 'react'
import { JobContext } from '../context/JobContext'
import { useNavigate } from 'react-router-dom'


export default function CreateJob() {
const { createJob } = useContext(JobContext)
const [form, setForm] = useState({ title: '', description: '', company: '' })
const navigate = useNavigate()


const handleSubmit = async (e) => {
e.preventDefault()
try {
await createJob(form)
alert('Job created')
navigate('/employer/jobs')
} catch (err) {
alert(err.response?.data?.message || err.message)
}
}


return (
<form onSubmit={handleSubmit} className="max-w-lg mx-auto">
<h2 className="text-2xl mb-4">Create Job</h2>
<input required placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="block w-full p-2 mb-2" />
<input placeholder="Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className="block w-full p-2 mb-2" />
<textarea required placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="block w-full p-2 mb-2" />
<button className="btn">Create</button>
</form>
)
}