import React, { useContext, useEffect, useState } from 'react'
import { JobContext } from '../context/JobContext'
import JobCard from '../components/JobCard'

export default function UserJobs() {
  const { jobs, fetchJobs, loading } = useContext(JobContext)
  const [filters, setFilters] = useState({ title: "", location: "", type: "" })
  const [displayJobs, setDisplayJobs] = useState([])

  // Fetch jobs once on mount
  useEffect(() => { 
    const loadJobs = async () => await fetchJobs()
    loadJobs()
  }, [])

  // Update displayed jobs whenever jobs or filters change
  useEffect(() => {
    let temp = jobs
    if (filters.title)
      temp = temp.filter(j => j.title?.toLowerCase().includes(filters.title.toLowerCase()))
    if (filters.location)
      temp = temp.filter(j => j.location?.toLowerCase().includes(filters.location.toLowerCase()))
    if (filters.type)
      temp = temp.filter(j => j.type === filters.type)
    setDisplayJobs(temp)
  }, [jobs, filters])

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleClearFilters = () => {
    setFilters({ title: "", location: "", type: "" })
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Available Jobs</h2>

      {/* Filter panel */}
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <input
          type="text"
          name="title"
          placeholder="Job title"
          value={filters.title}
          onChange={handleFilterChange}
          className="flex-1 min-w-[180px] border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={filters.location}
          onChange={handleFilterChange}
          className="flex-1 min-w-[180px] border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <select
          name="type"
          value={filters.type}
          onChange={handleFilterChange}
          className="border border-gray-300 p-3 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="">All Types</option>
          <option value="full-time">Full-time</option>
          <option value="part-time">Part-time</option>
          <option value="internship">Internship</option>
        </select>
        <button
          onClick={handleClearFilters}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Clear
        </button>
      </div>

      {loading && <div className="text-center text-gray-500">Loading jobs...</div>}

      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayJobs.length === 0 && !loading && (
          <div className="text-center col-span-full text-gray-500">
            No jobs found
          </div>
        )}
        {displayJobs.map(j => (
          <JobCard key={j._id} job={j} />
        ))}
      </div>
    </div>
  )
}
