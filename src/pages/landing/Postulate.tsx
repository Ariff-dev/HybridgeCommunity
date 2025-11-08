import { useState } from 'react'
import { Send, X, User, Mail, MessageSquare, Briefcase } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export const Postulate = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    task: '',
    message: ''
  })

  const handleSubmit = () => {
    console.log('Datos del formulario:', formData)
    // Aquí puedes agregar la lógica para enviar los datos
    alert('¡Postulación enviada con éxito!')
    setIsOpen(false)
    setFormData({ name: '', email: '', task: '', message: '' })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <>
      {/* Sección de llamado a la acción */}
      <section className='py-16 px-4 bg-contrast border-t border-secondary/10'>
        <div className='max-w-4xl mx-auto'>
          <motion.div 
            className='bg-linear-to-br from-primary/5 via-complementary/5 to-helper/5 rounded-2xl p-8 md:p-12 border border-primary/20 relative overflow-hidden'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Decorative elements */}
            <div className='absolute top-0 right-0 w-64 h-64 bg-complementary/10 rounded-full blur-3xl'></div>
            <div className='absolute bottom-0 left-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl'></div>
            
            <div className='relative z-10 text-center'>
              <div className='inline-block mb-4 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full'>
                <span className='text-primary text-sm font-mono tracking-wider'>{'<ÚNETE />'}</span>
              </div>
              
              <h3 className='text-3xl md:text-4xl font-bold text-secondary mb-4'>
                ¿Eres parte de la comunidad?
              </h3>
              
              <p className='text-lg text-secondary/70 mb-8 max-w-2xl mx-auto'>
                Si quieres colaborar y tomar alguna de las tareas disponibles, postúlate aquí. 
                ¡Tu contribución es valiosa!
              </p>
              
              <motion.button
                onClick={() => setIsOpen(true)}
                className='inline-flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary/90 text-contrast font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300'
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Send className='w-5 h-5' />
                Postular a una tarea
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className='fixed inset-0 bg-secondary/80 backdrop-blur-sm z-40'
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Modal Content */}
            <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
              <motion.div
                className='bg-contrast rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-secondary/20'
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.3 }}
              >
                {/* Header */}
                <div className='sticky top-0 bg-contrast border-b border-secondary/10 p-6 flex items-center justify-between'>
                  <div>
                    <h2 className='text-2xl font-bold text-secondary mb-1'>Formulario de Postulación</h2>
                    <p className='text-sm text-secondary/60'>Completa los datos para postularte a una tarea</p>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className='p-2 hover:bg-secondary/10 rounded-lg transition-colors'
                  >
                    <X className='w-6 h-6 text-secondary' />
                  </button>
                </div>

                {/* Form */}
                <div className='p-6 space-y-6'>
                  {/* Nombre */}
                  <div>
                    <label className='flex items-center gap-2 text-sm font-semibold text-secondary mb-2'>
                      <User className='w-4 h-4 text-primary' />
                      Nombre completo
                    </label>
                    <input
                      type='text'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className='w-full px-4 py-3 bg-secondary/5 border border-secondary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all text-secondary'
                      placeholder='Tu nombre'
                    />
                  </div>

                  {/* Email */}
                  <div>
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
                      className='w-full px-4 py-3 bg-secondary/5 border border-secondary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-complementary focus:border-transparent transition-all text-secondary'
                      placeholder='tu@email.com'
                    />
                  </div>

                  {/* Tarea */}
                  <div>
                    <label className='flex items-center gap-2 text-sm font-semibold text-secondary mb-2'>
                      <Briefcase className='w-4 h-4 text-helper' />
                      Tarea de interés
                    </label>
                    <select
                      name='task'
                      value={formData.task}
                      onChange={handleChange}
                      required
                      className='w-full px-4 py-3 bg-secondary/5 border border-secondary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-helper focus:border-transparent transition-all text-secondary'
                    >
                      <option value=''>Selecciona una tarea</option>
                      <option value='landing'>Diseñar landing page</option>
                      <option value='competencia'>Investigar competencia</option>
                      <option value='backend'>Desarrollo del backend</option>
                      <option value='otra'>Otra tarea</option>
                    </select>
                  </div>

                  {/* Mensaje */}
                  <div>
                    <label className='flex items-center gap-2 text-sm font-semibold text-secondary mb-2'>
                      <MessageSquare className='w-4 h-4 text-primary' />
                      Mensaje (opcional)
                    </label>
                    <textarea
                      name='message'
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className='w-full px-4 py-3 bg-secondary/5 border border-secondary/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none text-secondary'
                      placeholder='Cuéntanos por qué te gustaría trabajar en esta tarea...'
                    />
                  </div>

                  {/* Buttons */}
                  <div className='flex gap-3 pt-4'>
                    <button
                      onClick={() => setIsOpen(false)}
                      className='flex-1 px-6 py-3 bg-secondary/10 hover:bg-secondary/20 text-secondary font-semibold rounded-lg transition-colors'
                    >
                      Cancelar
                    </button>
                    <button
                      onClick={handleSubmit}
                      className='flex-1 px-6 py-3 bg-primary hover:bg-primary/90 text-contrast font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2'
                    >
                      <Send className='w-5 h-5' />
                      Enviar postulación
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

export default Postulate