import API_CONFIG from '../config/api'
import type { ApiResponse, RegisterResponse, LoginResponse } from '../interfaces/api/responses'

class ApiService {
    private baseURL: string

    constructor() {
        this.baseURL = API_CONFIG.baseURL
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse<T>> {
        const url = `${this.baseURL}${endpoint}`

        // Get token from localStorage if it exists
        const token = this.getToken()

        const config: RequestInit = {
            ...options,
            headers: {
                ...API_CONFIG.headers,
                ...(token ? { Authorization: `Bearer ${token}` } : {}),
                ...options.headers,
            },
        }

        try {
            const response = await fetch(url, config)
            const data = await response.json()

            if (!response.ok) {
                throw {
                    success: false,
                    message: data.message || 'Request error',
                    errors: data.errors,
                    status: response.status,
                }
            }

            return data
        } catch (error) {
            console.error('API Error:', error)
            throw error
        }
    }

    private getToken(): string | null {
        try {
            const authStorage = localStorage.getItem('auth-storage')
            if (authStorage) {
                const parsed = JSON.parse(authStorage)
                return parsed.state?.token || null
            }
        } catch (error) {
            console.error('Error reading token:', error)
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
}

export const apiService = new ApiService()
