import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, LogIn, Eye, EyeOff } from 'lucide-react'
import Logo from '../../assets/hybrige.svg'
import { useAuthStore } from '../../store/authStore'
import { handleApiError } from '../../utils/errorHandler'

export const Login = () => {
    const navigate = useNavigate()
    const login = useAuthStore((state) => state.login)
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsLoading(true)

        try {
            await login(formData.email, formData.password)
            // Navigate to home after successful login
            navigate('/')
        } catch (error) {
            const errorMessage = handleApiError(error)
            alert(errorMessage)
        } finally {
            setIsLoading(false)
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <div className='min-h-screen overflow-hidden bg-linear-to-br from-primary via-contrast to-contrast flex items-center justify-center p-4 relative'>
            {/* Decorative background elements */}
            <div className='absolute top-10 right-20 w-72 h-72 bg-complementary/10 rounded-full blur-3xl'></div>
            <div className='absolute bottom-20 left-10 w-96 h-96 bg-helper/10 rounded-full blur-3xl'></div>

            {/* Gradient overlay */}
            <div className='absolute inset-0 bg-linear-to-b from-transparent via-transparent to-contrast/30 pointer-events-none' />

            {/* Login Card */}
            <motion.div
                className='relative z-10 bg-contrast rounded-2xl shadow-2xl max-w-md w-full border border-secondary/20 overflow-hidden'
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Header */}
                <div className='bg-linear-to-br from-primary/10 via-complementary/5 to-helper/5 p-8 text-center border-b border-secondary/10'>
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <img src={Logo} alt='Hybrige Logo' width={60} height={60} className='mx-auto mb-4' />
                        <h1 className='text-3xl font-bold text-secondary mb-2'>Bienvenido</h1>
                        <p className='text-secondary/60 text-sm'>Inicia sesión en tu cuenta</p>
                    </motion.div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className='p-8 space-y-6'>
                    {/* Email Field */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <label className='flex items-center gap-2 text-sm font-semibold text-secondary mb-2'>
                            <Mail className='w-4 h-4 text-complementary' />
                            Correo electrónico
                        </label>
                        <input
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className='w-full px-4 py-3 bg-secondary/5 border border-secondary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-complementary focus:border-transparent transition-all text-secondary placeholder:text-secondary/40'
                            placeholder='tu@email.com'
                        />
                    </motion.div>

                    {/* Password Field */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <label className='flex items-center gap-2 text-sm font-semibold text-secondary mb-2'>
                            <Lock className='w-4 h-4 text-primary' />
                            Contraseña
                        </label>
                        <div className='relative'>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name='password'
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className='w-full px-4 py-3 bg-secondary/5 border border-secondary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-secondary placeholder:text-secondary/40'
                                placeholder='••••••••'
                            />
                            <button
                                type='button'
                                onClick={() => setShowPassword(!showPassword)}
                                className='absolute right-3 top-1/2 -translate-y-1/2 text-secondary/60 hover:text-secondary transition-colors'
                            >
                                {showPassword ? (
                                    <EyeOff className='w-5 h-5' />
                                ) : (
                                    <Eye className='w-5 h-5' />
                                )}
                            </button>
                        </div>
                    </motion.div>

                    {/* Remember me & Forgot password */}
                    <motion.div
                        className='flex items-center justify-between text-sm'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                    >
                        <label className='flex items-center gap-2 text-secondary/70 cursor-pointer hover:text-secondary transition-colors'>
                            <input type='checkbox' className='rounded border-secondary/20 text-primary focus:ring-primary' />
                            Recordarme
                        </label>
                        <a href='#' className='text-complementary hover:text-complementary/80 transition-colors font-medium'>
                            ¿Olvidaste tu contraseña?
                        </a>
                    </motion.div>

                    {/* Login Button */}
                    <motion.button
                        type='submit'
                        className='w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-secondary font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all'
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <LogIn className='w-5 h-5' />
                        Iniciar Sesión
                    </motion.button>

                    {/* Sign up link */}
                    <motion.div
                        className='text-center pt-4 border-t border-secondary/10'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.7 }}
                    >
                        <p className='text-secondary/60 text-sm'>
                            ¿No tienes una cuenta?{' '}
                            <Link to='/register' className='text-helper hover:text-helper/80 transition-colors font-semibold'>
                                Regístrate aquí
                            </Link>
                        </p>
                    </motion.div>
                </form>
            </motion.div>
        </div>
    )
}
