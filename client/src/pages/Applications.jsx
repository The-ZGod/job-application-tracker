import { useEffect, useState } from 'react'

import './Applications.css'

function Applications() {

    const [applications, setApplications] = useState([])
    const [company, setCompany] = useState('')
    const [position, setPosition] = useState('')
    const [status, setStatus] = useState('APPLIED')
    const [statusOpen, setStatusOpen] = useState(false)
    const [jobUrl, setJobUrl] = useState('')
    const [notes, setNotes] = useState('')
    const [message, setMessage] = useState('')
    const [editingId, setEditingId] = useState(null)
    const [editCompany, setEditCompany] = useState('')
    const [editPosition, setEditPosition] = useState('')
    const [editStatus, setEditStatus] = useState('')
    const [editStatusOpen, setEditStatusOpen] = useState(false)
    const [editJobUrl, setEditJobUrl] = useState('')
    const [editNotes, setEditNotes] = useState('')
    const [search, setSearch] = useState('')
    const [filterStatus, setFilterStatus] = useState('')
    const [filterStatusOpen, setFilterStatusOpen] = useState(false)

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

            const response = await fetch(`http://localhost:5000/api/applications?search=${encodeURIComponent(search)}&status=${filterStatus}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            const data = await response.json()

            setApplications(data)
        }

        fetchApplications()
    }, [search, filterStatus])


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

    const handleEdit = async (id) => {
        const token = localStorage.getItem('token')

        const response = await fetch(`http://localhost:5000/api/applications/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                company: editCompany,
                position: editPosition,
                status: editStatus,
                jobUrl: editJobUrl,
                notes: editNotes,
            }),
        })

        const data = await response.json()

        setApplications((currentApplications) =>
            currentApplications.map((application) =>
                application.id === id
                    ? {
                        ...application,
                        company: editCompany,
                        position: editPosition,
                        status: editStatus,
                        jobUrl: editJobUrl,
                        notes: editNotes,
                    }
                    : application
            )
        )

        setEditingId(null)
        setEditJobUrl('')
        setEditNotes('')
    }

    return (
        <div className="application-page">
            <h1>Job Applications</h1>

            <input
                type="text"
                placeholder="Search company or position"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="custom-select filter-select">
                <button
                    type="button"
                    className="custom-select-button"
                    onClick={() => setFilterStatusOpen(!filterStatusOpen)}
                >
                    {filterStatus || 'All Statuses'}
                </button>

                {filterStatusOpen && (
                    <div className="custom-select-menu">
                        <div
                            onClick={() => {
                                setFilterStatus('')
                                setFilterStatusOpen(false)
                            }}
                        >
                            All Statuses
                        </div>

                        <div
                            onClick={() => {
                                setFilterStatus('APPLIED')
                                setFilterStatusOpen(false)
                            }}
                        >
                            Applied
                        </div>

                        <div
                            onClick={() => {
                                setFilterStatus('INTERVIEW')
                                setFilterStatusOpen(false)
                            }}
                        >
                            Interview
                        </div>

                        <div
                            onClick={() => {
                                setFilterStatus('OFFER')
                                setFilterStatusOpen(false)
                            }}
                        >
                            Offer
                        </div>

                        <div
                            onClick={() => {
                                setFilterStatus('REJECTED')
                                setFilterStatusOpen(false)
                            }}
                        >
                            Rejected
                        </div>

                        <div
                            onClick={() => {
                                setFilterStatus('WITHDRAWN')
                                setFilterStatusOpen(false)
                            }}
                        >
                            Withdrawn
                        </div>
                    </div>
                )}
            </div>

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

                <div className="custom-select">
                    <button
                        type="button"
                        className="custom-select-button"
                        onClick={() => setStatusOpen(!statusOpen)}
                    >
                        {status}
                    </button>

                    {statusOpen && (
                        <div className="custom-select-menu">
                            <div
                                onClick={() => {
                                    setStatus('APPLIED')
                                    setStatusOpen(false)
                                }}
                            >
                                Applied
                            </div>

                            <div
                                onClick={() => {
                                    setStatus('INTERVIEW')
                                    setStatusOpen(false)
                                }}
                            >
                                Interview
                            </div>

                            <div
                                onClick={() => {
                                    setStatus('OFFER')
                                    setStatusOpen(false)
                                }}
                            >
                                Offer
                            </div>

                            <div
                                onClick={() => {
                                    setStatus('REJECTED')
                                    setStatusOpen(false)
                                }}
                            >
                                Rejected
                            </div>

                            <div
                                onClick={() => {
                                    setStatus('WITHDRAWN')
                                    setStatusOpen(false)
                                }}
                            >
                                Withdrawn
                            </div>
                        </div>
                    )}
                </div>

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
                <div
                    key={application.id}
                    className="application-card"
                >

                    <h3>{application.company}</h3>
                    <p>{application.position}</p>
                    <p>
                        Status: <span className={`status-badge status-${application.status.toLowerCase()}`}>
                            {application.status}
                        </span>
                    </p>
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

                    <button
                        onClick={() => {
                            setEditingId(application.id)
                            setEditCompany(application.company)
                            setEditPosition(application.position)
                            setEditStatus(application.status)
                            setEditJobUrl(application.jobUrl || '')
                            setEditNotes(application.notes || '')
                        }}
                    >
                        Edit
                    </button>

                    {editingId === application.id && (
                        <div>
                            <input
                                type="text"
                                value={editCompany}
                                onChange={(e) => setEditCompany(e.target.value)}
                            />

                            <input
                                type="text"
                                value={editPosition}
                                onChange={(e) => setEditPosition(e.target.value)}
                            />

                            <div className="custom-select">
                                <button
                                    type="button"
                                    className="custom-select-button"
                                    onClick={() => setEditStatusOpen(!editStatusOpen)}
                                >
                                    {editStatus}
                                </button>

                                {editStatusOpen && (
                                    <div className="custom-select-menu">
                                        <div onClick={() => {
                                            setEditStatus('APPLIED')
                                            setEditStatusOpen(false)
                                        }}>
                                            Applied
                                        </div>

                                        <div onClick={() => {
                                            setEditStatus('INTERVIEW')
                                            setEditStatusOpen(false)
                                        }}>
                                            Interview
                                        </div>

                                        <div onClick={() => {
                                            setEditStatus('OFFER')
                                            setEditStatusOpen(false)
                                        }}>
                                            Offer
                                        </div>

                                        <div onClick={() => {
                                            setEditStatus('REJECTED')
                                            setEditStatusOpen(false)
                                        }}>
                                            Rejected
                                        </div>

                                        <div onClick={() => {
                                            setEditStatus('WITHDRAWN')
                                            setEditStatusOpen(false)
                                        }}>
                                            Withdrawn
                                        </div>
                                    </div>
                                )}
                            </div>

                            <input
                                type="url"
                                value={editJobUrl}
                                onChange={(e) => setEditJobUrl(e.target.value)}
                                placeholder="Job URL"
                            />

                            <textarea
                                value={editNotes}
                                onChange={(e) => setEditNotes(e.target.value)}
                                placeholder="Notes"
                            />

                            <button
                                type="button"
                                onClick={() => handleEdit(application.id)}
                            >
                                Save
                            </button>

                            <button
                                type="button"
                                onClick={() => setEditingId(null)}
                            >
                                Cancel
                            </button>
                        </div>
                    )}

                    <hr/>

                </div>
            ))}

        </div>
    )
}

export default Applications