import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios'
import { AuthContext } from '../context/AuthContext'


export default function AppliedJobs() {
const { auth } = useContext(AuthContext)
const [applied, setApplied] = useState([])


useEffect(() => {
;(async () => {
try {
const res = await axios.get((process.env.REACT_APP_API_URL || 'http://localhost:5000/api') + '/jobs/${id}/apply', { headers: { Authorization: `Bearer ${auth.token}` } })
setApplied(res.data)
} catch (err) {
console.error(err)
}
})()
}, [])


return (
<div>
<h2 className="text-2xl mb-4">Applied Jobs</h2>
{applied.map(a => (
<div key={a._id} className="border p-3 mb-2">
<h3>{a.title}</h3>
<p>{a.company}</p>
</div>
))}
</div>
)
}