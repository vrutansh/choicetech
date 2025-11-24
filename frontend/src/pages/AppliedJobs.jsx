import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

export default function AppliedJobs() {
  const { auth } = useContext(AuthContext);
  const [applied, setApplied] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/applied-jobs', {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        setApplied(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [auth.token]);

  if (loading)
    return <div className="text-center text-gray-500 mt-10">Loading applied jobs...</div>;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Applied Jobs</h2>

      {applied.length === 0 ? (
        <p className="text-gray-500 text-center mt-10">No applied jobs found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {applied.map((a) => (
            <div
              key={a.applicationId}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow p-5 flex flex-col justify-between"
            >
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{a.job?.title}</h3>
                <p className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-3">{a.job?.company}</p>

                {a.resumeUrl && (
                  <a
                    href={a.resumeUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block text-blue-600 hover:underline font-medium mt-2 ml-6"
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
}
