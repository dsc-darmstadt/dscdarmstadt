"use client"

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

interface AnimatedWrapperProps {
  children: ReactNode
  delay?: number
}

export function AnimatedWrapper({ children, delay = 0 }: AnimatedWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}

export function AnimatedBackButton({ children, delay = 0 }: AnimatedWrapperProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  )
}
