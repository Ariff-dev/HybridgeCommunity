import { Github, Mail, Heart, Code, Users } from 'lucide-react'
import { motion } from 'framer-motion'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  const socialLinks = [
    { icon: Github, href: '#', label: 'GitHub', color: 'hover:text-primary' },
    { icon: Mail, href: '#', label: 'Email', color: 'hover:text-primary' },
  ]

  const footerLinks = [
    {
      title: 'Comunidad',
      links: [
        { label: 'Sobre nosotros', href: '#' },
        { label: 'Equipo', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Contribuir', href: '#' },
      ]
    },
    {
      title: 'Recursos',
      links: [
        { label: 'Documentación', href: '#' },
        { label: 'Guías', href: '#' },
        { label: 'API', href: '#' },
        { label: 'Estado', href: '#' },
      ]
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacidad', href: '#' },
        { label: 'Términos', href: '#' },
        { label: 'Licencia', href: '#' },
        { label: 'Cookies', href: '#' },
      ]
    }
  ]

  return (
    <footer className='bg-linear-to-tr from-primary via-primary to-primary text-secondary relative overflow-hidden'>
      {/* Decorative gradient overlay */}
      <div className='absolute inset-0 bg-linear-to-br from-primary/5 via-transparent to-complementary/5 pointer-events-none'></div>
      
      {/* Tech grid background */}
      <div className='absolute inset-0 opacity-5'>
        <div className='absolute inset-0' style={{
          backgroundImage: `linear-gradient(rgba(238, 198, 67, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(238, 198, 67, 0.3) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className='max-w-7xl mx-auto px-4 py-12 relative z-10'>
        {/* Top section */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12'>
          {/* Brand section */}
          <div className='lg:col-span-2'>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className='flex items-center gap-2 mb-4'>
                <div className='w-10 h-10 bg-linear-to-br from-primary to-complementary rounded-lg flex items-center justify-center'>
                  <Code className='w-6 h-6 text-secondary' />
                </div>
                <span className='text-2xl font-bold'>Comunidad</span>
              </div>
              <p className='text-secondary/70 mb-6 max-w-sm'>
                Construyendo el futuro juntos. Una comunidad de desarrolladores apasionados por la tecnología y la colaboración.
              </p>
              
              {/* Social links */}
              <div className='flex gap-3'>
                {socialLinks.map((social, index) => {
                  const Icon = social.icon
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className={`w-10 h-10 bg-contrast/10 hover:bg-contrast/20 rounded-lg flex items-center justify-center transition-all ${social.color}`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Icon className='w-5 h-5' />
                    </motion.a>
                  )
                })}
              </div>
            </motion.div>
          </div>

          {/* Links sections */}
          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + sectionIndex * 0.1 }}
            >
              <h3 className='text-lg font-semibold mb-4 text-secondary'>{section.title}</h3>
              <ul className='space-y-2'>
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className='text-secondary/70 hover:text-primary transition-colors inline-flex items-center gap-1 group'
                    >
                      <span className='w-0 group-hover:w-2 h-0.5 bg-primary transition-all duration-300'></span>
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className='border-t border-contrast/10 mb-8'></div>

        {/* Bottom section */}
        <div className='flex flex-col md:flex-row justify-between items-center gap-4'>
          <motion.div
            className='flex items-center gap-2 text-secondary/60 text-sm'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <span>© {currentYear} Comunidad.</span>
            <span className='hidden md:inline'>•</span>
            <span className='flex items-center gap-1'>
              Hecho con <Heart className='w-4 h-4 text-helper inline-block animate-pulse' /> por la comunidad
            </span>
          </motion.div>

          <motion.div
            className='flex items-center gap-2 text-secondary/60 text-sm'
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Users className='w-4 h-4' />
            <span className='font-mono'>Open Source Project</span>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className='absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl'></div>
        <div className='absolute top-0 right-0 w-32 h-32 bg-complementary/5 rounded-full blur-3xl'></div>
      </div>
    </footer>
  )
}

export default Footer