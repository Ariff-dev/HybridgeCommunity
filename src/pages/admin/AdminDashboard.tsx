import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PenSquare, FileText, TrendingUp, Eye } from 'lucide-react'
import { AdminLayout } from './components/AdminLayout'

export const AdminDashboard = () => {
    const stats = [
        { label: 'Total Posts', value: '12', icon: FileText, color: 'text-primary' },
        { label: 'Publicados', value: '8', icon: Eye, color: 'text-complementary' },
        { label: 'Borradores', value: '4', icon: PenSquare, color: 'text-helper' },
        { label: 'Total Likes', value: '234', icon: TrendingUp, color: 'text-rose-500' },
    ]

    return (
        <AdminLayout>
            {/* Header */}
            <div className='mb-8'>
                <h1 className='text-4xl font-bold text-secondary mb-2'>
                    Dashboard
                </h1>
                <p className='text-secondary/60'>
                    Administra tus publicaciones del blog
                </p>
            </div>

            {/* Stats Grid */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
                {stats.map((stat, index) => {
                    const Icon = stat.icon
                    return (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className='bg-secondary/5 border border-secondary/20 rounded-xl p-6 hover:shadow-lg hover:shadow-primary/10 transition-all'
                        >
                            <div className='flex items-center justify-between mb-4'>
                                <Icon className={`w-10 h-10 ${stat.color}`} />
                            </div>
                            <h3 className='text-3xl font-bold text-secondary mb-1'>
                                {stat.value}
                            </h3>
                            <p className='text-secondary/60 text-sm'>
                                {stat.label}
                            </p>
                        </motion.div>
                    )
                })}
            </div>

            {/* Quick Actions */}
            <div className='bg-secondary/5 border border-secondary/20 rounded-xl p-8'>
                <h2 className='text-2xl font-bold text-secondary mb-6'>
                    Acciones Rápidas
                </h2>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                    <Link
                        to='/admin/create'
                        className='flex items-center gap-4 p-6 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-xl transition-all group'
                    >
                        <PenSquare className='w-8 h-8 text-primary group-hover:scale-110 transition-transform' />
                        <div>
                            <h3 className='font-bold text-secondary text-lg'>
                                Crear Nuevo Post
                            </h3>
                            <p className='text-secondary/60 text-sm'>
                                Escribe una nueva publicación
                            </p>
                        </div>
                    </Link>

                    <Link
                        to='/admin/posts'
                        className='flex items-center gap-4 p-6 bg-complementary/10 hover:bg-complementary/20 border border-complementary/30 rounded-xl transition-all group'
                    >
                        <FileText className='w-8 h-8 text-complementary group-hover:scale-110 transition-transform' />
                        <div>
                            <h3 className='font-bold text-secondary text-lg'>
                                Ver Todos los Posts
                            </h3>
                            <p className='text-secondary/60 text-sm'>
                                Gestiona tus publicaciones
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </AdminLayout>
    )
}
