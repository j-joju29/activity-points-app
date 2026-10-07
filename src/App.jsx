import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/Login.jsx'
import Layout from './components/Layout.jsx'
import Dashboard from './components/Dashboard.jsx'
import ActivityList from './components/ActivityList.jsx'
import ActivityDetails from './components/ActivityDetails.jsx'
import AddActivity from './components/AddActivity.jsx'
import Categories from './components/Categories.jsx'
import Profile from './components/Profile.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import AdminLayout from './components/AdminLayout.jsx'
import AdminDashboard from './components/AdminDashboard.jsx'
import AdminActivityReview from './components/AdminActivityReview.jsx'
import AdminStudents from './components/AdminStudents.jsx'

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute role="student">
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="activities" element={<ActivityList />} />
        <Route path="activities/:id" element={<ActivityDetails />} />
        <Route path="add-activity" element={<AddActivity />} />
        <Route path="categories" element={<Categories />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="review" element={<AdminActivityReview />} />
        <Route path="students" element={<AdminStudents />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  )
}
