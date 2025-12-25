// API Response Interfaces
export interface ApiResponse<T> {
    success: boolean
    message: string
    data: T
}

export interface RegisterResponse {
    user_id: string
    email: string
    name: string
}

export interface LoginResponse {
    access_token: string
    refresh_token: string
    token_type: string
    expires_in: number
    user: {
        id: string
        name: string
        email: string
    }
}

export interface ApiError {
    success: false
    message: string
    errors?: Record<string, string[]>
}
