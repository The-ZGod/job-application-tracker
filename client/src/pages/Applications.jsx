import { useEffect, useState } from 'react'

function Applications() {

    const [applications, setApplications] = useState([])
    const [company, setCompany] = useState('')
    const [position, setPosition] = useState('')
    const [status, setStatus] = useState('APPLIED')
    const [jobUrl, setJobUrl] = useState('')
    const [notes, setNotes] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        
        setMessage('')

        const token = localStorage.getItem('token')

        const response = await fetch('http://localhost:5000/api/applications', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                company,
                position,
                status,
                jobUrl,
                notes,
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            setMessage(data.message)
            return
        }

        setApplications((currentApplications) => [
            ...currentApplications,
            data,
        ])

        setMessage('Application added successfully!')

        setCompany('')
        setPosition('')
        setStatus('APPLIED')
        setJobUrl('')
        setNotes('')
    }

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


    const handleDelete = async (id) => {
        const token = localStorage.getItem('token')

        const response = await fetch(`http://localhost:5000/api/applications/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })

        const data = await response.json()

        setApplications((currentApplications) =>
            currentApplications.filter((application) => application.id !== id)
        )
    }

    return (
        <div>
            <h1>Job Applications</h1>

            <h2>Add Job Application</h2>

            {message && <p>{message}</p>}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Position"
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                />

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="APPLIED">Applied</option>
                    <option value="INTERVIEW">Interview</option>
                    <option value="OFFER">Offer</option>
                    <option value="REJECTED">Rejected</option>
                    <option value="WITHDRAWN">Withdrawn</option>
                </select>

                <input
                    type="url"
                    placeholder="Job URL"
                    value={jobUrl}
                    onChange={(e) => setJobUrl(e.target.value)}
                />

                <textarea
                    placeholder="Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />

                <button type="submit">
                    Add Application
                </button>
            </form>

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
                            </a>
                        </p>
                    )}

                    {application.notes && (
                        <p>Notes: {application.notes}</p>
                    )}

                    <button onClick={() => handleDelete(application.id)}>
                        Delete
                    </button>

                    <hr/>

                </div>
            ))}

        </div>
    )
}

export default Applications