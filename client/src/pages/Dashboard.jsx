import { useEffect, useState } from 'react'

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
        <div>
            <h1>Dashboard</h1>

            {stats && <p>Total Applications: {stats.total}</p>}
            {stats && <p>Applied: {stats.applied}</p>}
            {stats && <p>Interviews: {stats.interview}</p>}
            {stats && <p>Offers: {stats.offer}</p>}
            {stats && <p>Rejected: {stats.rejected}</p>}
            {stats && <p>Withdrawn: {stats.withdrawn}</p>}

        </div>
    )
}

export default Dashboard