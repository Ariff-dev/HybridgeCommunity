export interface User {
    id: string
    name: string
    email: string
}

export interface AuthState {
    user: User | null
    token: string | null
    refreshToken: string | null
    isAuthenticated: boolean

    // Actions
    login: (email: string, password: string) => Promise<void>
    register: (name: string, email: string, password: string) => Promise<void>
    logout: () => void
    setUser: (user: User) => void
}