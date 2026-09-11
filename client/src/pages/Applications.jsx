import { useEffect, useState } from 'react'

function Applications() {

    const [applications, setApplications] = useState([])

    useEffect(() => {
        const fetchApplications = async () => {
            const token = localStorage.getItem('token')

            const response = await fetch('http://localhost:5000/api/applications', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            const data = await response.json()

            setApplications(data)
        }

        fetchApplications()
    }, [])

    return (
        <div>
            <h1>Job Applications</h1>

            <p>Total Applications: {applications.length}</p>
            {applications.map((application) => (
                <div key={application.id}>

                    <h3>{application.company}</h3>
                    <p>{application.position}</p>
                    <p>Status: {application.status}</p>
                    <p>Applied: {new Date(application.appliedDate).toLocaleDateString()}</p>
                    {application.jobUrl && (
                        <p>
                            <a href={application.jobUrl} target="_blank" rel="noreferrer">
                                View Job
                                {application.notes && (
                                    <p>Notes: {application.notes}</p>
                                )}
                            </a>
                        </p>
                    )}

                </div>
            ))}

        </div>
    )
}

export default Applications