import React from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, Heart, Tag } from 'lucide-react'
import type { BlogPost } from '../../../../interfaces/api/blog'

interface BlogCardProps {
    post: BlogPost
    index?: number
}

export const BlogCard: React.FC<BlogCardProps> = ({ post, index = 0 }) => {
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return new Intl.DateTimeFormat('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(date)
    }

    return (
        <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className='group relative bg-secondary/5 backdrop-blur-md border border-secondary/20 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 hover:-translate-y-2'
        >
            {/* Cover Image */}
            <div className='relative h-56 overflow-hidden bg-gradient-to-br from-primary/20 to-complementary/20'>
                {post.cover_image_url ? (
                    <img
                        src={post.cover_image_url}
                        alt={post.title}
                        className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                    />
                ) : (
                    <div className='w-full h-full flex items-center justify-center'>
                        <div className='text-6xl font-bold text-primary/30'>
                            {post.title.charAt(0).toUpperCase()}
                        </div>
                    </div>
                )}

                {/* Status Badge */}
                {post.status !== 'published' && (
                    <div className='absolute top-4 right-4 bg-helper/90 backdrop-blur-sm px-3 py-1 rounded-full'>
                        <span className='text-xs font-semibold text-secondary uppercase tracking-wider'>
                            {post.status}
                        </span>
                    </div>
                )}

                {/* Gradient Overlay */}
                <div className='absolute inset-0 bg-gradient-to-t from-contrast/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            </div>

            {/* Content */}
            <div className='p-6'>
                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className='flex flex-wrap gap-2 mb-4'>
                        {post.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag.id_tag}
                                className='inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-xs font-medium hover:bg-primary/20 transition-colors'
                            >
                                <Tag className='w-3 h-3' />
                                {tag.name}
                            </span>
                        ))}
                        {post.tags.length > 3 && (
                            <span className='inline-flex items-center px-3 py-1 bg-secondary/10 text-secondary rounded-full text-xs font-medium'>
                                +{post.tags.length - 3}
                            </span>
                        )}
                    </div>
                )}

                {/* Title */}
                <h3 className='text-2xl font-bold text-secondary mb-3 line-clamp-2 group-hover:text-primary transition-colors'>
                    {post.title}
                </h3>

                {/* Excerpt */}
                <p className='text-secondary/70 mb-4 line-clamp-3 leading-relaxed'>
                    {post.excerpt}
                </p>

                {/* Metadata */}
                <div className='flex flex-wrap items-center gap-4 text-sm text-secondary/60 pt-4 border-t border-secondary/10'>
                    {/* Author */}
                    <div className='flex items-center gap-2'>
                        <User className='w-4 h-4 text-complementary' />
                        <span className='font-medium'>{post.author_name}</span>
                    </div>

                    {/* Date */}
                    <div className='flex items-center gap-2'>
                        <Calendar className='w-4 h-4 text-helper' />
                        <span>{formatDate(post.published_at || post.created_at)}</span>
                    </div>

                    {/* Likes */}
                    <div className='flex items-center gap-2 ml-auto'>
                        <Heart className='w-4 h-4 text-rose-500' />
                        <span className='font-semibold'>{post.likes_count}</span>
                    </div>
                </div>
            </div>

            {/* Hover Effect Border */}
            <div className='absolute inset-0 border-2 border-primary/0 group-hover:border-primary/50 rounded-2xl transition-all duration-300 pointer-events-none' />
        </motion.article>
    )
}
