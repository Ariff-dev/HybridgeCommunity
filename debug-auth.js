// Test Script to check auth token
// Open browser console and run this to debug:

// 1. Check if auth-storage exists
const authStorage = localStorage.getItem('auth-storage')
console.log('Auth Storage Raw:', authStorage)

// 2. Parse and check structure
if (authStorage) {
    const parsed = JSON.parse(authStorage)
    console.log('Parsed Auth Storage:', parsed)
    console.log('Token Path check:', parsed.state?.token)
    console.log('User:', parsed.state?.user)
    console.log('Is Authenticated:', parsed.state?.isAuthenticated)
}

// 3. Expected structure should be:
// {
//   "state": {
//     "user": {...},
//     "token": "your_jwt_token_here",
//     "refreshToken": "...",
//     "isAuthenticated": true
//   },
//   "version": 0
// }
