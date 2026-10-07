import categoriesData from '../data/categories.json'
import { useActivities } from '../hooks/useActivities.js'

export default function Categories() {
  const { activities } = useActivities()

  return (
    <div>
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Where points come from</p>
          <h1>Categories</h1>
        </div>
      </header>

      <div className="category-grid">
        {categoriesData.map((c) => {
          const count = activities.filter((a) => a.category === c.id).length
          const points = activities
            .filter((a) => a.category === c.id)
            .reduce((sum, a) => sum + (a.pointsApproved || 0), 0)
          return (
            <div key={c.id} className="category-card" style={{ borderLeftColor: c.color }}>
              <h3>{c.name}</h3>
              <p className="category-desc">{c.description}</p>
              <div className="category-stats">
                <span>{count} logged</span>
                <span>{points} pts earned</span>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
