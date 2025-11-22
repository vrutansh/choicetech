import React from 'react'
import { Link } from 'react-router-dom'


export default function JobCard({ job, actions }) {
return (
<div className="border rounded p-4 mb-4">
<h3 className="text-xl font-semibold">{job.title}</h3>
<p className="text-sm">{job.company || job.employerName}</p>
<p className="mt-2">{job.description?.slice(0, 150)}...</p>
<div className="mt-3 flex gap-2">
<Link to={`/jobs/${job._id}`} className="underline">View</Link>
{actions}
</div>
</div>
)
}