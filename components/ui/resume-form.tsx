'use client'
import { motion } from 'motion/react'
import { useState } from 'react'

interface ResumeFormProps {
  className?: string
}

export default function ResumeForm({ className = '' }: ResumeFormProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [isFocused, setIsFocused] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setMessage('Please enter your email address')
      setIsSuccess(false)
      return
    }

    setIsLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/send-resume', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (response.ok) {
        setMessage('Resume sent successfully! Check your email.')
        setIsSuccess(true)
        setEmail('')
      } else {
        setMessage(data.error || 'Failed to send resume')
        setIsSuccess(false)
      }
    } catch (error) {
      setMessage('An error occurred. Please try again.')
      setIsSuccess(false)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <motion.div 
      className={`w-full max-w-md mx-auto ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
    >
      {/* Main Card Container */}
      <motion.div 
        className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/80 via-white/60 to-white/40 dark:from-zinc-900/80 dark:via-zinc-900/60 dark:to-zinc-900/40 backdrop-blur-xl border border-white/20 dark:border-zinc-700/30 shadow-lg shadow-black/5 dark:shadow-black/20"
        whileHover={{ 
          scale: 1.02, 
          boxShadow: "0 20px 40px -12px rgba(0, 0, 0, 0.15)",
          borderColor: "rgba(255, 255, 255, 0.3)"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Animated Background Gradient */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          style={{
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 50%, rgba(236, 72, 153, 0.1) 100%)'
          }}
        />
        
        {/* Content Container */}
        <div className="relative p-8">
          {/* Header Section */}
          <motion.div
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <motion.div
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-800 dark:to-zinc-700 mb-4 shadow-inner"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <svg 
                className="w-8 h-8 text-zinc-700 dark:text-zinc-300" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" 
                />
              </svg>
            </motion.div>
            
            <h3 className="text-2xl font-bold bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-700 dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-300 bg-clip-text text-transparent mb-2">
              Get My Resume
            </h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-xs mx-auto leading-relaxed">
              Enter your email and I'll send you my latest resume with all my experience and projects.
            </p>
          </motion.div>
          {/* Form Section */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <label 
                htmlFor="email" 
                className="block text-sm font-semibold text-zinc-800 dark:text-zinc-200 mb-3"
              >
                Email Address
              </label>
              
              {/* Input Container */}
              <motion.div 
                className="relative"
                animate={{ 
                  scale: isFocused ? 1.01 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="your.email@example.com"
                  className="w-full px-5 py-4 border-2 border-zinc-200/60 dark:border-zinc-700/60 rounded-2xl 
                           bg-white/70 dark:bg-zinc-800/70 backdrop-blur-sm
                           text-zinc-900 dark:text-zinc-100 font-medium
                           placeholder-zinc-500 dark:placeholder-zinc-400
                           focus:outline-none focus:border-zinc-400 dark:focus:border-zinc-500
                           transition-all duration-300 ease-out
                           hover:border-zinc-300 dark:hover:border-zinc-600
                           hover:bg-white/90 dark:hover:bg-zinc-800/90
                           focus:bg-white dark:focus:bg-zinc-800
                           focus:shadow-lg focus:shadow-zinc-200/50 dark:focus:shadow-zinc-800/50
                           relative z-10"
                  disabled={isLoading}
                  required
                />
              </motion.div>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isLoading || !email}
              className="group relative w-full px-6 py-4 bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 
                         dark:from-zinc-100 dark:via-zinc-200 dark:to-zinc-100
                         text-white dark:text-zinc-900 font-semibold rounded-2xl 
                         transition-all duration-300 ease-out
                         disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden
                         focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2
                         shadow-lg shadow-zinc-900/20 dark:shadow-zinc-100/20
                         hover:shadow-xl hover:shadow-zinc-900/30 dark:hover:shadow-zinc-100/30"
              whileHover={{ 
                scale: isLoading ? 1 : 1.02,
                y: isLoading ? 0 : -1,
              }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {/* Button Background Animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-zinc-800 via-zinc-700 to-zinc-800 dark:from-zinc-200 dark:via-zinc-100 dark:to-zinc-200"
                initial={{ x: '-100%' }}
                whileHover={{ x: '0%' }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
              />
              
              {/* Button Content */}
              <span className="relative z-10 flex items-center justify-center">
                {isLoading ? (
                  <motion.div 
                    className="flex items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.div
                      className="w-6 h-6 mr-3 border-2 border-current border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    />
                    <span>Sending Resume...</span>
                  </motion.div>
                ) : (
                  <motion.div 
                    className="flex items-center"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    <span>Send My Resume</span>
                    <motion.svg 
                      className="w-5 h-5 ml-2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </motion.svg>
                  </motion.div>
                )}
              </span>
            </motion.button>

            {/* Success/Error Message */}
            {message && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -20 }}
                transition={{ 
                  duration: 0.4, 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 25 
                }}
                className={`p-5 rounded-2xl backdrop-blur-sm border-2 ${
                  isSuccess 
                    ? 'bg-gradient-to-r from-green-50/90 to-emerald-50/90 dark:from-green-900/30 dark:to-emerald-900/30 text-green-800 dark:text-green-300 border-green-200/60 dark:border-green-700/60' 
                    : 'bg-gradient-to-r from-red-50/90 to-rose-50/90 dark:from-red-900/30 dark:to-rose-900/30 text-red-800 dark:text-red-300 border-red-200/60 dark:border-red-700/60'
                }`}
              >
                <motion.div
                  initial={{ scale: 0.8, x: -10 }}
                  animate={{ scale: 1, x: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="flex items-start space-x-3"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.3, type: "spring" }}
                    className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center ${
                      isSuccess 
                        ? 'bg-green-100 dark:bg-green-800' 
                        : 'bg-red-100 dark:bg-red-800'
                    }`}
                  >
                    {isSuccess ? (
                      <motion.svg
                        className="w-4 h-4 text-green-600 dark:text-green-300"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                      >
                        <motion.path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2.5}
                          d="M5 13l4 4L19 7"
                        />
                      </motion.svg>
                    ) : (
                      <svg className="w-4 h-4 text-red-600 dark:text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    )}
                  </motion.div>
                  
                  <div className="flex-1">
                    <motion.p 
                      className="font-medium text-sm leading-relaxed"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.3 }}
                    >
                      {message}
                    </motion.p>
                    
                    {isSuccess && (
                      <motion.p 
                        className="text-xs mt-2 opacity-75"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                      >
                        Please check your inbox and spam folder.
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </form>
        </div>
        
        {/* Subtle Bottom Accent */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 dark:from-zinc-700 dark:via-zinc-600 dark:to-zinc-700"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
        />
      </motion.div>
    </motion.div>
  )
}
