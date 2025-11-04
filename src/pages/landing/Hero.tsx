import { motion, useScroll } from 'framer-motion'
import { useRef, type JSX } from 'react'
import { ParallaxSymbol } from '../../components/effects/ParallaxSymbol'
import type { SymbolData } from '@interfaces/effects'

const parallaxElements: SymbolData[] = [
  { symbol: '<>', x: '10%', y: '20%', speed: 0.8 },
  { symbol: '{}', x: '80%', y: '15%', speed: 0.5 },
  { symbol: '[]', x: '15%', y: '70%', speed: 0.7 },
  { symbol: '()', x: '85%', y: '60%', speed: 0.6 },
  { symbol: '~', x: '25%', y: '45%', speed: 0.6 },
  { symbol: '=>', x: '70%', y: '80%', speed: 0.7 },
  { symbol: '::', x: '50%', y: '25%', speed: 0.4 },
  { symbol: '!=', x: '40%', y: '85%', speed: 0.8 },
  { symbol: '&&', x: '90%', y: '40%', speed: 0.7 },
  { symbol: '||', x: '5%', y: '50%', speed: 0.6 },
  { symbol: '/*', x: '60%', y: '10%', speed: 0.5 },
  { symbol: '*/', x: '30%', y: '90%', speed: 0.7 },
  { symbol: 'const', x: '5%', y: '5%', speed: 0.2 },
  { symbol: 'function', x: '75%', y: '95%', speed: 0.9 },
  { symbol: 'import', x: '30%', y: '5%', speed: 0.9 },
  { symbol: 'return', x: '95%', y: '25%', speed: 0.5 },
  { symbol: '.map()', x: '20%', y: '95%', speed: 0.7 },
  { symbol: 'if (true) { ... }', x: '45%', y: '60%', speed: 0.4 },
]

export const Hero = (): JSX.Element => {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  return (
    <div
      ref={containerRef}
      className='relative min-h-screen overflow-hidden bg-linear-to-tr from-primary via-primary to-primary flex items-center justify-center'
    >
      {parallaxElements.map((item: SymbolData, index: number) => (
        <ParallaxSymbol
          key={item.symbol} // Use symbol as key
          {...item} // We pass all props of data
          scale={0.8}
          scrollYProgress={scrollYProgress} // We pass MotionValue
          index={index}
        />
      ))}

      <motion.div
        className='relative z-10 text-center px-6 max-w-4xl'
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <motion.h1
          className='text-6xl md:text-8xl font-bold text-secondary mb-6'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          Hybrige
        </motion.h1>

        <motion.p
          className='text-xl md:text-2xl text-secondary/80 mb-8 font-light'
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          Community
        </motion.p>
      </motion.div>

      {/* Gradient overlay  */}
      <div className='absolute inset-0 bg-linear-to-b from-transparent via-transparent to-contrast/50 pointer-events-none' />
    </div>
  )
}
