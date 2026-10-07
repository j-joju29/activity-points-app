import { createContext, useContext, useState } from 'react'
import students from '../data/students.json'
import admins from '../data/admins.json'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const saved = sessionStorage.getItem('apms_user')
    return saved ? JSON.parse(saved) : null
  })

  function login(uid, password) {
    const trimmedUid = uid.trim().toLowerCase()

    const adminMatch = admins.find(
      (a) => a.uid.toLowerCase() === trimmedUid && a.password === password
    )
    if (adminMatch) {
      const { password: _pw, ...safe } = adminMatch
      const account = { ...safe, role: 'admin' }
      setUser(account)
      sessionStorage.setItem('apms_user', JSON.stringify(account))
      return { ok: true, role: 'admin' }
    }

    const studentMatch = students.find(
      (s) => s.uid.toLowerCase() === trimmedUid && s.password === password
    )
    if (studentMatch) {
      const { password: _pw, ...safe } = studentMatch
      const account = { ...safe, role: 'student' }
      setUser(account)
      sessionStorage.setItem('apms_user', JSON.stringify(account))
      return { ok: true, role: 'student' }
    }

    return { ok: false, message: 'Incorrect UID or password.' }
  }

  function logout() {
    setUser(null)
    sessionStorage.removeItem('apms_user')
  }

  return (
    <AuthContext.Provider value={{ student: user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
