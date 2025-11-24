import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EmployerApplicants = () => {
  const { jobId } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/employer/jobs/${jobId}/applications`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setApplications(res.data);
        console.log("Fetched applications:", res.data);
      } catch (err) {
        console.log("Error fetching applications", err.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobId]);

  if (loading)
    return <div className="text-center text-gray-500 mt-10">Loading applicants...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Applicants for Job: <span className="text-blue-600">{}</span>
      </h2>

      {applications.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">No applicants yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {applications.map((app) => (
            <div
              key={app.applicationId}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-5 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{app.user.name}</h3>
                <p className="text-gray-600 mb-1">
                  <strong>Email:</strong> {app.user.email}
                </p>
                <p className="text-gray-600 mb-2">
                  <strong>Applied At:</strong>{" "}
                  {new Date(app.appliedAt).toLocaleString()}
                </p>
                {app.resumeUrl && (
                  <a
                    href={app.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-blue-600 hover:underline font-medium mt-2"
                  >
                    View Resume
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployerApplicants;
