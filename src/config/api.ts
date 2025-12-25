// API Configuration
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8001'

export const API_CONFIG = {
    baseURL: API_URL,
    endpoints: {
        register: '/api/auth/register',
        login: '/api/auth/login',
        logout: '/api/auth/logout',
        me: '/api/auth/me',
        refresh: '/api/auth/refresh',
    },
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    tokenExpiry: {
        access: 900, // 15 minutes
        refresh: 604800, // 7 days
    }
}

export default API_CONFIG
