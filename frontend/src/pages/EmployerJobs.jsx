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
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800">My Jobs</h2>
        <Link
          to="/employer/jobs/create"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition-colors font-medium"
        >
          + Create Job
        </Link>
      </div>

      {jobs.length === 0 && (
        <p className="text-gray-500 text-center mt-10">You have not posted any jobs yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map(j => (
          <div
            key={j._id}
            className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-5 flex flex-col justify-between"
          >
            
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{j.title}</h3>
              {j.location && (
                <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm mb-2">
                  {j.location}
                </span>
              )}
              {j.jobType && (
                <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mb-2 ml-2">
                  {j.jobType}
                </span>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                to={`/employer/jobs/edit/${j._id}`}
                className="text-green-600 hover:underline font-medium"
              >
                Edit
              </Link>

              <Link
                to={`/employer/jobs/${j._id}/applications`}
                className="text-blue-600 hover:underline font-medium"
              >
                View Applicants
              </Link>

              <button
                onClick={() => handleDelete(j._id)}
                className="text-red-500 hover:text-red-600 font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
