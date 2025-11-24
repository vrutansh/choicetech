import React, { createContext, useState, useContext } from 'react'
import * as jobService from '../services/jobService'
import { AuthContext } from './AuthContext'


export const JobContext = createContext()


export function JobProvider({ children }) {
const [jobs, setJobs] = useState([])
const [loading, setLoading] = useState(false)
const { auth } = useContext(AuthContext)


const fetchJobs = async () => {
setLoading(true)
try {
const res = await jobService.getAllJobs()
setJobs(res)
} finally {
setLoading(false)
}
}


const fetchJobById = async (id) => {
return jobService.getJob(id)
}


// const applyToJob = async (id) => {
// if (!auth.token) throw new Error('Not authenticated')
// return jobService.applyJob(id, auth.token)
// }
const applyToJob = async (id, resumeLink) => {
  if (!auth.token) throw new Error("Not authenticated");

  const payload = { resumeUrl: resumeLink };

  return jobService.applyJob(id, payload, auth.token);
};



const createJob = async (data) => {
return jobService.createJob(data, auth.token)
}


const updateJob = async (id, data) => {
return jobService.updateJob(id, data, auth.token)
}


const removeJob = async (id) => {
return jobService.deleteJob(id, auth.token)
}


return (
<JobContext.Provider value={{ jobs, loading, fetchJobs, fetchJobById, applyToJob, createJob, updateJob, removeJob }}>
{children}
</JobContext.Provider>
)
}