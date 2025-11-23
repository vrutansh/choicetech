import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
})

const withAuth = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
})

// Public: Get all available jobs
export async function getAllJobs() {
  const { data } = await API.get('/jobs')
  return data
}

// Public: Get job details
export async function getJob(id) {
  const { data } = await API.get(`/jobs/${id}`)
  return data
}

// User: Apply for a job
// export async function applyJob(id, token) {
//   const { data } = await API.post(`/jobs/${id}/apply`, {}, withAuth(token))
//   return data
// }
export async function applyJob(id, payload, token) {
  const { data } = await axios.post(
    `/jobs/${id}/apply`,
    payload,
    withAuth(token)
  );
  return data;
}

// Employer: View all jobs they created
export async function getEmployerJobs(token) {
  const { data } = await API.get('/employer/jobs', withAuth(token))
  return data
}

// Employer: Create job
export async function createJob(payload, token) {
  const { data } = await API.post('/employer/jobs', payload, withAuth(token))
  return data
}

// Employer: Update job
export async function updateJob(id, payload, token) {
  const { data } = await API.put(`/employer/jobs/${id}`, payload, withAuth(token))
  return data
}

// Employer: Delete job
export async function deleteJob(id, token) {
  const { data } = await API.delete(`/employer/jobs/${id}`, withAuth(token))
  return data
}

export const getApplications = async (jobId, token) => {
    return axios.get(`${API}/employer/jobs/${jobId}/applications`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
};