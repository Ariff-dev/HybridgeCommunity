import { Users, Lightbulb, Rocket, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

export const AboutUs = () => {
  return (
    <section id='about' className='py-20 px-4 bg-contrast relative overflow-hidden'>
      {/* Tech grid background */}
      <div className='absolute inset-0 opacity-5'>
        <div className='absolute inset-0' style={{
          backgroundImage: `linear-gradient(rgba(238, 198, 67, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(238, 198, 67, 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className='max-w-6xl mx-auto relative z-10'>
        {/* Header */}
        <motion.div 
          className='text-center mb-16'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div 
            className='inline-block mb-4 px-4 py-2 bg-complementary/10 border border-complementary/30 rounded-full'
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className='text-complementary text-sm font-mono tracking-wider'>{'<ABOUT_US />'}</span>
          </motion.div>
          <motion.h2 
            className='text-5xl font-bold text-secondary mb-4 tracking-tight'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Sobre Nosotros
          </motion.h2>
          <div className='flex items-center justify-center gap-2 mb-6'>
            <div className='w-12 h-0.5 bg-linear-to-r from-transparent to-complementary'></div>
            <div className='w-2 h-2 bg-complementary rotate-45'></div>
            <div className='w-12 h-0.5 bg-linear-to-l from-transparent to-helper'></div>
          </div>
          <motion.p 
            className='text-xl text-secondary max-w-3xl mx-auto leading-relaxed font-light'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Somos un equipo de estudiantes apasionados de la Universidad de Hybridge, 
            unidos por una visión común: Visibilizar la educación del futuro
          </motion.p>
        </motion.div>

        {/* Main Content */}
        <div className='grid md:grid-cols-2 gap-12 items-center mb-16'>
          <div className='space-y-6'>
            <motion.div 
              className='bg-secondary/5 backdrop-blur-sm p-6 rounded-xl border border-complementary/20'
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className='flex items-start gap-4'>
                <div className='bg-linear-to-br from-complementary to-complementary/80 p-3 rounded-lg'>
                  <Lightbulb className='w-6 h-6 text-contrast' />
                </div>
                <div>
                  <div className='flex items-center gap-2 mb-2'>
                    <div className='w-1 h-1 bg-complementary rounded-full'></div>
                    <h3 className='text-xl font-semibold text-secondary'>Nuestra Misión</h3>
                  </div>
                  <p className='text-secondary/80 font-light'>
                    Visibilizar y difundir los proyectos innovadores que están redefiniendo 
                    el concepto de la "escuela del futuro".
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className='bg-secondary/5 backdrop-blur-sm p-6 rounded-xl border border-primary/20'
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className='flex items-start gap-4'>
                <div className='bg-primary p-3 rounded-lg'>
                  <Rocket className='w-6 h-6 text-secondary' />
                </div>
                <div>
                  <div className='flex items-center gap-2 mb-2'>
                    <div className='w-1 h-1 bg-primary rounded-full'></div>
                    <h3 className='text-xl font-semibold text-secondary'>Innovación</h3>
                  </div>
                  <p className='text-secondary/80 font-light'>
                    Impulsamos proyectos que desafían lo convencional y crean nuevas 
                    oportunidades de aprendizaje.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className='bg-secondary/5 backdrop-blur-sm p-6 rounded-xl border border-helper/20'
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ scale: 1.02 }}
            >
              <div className='flex items-start gap-4'>
                <div className='bg-linear-to-br from-helper to-helper/80 p-3 rounded-lg'>
                  <Heart className='w-6 h-6 text-contrast' />
                </div>
                <div>
                  <div className='flex items-center gap-2 mb-2'>
                    <div className='w-1 h-1 bg-helper rounded-full'></div>
                    <h3 className='text-xl font-semibold text-secondary'>Comunidad</h3>
                  </div>
                  <p className='text-secondary/80 font-light'>
                    Construimos un espacio donde las ideas se comparten y los sueños 
                    se convierten en realidad.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            className='relative'
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.div 
              className='relative bg-linear-to-br from-complementary/10 to-helper/10 backdrop-blur-md rounded-2xl p-8 border border-complementary/30 shadow-2xl'
              whileHover={{ scale: 1.02, boxShadow: '0 25px 50px -12px rgba(238, 198, 67, 0.25)' }}
              transition={{ duration: 0.3 }}
            >
              <div className='absolute top-4 right-4 flex gap-1'>
                <div className='w-2 h-2 rounded-full bg-helper'></div>
                <div className='w-2 h-2 rounded-full bg-complementary'></div>
                <div className='w-2 h-2 rounded-full bg-primary'></div>
              </div>
              <Users className='w-16 h-16 mb-6 text-complementary' />
              <h3 className='text-3xl font-bold mb-4 text-secondary'>Únete a Nosotros</h3>
              <p className='text-lg mb-6 text-secondary/80 font-light'>
                Forma parte de una comunidad que está construyendo el futuro de la educación, 
                un proyecto a la vez.
              </p>
              <div className='pt-4 border-t border-complementary/20'>
                <div className='text-xs text-complementary font-mono'>
                  {'> community.join()'}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Values */}
        <motion.div 
          className='bg-secondary/5 backdrop-blur-md border border-primary/20 rounded-2xl p-12 text-center relative overflow-hidden'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className='absolute inset-0 bg-linear-to-r from-complementary/5 to-helper/5'></div>
          <div className='relative z-10'>
            <div className='inline-block mb-4'>
              <div className='flex items-center gap-2'>
                <div className='w-2 h-2 bg-complementary'></div>
                <div className='w-2 h-2 bg-helper'></div>
                <div className='w-2 h-2 bg-complementary'></div>
              </div>
            </div>
            <h3 className='text-3xl font-bold mb-4 text-secondary'>Nuestros Valores</h3>
            <p className='text-lg text-secondary/80 max-w-3xl mx-auto font-light'>
              Creemos en la colaboración, la creatividad y el impacto positivo. 
              Cada proyecto que destacamos representa el talento y la dedicación 
              de nuestra comunidad universitaria.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutUs