import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { AuthState } from '../interfaces/store/auth'
import { apiService } from '../services/api'

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            refreshToken: null,
            isAuthenticated: false,

            login: async (email, password) => {
                try {
                    const response = await apiService.login(email, password)

                    if (response.success && response.data) {
                        const { access_token, refresh_token, user } = response.data

                        set({
                            user: {
                                id: user.id,
                                name: user.name,
                                email: user.email,
                            },
                            token: access_token,
                            refreshToken: refresh_token,
                            isAuthenticated: true,
                        })

                        console.log('Login exitoso')
                    }
                } catch (error) {
                    console.error('Login error:', error)
                    throw error
                }
            },

            register: async (name, email, password) => {
                try {
                    const response = await apiService.register(name, email, password)

                    if (response.success) {
                        console.log('Registration successful, proceeding with auto-login...')

                        // Registration was successful, now auto-login
                        const loginResponse = await apiService.login(email, password)

                        if (loginResponse.success && loginResponse.data) {
                            const { access_token, refresh_token, user: loginUser } = loginResponse.data

                            set({
                                user: {
                                    id: loginUser.id,
                                    name: loginUser.name,
                                    email: loginUser.email,
                                },
                                token: access_token,
                                refreshToken: refresh_token,
                                isAuthenticated: true,
                            })

                            console.log('Auto-login after successful registration')
                        }
                    }
                } catch (error) {
                    console.error('Register error:', error)
                    throw error
                }
            },

            logout: async () => {
                try {
                    // Get refresh token before clearing state
                    const { refreshToken } = get()

                    if (refreshToken) {
                        await apiService.logout(refreshToken)
                    }
                } catch (error) {
                    console.error('Logout error:', error)
                } finally {
                    // Always clear local state
                    set({
                        user: null,
                        token: null,
                        refreshToken: null,
                        isAuthenticated: false,
                    })
                    console.log('Logout exitoso')
                }
            },

            setUser: (user) => set({ user }),
        }),
        {
            name: 'auth-storage', // Key name in localStorage
        }
    )
)
