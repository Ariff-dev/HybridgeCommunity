import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Footer from './components/ui/Footer'
import { Navbar } from './components/ui/Navbar'
import { Lading } from './pages/landing/Lading'
import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'
import { BlogView } from './pages/blog/Preview/BlogView'

function App() {
  const location = useLocation()

  // Don't show Footer on auth pages
  const hideFooter = location.pathname === '/login' || location.pathname === '/register'

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Lading />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/blog" element={<BlogView />} />
      </Routes>
      {!hideFooter && <Footer />}
    </>
  )
}

export default App
