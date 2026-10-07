import { Link, useParams } from 'react-router-dom'
import { useActivities } from '../hooks/useActivities.js'
import categoriesData from '../data/categories.json'

export default function ActivityDetails() {
  const { id } = useParams()
  const { activities } = useActivities()
  const activity = activities.find((a) => String(a.id) === id)

  if (!activity) {
    return (
      <div>
        <p className="empty-note">Activity not found.</p>
        <Link to="/activities" className="btn-secondary">Back to activities</Link>
      </div>
    )
  }

  const category = categoriesData.find((c) => c.id === activity.category)

  return (
    <div>
      <Link to="/activities" className="back-link">← Back to activities</Link>

      <header className="page-header">
        <div>
          <p className="page-eyebrow">{category?.name || activity.category}</p>
          <h1>{activity.title}</h1>
          <p className="page-sub">{activity.date}</p>
        </div>
        <span className={'status-badge status-' + activity.status.toLowerCase()}>{activity.status}</span>
      </header>

      <section className="detail-card">
        <p className="detail-label">Description</p>
        <p className="detail-text">{activity.description}</p>
      </section>

      <section className="detail-grid">
        <div className="detail-cell">
          <p className="detail-label">Points claimed</p>
          <p className="detail-value">{activity.pointsClaimed}</p>
        </div>
        <div className="detail-cell">
          <p className="detail-label">Points approved</p>
          <p className="detail-value">{activity.pointsApproved}</p>
        </div>
        <div className="detail-cell">
          <p className="detail-label">Category</p>
          <p className="detail-value">{category?.name || activity.category}</p>
        </div>
      </section>
    </div>
  )
}
