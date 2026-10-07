import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

const links = [
  { to: '/admin/dashboard', label: 'Overview' },
  { to: '/admin/review', label: 'Review Activities' },
  { to: '/admin/students', label: 'Students' },
]

export default function AdminLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <span className="brand-mark">AP</span>
          <span className="brand-name">Admin Console</span>
        </div>

        <nav className="nav-links">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => 'nav-link' + (isActive ? ' active' : '')}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="mini-profile">
            <span className="mini-avatar">{user.name.charAt(0)}</span>
            <div>
              <p className="mini-name">{user.name}</p>
              <p className="mini-uid">Coordinator</p>
            </div>
          </div>
          <button className="btn-ghost" onClick={handleLogout}>Log out</button>
        </div>
      </aside>

      <main className="main-content">
        <Outlet />
      </main>
    </div>
  )
}
