import { useEffect, useState } from 'react'
import baseActivities from '../data/activities.json'
import { useAuth } from '../context/AuthContext.jsx'

const ADDED_KEY = 'apms_added_activities'
const OVERRIDES_KEY = 'apms_activity_overrides'

function readJson(key, fallback) {
  const raw = localStorage.getItem(key)
  return raw ? JSON.parse(raw) : fallback
}

function applyOverrides(list, overrides) {
  return list.map((a) => (overrides[a.id] ? { ...a, ...overrides[a.id] } : a))
}

// Shared local "database": sample JSON activities + anything a student has
// added this session, with admin approve/reject edits layered on top.
// Everything lives in localStorage since there is no backend.
export function useActivities() {
  const { user } = useAuth()
  const [added, setAdded] = useState(() => readJson(ADDED_KEY, []))
  const [overrides, setOverrides] = useState(() => readJson(OVERRIDES_KEY, {}))

  useEffect(() => {
    localStorage.setItem(ADDED_KEY, JSON.stringify(added))
  }, [added])

  useEffect(() => {
    localStorage.setItem(OVERRIDES_KEY, JSON.stringify(overrides))
  }, [overrides])

  const merged = applyOverrides([...baseActivities, ...added], overrides)
  const mine = user ? merged.filter((a) => a.uid === user.uid) : []

  function addActivity(entry) {
    const nextId = Math.max(0, ...merged.map((a) => a.id)) + 1
    const newEntry = {
      id: nextId,
      uid: user.uid,
      status: 'Pending',
      pointsApproved: 0,
      ...entry,
    }
    setAdded((prev) => [...prev, newEntry])
    return newEntry
  }

  // Admin action: approve/reject an activity and set the points awarded.
  function reviewActivity(id, patch) {
    setOverrides((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }))
  }

  return { activities: mine, allActivities: merged, addActivity, reviewActivity }
}
