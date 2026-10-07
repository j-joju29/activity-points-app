import { useMemo, useState } from 'react'
import { useActivities } from '../hooks/useActivities.js'
import students from '../data/students.json'
import categoriesData from '../data/categories.json'

export default function AdminActivityReview() {
  const { allActivities, reviewActivity } = useActivities()
  const [statusFilter, setStatusFilter] = useState('Pending')
  const [draftPoints, setDraftPoints] = useState({})

  const filtered = useMemo(() => {
    const sorted = [...allActivities].sort((a, b) => new Date(b.date) - new Date(a.date))
    if (statusFilter === 'all') return sorted
    return sorted.filter((a) => a.status === statusFilter)
  }, [allActivities, statusFilter])

  function studentName(uid) {
    return students.find((s) => s.uid === uid)?.name || uid
  }
  function categoryName(id) {
    return categoriesData.find((c) => c.id === id)?.name || id
  }

  function pointsFor(activity) {
    return draftPoints[activity.id] ?? activity.pointsClaimed
  }

  function approve(activity) {
    const points = Number(pointsFor(activity))
    reviewActivity(activity.id, { status: 'Approved', pointsApproved: isNaN(points) ? 0 : points })
  }

  function reject(activity) {
    reviewActivity(activity.id, { status: 'Rejected', pointsApproved: 0 })
  }

  function resetToPending(activity) {
    reviewActivity(activity.id, { status: 'Pending', pointsApproved: 0 })
  }

  return (
    <div>
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Coordinator view</p>
          <h1>Review Activities</h1>
        </div>
      </header>

      <div className="filter-bar">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
          <option value="all">All statuses</option>
        </select>
      </div>

      <div className="table-wrap">
        <table className="activity-table">
          <thead>
            <tr>
              <th>Activity</th>
              <th>Student</th>
              <th>Category</th>
              <th>Date</th>
              <th>Claimed</th>
              <th>Award points</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id}>
                <td>{a.title}</td>
                <td>{studentName(a.uid)}</td>
                <td>{categoryName(a.category)}</td>
                <td>{a.date}</td>
                <td>{a.pointsClaimed}</td>
                <td>
                  <input
                    type="number"
                    min="0"
                    className="inline-points-input"
                    value={pointsFor(a)}
                    onChange={(e) =>
                      setDraftPoints((prev) => ({ ...prev, [a.id]: e.target.value }))
                    }
                    disabled={a.status === 'Approved'}
                  />
                </td>
                <td>
                  <span className={'status-badge status-' + a.status.toLowerCase()}>{a.status}</span>
                </td>
                <td>
                  <div className="row-actions">
                    {a.status !== 'Approved' && (
                      <button className="btn-mini btn-mini-approve" onClick={() => approve(a)}>Approve</button>
                    )}
                    {a.status !== 'Rejected' && (
                      <button className="btn-mini btn-mini-reject" onClick={() => reject(a)}>Reject</button>
                    )}
                    {a.status !== 'Pending' && (
                      <button className="btn-mini" onClick={() => resetToPending(a)}>Reset</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="empty-note">No activities match this filter.</p>}
      </div>
    </div>
  )
}
