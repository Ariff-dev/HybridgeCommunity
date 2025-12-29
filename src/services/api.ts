import API_CONFIG from '../config/api'
import type { ApiResponse, RegisterResponse, LoginResponse } from '../interfaces/api/responses'
import type {
    BlogPost,
    BlogPostsApiResponse,
    BlogPostsQueryParams,
    CreateBlogPostData,
    CreateBlogPostResponse,
    UpdateBlogPostData,
    DeleteBlogPostResponse,
    LikePostResponse
} from '../interfaces/api/blog'

class ApiService {
    private baseURL: string

    constructor() {
        this.baseURL = API_CONFIG.baseURL
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        const url = `${this.baseURL}${endpoint} `

        // Get token from localStorage if it exists
        const token = this.getToken()

        const config: RequestInit = {
            ...options,
            headers: {
                ...API_CONFIG.headers,
                ...(token ? { Authorization: `Bearer ${token} ` } : {}),
                ...options.headers,
            },
        }

        // Debug logging
        console.log('🌐 API Request:', {
            method: options.method || 'GET',
            url,
            hasToken: !!token,
            headers: config.headers
        })

        try {
            const response = await fetch(url, config)
            const data = await response.json()

            if (!response.ok) {
                console.error('❌ API Error Response:', {
                    status: response.status,
                    statusText: response.statusText,
                    data
                })

                throw {
                    success: false,
                    message: data.message || 'Request error',
                    errors: data.errors,
                    status: response.status,
                }
            }

            console.log('✅ API Success:', response.status)
            return data
        } catch (error) {
            console.error('💥 API Error:', error)
            throw error
        }
    }

    private getToken(): string | null {
        try {
            const authStorage = localStorage.getItem('auth-storage')
            if (authStorage) {
                const parsed = JSON.parse(authStorage)
                const token = parsed.state?.token || null

                // Debug logging
                console.log('🔑 Auth Storage exists:', !!authStorage)
                console.log('🔑 Token found:', !!token)
                if (token) {
                    console.log('🔑 Token preview:', token.substring(0, 20) + '...')
                }

                return token
            }
            console.warn('⚠️ No auth-storage found in localStorage')
        } catch (error) {
            console.error('❌ Error reading token:', error)
        }
        return null
    }

    // Auth Endpoints

    async register(name: string, email: string, password: string): Promise<ApiResponse<RegisterResponse>> {
        return this.request<RegisterResponse>(API_CONFIG.endpoints.register, {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
        })
    }

    async login(email: string, password: string): Promise<ApiResponse<LoginResponse>> {
        return this.request<LoginResponse>(API_CONFIG.endpoints.login, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
        })
    }

    async logout(refreshToken: string): Promise<void> {
        try {
            await this.request(API_CONFIG.endpoints.logout, {
                method: 'POST',
                body: JSON.stringify({ refresh_token: refreshToken }),
            })
        } catch (error) {
            // Ignore logout errors
            console.error('Logout error:', error)
        }
    }

    async refreshToken(refreshToken: string): Promise<ApiResponse<{ access_token: string; expires_in: number }>> {
        return this.request(API_CONFIG.endpoints.refresh, {
            method: 'POST',
            body: JSON.stringify({ refresh_token: refreshToken }),
        })
    }

    // Blog Endpoints

    async getBlogPosts(params?: BlogPostsQueryParams): Promise<BlogPostsApiResponse> {
        const queryParams = new URLSearchParams()

        if (params?.status) queryParams.append('status', params.status)
        if (params?.author_id) queryParams.append('author_id', params.author_id)
        if (params?.page) queryParams.append('page', params.page.toString())
        if (params?.limit) queryParams.append('limit', params.limit.toString())

        const queryString = queryParams.toString()
        const endpoint = queryString ? `${API_CONFIG.endpoints.blogPosts}?${queryString} ` : API_CONFIG.endpoints.blogPosts

        return this.request<BlogPost[]>(endpoint, {
            method: 'GET',
        }) as unknown as Promise<BlogPostsApiResponse>
    }

    async createBlogPost(data: CreateBlogPostData): Promise<ApiResponse<CreateBlogPostResponse>> {
        return this.request<CreateBlogPostResponse>(API_CONFIG.endpoints.createBlogPost, {
            method: 'POST',
            body: JSON.stringify(data),
        })
    }

    async updateBlogPost(id: string, data: UpdateBlogPostData): Promise<ApiResponse<null>> {
        const endpoint = typeof API_CONFIG.endpoints.updateBlogPost === 'function'
            ? API_CONFIG.endpoints.updateBlogPost(id)
            : API_CONFIG.endpoints.updateBlogPost

        return this.request<null>(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
        })
    }

    async deleteBlogPost(id: string): Promise<ApiResponse<DeleteBlogPostResponse>> {
        const endpoint = typeof API_CONFIG.endpoints.deleteBlogPost === 'function'
            ? API_CONFIG.endpoints.deleteBlogPost(id)
            : API_CONFIG.endpoints.deleteBlogPost

        return this.request<DeleteBlogPostResponse>(endpoint, {
            method: 'DELETE',
        })
    }

    async publishBlogPost(id: string): Promise<ApiResponse<null>> {
        const endpoint = typeof API_CONFIG.endpoints.publishBlogPost === 'function'
            ? API_CONFIG.endpoints.publishBlogPost(id)
            : API_CONFIG.endpoints.publishBlogPost

        return this.request<null>(endpoint, {
            method: 'POST',
        })
    }

    async likeBlogPost(id: string): Promise<ApiResponse<LikePostResponse>> {
        const endpoint = typeof API_CONFIG.endpoints.likeBlogPost === 'function'
            ? API_CONFIG.endpoints.likeBlogPost(id)
            : API_CONFIG.endpoints.likeBlogPost

        return this.request<LikePostResponse>(endpoint, {
            method: 'POST',
        })
    }
}

export const apiService = new ApiService()
