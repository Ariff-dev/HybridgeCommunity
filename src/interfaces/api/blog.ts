// Blog API Interfaces

export interface BlogTag {
    id_tag: number
    name: string
    slug: string
}

export interface BlogPost {
    id_post: string
    title: string
    excerpt: string
    content_markdown: string
    cover_image_url: string
    status: 'published' | 'draft' | 'archived'
    likes_count: number
    published_at: string
    created_at: string
    updated_at: string
    author_name: string
    author_email: string
    tags: BlogTag[]
}

import type { ApiResponse } from './responses'

// API Response Structure:
// GET /api/blog/posts returns:
// {
//   "success": true,
//   "message": "...",
//   "data": [...posts array],
//   "pagination": { page, limit, count }
// }
export interface BlogPostsApiResponse extends ApiResponse<BlogPost[]> {
    pagination: {
        page: number
        limit: number
        count: number
    }
}

export interface BlogPostsQueryParams {
    status?: 'published' | 'draft' | 'archived'
    author_id?: string
    page?: number
    limit?: number
}

// Admin Operations

export interface BlogPostImage {
    url: string
    cloudinary_id: string
    alt_text?: string
}

export interface CreateBlogPostData {
    title: string
    content_markdown: string
    excerpt?: string
    cover_image_url?: string
    status?: 'published' | 'draft' | 'archived'
    tag_ids?: number[]
    images?: BlogPostImage[]
}

export interface UpdateBlogPostData {
    title?: string
    content_markdown?: string
    excerpt?: string
    cover_image_url?: string
    tag_ids?: number[]
}

export interface CreateBlogPostResponse {
    id_post: string
}

export interface DeleteBlogPostResponse {
    cloudinary_ids: string[]
}

export interface LikePostResponse {
    action: 'liked' | 'unliked'
    likes_count: number
}

