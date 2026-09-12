import { useEffect, useState } from 'react'
import './Dashboard.css'

function Dashboard() {

    const [stats, setStats] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    const fetchDashboard = async () => {
        setLoading(true)
        setError('')

        const token = localStorage.getItem('token')

        try {
            const response = await fetch('http://localhost:5000/api/dashboard', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (!response.ok) {
                throw new Error('Failed to load dashboard')
            }

            const data = await response.json()

            setStats(data)
            setError('')
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchDashboard()
    }, [])
    
    return (
        <div className="dashboard-page">
            <h1>Dashboard</h1>
            <p className="dashboard-subtitle">
                Track your job applications and progress
            </p>

            <h2 className="stats-title">Application Overview</h2>

            {loading && <p className="dashboard-loading">Loading statistics...</p>}
            {error && (
                <div className="dashboard-error">
                    <p>{error}</p>
                    <button type="button" onClick={fetchDashboard}>
                        Retry
                    </button>
                </div>
            )}

            {stats && !error && (
                <div className="stats-grid">
                    {stats && (
                        <div className="stat-card">
                            <p>Total Applications</p>
                            <strong className="stat-total">{stats.total}</strong>
                        </div>
                    )}
                    {stats && (
                        <div className="stat-card">
                            <p>Applied</p>
                            <strong className="stat-applied">{stats.applied}</strong>
                        </div>
                    )}

                    {stats && (
                        <div className="stat-card">
                            <p>Interviews</p>
                            <strong className="stat-interview">{stats.interview}</strong>
                        </div>
                    )}

                    {stats && (
                        <div className="stat-card">
                            <p>Offers</p>
                            <strong className="stat-offer">{stats.offer}</strong>
                        </div>
                    )}

                    {stats && (
                        <div className="stat-card">
                            <p>Rejected</p>
                            <strong className="stat-rejected">{stats.rejected}</strong>
                        </div>
                    )}

                    {stats && (
                        <div className="stat-card">
                            <p>Withdrawn</p>
                            <strong className="stat-withdrawn">{stats.withdrawn}</strong>
                        </div>
                    )}
            </div>
        )}

        </div>
    )
}

export default Dashboard