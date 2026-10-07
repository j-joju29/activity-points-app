import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useActivities } from '../hooks/useActivities.js'

export default function Dashboard() {
  const { student } = useAuth()
  const { activities: myActivities } = useActivities()

  const earned = myActivities.reduce((sum, a) => sum + (a.pointsApproved || 0), 0)
  const target = student.targetPoints
  const remaining = Math.max(target - earned, 0)
  const pct = Math.min(Math.round((earned / target) * 100), 100)

  const pending = myActivities.filter((a) => a.status === 'Pending').length
  const recent = [...myActivities].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 4)

  return (
    <div>
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Welcome back</p>
          <h1>{student.name}</h1>
          <p className="page-sub">{student.department} · Semester {student.semester} · UID {student.uid}</p>
        </div>
        <Link to="/add-activity" className="btn-primary">Add Activity</Link>
      </header>

      <section className="stat-grid">
        <div className="stat-card highlight">
          <p className="stat-label">Points earned</p>
          <p className="stat-value">{earned}</p>
          <p className="stat-note">of {target} required</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Points remaining</p>
          <p className="stat-value">{remaining}</p>
          <p className="stat-note">to reach your target</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Activities logged</p>
          <p className="stat-value">{myActivities.length}</p>
          <p className="stat-note">{pending} awaiting approval</p>
        </div>
      </section>

      <section className="progress-block">
        <div className="progress-header">
          <span>Progress toward target</span>
          <span>{pct}%</span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: pct + '%' }} />
        </div>
      </section>

      <section className="recent-block">
        <div className="section-header">
          <h2>Recent activities</h2>
          <Link to="/activities">View all</Link>
        </div>
        <ul className="recent-list">
          {recent.map((a) => (
            <li key={a.id}>
              <Link to={'/activities/' + a.id} className="recent-item">
                <span className={'status-dot status-' + a.status.toLowerCase()} />
                <div>
                  <p className="recent-title">{a.title}</p>
                  <p className="recent-meta">{a.date} · {a.pointsClaimed} pts claimed</p>
                </div>
                <span className={'status-badge status-' + a.status.toLowerCase()}>{a.status}</span>
              </Link>
            </li>
          ))}
          {recent.length === 0 && <p className="empty-note">No activities logged yet — add your first one.</p>}
        </ul>
      </section>
    </div>
  )
}
