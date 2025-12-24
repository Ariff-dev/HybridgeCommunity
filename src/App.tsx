import './App.css'
import { Routes, Route, useLocation } from 'react-router-dom'
import Footer from './components/ui/Footer'
import { Navbar } from './components/ui/Navbar'
import { Lading } from './pages/landing/Lading'
import { Login } from './pages/auth/Login'
import { Register } from './pages/auth/Register'

function App() {
  const location = useLocation()

  // No mostrar Footer en páginas de autenticación
  const hideFooter = location.pathname === '/login' || location.pathname === '/register'

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Lading />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {!hideFooter && <Footer />}
    </>
  )
}

export default App
