import { CheckCircle, Clock, ListTodo } from 'lucide-react'
import { motion } from 'framer-motion'






// Array de ejemplo - puedes modificarlo como necesites
const tasks = {
  tareas: [
    { id: 1, title: 'Diseñar landing page', description: 'Crear mockups iniciales' },
    { id: 2, title: 'Investigar competencia', description: 'Análisis de mercado' },
  ],
  trabajando: [
    { id: 3, title: 'Desarrollo del backend', description: 'API REST con Node.js' },
  ],
  terminado: [
    { id: 4, title: 'Logo del proyecto', description: 'Identidad visual completa' },
    { id: 5, title: 'Definir objetivos', description: 'Roadmap del proyecto' },
  ]
}

export const Objectives = () => {


  const columns = [
    {
      id: 'tareas',
      title: 'Iniciativas, Proyectos y Tareas',
      icon: ListTodo,
      color: 'complementary',
      items: tasks.tareas
    },
    {
      id: 'trabajando',
      title: 'En progreso',
      icon: Clock,
      color: 'primary',
      items: tasks.trabajando
    },
    {
      id: 'terminado',
      title: 'Terminado',
      icon: CheckCircle,
      color: 'helper',
      items: tasks.terminado
    }
  ]

  return (
    <section className='py-20 px-4 bg-contrast relative overflow-hidden'>
      {/* Tech grid background */}
      <div className='absolute inset-0 opacity-5'>
        <div className='absolute inset-0' style={{
          backgroundImage: `linear-gradient(rgba(238, 198, 67, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(238, 198, 67, 0.3) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      <div className='max-w-7xl mx-auto relative z-10'>
        {/* Header */}
        <motion.div 
          className='text-center mb-16'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className='inline-block mb-4 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full'>
            <span className='text-primary text-sm font-mono tracking-wider'>{'<BOARD />'}</span>
          </div>
          <h2 className='text-5xl font-bold text-secondary mb-4 tracking-tight'>
            Tablero de la comunidad
          </h2>
          <div className='flex items-center justify-center gap-2 mb-6'>
            <div className='w-12 h-0.5 bg-linear-to-r from-transparent to-complementary'></div>
            <div className='w-2 h-2 bg-complementary rotate-45'></div>
            <div className='w-12 h-0.5 bg-linear-to-l from-transparent to-helper'></div>
          </div>
        </motion.div>

        {/* Kanban Board */}
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {columns.map((column, index) => {
            const Icon = column.icon
            return (
              <motion.div
                key={column.id}
                className='flex flex-col'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {/* Column Header */}
                <div className={`bg-${column.color}/10 border border-${column.color}/30 rounded-t-xl p-4 backdrop-blur-sm`}>
                  <div className='flex items-center gap-3'>
                    <div className={`bg-${column.color} p-2 rounded-lg`}>
                      <Icon className='w-5 h-5 text-contrast' />
                    </div>
                    <div>
                      <h3 className='text-lg font-bold text-secondary'>{column.title}</h3>
                      <p className='text-xs text-secondary/60'>{column.items.length} tareas</p>
                    </div>
                  </div>
                </div>

                {/* Column Content */}
                <div className='bg-secondary/5 border-x border-b border-secondary/10 rounded-b-xl p-4 min-h-[400px] space-y-3'>
                  {column.items.map((item) => (
                    <motion.div
                      key={item.id}
                      className='bg-contrast p-4 rounded-lg border border-secondary/10 shadow-sm hover:shadow-md transition-shadow cursor-pointer'
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      <h4 className='font-semibold text-secondary mb-1'>{item.title}</h4>
                      <p className='text-sm text-secondary/60'>{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Objectives