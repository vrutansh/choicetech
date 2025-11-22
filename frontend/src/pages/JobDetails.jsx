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
        setAuthLoaded(true); // auth has loaded from localStorage
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
            alert("Applied successfully!");
            navigate('/applied');
        } catch (err) {
            alert(err.response?.data?.message || err.message);
        }
    };
    console.log("Auth Context in JobDetails:", auth);

    if (!job) return <div>Loading...</div>;

    return (
        <div>
            <h2 className="text-2xl">{job.title}</h2>
            <p>{job.description}</p>
            <p>Company: {job.company || job.employerName}</p>

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
