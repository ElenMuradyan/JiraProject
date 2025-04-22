'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const searchParams = useSearchParams()
  const [isSignUp, setIsSignUp] = useState(false)

  useEffect(() => {
    const mode = searchParams.get('mode')
    setIsSignUp(mode === 'signup')
  }, [searchParams])

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-100">
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 z-0"
        animate={{ x: isSignUp ? '-50%' : '0%' }}
        transition={{ duration: 0.5 }}
        style={{ width: '200%' }}
      />

      {/* Forms */}
      <motion.div
        className="relative flex w-[200%] h-full z-10"
        animate={{ x: isSignUp ? '-50%' : '0%' }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-3/4 flex justify-center items-center">
          {children && !isSignUp && children}
        </div>
        <div className="w-3/4 flex justify-center items-center">
          {children && isSignUp && children}
        </div>
      </motion.div>
    </div>
  )
}
