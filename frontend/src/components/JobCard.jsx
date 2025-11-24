import React from 'react'
import { Link } from 'react-router-dom'

export default function JobCard({ job, actions }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-lg transition-shadow duration-300 flex flex-col justify-between h-full">
      
      <div>
        <h3 className="text-2xl font-bold text-gray-800 mb-1 hover:text-blue-600 transition-colors">
          {job.title}
        </h3>
        <p className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-3">
          {job.company || job.employerName}
        </p>
        <p className="text-gray-600 text-sm line-clamp-4">
          {job.description || "No description provided."}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <Link
          to={`/jobs/${job._id}`}
          className="text-white bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow"
        >
          View
        </Link>
        {actions}
      </div>
    </div>
  )
}
