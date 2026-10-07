import { Link } from 'react-router-dom'
import students from '../data/students.json'
import { useActivities } from '../hooks/useActivities.js'

export default function AdminStudents() {
  const { allActivities } = useActivities()

  return (
    <div>
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Coordinator view</p>
          <h1>Students</h1>
        </div>
      </header>

      <div className="table-wrap">
        <table className="activity-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>UID</th>
              <th>Department</th>
              <th>Semester</th>
              <th>Points earned</th>
              <th>Target</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => {
              const mine = allActivities.filter((a) => a.uid === s.uid)
              const earned = mine.reduce((sum, a) => sum + (a.pointsApproved || 0), 0)
              return (
                <tr key={s.uid}>
                  <td>{s.name}</td>
                  <td>{s.uid}</td>
                  <td>{s.department}</td>
                  <td>{s.semester}</td>
                  <td>{earned}</td>
                  <td>{s.targetPoints}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className="empty-note" style={{ marginTop: 16 }}>
        Approving or rejecting activities happens on the{' '}
        <Link to="/admin/review" className="table-link">Review Activities</Link> page.
      </p>
    </div>
  )
}
