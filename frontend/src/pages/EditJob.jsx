import React, { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { JobContext } from '../context/JobContext'


export default function EditJob() {
const { id } = useParams()
const { fetchJobById, updateJob } = useContext(JobContext)
const [form, setForm] = useState({ title: '', description: '', company: '' })
const navigate = useNavigate()


useEffect(() => {
;(async () => {
const j = await fetchJobById(id)
setForm({ title: j.title, description: j.description, company: j.company })
})()
}, [id])


const handleSubmit = async (e) => {
e.preventDefault()
try {
await updateJob(id, form)
alert('Updated')
navigate('/employer/jobs')
} catch (err) {
alert(err.response?.data?.message || err.message)
}
}


return (
<form onSubmit={handleSubmit} className="max-w-lg mx-auto">
<h2 className="text-2xl mb-4">Edit Job</h2>
<input required placeholder="Title" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="block w-full p-2 mb-2" />
<input placeholder="Company" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} className="block w-full p-2 mb-2" />
<textarea required placeholder="Description" value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="block w-full p-2 mb-2" />
<button className="btn">Save</button>
</form>
)
}