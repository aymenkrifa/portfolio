'use client'

import { useState } from 'react'
import { motion } from 'motion/react'

export default function ResumeSection() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [isSuccess, setIsSuccess] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [showValidated, setShowValidated] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email) {
      setMessage('Please enter your email address')
      setIsSuccess(false)
      setHasError(true)
      setShowValidated(false)
      return
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setMessage('Please enter a valid email address')
      setIsSuccess(false)
      setHasError(true)
      setShowValidated(false)
      return
    }

    // Email is valid - show green state immediately
    setShowValidated(true)
    setHasError(false)
    setMessage('')
    setIsLoading(true)

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
        setMessage('Resume sent! Check your email.')
        setIsSuccess(true)
        setEmail('')
        setTimeout(() => {
          setMessage('')
          setIsSuccess(false)
        }, 3000)
      } else {
        setMessage(data.error || 'Failed to send resume')
        setIsSuccess(false)
        setHasError(true)
      }
    } catch (error) {
      setMessage('Something went wrong. Please try again.')
      setIsSuccess(false)
      setHasError(true)
    } finally {
      setIsLoading(false)
      setShowValidated(false) // Remove green state when done
    }
  }

  return (
    <motion.div
      className="space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div>
        <h4 className="text-sm font-medium text-zinc-900 dark:text-zinc-100 mb-2">
          Want my resume?
        </h4>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-3">
          I'll send it right to your inbox
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        {/* Email Input and Button Row */}
        <div className="flex gap-2">
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              // Clear all states when user starts typing
              if (hasError) {
                setHasError(false)
                setMessage('')
              }
              if (isSuccess) {
                setIsSuccess(false)
                setMessage('')
              }
              if (showValidated) {
                setShowValidated(false)
              }
            }}
            placeholder="your@email.com"
            className={`flex-1 px-3 py-2 text-sm rounded-lg transition-all duration-200
                     ${hasError 
                       ? 'bg-red-50 dark:bg-red-950/20 text-red-900 dark:text-red-100 placeholder-red-400 dark:placeholder-red-500 border border-red-300 dark:border-red-700 focus:ring-2 focus:ring-red-500 dark:focus:ring-red-400 focus:border-red-500 dark:focus:border-red-400'
                       : showValidated
                       ? 'bg-green-50 dark:bg-green-950/20 text-green-900 dark:text-green-100 placeholder-green-400 dark:placeholder-green-500 border border-green-300 dark:border-green-700 focus:ring-2 focus:ring-green-500 dark:focus:ring-green-400 focus:border-green-500 dark:focus:border-green-400'
                       : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder-zinc-500 dark:placeholder-zinc-400 hover:bg-zinc-200 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100'
                     } focus:ring-offset-0`}
            disabled={isLoading}
          />

          <button
            type="submit"
            disabled={isLoading || !email}
            className="px-4 py-2 text-sm font-medium text-white dark:text-zinc-900 
                     bg-zinc-900 dark:bg-zinc-100 rounded-lg
                     hover:bg-zinc-800 dark:hover:bg-zinc-200
                     disabled:opacity-50 disabled:cursor-not-allowed
                     focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 focus:ring-offset-0
                     transition-colors duration-200 whitespace-nowrap"
          >
            {isLoading ? 'On its way...' : 'Send Resume'}
          </button>
        </div>

        {/* Message */}
        {message && (
          <motion.p
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`text-xs ${
              isSuccess 
                ? 'text-green-600 dark:text-green-400' 
                : 'text-red-600 dark:text-red-400'
            }`}
          >
            {isSuccess ? 'All set! Check your email for my resume 📧' : message}
          </motion.p>
        )}
      </form>
    </motion.div>
  )
}
