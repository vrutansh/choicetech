import React, { useState, useContext } from 'react';
import { JobContext } from '../context/JobContext';
import { useNavigate } from 'react-router-dom';

export default function CreateJob() {
  const { createJob } = useContext(JobContext);

  const [form, setForm] = useState({
    title: '',
    company: '',
    location: '',
    salaryRange: '',
    jobType: '',
    description: '',
    requirements: '',
    deadline: '',
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createJob(form);
      alert('Job Created Successfully!');
      navigate('/employer/jobs');
    } catch (err) {
      alert(err.response?.data?.msg || err.message);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-md mt-10"
    >
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Create Job</h2>

      <input
        required
        placeholder="Title"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />

      <input
        required
        placeholder="Company"
        value={form.company}
        onChange={(e) => setForm({ ...form, company: e.target.value })}
        className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />

      <input
        required
        placeholder="Location"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
        className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />

      <input
        required
        placeholder="Salary Range"
        value={form.salaryRange}
        onChange={(e) => setForm({ ...form, salaryRange: e.target.value })}
        className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />

      <input
        required
        placeholder="Job Type (e.g. Full-time)"
        value={form.jobType}
        onChange={(e) => setForm({ ...form, jobType: e.target.value })}
        className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />

      <textarea
        required
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />

      <textarea
        required
        placeholder="Requirements"
        value={form.requirements}
        onChange={(e) => setForm({ ...form, requirements: e.target.value })}
        className="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />

      <input
        required
        type="date"
        placeholder="Deadline"
        value={form.deadline}
        onChange={(e) => setForm({ ...form, deadline: e.target.value })}
        className="w-full px-4 py-3 mb-6 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
      />

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg shadow transition-colors"
      >
        Create
      </button>
    </form>
  );
}
