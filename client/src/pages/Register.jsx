import { useState } from 'react'
import './Register.css'

function Register() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [message, setMessage] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        const response = await fetch("http://localhost:5000/api/users",{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        })

        const data = await response.json()

        if (!response.ok) {
            setMessage(data.message)
            return
        }

        setMessage('Registration successful!')
    }

    return (
        <div className="auth-page">
            

            <form onSubmit={handleSubmit}>
                <h1>Create Account</h1>
                {message && (
                    <p className={`auth-message ${message === 'Registration successful!' ? 'success' : ''}`}>
                        {message}
                    </p>
                )}

                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

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
                    Register
                </button>

                <p className="auth-switch">
                    Already have an account? <a href="/login">Login</a>
                </p>

            </form>
        </div>
    )
}

export default Register