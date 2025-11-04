import type { ParallaxSymbolProps } from '@interfaces/effects'
import { motion, useTransform, MotionValue } from 'framer-motion'
import { type JSX } from 'react'

export const ParallaxSymbol = ({
  symbol,
  x,
  y,
  scale,
  speed,
  scrollYProgress,
  index,
}: ParallaxSymbolProps): JSX.Element => {

  const yParallax: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 1],
    [0, -300 * speed] // Vertical speed
  )

  const opacity: MotionValue<number> = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [0.6, 0.3, 0] // Scroll with fadeout
  )

  const isCodeText = symbol.length > 2 // For different style text

  return (
    <motion.div
      key={symbol} // if the symbol is unique, the key is stable
      style={{
        y: yParallax,
        opacity,
        left: x,
        top: y,
        scale,
      }}
      // Allows different types of styles for text
      className={`absolute ${
        isCodeText ? 'text-xl font-semibold' : 'text-6xl font-mono'
      } text-helper select-none pointer-events-none whitespace-nowrap`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: isCodeText ? 0.8 : 0.6, // Text opacity
        scale: scale,
        rotate: isCodeText ? 0 : [0, 5, -5, 0], // Only symbols rotate
      }}
      transition={{
        duration: 2,
        delay: index * 0.1,
        rotate: {
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      }}
    >
      {symbol}
    </motion.div>
  )
}
