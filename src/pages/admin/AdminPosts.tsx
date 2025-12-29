import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PenSquare, Trash2, Eye, Loader2 } from 'lucide-react'
import { AdminLayout } from './components/AdminLayout'
import { apiService } from '../../services/api'
import type { BlogPost } from '../../interfaces/api/blog'

export const AdminPosts = () => {
    const [posts, setPosts] = useState<BlogPost[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [deleteModalPost, setDeleteModalPost] = useState<string | null>(null)

    const fetchPosts = async () => {
        try {
            setLoading(true)
            setError(null)

            console.log('📥 Fetching all posts for admin panel...')

            // Fetch all posts WITHOUT status filter to show draft, published, and archived
            // By default, the API filters to 'published' only, so we need to explicitly
            // not send the status parameter, or send all statuses
            const response = await apiService.getBlogPosts({
                page: 1,
                limit: 50
                // NO status filter - shows all posts regardless of status
            })

            console.log('📥 Response:', response)

            if (response.success && response.data) {
                console.log('✅ Posts loaded:', response.data.length)
                setPosts(response.data)
            } else {
                console.log('⚠️ No data in response or success is false, setting empty array')
                setPosts([])
            }
        } catch (err) {
            console.error('❌ Error fetching posts:', err)
            setError('No se pudieron cargar los posts')
            setPosts([]) // Set empty array on error
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    const handleDelete = async (postId: string) => {
        try {
            const response = await apiService.deleteBlogPost(postId)
            if (response.success) {
                setPosts(posts.filter(p => p.id_post !== postId))
                setDeleteModalPost(null)
            }
        } catch (err) {
            console.error('Error deleting post:', err)
            alert('Error al eliminar el post')
        }
    }

    const handlePublish = async (postId: string) => {
        try {
            const response = await apiService.publishBlogPost(postId)
            if (response.success) {
                // Refresh posts
                fetchPosts()
            }
        } catch (err) {
            console.error('Error publishing post:', err)
            alert('Error al publicar el post')
        }
    }

    const getStatusBadge = (status: string) => {
        const styles = {
            published: 'bg-green-500/20 text-green-600 border-green-500/30',
            draft: 'bg-yellow-500/20 text-yellow-600 border-yellow-500/30',
            archived: 'bg-gray-500/20 text-gray-600 border-gray-500/30',
        }

        return (
            <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${styles[status as keyof typeof styles]}`}>
                {status.toUpperCase()}
            </span>
        )
    }

    return (
        <AdminLayout>
            {/* Header */}
            <div className='flex items-center justify-between mb-8'>
                <div>
                    <h1 className='text-4xl font-bold text-secondary mb-2'>
                        Mis Posts
                    </h1>
                    <p className='text-secondary/60'>
                        Administra todas tus publicaciones
                    </p>
                </div>
                <Link
                    to='/admin/create'
                    className='px-6 py-3 bg-primary hover:bg-primary/90 rounded-lg text-secondary font-medium transition-colors shadow-lg shadow-primary/30 flex items-center gap-2'
                >
                    <PenSquare className='w-5 h-5' />
                    Crear Post
                </Link>
            </div>

            {/* Loading State */}
            {loading && (
                <div className='flex flex-col items-center justify-center py-20'>
                    <Loader2 className='w-12 h-12 text-primary animate-spin mb-4' />
                    <p className='text-secondary/60'>Cargando posts...</p>
                </div>
            )}

            {/* Error State */}
            {error && !loading && (
                <div className='bg-rose-500/10 border border-rose-500/30 rounded-xl p-6 text-center'>
                    <p className='text-rose-600 font-medium'>{error}</p>
                </div>
            )}

            {/* Posts List */}
            {!loading && !error && (
                <div className='space-y-4'>
                    {(posts || []).map((post, index) => (
                        <motion.div
                            key={post.id_post}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className='bg-secondary/5 border border-secondary/20 rounded-xl p-6 hover:shadow-lg transition-all'
                        >
                            <div className='flex items-start gap-4'>
                                {/* Cover Image */}
                                {post.cover_image_url && (
                                    <img
                                        src={post.cover_image_url}
                                        alt={post.title}
                                        className='w-24 h-24 object-cover rounded-lg'
                                    />
                                )}

                                {/* Post Info */}
                                <div className='flex-1'>
                                    <div className='flex items-start justify-between mb-2'>
                                        <h3 className='text-xl font-bold text-secondary'>
                                            {post.title}
                                        </h3>
                                        {getStatusBadge(post.status)}
                                    </div>
                                    <p className='text-secondary/70 mb-3 line-clamp-2'>
                                        {post.excerpt}
                                    </p>
                                    <div className='text-sm text-secondary/60'>
                                        {new Date(post.created_at).toLocaleDateString('es-ES')} • {post.likes_count} likes
                                    </div>
                                </div>

                                {/* Actions */}
                                <div className='flex items-center gap-2'>
                                    {post.status === 'draft' && (
                                        <button
                                            onClick={() => handlePublish(post.id_post)}
                                            className='p-2 hover:bg-green-500/10 text-green-600 rounded-lg transition-colors'
                                            title='Publicar'
                                        >
                                            <Eye className='w-5 h-5' />
                                        </button>
                                    )}
                                    <Link
                                        to={`/admin/edit/${post.id_post}`}
                                        className='p-2 hover:bg-primary/10 text-primary rounded-lg transition-colors'
                                        title='Editar'
                                    >
                                        <PenSquare className='w-5 h-5' />
                                    </Link>
                                    <button
                                        onClick={() => setDeleteModalPost(post.id_post)}
                                        className='p-2 hover:bg-rose-500/10 text-rose-600 rounded-lg transition-colors'
                                        title='Eliminar'
                                    >
                                        <Trash2 className='w-5 h-5' />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}

                    {(posts || []).length === 0 && (
                        <div className='text-center py-20'>
                            <PenSquare className='w-16 h-16 text-secondary/30 mx-auto mb-4' />
                            <h3 className='text-xl font-bold text-secondary mb-2'>
                                No hay posts aún
                            </h3>
                            <p className='text-secondary/60 mb-6'>
                                Crea tu primer post para comenzar
                            </p>
                            <Link
                                to='/admin/create'
                                className='inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 rounded-lg text-secondary font-medium transition-colors'
                            >
                                <PenSquare className='w-5 h-5' />
                                Crear Post
                            </Link>
                        </div>
                    )}
                </div>
            )}

            {/* Delete Confirmation Modal */}
            {deleteModalPost && (
                <div className='fixed inset-0 bg-contrast/80 backdrop-blur-sm flex items-center justify-center z-50'>
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className='bg-secondary/5 border border-secondary/20 rounded-xl p-8 max-w-md mx-4'
                    >
                        <h3 className='text-2xl font-bold text-secondary mb-4'>
                            ¿Eliminar Post?
                        </h3>
                        <p className='text-secondary/70 mb-6'>
                            Esta acción no se puede deshacer. El post será eliminado permanentemente.
                        </p>
                        <div className='flex gap-4'>
                            <button
                                onClick={() => setDeleteModalPost(null)}
                                className='flex-1 px-6 py-3 bg-secondary/10 hover:bg-secondary/20 rounded-lg text-secondary font-medium transition-colors'
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => handleDelete(deleteModalPost)}
                                className='flex-1 px-6 py-3 bg-rose-600 hover:bg-rose-700 rounded-lg text-white font-medium transition-colors'
                            >
                                Eliminar
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AdminLayout>
    )
}
