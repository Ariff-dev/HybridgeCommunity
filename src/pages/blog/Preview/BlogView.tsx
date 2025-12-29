import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { HeroBlog } from './components/HeroBlog'
import { BlogCard } from './components/BlogCard'
import { apiService } from '../../../services/api'
import type { BlogPost } from '../../../interfaces/api/blog'

export const BlogView = () => {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const postsPerPage = 9

  const fetchPosts = async (page: number) => {
    try {
      setLoading(true)
      setError(null)

      console.log('📰 Fetching published posts for /blog page:', { page, limit: postsPerPage })

      const response = await apiService.getBlogPosts({
        status: 'published',
        page,
        limit: postsPerPage
      })

      console.log('📰 Full API Response:', response)
      console.log('📰 Posts array:', response.data)
      console.log('📰 Pagination:', response.pagination)

      // API returns: { success: true, data: [...], pagination: {...} }
      if (response.success && response.data) {
        const postsArray = response.data || []
        console.log(`📰 Setting ${postsArray.length} posts`)
        setPosts(postsArray)

        if (response.pagination) {
          const pages = Math.ceil(response.pagination.count / postsPerPage)
          console.log(`📰 Total pages: ${pages} (count: ${response.pagination.count})`)
          setTotalPages(pages)
        } else {
          console.log('📰 No pagination data, defaulting to 1 page')
          setTotalPages(1)
        }
      } else {
        console.warn('⚠️ Response not successful or no data')
      }
    } catch (err) {
      console.error('❌ Error fetching blog posts:', err)
      setError('No se pudieron cargar los posts. Por favor, intenta de nuevo.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchPosts(currentPage)
  }, [currentPage])

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className='min-h-screen bg-contrast'>
      <HeroBlog />

      {/* Blog Posts Section */}
      <div className='max-w-7xl mx-auto px-4 py-16'>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='text-center mb-12'
        >
          <h2 className='text-4xl font-bold text-secondary mb-4'>
            Últimas Publicaciones
          </h2>
          <div className='h-1 w-24 bg-gradient-to-r from-complementary to-helper mx-auto rounded-full' />
        </motion.div>

        {/* Loading State */}
        {loading && (
          <div className='flex flex-col items-center justify-center py-20'>
            <Loader2 className='w-12 h-12 text-primary animate-spin mb-4' />
            <p className='text-secondary/60 text-lg'>Cargando posts...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className='bg-rose-500/10 border border-rose-500/30 rounded-xl p-6 text-center'>
            <p className='text-rose-600 font-medium'>{error}</p>
            <button
              onClick={() => fetchPosts(currentPage)}
              className='mt-4 px-6 py-2 bg-primary hover:bg-primary/90 text-secondary rounded-lg transition-colors'
            >
              Reintentar
            </button>
          </div>
        )}

        {/* Posts Grid */}
        {(() => {
          console.log('🎨 Render Check:', {
            loading,
            error,
            postsLength: posts.length,
            posts,
            shouldShow: !loading && !error && posts.length > 0
          })
          return null
        })()}

        {!loading && !error && posts.length > 0 && (
          <>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
              {posts.map((post, index) => (
                <BlogCard key={post.id_post} post={post} index={index} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className='flex items-center justify-center gap-2'
              >
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className='p-2 rounded-lg border border-secondary/20 hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
                >
                  <ChevronLeft className='w-5 h-5 text-secondary' />
                </button>

                {/* Page Numbers */}
                <div className='flex gap-2'>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-10 h-10 rounded-lg font-medium transition-all ${currentPage === page
                        ? 'bg-primary text-secondary shadow-lg shadow-primary/30'
                        : 'border border-secondary/20 text-secondary/60 hover:bg-secondary/5'
                        }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className='p-2 rounded-lg border border-secondary/20 hover:bg-primary/10 disabled:opacity-50 disabled:cursor-not-allowed transition-all'
                >
                  <ChevronRight className='w-5 h-5 text-secondary' />
                </button>
              </motion.div>
            )}
          </>
        )}

        {/* Empty State */}
        {!loading && !error && posts.length === 0 && (
          <div className='text-center py-20'>
            <div className='text-6xl mb-4'>📝</div>
            <h3 className='text-2xl font-bold text-secondary mb-2'>
              No hay posts disponibles
            </h3>
            <p className='text-secondary/60'>
              Vuelve pronto para ver nuevo contenido
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
