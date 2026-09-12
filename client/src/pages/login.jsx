import { useState } from 'react'
import './Login.css'

function Login({ setToken }) {
    
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            setMessage(data.message)
            return
        }

        localStorage.setItem('token', data.token)
        setToken(data.token)

        setMessage('Login successful!')
    }

    return (
        <div className="auth-page">
            
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                {message && <p>{message}</p>}
                
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">
                    Login
                </button>

                <p className="auth-switch">
                    Don't have an account? <a href="/register">Register</a>
                </p>
            </form>
        </div>
    )
}

export default Login