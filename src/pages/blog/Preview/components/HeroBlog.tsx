import React from 'react'
import { motion } from 'framer-motion'
import { BookOpen, TrendingUp, Users } from 'lucide-react'

export const HeroBlog = () => {
    return (
        <div className='relative min-h-[70vh] overflow-hidden bg-gradient-to-br from-primary via-primary to-contrast flex items-center justify-center px-4 py-20'>
            {/* Decorative background elements */}
            <div className='absolute top-20 right-10 w-96 h-96 bg-complementary/10 rounded-full blur-3xl'></div>
            <div className='absolute bottom-10 left-20 w-80 h-80 bg-helper/10 rounded-full blur-3xl'></div>

            {/* Gradient overlay */}
            <div className='absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-contrast/20 pointer-events-none' />

            {/* Content */}
            <div className='relative z-10 max-w-5xl mx-auto text-center'>
                {/* Main Title */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className='mb-6'
                >
                    <h1 className='text-5xl md:text-7xl font-bold text-secondary mb-4'>
                        Blog de la Comunidad
                    </h1>
                    <div className='h-1 w-32 bg-gradient-to-r from-complementary to-helper mx-auto rounded-full'></div>
                </motion.div>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className='text-xl md:text-2xl text-secondary/80 mb-12 max-w-3xl mx-auto'
                >
                    Descubre historias, tutoriales y conocimientos compartidos por nuestra comunidad
                </motion.p>

                {/* Stats Cards */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className='grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto'
                >
                    {/* Articles Stat */}
                    <div className='bg-secondary/5 backdrop-blur-md border border-secondary/20 rounded-xl p-6 hover:bg-secondary/10 transition-all hover:scale-105'>
                        <BookOpen className='w-10 h-10 text-complementary mb-3 mx-auto' />
                        <h3 className='text-3xl font-bold text-secondary mb-1'>50+</h3>
                        <p className='text-secondary/70'>Artículos</p>
                    </div>

                    {/* Growth Stat */}
                    <div className='bg-secondary/5 backdrop-blur-md border border-secondary/20 rounded-xl p-6 hover:bg-secondary/10 transition-all hover:scale-105'>
                        <TrendingUp className='w-10 h-10 text-helper mb-3 mx-auto' />
                        <h3 className='text-3xl font-bold text-secondary mb-1'>+30%</h3>
                        <p className='text-secondary/70'>Crecimiento Mensual</p>
                    </div>

                    {/* Community Stat */}
                    <div className='bg-secondary/5 backdrop-blur-md border border-secondary/20 rounded-xl p-6 hover:bg-secondary/10 transition-all hover:scale-105'>
                        <Users className='w-10 h-10 text-primary mb-3 mx-auto' />
                        <h3 className='text-3xl font-bold text-secondary mb-1'>1K+</h3>
                        <p className='text-secondary/70'>Lectores</p>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
