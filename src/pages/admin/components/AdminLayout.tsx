import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { PenSquare, FileText, LogOut, LayoutDashboard } from 'lucide-react'
import { useAuthStore } from '../../../store/authStore'

interface AdminLayoutProps {
    children: ReactNode
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
    const location = useLocation()
    const { user, logout } = useAuthStore()

    const navItems = [
        { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
        { path: '/admin/posts', icon: FileText, label: 'Posts' },
        { path: '/admin/create', icon: PenSquare, label: 'Crear Post' },
    ]

    const isActive = (path: string) => location.pathname === path

    return (
        <div className='flex min-h-screen bg-contrast'>
            {/* Sidebar */}
            <motion.aside
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className='w-64 bg-secondary/5 border-r border-secondary/20 flex flex-col'
            >
                {/* Logo/Header */}
                <div className='p-6 border-b border-secondary/20'>
                    <h2 className='text-2xl font-bold text-secondary'>
                        Admin Panel
                    </h2>
                    {user && (
                        <p className='text-sm text-secondary/60 mt-2'>
                            {user.name}
                        </p>
                    )}
                </div>

                {/* Navigation */}
                <nav className='flex-1 p-4'>
                    <ul className='space-y-2'>
                        {navItems.map((item) => {
                            const Icon = item.icon
                            return (
                                <li key={item.path}>
                                    <Link
                                        to={item.path}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive(item.path)
                                                ? 'bg-primary text-secondary shadow-lg shadow-primary/30'
                                                : 'text-secondary/70 hover:bg-secondary/10 hover:text-secondary'
                                            }`}
                                    >
                                        <Icon className='w-5 h-5' />
                                        <span className='font-medium'>{item.label}</span>
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                {/* Logout Button */}
                <div className='p-4 border-t border-secondary/20'>
                    <button
                        onClick={logout}
                        className='w-full flex items-center gap-3 px-4 py-3 rounded-lg text-rose-600 hover:bg-rose-500/10 transition-all'
                    >
                        <LogOut className='w-5 h-5' />
                        <span className='font-medium'>Cerrar Sesión</span>
                    </button>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className='flex-1 overflow-y-auto'>
                <div className='max-w-7xl mx-auto p-8'>
                    {children}
                </div>
            </main>
        </div>
    )
}
