import type { MotionValue } from "motion"

export interface SymbolData {
  symbol: string
  x: string
  y: string
  speed: number
}

export interface ParallaxSymbolProps {
  symbol: string
  x: string
  y: string
  scale: number
  speed: number
  scrollYProgress: MotionValue<number>
  index: number // Main animation delay
}