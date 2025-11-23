import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const EmployerApplicants = () => {
  const { jobId, title } = useParams();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/employer/jobs/${jobId}/applications`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setApplications(res.data);
      } catch (err) {
        console.log("Error fetching applications", err.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchApplications();
  }, [jobId]);

  if (loading) return <div>Loading applicants...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Applicants for Job: {jobId}</h2>

      {applications.length === 0 ? (
        <p>No applicants yet.</p>
      ) : (
        <div>
          {applications.map((app) => (
            <div
              key={app.applicationId}
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                borderRadius: "8px",
                marginBottom: "12px",
              }}
            >
              <h3>{app.user.name}</h3>
              <p>Email: {app.user.email}</p>
              <p>Applied At: {new Date(app.appliedAt).toLocaleString()}</p>

              {app.resumeUrl && (
                <a
                  href={app.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Resume
                </a>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default EmployerApplicants;
