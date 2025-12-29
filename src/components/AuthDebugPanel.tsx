import { useAuthStore } from '../store/authStore'

export const AuthDebugPanel = () => {
    const { user, token, refreshToken, isAuthenticated } = useAuthStore()

    const checkLocalStorage = () => {
        const authStorage = localStorage.getItem('auth-storage')
        console.log('=== AUTH DEBUG ===')
        console.log('Raw localStorage:', authStorage)
        if (authStorage) {
            const parsed = JSON.parse(authStorage)
            console.log('Parsed:', parsed)
            console.log('Token exists:', !!parsed.state?.token)
            if (parsed.state?.token) {
                console.log('Token preview:', parsed.state.token.substring(0, 30) + '...')
            }
        }
        console.log('Zustand Store:')
        console.log('  - isAuthenticated:', isAuthenticated)
        console.log('  - user:', user)
        console.log('  - token exists:', !!token)
        console.log('==================')
    }

    if (!isAuthenticated) return null

    return (
        <div className='fixed bottom-4 right-4 bg-gray-900 text-white p-4 rounded-lg shadow-xl text-xs max-w-sm z-50'>
            <h3 className='font-bold mb-2 text-yellow-400'>🐛 Auth Debug Panel</h3>
            <div className='space-y-1 mb-3'>
                <p>✅ User: {user?.name}</p>
                <p>✅ Email: {user?.email}</p>
                <p className={token ? 'text-green-400' : 'text-red-400'}>
                    {token ? '✅ Token: Present' : '❌ Token: Missing'}
                </p>
                <p className={refreshToken ? 'text-green-400' : 'text-red-400'}>
                    {refreshToken ? '✅ Refresh Token: Present' : '❌ Refresh Token: Missing'}
                </p>
            </div>
            <button
                onClick={checkLocalStorage}
                className='w-full bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded text-white font-medium'
            >
                Check Console
            </button>
        </div>
    )
}
