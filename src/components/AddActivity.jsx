import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useActivities } from '../hooks/useActivities.js'
import categoriesData from '../data/categories.json'

const today = new Date().toISOString().slice(0, 10)

export default function AddActivity() {
  const { addActivity } = useActivities()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    title: '',
    category: categoriesData[0].id,
    date: today,
    description: '',
    pointsClaimed: '',
  })
  const [submitted, setSubmitted] = useState(false)

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    addActivity({
      title: form.title.trim(),
      category: form.category,
      date: form.date,
      description: form.description.trim(),
      pointsClaimed: Number(form.pointsClaimed) || 0,
    })
    setSubmitted(true)
    setTimeout(() => navigate('/activities'), 900)
  }

  return (
    <div>
      <header className="page-header">
        <div>
          <p className="page-eyebrow">Log your work</p>
          <h1>Add Activity</h1>
          <p className="page-sub">New entries are submitted with Pending status until they're approved.</p>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="activity-form">
        <label>
          Activity title
          <input
            type="text"
            value={form.title}
            onChange={(e) => update('title', e.target.value)}
            placeholder="e.g. Coding Club Workshop"
            required
          />
        </label>

        <div className="form-row">
          <label>
            Category
            <select value={form.category} onChange={(e) => update('category', e.target.value)}>
              {categoriesData.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </label>
          <label>
            Date
            <input
              type="date"
              value={form.date}
              onChange={(e) => update('date', e.target.value)}
              required
            />
          </label>
        </div>

        <label>
          Description
          <textarea
            value={form.description}
            onChange={(e) => update('description', e.target.value)}
            rows={4}
            placeholder="What did you do, and what was your role?"
            required
          />
        </label>

        <label className="points-field">
          Points claimed
          <input
            type="number"
            min="0"
            value={form.pointsClaimed}
            onChange={(e) => update('pointsClaimed', e.target.value)}
            placeholder="0"
            required
          />
        </label>

        <button type="submit" className="btn-primary">Submit activity</button>
        {submitted && <p className="form-success">Activity submitted — redirecting to your activities…</p>}
      </form>
    </div>
  )
}
