import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function AppliedJobs() {
  const { auth } = useContext(AuthContext);
  const [applied, setApplied] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          ('http://localhost:5000/api') + '/applied-jobs',
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setApplied(res.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div>
      <h2 className="text-2xl mb-4">Applied Jobs</h2>

      {applied.length === 0 && <p>No applied jobs found.</p>}

      {applied.map((a) => (
        <div key={a.applicationId} className="border p-3 mb-2 rounded">
          <h3 className="font-semibold text-lg">{a.job?.title}</h3>
          <p className="text-gray-700">{a.job?.company}</p>

          {a.resumeUrl && (
            <p className="mt-2">
              <strong>Resume:</strong>{" "}
              <a
                href={a.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 underline"
              >
                View Resume
              </a>
            </p>
          )}
        </div>
      ))}
    </div>
  );
}
