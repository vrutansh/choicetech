import React, { useContext, useEffect, useState } from 'react'
import { JobContext } from '../context/JobContext'
import { AuthContext } from '../context/AuthContext'
import { getEmployerJobs } from '../services/jobService'
import { Link } from 'react-router-dom'


export default function EmployerJobs() {
const { removeJob } = useContext(JobContext)
const { auth } = useContext(AuthContext)
const [jobs, setJobs] = useState([])


useEffect(() => {
;(async () => {
const res = await getEmployerJobs(auth.token)
setJobs(res)
})()
}, [])


const handleDelete = async (id) => {
if (!confirm('Delete this job?')) return
await removeJob(id)
setJobs(jobs.filter(j => j._id !== id))
}


return (
<div>
<h2 className="text-2xl mb-4">My Jobs</h2>
<Link to="/employer/jobs/create" className="btn mb-4 inline-block">Create Job</Link>
{jobs.map(j => (
<div key={j._id} className="border p-3 mb-3">
<h3 className="font-semibold">{j.title}</h3>
<div className="mt-2 flex gap-2">
<Link to={`/employer/jobs/edit/${j._id}`} className="underline">Edit</Link>
<button onClick={() => handleDelete(j._id)}>Delete</button>
</div>
</div>
))}
</div>
)
}