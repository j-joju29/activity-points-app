import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useActivities } from '../hooks/useActivities.js'
import categoriesData from '../data/categories.json'

export default function ActivityList() {
  const { activities: myActivities } = useActivities()
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  const filtered = useMemo(() => {
    return myActivities.filter((a) => {
      const categoryOk = categoryFilter === 'all' || a.category === categoryFilter
      const statusOk = statusFilter === 'all' || a.status === statusFilter
      return categoryOk && statusOk
    })
  }, [categoryFilter, statusFilter, myActivities])

  function categoryName(id) {
    return categoriesData.find((c) => c.id === id)?.name || id
  }

  return (
    <div>
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Your record</p>
          <h1>Activities</h1>
        </div>
        <Link to="/add-activity" className="btn-primary">Add Activity</Link>
      </header>

      <div className="filter-bar">
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="all">All categories</option>
          {categoriesData.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">All statuses</option>
          <option value="Approved">Approved</option>
          <option value="Pending">Pending</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <div className="table-wrap">
        <table className="activity-table">
          <thead>
            <tr>
              <th>Activity</th>
              <th>Category</th>
              <th>Date</th>
              <th>Claimed</th>
              <th>Approved</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((a) => (
              <tr key={a.id}>
                <td>
                  <Link to={'/activities/' + a.id} className="table-link">{a.title}</Link>
                </td>
                <td>{categoryName(a.category)}</td>
                <td>{a.date}</td>
                <td>{a.pointsClaimed}</td>
                <td>{a.pointsApproved}</td>
                <td>
                  <span className={'status-badge status-' + a.status.toLowerCase()}>{a.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && <p className="empty-note">No activities match these filters.</p>}
      </div>
    </div>
  )
}
