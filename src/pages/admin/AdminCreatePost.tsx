import { useState } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { X, Upload, Loader2 } from 'lucide-react'
import { AdminLayout } from './components/AdminLayout'
import { apiService } from '../../services/api'
import type { CreateBlogPostData } from '../../interfaces/api/blog'
import MDEditor from '@uiw/react-md-editor'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'

export const AdminCreatePost = () => {
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [formData, setFormData] = useState<CreateBlogPostData>({
        title: '',
        content_markdown: '',
        excerpt: '',
        cover_image_url: '',
        status: 'draft',
        tag_ids: [],
    })

    const handleSubmit = async (e: React.FormEvent, isDraft: boolean = true) => {
        e.preventDefault()
        setError(null)
        setLoading(true)

        try {
            const postData: CreateBlogPostData = {
                ...formData,
                status: isDraft ? 'draft' : 'published',
            }

            console.log('📝 Creating post with data:', postData)
            const response = await apiService.createBlogPost(postData)
            console.log('📝 Post creation response:', response)

            if (response.success) {
                console.log('✅ Post created successfully! Navigating to /admin/posts...')
                navigate('/admin/posts')
            } else {
                console.error('❌ Post creation failed:', response)
                setError('Error al crear el post: ' + (response.message || 'Error desconocido'))
            }
        } catch (err: any) {
            console.error('💥 Error creating post:', err)
            setError(err.message || err.statusText || 'Error al crear el post')
        } finally {
            setLoading(false)
        }
    }

    return (
        <AdminLayout>
            {/* Header */}
            <div className='flex items-center justify-between mb-8'>
                <div>
                    <h1 className='text-4xl font-bold text-secondary mb-2'>
                        Crear Nuevo Post
                    </h1>
                    <p className='text-secondary/60'>
                        Escribe y publica contenido para tu blog
                    </p>
                </div>
                <button
                    onClick={() => navigate('/admin/posts')}
                    className='p-2 hover:bg-secondary/10 rounded-lg transition-colors'
                >
                    <X className='w-6 h-6 text-secondary' />
                </button>
            </div>

            {/* Error Message */}
            {error && (
                <div className='bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 mb-6'>
                    <p className='text-rose-600 font-medium'>{error}</p>
                </div>
            )}

            {/* Form */}
            <motion.form
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className='space-y-6'
            >
                {/* Title */}
                <div>
                    <label className='block text-secondary font-medium mb-2'>
                        Título *
                    </label>
                    <input
                        type='text'
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder='Escribe un título atractivo...'
                        className='w-full px-4 py-3 bg-secondary/5 border border-secondary/20 rounded-lg text-secondary placeholder:text-secondary/40 focus:outline-none focus:border-primary transition-colors'
                        required
                        maxLength={200}
                    />
                    <p className='text-xs text-secondary/50 mt-1'>
                        {formData.title.length}/200 caracteres
                    </p>
                </div>

                {/* Cover Image URL */}
                <div>
                    <label className='block text-secondary font-medium mb-2'>
                        URL de Imagen de Portada
                    </label>
                    <div className='flex gap-2'>
                        <input
                            type='url'
                            value={formData.cover_image_url}
                            onChange={(e) => setFormData({ ...formData, cover_image_url: e.target.value })}
                            placeholder='https://example.com/image.jpg'
                            className='flex-1 px-4 py-3 bg-secondary/5 border border-secondary/20 rounded-lg text-secondary placeholder:text-secondary/40 focus:outline-none focus:border-primary transition-colors'
                        />
                        <button
                            type='button'
                            className='px-4 py-3 bg-primary/10 hover:bg-primary/20 border border-primary/30 rounded-lg text-primary transition-colors'
                        >
                            <Upload className='w-5 h-5' />
                        </button>
                    </div>
                    {formData.cover_image_url && (
                        <img
                            src={formData.cover_image_url}
                            alt='Preview'
                            className='mt-3 w-full h-48 object-cover rounded-lg'
                            onError={(e) => {
                                e.currentTarget.style.display = 'none'
                            }}
                        />
                    )}
                </div>

                {/* Excerpt */}
                <div>
                    <label className='block text-secondary font-medium mb-2'>
                        Resumen
                    </label>
                    <textarea
                        value={formData.excerpt}
                        onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                        placeholder='Breve descripción del post (opcional)...'
                        className='w-full px-4 py-3 bg-secondary/5 border border-secondary/20 rounded-lg text-secondary placeholder:text-secondary/40 focus:outline-none focus:border-primary transition-colors resize-none'
                        rows={3}
                    />
                </div>

                {/* Content Markdown */}
                <div data-color-mode="light">
                    <label className='block text-secondary font-medium mb-2'>
                        Contenido (Markdown) *
                    </label>
                    <div className='border border-secondary/20 rounded-lg overflow-hidden'>
                        <MDEditor
                            value={formData.content_markdown}
                            onChange={(value) => setFormData({ ...formData, content_markdown: value || '' })}
                            height={400}
                            preview='edit'
                            textareaProps={{
                                placeholder: '# Título\n\nEscribe tu contenido en Markdown...',
                                required: true,
                            }}
                        />
                    </div>
                    <p className='text-xs text-secondary/50 mt-2'>
                        💡 Usa atajos de teclado: Ctrl+B (negrita), Ctrl+I (cursiva), Ctrl+K (enlace)
                    </p>
                </div>

                {/* Action Buttons */}
                <div className='flex gap-4 pt-4'>
                    <button
                        type='submit'
                        onClick={(e) => handleSubmit(e, true)}
                        disabled={loading || !formData.title || !formData.content_markdown}
                        className='flex-1 px-6 py-3 bg-secondary/10 hover:bg-secondary/20 border border-secondary/30 rounded-lg text-secondary font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                    >
                        {loading ? (
                            <>
                                <Loader2 className='w-5 h-5 animate-spin' />
                                Guardando...
                            </>
                        ) : (
                            'Guardar como Borrador'
                        )}
                    </button>
                    <button
                        type='button'
                        onClick={(e) => handleSubmit(e, false)}
                        disabled={loading || !formData.title || !formData.content_markdown}
                        className='flex-1 px-6 py-3 bg-primary hover:bg-primary/90 rounded-lg text-secondary font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/30 flex items-center justify-center gap-2'
                    >
                        {loading ? (
                            <>
                                <Loader2 className='w-5 h-5 animate-spin' />
                                Publicando...
                            </>
                        ) : (
                            'Publicar Ahora'
                        )}
                    </button>
                </div>
            </motion.form>
        </AdminLayout>
    )
}
