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
    setAuthLoaded(true);
  }, [auth]);

  useEffect(() => {
    (async () => {
      const res = await fetchJobById(id);
      setJob(res);
    })();
  }, [id]);

  const handleApply = async () => {
    const resumeLink = prompt("Please enter your resume link (Google Drive, PDF, etc):");
    if (!resumeLink || resumeLink.trim() === "") {
      alert("Resume link is required to apply.");
      return;
    }
    try {
      await applyToJob(id, resumeLink);
      alert("Applied successfully!");
      navigate("/applied-jobs");
    } catch (err) {
      alert(err.response?.data?.msg || err.message);
    }
  };

  if (!job) return <div className="text-center mt-10 text-gray-500">Loading job details...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md mt-8">
      
      <h2 className="text-3xl font-bold text-gray-800 mb-3">{job.title}</h2>

     
      <p className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm mb-4">
        {job.company || job.employerName}
      </p>

      
      <div className="flex flex-wrap gap-3 mb-4">
        {job.location && (
          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
            {job.location}
          </span>
        )}
        {job.jobType && (
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
            {job.jobType}
          </span>
        )}
        {job.salaryRange && (
          <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm">
            {job.salaryRange}
          </span>
        )}
      </div>

     
      <div className="text-gray-700 space-y-4 mb-4">
        {job.description && (
          <p>
            <strong>Description:</strong> <br />
            {job.description}
          </p>
        )}
        {job.requirements && (
          <p>
            <strong>Requirements:</strong> <br />
            {job.requirements}
          </p>
        )}
        {job.deadline && (
          <p>
            <strong>Deadline:</strong> {job.deadline.substring(0, 10)}
          </p>
        )}
      </div>

      {authLoaded && auth.token && (auth.role === 'user' || auth.role === 'applicant') ? (
        <button
          onClick={handleApply}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium shadow transition-colors"
        >
          Apply Now
        </button>
      ) : authLoaded ? (
        <p className="mt-4 text-gray-600">Please login as a user to apply.</p>
      ) : null}
    </div>
  );
}
