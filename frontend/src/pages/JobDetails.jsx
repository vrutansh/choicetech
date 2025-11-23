import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { JobContext } from '../context/JobContext';
import { AuthContext } from '../context/AuthContext';

export default function JobDetails() {
  const { id } = useParams();
  const { fetchJobById, applyToJob } = useContext(JobContext);
  const { auth } = useContext(AuthContext);

  const [job, setJob] = useState(null);
  const [authLoaded, setAuthLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAuthLoaded(true); // auth loaded from localStorage
  }, [auth]);

  useEffect(() => {
    (async () => {
      const res = await fetchJobById(id);
      setJob(res);
    })();
  }, [id]);

  const handleApply = async () => {
    try {
      await applyToJob(id);
      alert('Applied successfully!');
      navigate('/applied');
    } catch (err) {
      alert(err.response?.data?.message || err.message);
    }
  };

  if (!job) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-3xl font-semibold mb-3">{job.title}</h2>

      <p className="text-lg text-gray-700 mb-2">
        <strong>Company:</strong> {job.company}
      </p>

      <p className="text-gray-700 mb-2">
        <strong>Location:</strong> {job.location}
      </p>

      <p className="text-gray-700 mb-2">
        <strong>Salary Range:</strong> {job.salaryRange}
      </p>

      <p className="text-gray-700 mb-2">
        <strong>Job Type:</strong> {job.jobType}
      </p>

      <p className="text-gray-800 mt-4 mb-3">
        <strong>Description:</strong>
        <br />
        {job.description}
      </p>

      <p className="text-gray-800 mb-3">
        <strong>Requirements:</strong>
        <br />
        {job.requirements}
      </p>

      <p className="text-gray-700 mb-3">
        <strong>Deadline:</strong> {job.deadline?.substring(0, 10)}
      </p>

      {/* Apply Button Logic */}
      {authLoaded && auth.token && auth.role === 'applicant' ? (
        <button onClick={handleApply} className="btn mt-4">
          Apply
        </button>
      ) : authLoaded ? (
        <p className="mt-4">Please login as a user to apply.</p>
      ) : null}
    </div>
  );
}
