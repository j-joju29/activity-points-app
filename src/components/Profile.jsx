import { useAuth } from '../context/AuthContext.jsx'
import { useActivities } from '../hooks/useActivities.js'
import categoriesData from '../data/categories.json'

export default function Profile() {
  const { student } = useAuth()
  const { activities } = useActivities()

  const earned = activities.reduce((sum, a) => sum + (a.pointsApproved || 0), 0)
  const approved = activities.filter((a) => a.status === 'Approved').length
  const pending = activities.filter((a) => a.status === 'Pending').length
  const rejected = activities.filter((a) => a.status === 'Rejected').length

  const byCategory = categoriesData
    .map((c) => ({
      ...c,
      points: activities
        .filter((a) => a.category === c.id)
        .reduce((sum, a) => sum + (a.pointsApproved || 0), 0),
    }))
    .filter((c) => c.points > 0)

  return (
    <div>
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Your record</p>
          <h1>Profile</h1>
        </div>
      </header>

      <section className="profile-card">
        <span className="profile-avatar">{student.name.charAt(0)}</span>
        <div>
          <h2>{student.name}</h2>
          <p className="page-sub">{student.department} · Semester {student.semester}</p>
          <p className="page-sub">UID {student.uid}</p>
        </div>
      </section>

      <section className="detail-grid">
        <div className="detail-cell">
          <p className="detail-label">Total points</p>
          <p className="detail-value">{earned} / {student.targetPoints}</p>
        </div>
        <div className="detail-cell">
          <p className="detail-label">Approved</p>
          <p className="detail-value">{approved}</p>
        </div>
        <div className="detail-cell">
          <p className="detail-label">Pending</p>
          <p className="detail-value">{pending}</p>
        </div>
        <div className="detail-cell">
          <p className="detail-label">Rejected</p>
          <p className="detail-value">{rejected}</p>
        </div>
      </section>

      {byCategory.length > 0 && (
        <section className="recent-block">
          <div className="section-header">
            <h2>Points by category</h2>
          </div>
          <ul className="category-bar-list">
            {byCategory.map((c) => (
              <li key={c.id}>
                <span className="bar-label">{c.name}</span>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{ width: Math.min((c.points / earned) * 100, 100) + '%', background: c.color }}
                  />
                </div>
                <span className="bar-value">{c.points}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
