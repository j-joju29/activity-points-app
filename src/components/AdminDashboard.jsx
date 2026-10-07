import { Link } from 'react-router-dom'
import students from '../data/students.json'
import { useActivities } from '../hooks/useActivities.js'

export default function AdminDashboard() {
  const { allActivities } = useActivities()

  const pending = allActivities.filter((a) => a.status === 'Pending')
  const approved = allActivities.filter((a) => a.status === 'Approved')
  const pointsAwarded = approved.reduce((sum, a) => sum + (a.pointsApproved || 0), 0)

  const recentPending = [...pending]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 5)

  function studentName(uid) {
    return students.find((s) => s.uid === uid)?.name || uid
  }

  return (
    <div>
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Coordinator view</p>
          <h1>Overview</h1>
        </div>
        <Link to="/admin/review" className="btn-primary">Review Activities</Link>
      </header>

      <section className="stat-grid">
        <div className="stat-card">
          <p className="stat-label">Students</p>
          <p className="stat-value">{students.length}</p>
          <p className="stat-note">registered in the system</p>
        </div>
        <div className="stat-card highlight">
          <p className="stat-label">Awaiting review</p>
          <p className="stat-value">{pending.length}</p>
          <p className="stat-note">activities pending approval</p>
        </div>
        <div className="stat-card">
          <p className="stat-label">Points awarded</p>
          <p className="stat-value">{pointsAwarded}</p>
          <p className="stat-note">across {approved.length} approved activities</p>
        </div>
      </section>

      <section className="recent-block">
        <div className="section-header">
          <h2>Needs your attention</h2>
          <Link to="/admin/review">Review all</Link>
        </div>
        <ul className="recent-list">
          {recentPending.map((a) => (
            <li key={a.id} className="recent-item">
              <span className="status-dot status-pending" />
              <div>
                <p className="recent-title">{a.title}</p>
                <p className="recent-meta">{studentName(a.uid)} · {a.date} · {a.pointsClaimed} pts claimed</p>
              </div>
            </li>
          ))}
          {recentPending.length === 0 && <p className="empty-note">Nothing pending — all caught up.</p>}
        </ul>
      </section>
    </div>
  )
}
