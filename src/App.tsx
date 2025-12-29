import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Footer from './components/ui/Footer'
import { Navbar } from './components/ui/Navbar'
import { Lading } from './pages/landing/Lading'
import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'
import { BlogView } from './pages/blog/preview/BlogView'
import { ProtectedRoute } from './components/ProtectedRoute'
import { AdminDashboard } from './pages/admin/AdminDashboard'
import { AdminPosts } from './pages/admin/AdminPosts'
import { AdminCreatePost } from './pages/admin/AdminCreatePost'

function App() {
  const location = useLocation()

  // Don't show Footer and Navbar on auth pages and admin pages
  const hideFooter = location.pathname === '/login' || location.pathname === '/register' || location.pathname.startsWith('/admin')
  const hideNavbar = location.pathname.startsWith('/admin')

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Lading />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog" element={<BlogView />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        } />
        <Route path="/admin/posts" element={
          <ProtectedRoute>
            <AdminPosts />
          </ProtectedRoute>
        } />
        <Route path="/admin/create" element={
          <ProtectedRoute>
            <AdminCreatePost />
          </ProtectedRoute>
        } />
      </Routes>
      {!hideFooter && <Footer />}
    </>
  )
}

export default App
