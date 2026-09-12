import { useEffect, useState } from 'react'
import './Dashboard.css'

function Dashboard() {

    const [stats, setStats] = useState(null)

    useEffect(() => {
        const fetchDashboard = async () => {
            const token = localStorage.getItem('token')

            const response = await fetch('http://localhost:5000/api/dashboard', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            const data = await response.json()

            setStats(data)
        }

        fetchDashboard()
    }, [])
    
    return (
        <div className="dashboard-page">
            <h1>Dashboard</h1>
            <p className="dashboard-subtitle">
                Track your job applications and progress
            </p>

            <h2 className="stats-title">Application Overview</h2>

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

        </div>
    )
}

export default Dashboard