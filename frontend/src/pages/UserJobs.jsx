import React, { useContext, useEffect } from 'react'
import { JobContext } from '../context/JobContext'
import JobCard from '../components/JobCard'


export default function UserJobs() {
const { jobs, fetchJobs, loading } = useContext(JobContext)


useEffect(() => { fetchJobs() }, [])


return (
<div>
<h2 className="text-2xl mb-4">Available Jobs</h2>
{loading && <div>Loading...</div>}
{jobs.map(j => (
<JobCard key={j._id} job={j} />
))}
</div>
)
}