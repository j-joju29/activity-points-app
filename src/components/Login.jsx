import { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const { user, login } = useAuth()
  const navigate = useNavigate()
  const [uid, setUid] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (user) return <Navigate to={user.role === 'admin' ? '/admin/dashboard' : '/dashboard'} replace />

  function handleSubmit(e) {
    e.preventDefault()
    const result = login(uid, password)
    if (result.ok) {
      navigate(result.role === 'admin' ? '/admin/dashboard' : '/dashboard')
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="auth-screen">
      <div className="auth-card">
        <p className="auth-eyebrow">Activity Points Management System</p>
        <h1>Sign in</h1>
        <p className="auth-sub">Students track their activity points; coordinators review and approve them, using the same sign-in.</p>

        <form onSubmit={handleSubmit} className="auth-form">
          <label>
            UID
            <input
              type="text"
              value={uid}
              onChange={(e) => setUid(e.target.value)}
              placeholder="e.g. AD24037"
              required
            />
          </label>
          <label>
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button type="submit" className="btn-primary">Sign in</button>
        </form>

        <p className="auth-hint">
          Student demo — UID <code>AD24037</code>, password <code>joel2026</code><br />
          Admin demo — UID <code>ADMIN01</code>, password <code>admin2026</code>
        </p>
      </div>
    </div>
  )
}
